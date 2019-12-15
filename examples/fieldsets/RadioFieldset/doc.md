## RadioFieldset 字段组说明
用于选择性地使用字段组，可根据 radio 切换字段的组合，见示例

## Usage
```
const optionFields = [
  {
    "option": {"value": "official", "text": "官网链接"},
    "fields": [
      {
        "name": "webLink",
        "control": "Input",
        "label": "官网链接",
        "defaultValue": "http://",
        "limiter": {"max": 512},
        "rules": {"required": true, "url": true}
      }
    ]
  },
  {
    "option": {"value": "download", "text": "下载链接"},
    "fields": [
      {
        "name": "iosLink",
        "control": "Input",
        "label": "ios下载链接",
        "defaultValue": "http://",
        "limiter": {"max": 512},
        "rules": {"required": true, "url": true}
      },
      {
        "name": "androidLink",
        "control": "Input",
        "label": "android下载链接",
        "defaultValue": "http://",
        "limiter": {"max": 512},
        "rules": {"required": true, "url": true}
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
```

## API

### RadioFieldset props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|name | string |  | 字段组名，用于存取字段组的值 |
|value | object |  | 字段组的值 |
|radioLabel | string |  | radio 字段标签 |
|radioValueKey | string | 'radioValue' | radio 字段名，用于存取radio 的值 |
|defaultRadio | string |  | radio 默认选中值 |
|optionFields | array |  | 字段组中字段json描述，json数组 |
|panelTitle | string |  | 折叠面板标题 |
|submit | bool | false | 是否可以分段保存提交 |