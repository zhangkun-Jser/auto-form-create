import React from 'react';
import {Form, Fieldsets} from '../../../src/index';
const ListFieldset = Fieldsets.ListFieldset;

const fields = [
    {
        name: 'image',
        control: 'ImageUpload',
        label: '图片',
        rules: {imageRequired: true},
        uploadRules: {
            size: 100,
            types: ['png'],
            key: '750x320'
        }
    },
    {
        name: 'link',
        control: 'Input',
        label: '图片链接',
        defaultValue: 'http://',
        limiter: {max: 512},
        rules: {required: true, url: true, maxBytes: 512}
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
              <ListFieldset
                  name="imageList"
                  length={[2, 3, 4]}
                  numLabel="图片数"
                  panelTitle="ListFieldset"
                  fields={fields}
              >
              </ListFieldset>
          </Form>
      );
  }
}

export default Demo;
