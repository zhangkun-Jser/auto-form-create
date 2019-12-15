## DateTimeInput 组件说明
用于输入日期和时间，鉴于广告投放系统中的需求，默认只能选今天以后

## DateTimeInput Usage
```jsx
class DateTimeInputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '2017-12-08 14:55:00'
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
        <DateTimeInput
          value={this.state.value}
          onChange={this.handleChange}
          showTime={true}
        />
      </div>
    );
  }
}
```

## API

### DateTimeInput props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|value | string |  | 输入框的值 |
|onChange | function |  | 输入值变化的回调 |
|disabled | boolean | false | 是否禁用状态 |
|showTime | boolean | true | 是否需要输入时间 |
|showDateInput | boolean | true | 日期选择区中是否可以输入 |
|disabledDate | function(current : 所选日期) : boolean | 默认只能选今天以后 | 禁用某些所选日期 |