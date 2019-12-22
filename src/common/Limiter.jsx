/**
 * description: 字数倒计
 */
import React from 'react';
import PropTypes from 'prop-types';
import {getStrBytes, trim, filterSymbol, } from './utils';


class Limiter extends React.Component{
    getLength = (str)=> {
        const type = this.props.type;
        let length = 0;
        if(type === 'char'){
            length = str.length;
        }else if(type === 'byte'){
            length = getStrBytes(str);
        }
        return length;
    };

    render(){
        const {type, inputValue, max, style, } = this.props;
        let str = trim(inputValue);
        if(this.props.filterSymbol){
            str = filterSymbol(str);
        }
        const currentLen = this.getLength(str);
        return (
            <span className={currentLen > max ? 'rc-limiter rc-limiter-red' : 'rc-limiter rc-limiter-gray'} style={style}>
                {currentLen} / {max} {type === 'char' ? '字符' : '字节'}
            </span>
        );
    }
}

Limiter.propTypes = {
    type: PropTypes.oneOf(['char', 'byte', ]),
    filterSymbol: PropTypes.bool,
    max: PropTypes.number.isRequired,
    inputValue: PropTypes.string.isRequired,
};

Limiter.defaultProps = {
    type: 'byte',
    filterSymbol: false,
};

export default Limiter;
