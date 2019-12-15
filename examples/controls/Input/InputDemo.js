import React from 'react';
import {Controls} from '../../../src/index';
const Input = Controls.Input;

class InputDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'http://'
        };
    }

  handleChange = (value) => {
      this.setState({
          value: value
      });
  };

  render(){
      return (
          <div>
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
          </div>
      );
  }
}

export default InputDemo;
