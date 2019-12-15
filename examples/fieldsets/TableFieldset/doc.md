## TableFieldset 字段组说明
用于收集 Table 样式物料数据的字段组，类似 TabFieldset，只是行列可变，第一个Tab 字段与其他Tab不同，适用性不强，见示例

## Usage
```
const TableFieldset = Fieldsets.TableFieldset;

const headerFields = [
  {
    "name": "text",
    "control": "Input",
    "label": "文本",
    "rules": {"required": true, "minBytes": 4, "maxBytes": [24,16,12]}
  }
];

const rowFields = [
  {
    "name": "text",
    "control": "Input",
    "label": "文本",
    "rules": {"required": true, "minBytes": 4, "maxBytes": [24,16,12]}
  },
  {
    "name": "link",
    "control": "Input",
    "label": "链接",
    "defaultValue": "http://",
    "rules": {"required": true, "url": true, "maxBytes": 1024}
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
        <TableFieldset
          name="table"
          panelTitle="TableFieldset"
          rowNum={[5]}
          colNum={[3,4,5]}
          headerFields={headerFields}
          rowFields={rowFields}
        >
        </TableFieldset>
      </Form>
    );
  }
}
```

## API

### TableFieldset props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|name | string |  | 字段组名，用于存取字段组的值 |
|value | object |  | 字段组的值 |
|rowNum | array |  | 表格行数可变的值 |
|colNum | array |  | 表格列数可变的值 |
|headerFields | array |  | 第一行Tab中字段json描述，对应表头，json数组 |
|rowFields | array |  | 表格其他行字段组的json描述，json数组 |
|panelTitle | string |  | 折叠面板标题 |
|submit | bool | false | 是否可以分段保存提交 |