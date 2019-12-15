import React from 'react';
import {Controls} from '../../../src/index';
const RadioGroup = Controls.RadioGroup;

const options = [
    {value: 'black', text: '黑色'},
    {value: 'white', text: '白色'}
];

class RadioGroupDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'black'
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
              <RadioGroup
                  options={options}
                  value={this.state.value}
                  onChange={this.handleChange}
              />
          </div>
      );
  }
}

export default RadioGroupDemo;
