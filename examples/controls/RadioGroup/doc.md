## RadioGroup 组件说明
渲染出一组Radio 单选框。

## RadioGroup Usage
```
const options = [
  {"value": "black", "text": "黑色"},
  {"value": "white", "text": "白色"}
];

class RadioGroupDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'black'
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
        <RadioGroup
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

### RadioGroup props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|value | string |  | Radio单选的值 |
|options | [string &#124; object] |  | ['option1','options2']或者[{"value": "black", "text": "黑色"}] |
|onChange | function |  | 输入值变化的回调 |
|disabled | boolean | false | 是否禁用状态 |