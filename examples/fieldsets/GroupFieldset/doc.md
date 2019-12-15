## GroupFieldset 字段组说明
用于将多个字段组合，字段的值组合为一个对象，成为该字段组的值，见示例

## Usage
```
const fields = [
  {
    "name": "text",
    "control": "Input",
    "label": "品牌文字",
    "required": false,
    "limiter": {"max": 12},
    "rules": {"maxBytes": 12}
  },
  {
    "name": "link",
    "control": "Input",
    "label": "品牌链接",
    "required": false,
    "defaultValue": "http://",
    "limiter": {"max": 512},
    "rules": {"url": true, "maxBytes": 512}
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
```

## API

### GroupFieldset props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|name | string |  | 字段组名，用于存取字段组的值 |
|value | object |  | 字段组的值 |
|fields | array |  | 字段组中字段的json描述，json数组 |
|panelTitle | string |  | 折叠面板标题 |
|submit | bool | false | 是否可以分段保存提交 |