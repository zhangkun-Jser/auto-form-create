## Upload 组件说明
这里的ImageUpload 和 VideoUpload 组件主要适用于广告系统物料表单中，因而有
一定的适用局限性。

## Upload Usage
```
class UploadDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValue: 'http://xx.png',
      videoValue: 'http://xx.mp4'
    }
  }

  handleChange1 = (value) => {
    this.setState({
      imageValue: value
    });
    console.log(value);
  };

  handleChange2 = (value) => {
    this.setState({
      videoValue: value
    });
    console.log(value);
  };

  render() {
    return (
      <div>
        <div className="example">
          <ImageUpload
            value={this.state.imageValue}
            uploadRules={{
              size: 2,
              types: ['png'],
              key: '200x100'
            }}
            onChange={this.handleChange1}
          />
        </div>

        <div className="example">
          <VideoUpload
            value={this.state.videoValue}
            uploadRules={{
              size: 2*1024,
              key: 'mp4'
            }}
            onChange={this.handleChange2}
          />
        </div>
      </div>
    );
  }
}
```

## Upload 设置默认上传接口
```
ImageUpload.defaultProps.action = 'material/upload/uploadImage.do';
VideoUpload.defaultProps.action = 'material/upload/uploadVideo.do';
```

## API

### （ImageUpload、VideoUpload） props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|value | string |  | 输入框的值，图片视频上传后返回的地址 |
|action | string |  | 上传接口 |
|uploadRules | object |  | 上传规则(size:上传文件大小，types:文件后缀类型，key:上传附加参数) |
|onChange | function |  | 输入框输入变化的回调 |
|disabled | boolean | false | 是否禁用状态 |