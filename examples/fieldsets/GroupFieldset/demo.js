import React from 'react';
import {Form, Fieldsets} from '../../../src/index';
const GroupFieldset = Fieldsets.GroupFieldset;

const fields = [
    {
        name: 'text',
        control: 'Input',
        label: '品牌文字',
        required: false,
        limiter: {max: 12},
        rules: {maxBytes: 12}
    },
    {
        name: 'link',
        control: 'Input',
        label: '品牌链接',
        required: false,
        defaultValue: 'http://',
        limiter: {max: 512},
        rules: {url: true, maxBytes: 512}
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
              <GroupFieldset
                  name="brand"
                  panelTitle="GroupFieldset"
                  fields={fields}
              >
              </GroupFieldset>
          </Form>
      );
  }
}

export default Demo;
