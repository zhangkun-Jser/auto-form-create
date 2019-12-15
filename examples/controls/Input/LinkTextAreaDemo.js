import React from 'react';
import {Controls} from '../../../src/index';
const LinkTextArea = Controls.LinkTextArea;

class LinkTextAreaDemo extends React.Component{
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
              <LinkTextArea
                  value={this.state.value}
                  limiter={{
                      max: 50
                  }}
                  onChange={this.handleChange}
              />
          </div>
      );
  }
}

export default LinkTextAreaDemo;
