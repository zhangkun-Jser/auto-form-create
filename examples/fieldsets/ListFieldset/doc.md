## ListFieldset 字段组说明
用于输入多组重复性的字段，可制定重复次数，见示例

## Usage
```
const fields = [
  {
    "name": "image",
    "control": "ImageUpload",
    "label": "图片",
    "rules": {"imageRequired": true},
    "uploadRules": {
      "size": 100,
      "types": ["png"],
      "key": "750x320"
    }
  },
  {
    "name": "link",
    "control": "Input",
    "label": "图片链接",
    "defaultValue": "http://",
    "limiter": {"max": 512},
    "rules": {"required": true, "url": true, "maxBytes": 512}
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
        <ListFieldset
          name="imageList"
          length={[2,3,4]}
          numLabel="图片数"
          panelTitle="ListFieldset"
          fields={fields}
        >
        </ListFieldset>
      </Form>
    );
  }
}
```

## API

### ListFieldset props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|name | string |  | 字段组名，用于存取字段组的值 |
|value | array |  | 字段组的值 |
|length | [array &#124; number]  |  | 字段重复次数，若为数组，则可按数组内次数选择变化 |
|numLabel | string |  | 个数选择标签，length为数组时有用 |
|fields | array |  | 字段组所重复的字段json描述，json数组 |
|panelTitle | string |  | 折叠面板标题 |
|submit | bool | false | 是否可以分段保存提交 |