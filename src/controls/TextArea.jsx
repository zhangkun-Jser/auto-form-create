/**
 * description: 区块文本输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Limiter from '../common/Limiter';


class TextArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.value || '',
        };
    }

    componentWillReceiveProps(nextProps){
        if('value' in nextProps){
            this.setState({
                value: nextProps.value || '',
            });
        }
    }

    handleChange = (e) => {
        const { value, } = e.target;
        const {onChange, } = this.props;
        if(!('value' in this.props)){
            this.setState({ value, });
        }
        if(onChange){
            onChange(value);
        }
    };

    render(){
        const props = this.props;
        const {limiter, textRef, } = this.props;
        return (
            <span>
                <textarea
                    className={classNames('rc-textarea', props.className)}
                    style={props.style}
                    value={this.state.value}
                    onChange={this.handleChange}
                    disabled={props.disabled}
                    ref={textRef}
                />
                {limiter ?
                    <Limiter
                        style={{verticalAlign: 'top', }}
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

TextArea.propTypes = {
    value: PropTypes.string,
    limiter: PropTypes.shape({
        type: PropTypes.string,
        max: PropTypes.number,
        filterSymbol: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    textRef: PropTypes.func,
    onChange: PropTypes.func,
};

TextArea.defaultProps = {
    disabled: false,
};

export default TextArea;
