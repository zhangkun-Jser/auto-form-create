import React from 'react';
import {Form, Fieldsets} from '../../../src/index';
const RadioFieldset = Fieldsets.RadioFieldset;

const optionFields = [
    {
        option: {value: 'official', text: '官网链接'},
        fields: [
            {
                name: 'webLink',
                control: 'Input',
                label: '官网链接',
                defaultValue: 'http://',
                limiter: {max: 512},
                rules: {required: true, url: true}
            }
        ]
    },
    {
        option: {value: 'download', text: '下载链接'},
        fields: [
            {
                name: 'iosLink',
                control: 'Input',
                label: 'ios下载链接',
                defaultValue: 'http://',
                limiter: {max: 512},
                rules: {required: true, url: true}
            },
            {
                name: 'androidLink',
                control: 'Input',
                label: 'android下载链接',
                defaultValue: 'http://',
                limiter: {max: 512},
                rules: {required: true, url: true}
            }
        ]
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
              <RadioFieldset
                  name="buttonLink"
                  radioLabel="按钮链接"
                  defaultRadio="download"
                  panelTitle="RadioFieldset"
                  optionFields={optionFields}
              >
              </RadioFieldset>
          </Form>
      );
  }
}

export default Demo;
