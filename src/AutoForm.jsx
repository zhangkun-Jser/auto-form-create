/**
 * description: 自动生成组件的表单
 */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';

import Button from './common/Button';
import FieldConverter from './FieldConverter';


class AutoForm extends React.Component{

    static propTypes = {
        // 字段标签宽度
        labelWidth: PropTypes.number,
        // 表单项描述 json数组
        descriptor: PropTypes.arrayOf(PropTypes.object),
        // 表单数据 json对象
        data: PropTypes.object,
        // 表单提交回调
        onSubmit: PropTypes.func,
        // 内容变化回调
        onChange: PropTypes.func,
    }

    static defaultProps = {
        labelWidth: 140,
    }

    static getDerivedStateFromProps(nextProps){
        if('value' in nextProps){
            return {
                value: nextProps.value || [],
            };
        }
        return null;
    }

    constructor(props){
        super(props);
        this.state = {
            value: props.value || {},
        };

        // 关联的字段和字段组的实例
        this.refFields = {};
    }

    handleSubmit = (event) => {
        event && event.preventDefault();
        if(!this.validate()) return;

        const {onSubmit } = this.props;

        if(onSubmit){
            onSubmit(this.getValues());
        }
    }

    getValues = () => Object.keys(this.refFields)
        .reduce((acc, key) => ({...acc, [key]: this.refFields[key].getValue() }), {});

    validate = () => {
        return Object.keys(this.refFields)
            .reduce((suc, key) => this.refFields[key].validate() && suc, true);
    }

    render(){
        const {descriptor, labelWidth, onSubmit, onChange, context, children } = this.props;
        const {value = {} } = this.state;

        return <form onSubmit={this.handleSubmit}>
            {descriptor.map((item) => {
                const {name: itemName, submit } = item;
                const fieldProps = {
                    context,
                    labelWidth,
                    key: itemName,
                    ...item,
                    value: value[itemName],
                    fieldRef: (field) => (this.refFields[itemName] = field),
                    onSubmit: ('fieldset' in item) && submit && onSubmit,
                    onChange: (changedValue) => {
                        if(!('value' in this.props)){
                            this.setState({value: {...value, [itemName]: changedValue } });
                        }
                        if(onChange){
                            onChange({...value, [itemName]: changedValue });
                        }
                    },
                };
                return <FieldConverter {...fieldProps} />;
            })}
            {children
                ? children
                : <div className="form-item">
                    <div className="item-con" style={{ marginLeft: labelWidth + 10 }}>
                        <Button htmlType="submit">
                            确定提交
                        </Button>
                    </div>
                </div>}
        </form>;
    }
}

polyfill(AutoForm);

export default AutoForm;
