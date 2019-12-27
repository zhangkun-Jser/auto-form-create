/**
 * description: 按个数重复的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';

import FormField from '../FormField';
import FieldConverter from '../FieldConverter';
import Select, { Option } from 'rc-select';
import Collapse, { Panel } from 'rc-collapse';
import SubmitButton from '../common/SubmitButton';
import { flattenItemRules } from '../common/utils';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';

const getCurrentLength = props => {
    const { value = [], length } = props;

    if (typeof length === 'number') {
        return length;
    } else if (Array.isArray(value) && !isEmpty(value)) {
        return value.length;
    } else if (Array.isArray(length)) {
        return length[0];
    } else {
        throw new Error('unexpected length type in props');
    }
};

class ListFieldset extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        numLabel: PropTypes.string,
        length: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.array.isRequired]),
        value: PropTypes.any,
        fields: PropTypes.array,
        // 折叠面板标题
        panelTitle: PropTypes.string,
        // 是否可以分段保存提交
        submit: PropTypes.bool,
    };

    static defaultProps = {
        labelWidth: 140,
        submit: false,
    };

    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            const { length, value } = nextProps;
            return {
                value: value || [],
                // 仅当长度为 数字时才硬性指定
                ...(typeof length === 'number' ? { currentLength: length } : null),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            currentLength: getCurrentLength(props),
            activePanelKey: '0',
            value: props.value || [],
        };
        // 字段组关联的字段实例
        this.refFields = {};
    }

    validate = () => {
        const { currentLength } = this.state;
        const isValid = range(currentLength).reduce((acc, index) => {
            const groupFields = this.refFields[index];
            return Object.keys(groupFields).reduce((suc, key) => groupFields[key].validate() && suc, true) && acc;
        }, true);

        if (!isValid) {
            this.setState({ activePanelKey: '0' });
        }
        return isValid;
    };

    getValue = () => {
        const { currentLength } = this.state;

        return range(currentLength).map(index => {
            const groupFields = this.refFields[index];
            return Object.keys(groupFields).reduce((acc, key) => ({ ...acc, [key]: groupFields[key].getValue() }), {});
        });
    };

    renderSelectField = () => {
        const { currentLength } = this.state;
        const { length, numLabel } = this.props;

        return Array.isArray(length) ? (
            <FormField
                label={numLabel}
                value={currentLength + ''}
                onChange={currentLength => {
                    this.setState({
                        currentLength,
                        activeTabKey: 0,
                    });
                }}
            >
                <Select style={{ width: 100 }}>
                    {length.map(tabLength => (
                        <Option key={tabLength} value={tabLength}>
                            {tabLength}
                        </Option>
                    ))}
                </Select>
            </FormField>
        ) : // 固定长度的 不显示长度选择控件
            null;
    };

    handleSubmit = () => {
        if (!this.validate()) return;

        const { onSubmit, name: itemName } = this.props;

        if (onSubmit) {
            onSubmit({
                [itemName]: this.getValue(),
            });
        }
    };

    render() {
        const { currentLength, value } = this.state;
        const { context, labelWidth, submit, panelTitle, fields, onChange, length } = this.props;
        // 所选 length 在数组中的下标
        // 这里实现了一些特殊的业务逻辑，当 tab 的子组件的 rules 字段为数组时，则根据 tab 个数来觉得取得哪个 rules 的值
        // 这个逻辑是为了解决以下场景的需要，例如要显示一个表格，当列数为 3 时则表头字数限制为 24，当列数为 4 时，则字数限制为 18
        const ruleIndex = Array.isArray(length) ? length.indexOf(currentLength) : 0;
        const listIndexList = range(currentLength);
        const listGroups = listIndexList.map(listIndex => {
            const groupValue = value[listIndex] || {};

            return fields.map(item => {
                const { name: itemName, label } = item;
                const fieldProps = flattenItemRules(item, ruleIndex);

                return (
                    <FieldConverter
                        labelWidth={labelWidth}
                        context={context}
                        {...fieldProps}
                        key={`${itemName}-${listIndex}`}
                        label={label + (listIndex + 1)}
                        value={groupValue[itemName]}
                        fieldRef={field => {
                            if (!this.refFields[listIndex]) {
                                this.refFields[listIndex] = {};
                            }
                            this.refFields[listIndex][itemName] = field;
                        }}
                        onChange={changedValue => {
                            const updater = state => ({
                                value: listIndexList.map(index => {
                                    const value = state.value[index] || {};
                                    return index === listIndex ? { ...value, [itemName]: changedValue } : value;
                                }),
                            });

                            if (!('value' in this.props)) {
                                this.setState(updater);
                            }
                            if (onChange) {
                                onChange(updater(this.state).value);
                            }
                        }}
                    />
                );
            });
        });
        const fieldset = (
            <div>
                {this.renderSelectField()}
                {listGroups}
                {submit && <SubmitButton onClick={this.handleSubmit} labelWidth={labelWidth} />}
            </div>
        );

        return panelTitle ? (
            <Collapse
                activeKey={this.state.activePanelKey}
                onChange={activePanelKey => {
                    this.setState({ activePanelKey });
                }}
            >
                <Panel header={panelTitle}>{fieldset}</Panel>
            </Collapse>
        ) : (
            fieldset
        );
    }
}

polyfill(ListFieldset);

export default ListFieldset;
