import React from 'react';
import {Controls} from '../../../src/index';
const DateTimeInput = Controls.DateTimeInput;

class DateTimeInputDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '2017-12-08 14:55:00'
        };
    }

  handleChange = (value) => {
      this.setState({
          value: value
      });
      console.log(value);
  };

  render(){
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

export default DateTimeInputDemo;
