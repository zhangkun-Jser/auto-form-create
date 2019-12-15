/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';


class Form extends React.Component{

    static propTypes = {
        // 字段标签宽度
        labelWidth: PropTypes.number,
        // 表单字段节点
        children: PropTypes.node,
        // 表单数据 json对象
        data: PropTypes.object,
        // 表单提交回调
        onSubmit: PropTypes.func,
    }

    static defaultProps = {
        labelWidth: 140,
        data: {},
    }

    constructor(props){
        super(props);
        // 关联的字段和字段组的实例
        this.refFields = {};
    }

    handleSubmit = (event) => {
        event && event.preventDefault();
        if(!this.validate()) return;

        if(this.props.onSubmit){
            const values = this.getValues();
            this.props.onSubmit(values);
        }
    };

    getValues = () => {
        const values = {};
        Object.keys(this.refFields).forEach((key) => {
            const value = this.refFields[key].getValue();
            Object.assign(values, {[key]: value, });
        });
        return values;
    };

    validate = () => {
        return Object.keys(this.refFields).reduce((suc, key) => {
            const valid = this.refFields[key].validate();
            return suc && valid;
        }, true);
    };

    render(){
        const {data, children, labelWidth, } = this.props;
        const fields = React.Children.map(children, (child) => {
            const {name, labelWidth: childLabelWidth, } = child.props;

            return React.cloneElement(child, {
                value: data[name],
                labelWidth: childLabelWidth || labelWidth,
                ref: (field) => {this.refFields[name] = field;},
            });
        });
        return (
            <form onSubmit={this.handleSubmit}>
                {fields}
                <div className="form-item">
                    <div className="item-con" style={{marginLeft: labelWidth + 10, }}>
                        <Button htmlType="submit">
              确定提交
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;
