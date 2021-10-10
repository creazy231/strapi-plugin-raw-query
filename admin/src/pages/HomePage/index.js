/*
 *
 * HomePage
 *
 */
import './index.css';

import React, {memo, useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import {ContentLayout, HeaderLayout} from '@strapi/parts/Layout';
import pluginId from '../../pluginId';
import getTrad from '../../utils/getTrad';
import {request, useNotification} from '@strapi/helper-plugin';
import {Divider, Button, Box, Table, Thead, Tbody, TableLabel, Tr, Th, Td, Text} from '@strapi/parts';

import Editor from "@monaco-editor/react";
import {JsonToTable} from "react-json-to-table";
import isEqual from "lodash/isEqual";
import upperFirst from "lodash/upperFirst";

import * as pkg from '../../../../package.json';

const HomePage = () => {

  const toggleNotification = useNotification();

  const [code, setCode] = useState(
    'SELECT email FROM admin_users LIMIT 1;\n' +
    'SELECT * FROM admin_users LIMIT 1;\n' +
    'SELECT firstname, lastname FROM admin_users LIMIT 1;'
  );

  const [tableData, setTableData] = useState([]);
  const [executing, setExecuting] = useState(false);

  const onMount = (editor, monaco) => {
    const code = window.localStorage.getItem(`${pluginId}_code`);
    if (code && code.length) {
      setCode(code);
      editor.setValue(code);
    }
    editor.focus();
  }

  const onChange = (newValue, e) => {
    window.localStorage.setItem(`${pluginId}_code`, newValue);
    setCode(newValue);
  }

  const executeQuery = async () => {
    try {
      setExecuting(true);
      setTableData([]);

      const response = await request(`/${pluginId}/execute`, {
        method: 'POST',
        body: {
          code,
        },
      });

      toggleNotification({
        type: 'success',
        message: {
          id: `${getTrad('notification.info.execute.success')}`,
        },
      });

      setTableData(response.results);
    } catch (err) {
      console.error(err);
      toggleNotification({
        type: 'warning',
        message: {
          id: `${getTrad('notification.info.execute.error')}`,
        },
      });
    } finally {
      setExecuting(false);
    }
  }

  const getTableHeaders = (data) => {
    let headers = [];
    for (const dataKey in data) {
      headers.push(dataKey);
    }
    return headers;
  }

  const getTableRows = (data) => {
    let rows = [];
    data.forEach(d => {
      let r = [];
      for (const dk in d) {
        r.push(d[dk]);
      }
      rows.push(r);
    });
    console.log(rows);
    return rows;
  }

  return (
    <>
      <div className={'raw-query'}>
        <HeaderLayout
          id="title"
          title={pkg.strapi.name}
          subtitle={pkg.strapi.description}
        />
        <ContentLayout>
          <Editor
            height="200px"
            theme="vs-dark"
            defaultLanguage="sql"
            options={{fontSize: '14px'}}
            defaultValue={code}
            onMount={onMount}
            onChange={onChange}
          />
          <Button
            className="raw-query_execute"
            onClick={executeQuery}
            loading={executing}
            disabled={executing}
          >
            Execute
          </Button>
          <div style={{overflow: 'auto', margin: '24px 0px'}}>
            {tableData.length ? tableData.map((data, index) => {
              console.log(data.result);
              if (data.result.length) {
                return (
                  <div key={'table_' + index} className={'raw-query_query'}>
                    <p><b>Query:</b><small>{data.result.length} Results</small></p>
                    <div className="code">
                      <pre>{data.query};</pre>
                    </div>
                    <Box>
                      <Table colCount={getTableHeaders(data.result).length} rowCount={data.result.length}>
                        <Thead>
                          <Tr>
                            {
                              getTableHeaders(data.result[0]).map((th, index) => {
                                return (
                                  <Th style={{padding: '16px'}} key={'th_' + index}>
                                    <TableLabel>{th}</TableLabel>
                                  </Th>
                                )
                              })
                            }
                          </Tr>
                        </Thead>
                        <Tbody>
                          {
                            getTableRows(data.result).map((tr, index) => {
                              return (
                                <Tr key={'tr_' + index}>
                                  {
                                    tr.map((td, index) => {
                                      return (
                                        <Td style={{padding: '16px'}} key={'td_' + index}>
                                          <Text>{td}</Text>
                                        </Td>
                                      )
                                    })
                                  }
                                </Tr>
                              )
                            })
                          }
                        </Tbody>
                      </Table>
                    </Box>
                    <Divider/>
                  </div>
                )
              } else {
                return (
                  <div className={'raw-query_query'}>
                    <p><b>Query:</b><small>{data.result.length} Results</small></p>
                    <div className="code">
                      <pre>{data.query};</pre>
                    </div>
                    <p>No results to display.</p>
                    <Divider/>
                  </div>
                )
              }
            }) : ''}
          </div>
        </ContentLayout>
      </div>
    </>
  );
};

export default memo(HomePage);
