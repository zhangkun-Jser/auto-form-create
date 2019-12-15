import React from 'react';
import {Form, FormField, Controls, ValidateRules} from '../../src/index.jsx';


class FormDemo extends React.Component{
    constructor(props){
        super(props);
    }

  handleSubmit = (values) => {
      console.log(values);
  };

  render(){
      return (
          <Form onSubmit={this.handleSubmit}>
              <FormField
                  name="title"
                  label="标题"
                  tips="标题中可以插入标红词"
                  rules={[
                      ValidateRules.required, ValidateRules.maxBytesWithFilter(24)
                  ]}
              >
                  <Controls.RedWordInput limiter={{max: 24}} />
              </FormField>

              <FormField
                  name="link"
                  label="链接"
                  defaultValue="http://"
                  rules={[
                      ValidateRules.url, ValidateRules.maxBytes(512)
                  ]}
              >
                  <Controls.Input limiter={{max: 512}} />
              </FormField>

              <FormField
                  name="description"
                  label="描述"
                  rules={[
                      ValidateRules.required, ValidateRules.maxBytes(50)
                  ]}
              >
                  <Controls.TextArea limiter={{max: 50}} />
              </FormField>

              <FormField
                  name="descriptionLink"
                  label="描述(带链接词)"
                  rules={[
                      ValidateRules.required, ValidateRules.maxBytesWithFilter(50), ValidateRules.minBytesWithFilter(30)
                  ]}
              >
                  <Controls.LinkTextArea limiter={{max: 50}} />
              </FormField>

              <FormField
                  name="image"
                  label="图片"
                  rules={[
                      {required: true, message: '请上传图片'}
                  ]}
              >
                  <Controls.ImageUpload uploadRules={{size: 20, types: ['png'], key: '200x100'}} />
              </FormField>

              <FormField
                  name="date"
                  label="日期"
                  rules={[
                      ValidateRules.required
                  ]}
              >
                  <Controls.DateTimeInput />
              </FormField>

              <FormField
                  name="bgColor"
                  label="背景色"
                  defaultValue="black"
                  rules={[
                      ValidateRules.required
                  ]}
              >
                  <Controls.RadioGroup
                      options={[
                          {value: 'black', text: '黑色'},
                          {value: 'white', text: '白色'}
                      ]}
                  />
              </FormField>

              <FormField
                  name="color"
                  label="颜色"
                  defaultValue="white"
                  rules={[
                      ValidateRules.required
                  ]}
              >
                  <Controls.Select
                      options={[
                          {value: 'black', text: '黑色'},
                          {value: 'white', text: '白色'}
                      ]}
                  />
              </FormField>
          </Form>
      );
  }
}

export default FormDemo;
