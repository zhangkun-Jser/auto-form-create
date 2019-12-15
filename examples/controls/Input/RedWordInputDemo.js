import React from 'react';
import {Controls} from '../../../src/index';
const RedWordInput = Controls.RedWordInput;

class RedWordInputDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }

  handleChange = (value) => {
      this.setState({
          value: value
      });
  };

  render(){
      return (
          <div className="example">
              <RedWordInput
                  value={this.state.value}
                  limiter={{
                      max: 24
                  }}
                  onChange={this.handleChange}
              />
          </div>
      );
  }
}

export default RedWordInputDemo;
