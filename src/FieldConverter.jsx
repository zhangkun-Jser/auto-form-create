import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import React from 'react';
import controls from './controls';
import fieldSets from './fieldsets';
import FormField from './FormField';
import { pick, omit, } from './common/utils';


export const FormFieldConverter = ({fieldRef, control, ...restProps}) => {
    const fieldPropKeys = [
        'name', 'label', 'labelWidth',
        'tips', 'required', 'rules', 'defaultValue', 'value', 'onChange',
    ];
    let fieldProps = pick(restProps, fieldPropKeys);
    const Control = controls[control];
    let controlProps = omit(restProps, fieldPropKeys);
    const controlsWithLimiter = ['Input', 'RedWordInput', 'TextArea', 'LinkTextArea', ];
    const {rules: {required, imageRequired, maxBytes, maxChars, maxBytesWithFilter, url, } = {}, } = fieldProps;

    // 自动根据校验规则补充输入的limiter
    if(maxBytes && controlsWithLimiter.indexOf(control) !== -1){
        controlProps.limiter = {
            max: maxBytes,
        };
    }
    else if(maxChars && controlsWithLimiter.indexOf(control) !== -1){
        controlProps.limiter = {
            type: 'char',
            max: maxChars,
        };
    }
    else if(maxBytesWithFilter && ['RedWordInput', 'LinkTextArea', ].indexOf(control) !== -1){
        controlProps.limiter = {
            max: maxBytesWithFilter,
        };
    }

    // 统一预处理各类组件的 require 属性
    if(required && control === 'RadioGroup'){
        fieldProps = {
            ...fieldProps,
            rules: {
                ...omit(fieldProps.rules, ['required', ]),
                radioGroupValueRequired: true,
            },
        };
    }
    else if(required && control === 'ImageUpload'){
        fieldProps = {
            ...fieldProps,
            rules: {
                ...omit(fieldProps.rules, ['required', ]),
                imageRequired: true,
            },
        };
    }
    // videoUpload.rules 可能为 Array，这里只处理 Object 的情况
    else if(isObject(fieldProps.rules) && !isArray(fieldProps.rules) && required && control === 'VideoUpload'){
        fieldProps = {
            ...fieldProps,
            rules: {
                ...omit(fieldProps.rules, ['required', ]),
                videoRequired: true,
            },
        };
    }

    // 处理 input 组件的 placeholder 属性
    if(url && control === 'Input'){
        controlProps = {
            ...controlProps,
            placeholder: 'https://',
        };
    }

    return (
        <FormField ref={fieldRef} required={required || imageRequired} {...fieldProps}>
            <Control {...controlProps} />
        </FormField>
    );
};

export const FieldsetConverter = ({fieldRef, fieldset, ...fieldsetProps}) => {
    const Fieldset = fieldSets[fieldset];
    return (
        <Fieldset ref={fieldRef} {...fieldsetProps} />
    );
};

const FieldConverter = (props) => {
    if('fieldset' in props){
        return <FieldsetConverter {...props} />;
    }
    if('control' in props){
        return <FormFieldConverter {...props} />;
    }
    return <p>无效的字段配置对象</p>;
};

export default FieldConverter;
