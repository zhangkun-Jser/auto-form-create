/**
 * description: 单项表单项,负责传值和校验
 */
import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';
import ValidateRules from './common/validateRules';

/**
 * 将json配置中校验规则转化为校验规则对象数组
 * @param rules
 * @returns {*}
 */
const getValidateRules = (rules) => {
    if(Array.isArray(rules)){
        return rules;
    }
    return Object.keys(rules).map((key) => {
        const arg = rules[key];
        if(arg === true){
            return ValidateRules[key];
        }
        return ValidateRules[key](arg);
    });
};

class FormField extends React.Component{
    constructor(props){
        super(props);
        const {value, defaultValue, rules, name: itemName, } = props;
        this.state = {
            value: value === undefined ? defaultValue : value,
            errors: null,
        };
        if(rules){
            this.validator = new Validator({
                [itemName]: getValidateRules(rules),
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value !== undefined && nextProps.value !== null){
            this.setState({
                value: nextProps.value,
            });
        }
    }

    handleChange = (value) => {
        const {onChange, } = this.props;
        this.validate(value);
        this.setState({ value, });
        if(onChange){
            onChange(value);
        }
    };

    validate = (value = this.state.value) => {
        const {name, } = this.props;
        let result = true;
        this.validator && this.validator.validate({[name]: value, }, (errors) => {
            if(errors){
                result = false;
            }
            this.setState({ errors, });
        });
        return result;
    };

    getValue = () => {
        return this.state.value;
    };

    render(){
        const {value, errors, } = this.state;
        const {labelWidth, tips, children, required, label, } = this.props;
        const childProps = {
            value,
            onChange: this.handleChange,
            className: errors ? 'error-control' : '',
        };

        return (
            <div className="form-item">
                <label className="item-label" style={{width: labelWidth, }}>
                    {required && <em className="red-star">*</em>}
                    {label}：
                </label>
                <div className="item-con" style={{marginLeft: labelWidth + 10, }}>
                    {React.cloneElement(children, childProps)}
                    {tips && <p className="form-item-tips">{tips}</p>}
                    {errors && <p className="form-validator-error">{errors[0].message}</p>}
                </div>
            </div>
        );
    }
}

FormField.propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string,
    labelWidth: PropTypes.number,
    name: PropTypes.string,
    tips: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    required: PropTypes.bool,
    rules: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    onChange: PropTypes.func,
};

FormField.defaultProps = {
    labelWidth: 140,
};

export default FormField;
