## Select 组件说明
与 `RadioGroup` 类似，方便根据 json 渲染出简单的 select 组件。

## Select Usage
```
const options = [
  {"value": "black", "text": "黑色"},
  {"value": "white", "text": "白色"}
];

class SelectDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'white'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
    console.log(value);
  };

  render() {
    return (
      <div className="example">
        <Select
          options={options}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
```

## API

### Select props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|value | string |  | Radio单选的值 |
|options | [string &#124; object] |  | ['option1','options2']或者[{"value": "black", "text": "黑色"}] |
|onChange | function |  | 输入值变化的回调 |
|disabled | boolean | false | 是否禁用状态 |