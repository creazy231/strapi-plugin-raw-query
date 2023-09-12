/*
 *
 * HomePage
 *
 */
import './index.css';
import {dracula} from '@uiw/codemirror-theme-dracula';


import React, {memo, useState} from 'react';
import {ContentLayout, HeaderLayout} from '@strapi/design-system/Layout';
import {request, useNotification} from '@strapi/helper-plugin';
import {Divider, Button, Box, Table, Thead, Tbody, Tr, Th, Td} from '@strapi/design-system';

import CodeMirror from '@uiw/react-codemirror';
import {langs} from '@uiw/codemirror-extensions-langs';
import getTrad from '../../utils/getTrad';
import pluginId from '../../pluginId';

import * as pkg from '../../../../package.json';

function HomePage() {

  const toggleNotification = useNotification();

  const [code, setCode] = useState(
    'SELECT * FROM admin_users LIMIT 1;'
  );

  const [tableData, setTableData] = useState([]);
  const [executing, setExecuting] = useState(false);

  const editorDidMount = (editor, monaco) => {
    const code = window.localStorage.getItem(`${pluginId}_code`);

    if (code && code.length) {
      setCode(code);
      editor.setValue(code);
    }
    editor.focus();
  }

  const onChange = (value) => {
    window.localStorage.setItem(`${pluginId}_code`, value);
    setCode(value);
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

  const handleDownloadCSV = () => {
    let headersCsv = [];
    let rowsCsv = [];
  
    tableData.forEach((data) => {
      if (data.result.length) {
        const tableHeaders = getTableHeaders(data.result[0][0]);
        headersCsv = headersCsv.concat(tableHeaders);
        const tableRows = getTableRows(data.result[0]);
        rowsCsv = rowsCsv.concat(tableRows);
      }
    });
  
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}-${today.getHours()}h${today.getMinutes()}m${today.getSeconds()}`;
    const fileName = `export_query_strapi_sql_${formattedDate}.csv`;
  
    // Generate CSV content
    const csvContent = `data:text/csv;charset=utf-8,${headersCsv.join(',')}\n${rowsCsv.map((e) => e.join(',')).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
  
    // Download the CSV
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="raw-query">
      <HeaderLayout
        id="title"
        title={pkg.strapi.displayName}
        subtitle={pkg.strapi.description}
      />
      <ContentLayout>
        <CodeMirror
          extensions={[langs.sql()]}
          theme={dracula}
          height="200px"
          value={code}
          options={{
            mode: 'sql',
            theme: 'dracula',
            lineNumbers: true
          }}
          editorDidMount={editorDidMount}
          onChange={onChange}
        />
        <div className="buttons-container">
          <Button
            className="raw-query_execute"
            onClick={executeQuery}
            loading={executing}
            disabled={executing}
          >
            Execute
          </Button>
          <Button
            className="raw-query_execute"
            onClick={handleDownloadCSV}
            disabled={ tableData.length >=1 ? false : true }
          >
            Export CSV
          </Button>
        </div>
        <div style={{overflow: 'auto', margin: '24px 0px'}}>
          {tableData.length > 0 ? tableData.map((data, index) => {
            if (data.result.length) {
              return (
                <div key={`table_${index}`} className="raw-query_query">
                  <p><b>Query:</b><small>{data.result[0].length} Results</small></p>
                  <div className="code">
                    <pre>{data.query};</pre>
                  </div>
                  <Box>
                    <Table colCount={getTableHeaders(data.result[0]).length} rowCount={data.result[0].length}>
                      <Thead>
                        <Tr>
                          {
                            getTableHeaders(data.result[0][0]).map((th, index) => {
                              return (
                                <Th style={{padding: '16px'}} key={`th_${index}`}>
                                  {th}
                                </Th>
                              )
                            })
                          }
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          getTableRows(data.result[0]).map((tr, index) => {
                            return (
                              <Tr key={`tr_${index}`}>
                                {
                                  tr.map((td, index) => {
                                    return (
                                      <Td style={{padding: '16px'}} key={`td_${index}`}>
                                        {td}
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
            }

            return (
              <div key={`table_${index}`} className="raw-query_query">
                <p><b>Query:</b><small>{data.result.length} Results</small></p>
                <div className="code">
                  <pre>{data.query};</pre>
                </div>
                <p>No results to display.</p>
                <Divider/>
              </div>
            )

          }) : ''}
        </div>
      </ContentLayout>
    </div>
  );
}

export default memo(HomePage);
