/*
 *
 * HomePage
 *
 */
import "./index.css";
import { dracula } from "@uiw/codemirror-theme-dracula";

import React, { memo, useEffect, useState } from "react";
import { ContentLayout, HeaderLayout } from "@strapi/design-system/Layout";
import { request, useNotification } from "@strapi/helper-plugin";
import { Badge, Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@strapi/design-system";

import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import getTrad from "../../utils/getTrad";
import pluginId from "../../pluginId";

import * as pkg from "../../../../package.json";

function HomePage() {
  const toggleNotification = useNotification();

  const [ code, setCode ] = useState(
    "SELECT * FROM admin_users LIMIT 1;",
  );

  const [ tableData, setTableData ] = useState(null);
  const [ executing, setExecuting ] = useState(false);

  const editorDidMount = (editor, monaco) => {
    const code = window.localStorage.getItem(`${pluginId}_code`);

    if (code && code.length) {
      setCode(code);
      editor.setValue(code);
    }
    editor.focus();
  };

  const onChange = (value) => {
    window.localStorage.setItem(`${pluginId}_code`, value);
    setCode(value);
  };

  useEffect(() => {
    const tmpCode = window.localStorage.getItem(`${pluginId}_code`);

    if (tmpCode && tmpCode.length) {
      setCode(tmpCode);
    }
  }, []);

  const executeQuery = async () => {
    try {
      setExecuting(true);
      setTableData(null);

      const response = await request(`/${pluginId}/execute`, {
        method: "POST",
        body: {
          code: code.replace(/(\r\n|\n|\r)/g, " "),
        },
      });

      toggleNotification({
        type: "success",
        message: {
          id: `${getTrad("notification.info.execute.success")}`,
        },
      });
      setTableData(response.response);
      console.log(response.response);
    } catch (err) {
      console.error(err);
      toggleNotification({
        type: "warning",
        message: {
          id: `${getTrad("notification.info.execute.error")}`,
        },
      });
    } finally {
      setExecuting(false);
    }
  };

  const getTableHeaders = (data) => {
    console.log(data);
    const headers = [];
    for (const dataKey in data) {
      headers.push(dataKey);
    }

    return headers;
  };

  const getTableRows = (data) => {
    const rows = [];
    data.forEach((d) => {
      const r = [];
      for (const dk in d) {
        r.push(d[dk]);
      }
      rows.push(r);
    });

    return rows;
  };

  const handleDownloadCSV = () => {
    let headersCsv = [];
    let rowsCsv = [];

    if (tableData.result[0]?.length) {
      const tableHeaders = getTableHeaders(tableData.result[0][0]);
      headersCsv = headersCsv.concat(tableHeaders);
      const tableRows = getTableRows(tableData.result[0]);
      rowsCsv = rowsCsv.concat(tableRows);
    }

    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}-${today.getHours()}h${today.getMinutes()}m${today.getSeconds()}`;
    const fileName = `export_query_strapi_sql_${formattedDate}.csv`;

    // Generate CSV content
    const csvHeader = headersCsv.join(",");
    const csvRows = rowsCsv.map(row => row.join(",")).join("\n");
    const csvContent = `${csvHeader}\n${csvRows}`;

    // Create a Blob object to keep special characters
    const blob = new Blob([ csvContent ], { type: "text/csv;charset=utf-8;" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element for downloading
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);

    // Add the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
          extensions={[ langs.sql() ]}
          theme={dracula}
          height="200px"
          value={code}
          options={{
            mode: "sql",
            theme: "dracula",
            lineNumbers: true,
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
        </div>
        <div style={{ overflow: "auto", margin: "24px 0px" }}>
          {tableData
            && <div className="raw-query_query">
              <Flex justifyContent="space-between" alignItems="center" paddingBottom={4}>
                <Badge>{tableData.result[0].length} Result{tableData.result[0].length > 1 ? "s" : ""}</Badge>

                <Button
                  variant="secondary"
                  onClick={handleDownloadCSV}
                  disabled={!tableData || !tableData.result[0]?.length}
                >
                  Export CSV
                </Button>
              </Flex>
              <Box>
                <Table>
                  <Thead>
                    <Tr>
                      {
                        getTableHeaders(tableData.result[0][0]).map((th, index) => {
                          return (
                            <Th style={{ padding: "16px", fontWeight: "bold" }} key={`th_${index}`}>
                              {th}
                            </Th>
                          );
                        })
                      }
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      getTableRows(tableData.result[0]).map((tr, index) => {
                        return (
                          <Tr key={`tr_${index}`}>
                            {
                              tr.map((td, index) => {
                                return (
                                  <Td style={{ padding: "16px" }} key={`td_${index}`}>
                                    {td}
                                  </Td>
                                );
                              })
                            }
                          </Tr>
                        );
                      })
                    }
                  </Tbody>
                </Table>
              </Box>
            </div>

          }
        </div>
      </ContentLayout>
    </div>
  );
}

export default memo(HomePage);
