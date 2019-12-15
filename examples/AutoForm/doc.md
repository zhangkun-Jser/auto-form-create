## Usage
```
import React from 'react';
import AutoForm from '../../src/index';

const descriptor = [
  {
    "name": "title",
    "control": "RedWordInput",
    "label": "标题",
    "limiter": {"max": 24},
    "rules": {"required": true, "maxBytes":24}
  },
  {
    "name": "link",
    "control": "Input",
    "label": "链接",
    "defaultValue": "http://",
    "limiter": {"max": 512},
    "rules": {"url": true, "maxBytes":512}
  },
  {
    "name": "description",
    "control": "TextArea",
    "label": "描述",
    "limiter": {"max": 50},
    "rules": {"required": true, "maxBytes":50}
  },
  {
    "name": "descriptionLink",
    "control": "LinkTextArea",
    "label": "描述(带链接词)",
    "limiter": {"max": 50},
    "rules": {"required": true, "minBytes":30, "maxBytes":50}
  },
  {
    "name": "image",
    "control": "ImageUpload",
    "label": "图片",
    "rules": [
      {"required": true, "message": "请上传图片"}
    ],
    "uploadRules": {
      "size": 20,
      "types": ["png"],
      "key": "200x100"
    }
  },
  {
    "name": "date",
    "control": "DateTimeInput",
    "label": "日期",
    "rules": {"required": true}
  },
  {
    "name": "bgColor",
    "control": "RadioGroup",
    "label": "背景色",
    "rules": {"required": true},
    "defaultValue":"white",
    "options": [
      {"value": "black", "text": "黑色"},
      {"value": "white", "text": "白色"}
    ]
  },
  {
    "name": "color",
    "control": "Select",
    "label": "颜色",
    "rules": {"required": true},
    "defaultValue":"white",
    "options": [
      {"value": "black", "text": "黑色"},
      {"value": "white", "text": "白色"}
    ]
  }
];

class AutoFormDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <AutoForm
        onSubmit={this.handleSubmit}
        descriptor={this.state.descriptor}
      />
    );
  }
}

export default AutoFormDemo;

```

### AutoForm props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|labelWidth | number | 140 | 控制表单内字段左侧标签默认宽度 |
|descriptor | array |  | 表单项描述，是json数组 |
|data | object |  | 表单数据，是json对象，用于回填 |
|onSubmit | function |  | 表单提交回调 |

### 表单中的校验
表单中校验使用的是 [async-validator](https://github.com/yiminghe/async-validator)，可查阅相关文档。
表单 json配置中基本采用的是 以对象形式组织的校验规则。
可如下引入规则：
```
import { ValidateRules } from 'auto-form-create';
```

引入的规则如下：
```
{
  required: {required: true, whitespace: true, message: '请填写该必填项'},
  imageRequired: {required: true, message: '请上传图片'},
  url: {type: 'url', message: '请输入有效的url'},
  email: {type: 'email', message: '请输入有效的email地址'},
  date: {type: 'date', message: '请输入有效的日期'},
  number: {type: 'number', message: '请输入有效数字'},
  maxBytes: (num) => {
    return { maxBytes: num, message: `该项字节长度不能超过${num}字节`, validator: checkMaxBytes}
  },
  minBytes: (num) => {
    return { minBytes: num, message: `该项字节长度至少${num}字节`, validator: checkMinBytes}
  }
}
```
可按需要对规则进行扩展。