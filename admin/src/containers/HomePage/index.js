/*
 *
 * HomePage
 *
 */
import '../../css/styles.css';
import React, {Component, memo} from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import pluginPkg from '../../../../package.json';

import getTrad from "../../utils/getTrad";

import {Button, InputSelect, PluginHeader, request} from "strapi-helper-plugin";
import Editor from "@monaco-editor/react";
import { JsonToTable } from "react-json-to-table";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'SELECT username FROM strapi_administrator LIMIT 1;\n' +
        'SELECT * FROM strapi_administrator LIMIT 1;\n' +
        'SELECT firstname, lastname FROM strapi_administrator LIMIT 1;',
      tableData: undefined,
    }
  }

  onMount = (editor, monaco) => {
    console.log('onMount', editor);
    editor.focus();
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    this.setState({
      code: newValue,
    });
  }

  executeQuery = async () => {
    try {
      this.setState({
        tableData: undefined,
      });

      const response = await request(`/${pluginId}/execute`, {
        method: 'POST',
        body: {
          code: this.state.code,
        },
      });

      strapi.notification.toggle({
        type: 'success',
        message: 'Query successfully executed',
      });

      console.log(response);

      this.setState({
        tableData: response.results,
      });
    } catch (err) {
      console.error(err);
      strapi.notification.toggle({
        type: 'warning',
        message: 'There was an error executing your query',
      });
    }
  }

  render() {
    let table;
    if (this.state.tableData) {
      table = this.state.tableData.map(data => {
        if (data.result.length) {
          return (
            <div style={{margin: '24px 0', overflow:'auto'}}>
              <p><b>Query:</b><br/><code>{data.query};</code></p>
              <JsonToTable
                json={data.result}
              />
            </div>
          )
        } else {
          return (
            <div style={{margin: '24px 0', textAlign:'center'}}>
              <p><b>Query:</b><br/><code>{data.query};</code></p>
              <p>No data to display</p>
            </div>
          )
        }
      });
    }

    return (
      <div className="container-fluid" style={{padding: "18px 30px"}}>
        <PluginHeader
          title={pluginPkg.strapi.name}
          description={pluginPkg.strapi.description}
        />
        <div style={{borderRadius: '0.3rem', overflow: 'hidden'}}>
          <Editor
            height="200px"
            theme="vs-dark"
            defaultLanguage="sql"
            options={{fontSize: '14px'}}
            defaultValue={this.state.code}
            onMount={this.onMount}
            onChange={this.onChange}
          />
        </div>
        <Button
          style={{margin: '12px 0'}}
          label={getTrad('button.execute')}
          primary={true}
          onClick={this.executeQuery}
        />
        {table}
      </div>
    );
  };
}

export default memo(HomePage)
