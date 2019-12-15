import React from 'react';
import {Controls} from '../../../src/index';
const Select = Controls.Select;

const options = [
    {value: 'black', text: '黑色'},
    {value: 'white', text: '白色'}
];

class SelectDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'white'
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
              <Select
                  options={options}
                  value={this.state.value}
                  onChange={this.handleChange}
              />
          </div>
      );
  }
}

export default SelectDemo;
