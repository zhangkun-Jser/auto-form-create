/**
 * author: KCFE
 * date: 2018/01/08
 * description: 内容为Tab形式的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill, } from 'react-lifecycles-compat';

import FormField from '../FormField';
import FieldConverter from '../FieldConverter';
import SubmitButton from '../common/SubmitButton';
import {flattenItemRules, } from '../common/utils';
import Collapse, { Panel, } from 'rc-collapse';
import Select, { Option, } from 'rc-select';
import Tabs, { TabPane, } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';


class TabFieldset extends React.Component{

    static propTypes = {
        // 字段组名
        name: PropTypes.string.isRequired,
        // Tab 个数标签文本
        numLabel: PropTypes.string,
        // Tab 内字段组的 json 描述
        fields: PropTypes.array,
        // Tab 个数，可固定可变动
        length: PropTypes.oneOfType([
            PropTypes.number.isRequired,
            PropTypes.array.isRequired,
        ]),
        // 字段组的值
        value: PropTypes.any,
        // 折叠面板标题
        panelTitle: PropTypes.string,
        // 是否可以分段保存提交
        submit: PropTypes.bool,
    }

    static defaultProps = {
        numLabel: 'Tab个数',
        labelWidth: 140,
        submit: false,
    }

    // todo: 处理 length 变化
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
        const {value = [], length, } = this.props;
        let currentLength;
        if(Array.isArray(value) && !isEmpty(value)){
            currentLength = value.length;
        }
        else if(Array.isArray(length)){
            currentLength = length[0];
        }
        else if(typeof length === 'number'){
            currentLength = length;
        }
        else{
            throw new Error('unexpected length type in props');
        }
        this.state = {
            currentLength,
            activePanelKey: '0',
            activeTabKey: 0,
            value,
        };
        // 字段组关联的字段实例
        this.refFields = {};
    }

    validate = () => {
        const {currentLength, } = this.state;
        let resValid = true;
        let firstErrorTabIndex = null;
        for(let i = 0; i < currentLength; i++){
            const tabFields = this.refFields[i];
            let tabValid = Object.keys(tabFields).reduce((suc, key) => {
                const valid = tabFields[key].validate();
                return suc && valid;
            }, true);
            if(firstErrorTabIndex === null && !tabValid){
                firstErrorTabIndex = i;
            }
            resValid = resValid && tabValid;
        }
        if(!resValid){
            this.setState({
                activePanelKey: '0',
                // todo: rename activeTabKey to activeTabIndex
                activeTabKey: firstErrorTabIndex,
            });
        }
        return resValid;
    }

    getValue = () => {
        const {currentLength, } = this.state;

        return range(currentLength).map((index) => {
            const tabFields = this.refFields[index];
            return Object.keys(tabFields)
                .reduce((acc, key) => ({...acc, [key]: tabFields[key].getValue(), }), {});
        });
    }

    renderSelectField = () => {
        const {currentLength, } = this.state;
        const {length, numLabel, } = this.props;

        return Array.isArray(length)
            ?  <FormField
                label={numLabel}
                value={currentLength + ''}
                onChange={(currentLength) => {
                    this.setState({
                        currentLength,
                        activeTabKey: 0,
                    });
                }}
            >
                <Select style={{ width: 100, }}>
                    {length.map((tabLength) =>
                        <Option key={tabLength} value={tabLength}>{tabLength}</Option>
                    )}
                </Select>
            </FormField>
            // 固定长度的 tab 不显示长度选择控件
            : null;
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
        const {fields, context, labelWidth, submit, panelTitle, onChange, length, } = this.props;
        const {value, activePanelKey, activeTabKey, currentLength, } = this.state;
        // 所选tab 个数在数组中的下标
        // 这里实现了一些特殊的业务逻辑，当 tab 的子组件的 rules 字段为数组时，则根据 tab 个数来觉得取得哪个 rules 的值
        // 这个逻辑是为了解决以下场景的需要，例如要显示一个表格，当列数为 3 时则表头字数限制为 24，当列数为 4 时，则字数限制为 18
        const ruleIndex = Array.isArray(length)
            ? length.indexOf(currentLength)
            : 0;
        const tableIndexList = range(currentLength);
        const tabPanels = tableIndexList.map((tabIndex) => {
            const tabValue = value[tabIndex] || {};

            return <TabPane
                key={tabIndex}
                tab={`Tab ${tabIndex + 1}`}
                style={{padding: '10px 0', maxHeight: '500px', }}
                // 禁用懒加载，否则没法校验未渲染的组件
                forceRender
            >
                {/* render tabItems */}
                {fields.map((item) => {
                    const {name: itemName, } = item;
                    const fieldProps = flattenItemRules(item, ruleIndex);

                    return <FieldConverter
                        context={context}
                        labelWidth={labelWidth}
                        {...fieldProps}
                        key={itemName}
                        value={tabValue[itemName]}
                        fieldRef={(field) => {
                            if(!this.refFields[tabIndex]){
                                this.refFields[tabIndex] = {};
                            }
                            this.refFields[tabIndex][itemName] = field;
                        }}
                        onChange={(changedValue) => {
                            const updater = (state) => ({
                                value: tableIndexList.map((index) => {
                                    const value = state.value[index] || {};
                                    return index === tabIndex
                                        ? {...value, [itemName]: changedValue, }
                                        : value;
                                }),
                            });
                            if(!('value' in this.props)){
                                this.setState(updater);
                            }
                            if(onChange){
                                onChange(updater(this.state).value);
                            }
                        }}
                    />;
                })}
            </TabPane>;
        });

        const fieldset = (
            <div>
                {this.renderSelectField()}
                <Tabs
                    activeKey={activeTabKey + ''}
                    onChange={(activeTabKey) => {
                        this.setState({activeTabKey, });
                    }}
                    renderTabBar={()=><ScrollableInkTabBar />}
                    renderTabContent={()=><TabContent animated={false} />}
                    style={{border: '2px solid #f3f3f3', margin: '10px 0 20px', }}
                >
                    {tabPanels}
                </Tabs>
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

polyfill(TabFieldset);

export default TabFieldset;
