/**
 * author: KCFE
 * date: 2017/10/12
 * description: 文本输入
 */
import React from 'react';
import { polyfill, } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Limiter from '../common/Limiter';


class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.value || '',
        };
    }

    static getDerivedStateFromProps(nextProps){
        if('value' in nextProps){
            return {
                value: nextProps.value || '',
            };
        }
        return null;
    }

    handleChange = ({target: {value, }, }) => {
        const {onChange, } = this.props;
        if(!('value' in this.props)){
            this.setState({ value, });
        }
        if(onChange){
            onChange(value);
        }
    };

    render(){
        const {style, className, disabled, limiter, inputRef, placeholder, } = this.props;
        const {value, } = this.state;
        return (
            <span>
                <input
                    type="text"
                    className={classNames('rc-input', className)}
                    style={style}
                    value={value}
                    onChange={this.handleChange}
                    disabled={disabled}
                    ref={inputRef}
                    placeholder={placeholder}
                />
                {limiter ?
                    <Limiter
                        type={limiter.type || 'byte'}
                        max={limiter.max}
                        filterSymbol={limiter.filterSymbol}
                        inputValue={this.state.value || ''}
                    />
                    : null
                }
            </span>
        );
    }
}

Input.propTypes = {
    value: PropTypes.string,
    limiter: PropTypes.shape({
        type: PropTypes.string,
        max: PropTypes.number,
        filterSymbol: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    inputRef: PropTypes.func,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    disabled: false,
};

polyfill(Input);

export default Input;
