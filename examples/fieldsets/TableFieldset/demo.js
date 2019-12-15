import React from 'react';
import {Form, Fieldsets} from '../../../src/index';
const TableFieldset = Fieldsets.TableFieldset;

const headerFields = [
    {
        name: 'text',
        control: 'Input',
        label: '文本',
        rules: {required: true, minBytes: 4, maxBytes: [24, 16, 12]}
    }
];

const rowFields = [
    {
        name: 'text',
        control: 'Input',
        label: '文本',
        rules: {required: true, minBytes: 4, maxBytes: [24, 16, 12]}
    },
    {
        name: 'link',
        control: 'Input',
        label: '链接',
        defaultValue: 'http://',
        rules: {required: true, url: true, maxBytes: 1024}
    }
];

class Demo extends React.Component{
    constructor(props){
        super(props);
    }

  handleSubmit = (values) => {
      console.log(values);
  };

  render(){
      return (
          <Form onSubmit={this.handleSubmit}>
              <TableFieldset
                  name="table"
                  panelTitle="TableFieldset"
                  rowNum={[5]}
                  colNum={[3, 4, 5]}
                  headerFields={headerFields}
                  rowFields={rowFields}
              >
              </TableFieldset>
          </Form>
      );
  }
}

export default Demo;
