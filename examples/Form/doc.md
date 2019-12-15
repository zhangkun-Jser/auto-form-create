## Usage
```
class FormDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormField
          name="title"
          label="标题"
          tips="标题中可以插入标红词"
          rules={[
            ValidateRules.required, ValidateRules.maxBytes(24)
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
            ValidateRules.required, ValidateRules.maxBytes(50), ValidateRules.minBytes(30)
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
              {"value": "black", "text": "黑色"},
              {"value": "white", "text": "白色"}
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
              {"value": "black", "text": "黑色"},
              {"value": "white", "text": "白色"}
            ]}
          />
        </FormField>
      </Form>
    );
  }
}
```
## Form 与 FormField 组件说明
FormField 组件用于统一封装表单的单个字段，控制单个字段的显示，字段值的传递与校验，其子组件为Controls中的输入控件。
是表单组件中的核心组件。

Form 组件用于非自动表单实现，与FormField 组件配合使用，该组件非自动表单必要内容。

## API

### FormField props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|children | element |  | 子组件，为Controls中的某个组件 |
|label | string |  | 字段左侧标签 |
|labelWidth | number | 140 | 字段左侧标签宽度 |
|name | string |  | 字段名字，用于表单对应字段值 |
|tips | string |  | 字段输入提示语 |
|value | any |  | 字段值 |
|defaultValue | any |  | 字段默认值 |
|required | bool | true | 字段是否必需，必需则字段前面加星号 |
|rules | [array &#124; object]  |  | 字段校验规则，可用校验规则数组或对象，使用对象会将对象中的规则转化为校验数组 |
|onChange | function |  | 输入变化的回调 |

### Form props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|labelWidth | number | 140 | 控制表单内字段左侧标签默认宽度 |
|children | node |  | 表单字段节点 |
|data | object |  | 表单数据，是json对象，用于回填 |
|onSubmit | function |  | 表单提交回调 |
