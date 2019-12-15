## TabFieldset 字段组说明
使用 Tab 形式收集字段值，可制定 Tab 个数，见示例

## Usage
```
const fields = [
  {
    "name": "name",
    "control": "Input",
    "label": "Tab名称",
    "rules": {"required": true, "maxBytes": 12}
  },
  {
    "name": "image",
    "control": "ImageUpload",
    "label": "Tab页主图片",
    "rules": { "imageRequired": true },
    "tips": "图片尺寸：245x120，不超过20k，jpg格式。",
    "uploadRules": {
      "size": 20,
      "types": ["jpg"],
      "key": "109-tabList-image"
    }
  },
  {
    "name": "imageLink",
    "control": "Input",
    "label": "Tab主图片链接",
    "defaultValue": "http://",
    "rules": {"required": true, "url": true, "maxBytes": 256 }
  },
  {
    "name": "description",
    "control": "Input",
    "label": "Tab产品描述",
    "rules": {"required": true, "minBytes": 60, "maxBytes": 115}
  },
  {
    "name": "descriptionLink",
    "control": "Input",
    "label": "产品描述链接",
    "defaultValue": "http://",
    "rules": {"required": true, "url": true, "maxBytes": 256 }
  },
  {
    "name": "columnList",
    "fieldset": "ListFieldset",
    "length": 3,
    "fields": [
      {
        "name": "title",
        "control": "Input",
        "label": "栏目标题",
        "rules": { "required": true, "maxBytes": 50 }
      },
      {
        "name": "link",
        "control": "Input",
        "label": "栏目链接",
        "defaultValue": "http://",
        "rules": {"required": true, "url": true, "maxBytes": 256}
      }
    ]
  }
];

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
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
```

## API

### TabFieldset props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|name | string |  | 字段组名，用于存取字段组的值 |
|value | array |  | 字段组的值 |
|length | [array &#124; number]  |  | Tab 个数，可固定可变动 |
|numLabel | string |  | Tab个数标签文本，length为数组时有用 |
|fields | array |  | Tab所重复的字段json描述，json数组 |
|panelTitle | string |  | 折叠面板标题 |
|submit | bool | false | 是否可以分段保存提交 |