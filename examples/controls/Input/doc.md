## Input 组件说明
用于物料表单中的单行或多行输入，并可以包含字数倒计功能，以及包括系统中定制性的插入标红词和插入链接词两种特殊输入组件

## Input Usage
```
<div className="example">
  <Input
    value={this.state.value}
    limiter={{
      type: 'byte',
      max: 512
    }}
    onChange={this.handleChange}
  />
</div>
<div className="example">
  <Input
    limiter={{
      type: 'char',
      max: 10
    }}
    onChange={(value) => {console.log(value);}}
  />
</div>
<div className="example">
  <Input
    value="test"
    limiter={{
      type: 'char',
      max: 10
    }}
    disabled
  />
</div>
```

## TextArea Usage
```
  <div className="example">
    <TextArea
      value={this.state.value}
      limiter={{
        max: 30
      }}
      onChange={this.handleChange}
    />
  </div>
```

## RedWordInput Usage
```
  <div className="example">
    <RedWordInput
      value={this.state.value}
      limiter={{
        max: 24
      }}
      onChange={this.handleChange}
    />
  </div>
```

## LinkTextArea Usage
```
  <div className="example">
    <LinkTextArea
      value={this.state.value}
      limiter={{
        max: 50
      }}
      onChange={this.handleChange}
    />
  </div>
```

## API

### （Input、TextArea、RedWordInput、LinkTextArea） props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|value | string |  | 输入框的值 |
|limiter | object |  | 字节倒数限制 |
|disabled | boolean | false | 是否禁用状态 |
|onChange | function |  | 输入变化的回调 |

### Limiter props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|type | enum('char', 'byte') | 'byte' | 按字数或字节长度计数 |
|filterSymbol | boolean | false | 是否过滤特殊字符，不计数（用于插入标红词和插入链接词） |
|max | number |  | 最大长度 |
