/**
 * description: 带radio可切换的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill, } from 'react-lifecycles-compat';

import FormField from '../FormField';
import RadioGroup from '../controls/RadioGroup';
import FieldConverter from '../FieldConverter';
import SubmitButton from '../common/SubmitButton';
import Collapse, { Panel, } from 'rc-collapse';
import findIndex from 'lodash/findIndex';


const getRadioValue = ({value, optionFields, radioValueKey, defaultRadio, }) => {
    if(value && value[radioValueKey]){
        return value;
    }
    else if(defaultRadio !== undefined){
        return {...value, [radioValueKey]: defaultRadio, };
    }
    else{
        return {...value, [radioValueKey]: optionFields[0].option.value, };
    }
};

class RadioFieldset extends React.Component{
    static propTypes = {
        // 字段组名
        name: PropTypes.string.isRequired,
        // 字段组的值
        value: PropTypes.any,
        // radio label
        radioLabel: PropTypes.string,
        // 用于存储选项值的字段名
        radioValueKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        defaultRadio: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        optionFields: PropTypes.arrayOf(PropTypes.shape({
            option: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.object.isRequired,
            ]),
            fields: PropTypes.any.isRequired,
        })),
        // 折叠面板标题
        panelTitle: PropTypes.string,
        // 是否可以分段保存提交
        submit: PropTypes.bool,
    }

    static defaultProps = {
        radioValueKey: 'radioValue',
        labelWidth: 140,
        submit: false,
    }

    constructor(props){
        super(props);

        this.state = {
            activePanelKey: '0',
            value: getRadioValue(props),
        };
        // 字段组关联的字段实例
        this.refFields = {};
    }

    static getDerivedStateFromProps(nextProps){
        if('value' in nextProps){
            return {
                value: getRadioValue(nextProps),
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
            this.setState({activePanelKey: '0', });
        }
        return resValid;
    };

    getValue = () => {
        return Object.keys(this.refFields)
            .reduce((acc, key) => ({...acc, [key]: this.refFields[key].getValue(), }), {});
    };

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
        const {context, labelWidth, submit, panelTitle, optionFields, radioLabel, radioValueKey, onChange, } = this.props;
        const {value, activePanelKey, } = this.state;
        const radioValue = value[radioValueKey];
        const radioIndex = findIndex(optionFields, ({option: {value, }, }) => value === radioValue);
        const selectedField = optionFields[radioIndex].fields || [];
        const fields = selectedField.map((item, index) => {
            const {name: itemName, } = item;

            return <FieldConverter
                labelWidth={labelWidth}
                context={context}
                {...item}
                key={`radio${radioIndex}-field${index}`}
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

        const fieldset = (
            <div>
                <FormField
                    labelWidth={labelWidth}
                    label={radioLabel}
                    value={radioValue}
                    ref={(field) => {
                        this.refFields[radioValueKey] = field;
                    }}
                    onChange={(radioValue) => {
                        const updater = (state) => ({
                            value: {...state.value, [radioValueKey]: radioValue, },
                        });
                        if(!('value' in this.props)){
                            this.setState(updater);
                        }
                        if(onChange){
                            onChange(updater(this.state).value);
                        }
                    }}
                >
                    <RadioGroup options={optionFields.map(({option, }) => option)} />
                </FormField>
                {fields}
                {submit && <SubmitButton onClick={this.handleSubmit} labelWidth={labelWidth} />}
            </div>
        );

        return panelTitle
            ? <Collapse
                activeKey={activePanelKey}
                onChange={(activePanelKey) => {
                    this.setState({activePanelKey, });
                }}
            >
                <Panel header={panelTitle}>
                    {fieldset}
                </Panel>
            </Collapse>
            : fieldset;
    }
}

polyfill(RadioFieldset);

export default RadioFieldset;
