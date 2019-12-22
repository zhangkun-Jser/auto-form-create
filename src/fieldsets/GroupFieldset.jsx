/**
 * description: 组合结构的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill, } from 'react-lifecycles-compat';

import Collapse, { Panel, } from 'rc-collapse';
import FieldConverter from '../FieldConverter';
import SubmitButton from '../common/SubmitButton';


class GroupFieldset extends React.Component{
    static propTypes = {
        // 字段组名
        name: PropTypes.string.isRequired,
        // 字段组的值
        value: PropTypes.any,
        // 字段组中字段的json描述
        fields: PropTypes.array,
        // 折叠面板标题
        panelTitle: PropTypes.string,
        // 是否可以分段保存提交
        submit: PropTypes.bool,
    }

    static defaultProps = {
        labelWidth: 140,
        submit: false,
    }

    constructor(props){
        super(props);
        this.state = {
            activePanelKey: '0',
            value: props.value || {},
        };
        // 字段组关联的字段实例
        this.refFields = {};
    }

    static getDerivedStateFromProps(nextProps){
        if('value' in nextProps){
            return {
                value: nextProps.value || {},
            };
        }
        return null;
    }

    validate = () => {
        const resValid = Object.keys(this.refFields).reduce((suc, key) => {
            const valid = this.refFields[key].validate();
            return suc && valid;
        }, true);
        if(!resValid){
            this.setState({
                activePanelKey: '0',
            });
        }
        return resValid;
    };

    getValue = () => {
        return Object.keys(this.refFields).reduce(
            (acc, key) => ({...acc, [key]: this.refFields[key].getValue(), }),
            {}
        );
    }

    handleSubmit = () => {
        if(!this.validate()) return;

        const {onSubmit, name: itemName, } = this.props;

        if(onSubmit){
            onSubmit({
                [itemName]: this.getValue(),
            });
        }
    }

    render(){
        const {labelWidth, panelTitle, submit, fields, context, onChange, } = this.props;
        const {value, activePanelKey, } = this.state;
        const fieldsComponents = fields.map((item) => {
            const {name: itemName, } = item;

            return <FieldConverter
                context={context}
                labelWidth={labelWidth}
                {...item}
                key={itemName}
                value={value[itemName]}
                fieldRef={(field) => {
                    if(field){
                        this.refFields[itemName] = field;
                    }else{
                        delete this.refFields[itemName];
                    }
                }}
                onChange={(changedValue) => {
                    const updater = (state) => ({
                        value: {...state.value, [itemName]: changedValue, },
                    });
                    if(!('value' in this.props)){
                        this.setState(updater);
                    }
                    if(onChange){
                        onChange(updater(this.state).value);
                    }
                }}
            />;
        });
        const fieldset = <div>
            {fieldsComponents}
            {submit && <SubmitButton onClick={this.handleSubmit} labelWidth={labelWidth} />}
        </div>;

        return panelTitle
            ? <Collapse
                activeKey={activePanelKey}
                onChange={(activePanelKey) => {
                    this.setState({ activePanelKey, });
                }}
            >
                <Panel header={panelTitle}>
                    {fieldset}
                </Panel>
            </Collapse>
            : fieldset;
    }
}

polyfill(GroupFieldset);

export default GroupFieldset;
