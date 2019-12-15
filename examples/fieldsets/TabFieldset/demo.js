import React from 'react';
import {Form, Fieldsets} from '../../../src/index';
const TabFieldset = Fieldsets.TabFieldset;

const fields = [
    {
        name: 'name',
        control: 'Input',
        label: 'Tab名称',
        rules: {required: true, maxBytes: 12}
    },
    {
        name: 'image',
        control: 'ImageUpload',
        label: 'Tab页主图片',
        rules: { imageRequired: true },
        tips: '图片尺寸：245x120，不超过20k，jpg格式。',
        uploadRules: {
            size: 20,
            types: ['jpg'],
            key: '109-tabList-image'
        }
    },
    {
        name: 'imageLink',
        control: 'Input',
        label: 'Tab主图片链接',
        defaultValue: 'http://',
        rules: {required: true, url: true, maxBytes: 256 }
    },
    {
        name: 'description',
        control: 'Input',
        label: 'Tab产品描述',
        rules: {required: true, minBytes: 60, maxBytes: 115}
    },
    {
        name: 'descriptionLink',
        control: 'Input',
        label: '产品描述链接',
        defaultValue: 'http://',
        rules: {required: true, url: true, maxBytes: 256 }
    },
    {
        name: 'columnList',
        fieldset: 'ListFieldset',
        length: 3,
        fields: [
            {
                name: 'title',
                control: 'Input',
                label: '栏目标题',
                rules: { required: true, maxBytes: 50 }
            },
            {
                name: 'link',
                control: 'Input',
                label: '栏目链接',
                defaultValue: 'http://',
                rules: {required: true, url: true, maxBytes: 256}
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
              <TabFieldset
                  name="tabList"
                  panelTitle="TabFieldset"
                  length={[3, 4, 5, 6]}
                  numLabel="中部Tab个数"
                  fields={fields}
              >
              </TabFieldset>
          </Form>
      );
  }
}

export default Demo;
