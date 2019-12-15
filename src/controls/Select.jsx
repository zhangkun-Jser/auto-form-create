/**
 * author: KCFE
 * date: 2017/10/12
 * description: Select组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option, } from 'rc-select';

class Select extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {options, ...restProps} = this.props;
        let defaultValue = null;
        const optionComponents = options.map((option, index) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionText = typeof option === 'string' ? option : option.text;
            if(index === 0){
                defaultValue = optionValue;
            }
            return (
                <Option key={index} value={optionValue}>{optionText}</Option>
            );
        });
        if(!restProps.value){
            restProps.value = defaultValue;
        }
        return (
            <RcSelect style={{ width: 200, }} {...restProps} optionLabelProp="children">
                {optionComponents}
            </RcSelect>
        );
    }
}

Select.propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.string,
                text: PropTypes.string,
            }),
        ])
    ),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

Select.defaultProps = {
    disabled: false,
};

export default Select;
