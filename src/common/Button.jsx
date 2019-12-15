/**
 * author: KCFE
 * date: 2017/10/12
 * description: 按钮组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class Button extends React.Component{
    render(){
        const props = this.props;
        return (
            <button
                type={props.htmlType}
                className={classNames('rc-btn', props.className)}
                style={props.style}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        );
    }
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset', ]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    htmlType: 'button',
    disabled: false,
};

export default Button;