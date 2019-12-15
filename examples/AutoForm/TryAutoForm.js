import React from 'react';
import AutoForm, {Controls} from '../../src/index';
import Button from '../../src/common/Button';
const TextArea = Controls.TextArea;

class TryAutoForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jsonStr: '',
            descriptor: null,
            error: null
        };
    }

  handleChange = (text) => {
      this.setState({
          descriptor: null,
          error: null,
          jsonStr: text
      });
  };

  tryAutoForm = () => {
      let descriptor = null;
      let error = null;
      try {
          descriptor = JSON.parse(this.state.jsonStr);
      } catch (err){
          error = 'json解析出错';
      }

      if(!!descriptor && !Array.isArray(descriptor)){
          error = '请检查文本框中输入的json数组';
      }
      if(error){
          this.setState({
              error
          });
      }else{
          this.setState({
              jsonStr: JSON.stringify(descriptor, null, 2),
              error: null,
              descriptor
          });
      }
  };

  render(){
      const descriptor = this.state.descriptor;
      const error = this.state.error;
      const result = !!descriptor || !!error;
      return (
          <div>
              <h4>在此输入表单Json描述：</h4>
              <div>
                  <TextArea
                      style={{width: '100%', height: '500px'}}
                      value={this.state.jsonStr}
                      onChange={this.handleChange}
                  />
              </div>
              <div style={{textAlign: 'center', margin: '10px auto'}}>
                  <Button onClick={this.tryAutoForm}>
            试一试
                  </Button>
              </div>
              <h4>表单：</h4>
              {
                  result ?
                      (<div style={{padding: 10, border: '1px solid #ccc'}}>
                          {
                              !error ?
                                  <AutoForm
                                      onSubmit={(values) => {console.log(values);}}
                                      descriptor={descriptor}
                                  /> : <p style={{color: '#c00'}}>{error}</p>
                          }
                      </div>) : null
              }
          </div>
      );
  }
}

export default TryAutoForm;


