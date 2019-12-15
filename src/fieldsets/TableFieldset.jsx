/**
 * author: KCFE
 * date: 2018/01/08
 * description: 收取Table数据的字段组
 * 字段组值的格式 value: {header:[], rows: []}
 */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill, } from 'react-lifecycles-compat';

import FormField from '../FormField';
import ListFieldset from './ListFieldset';
import SubmitButton from '../common/SubmitButton';
import {flattenItemRules, } from '../common/utils';
import Collapse, { Panel, } from 'rc-collapse';
import Select, { Option, } from 'rc-select';
import Tabs, { TabPane, } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import range from 'lodash/range';


class TableFieldset extends React.Component{
    static propTypes = {
        // 字段组名
        name: PropTypes.string.isRequired,
        // 字段组的值
        value: PropTypes.any,
        // 表格行数，列数
        rowNum: PropTypes.array,
        colNum: PropTypes.array,
        // 表头字段组的json描述
        headerFields: PropTypes.array,
        // 表格行字段组的json描述
        rowFields: PropTypes.array,
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
        let rowNum = props.rowNum, colNum = props.colNum;
        if(Array.isArray(props.rowNum)){
            rowNum = props.rowNum[0];
        }
        if(Array.isArray(props.colNum)){
            colNum = props.colNum[0];
        }
        if(props.value && Array.isArray(props.value.header)){
            colNum = props.value.header.length;
        }
        if(props.value && Array.isArray(props.value.rows)){
            rowNum = props.value.rows.length + 1;
        }
        this.state = {
            rowNum,
            colNum,
            activePanelKey: '0',
            activeTabKey: '0',
            value: props.value || {},
        };
        // 字段组关联的字段实例
        this.refFields = [];
    }

    // todo: 处理 length 变化
    static getDerivedStateFromProps(nextProps){
        if('value' in nextProps){
            return {
                value: nextProps.value || {},
            };
        }
        return null;
    }

    validate = () => {
        const {rowNum, } = this.state;

        let resValid = true;
        let errorTabIndex = null;
        for(let i = 0; i < rowNum; i++){
            let tabValid = this.refFields[i].validate();
            if(errorTabIndex === null && !tabValid){
                errorTabIndex = i;
            }
            resValid = resValid && tabValid;
        }
        if(!resValid){
            this.setState({
                activePanelKey: '0',
                activeTabKey: errorTabIndex + '',
            });
        }
        return resValid;
    };

    getValue = () => {
        const {rowNum, } = this.state;

        return range(rowNum).reduce((acc, index) => {
            const isHeader = index === 0;
            const value = this.refFields[index].getValue();

            return isHeader
                ? {...acc, header: value, }
                : {...acc, rows: [...(acc.rows || []), {cols: value, }, ], };
        }, {});
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
        const props = this.props;
        const {
            onChange, submit, labelWidth, panelTitle, colNum: propColNum,
            headerFields, rowFields,
        } = this.props;
        const {
            value: {header: headerValue, rows: rowValues = [], },
            rowNum, colNum, activeTabKey, activePanelKey,
        } = this.state;
        // 所选 colNum 个数在数组中的下标
        // 这里实现了一些特殊的业务逻辑，当 tab 的子组件的 rules 字段为数组时，则根据 tab 个数来觉得取得哪个 rules 的值
        // 这个逻辑是为了解决以下场景的需要，例如要显示一个表格，当列数为 3 时则表头字数限制为 24，当列数为 4 时，则字数限制为 18
        const ruleIndex = Array.isArray(propColNum)
            ? propColNum.indexOf(colNum)
            : 0;
        const processedHeaderFields = headerFields.map((item) => flattenItemRules(item, ruleIndex));
        const processedRowFields = rowFields.map((item) => flattenItemRules(item, ruleIndex));
        const indexList = range(rowNum);
        const rowIndexList = range(Math.min(0, rowNum - 1));
        const rowTabs = indexList.map((index) => {
            // 由于有 header， header index === 0，所以 rowIndex 从 1 开始
            const rowIndex = index - 1;
            const isHeader = index === 0;
            const value = isHeader
                ? headerValue
                : (rowValues[rowIndex] || {}).cols;

            return <TabPane
                key={index}
                tab={`第 ${index + 1} 行`}
                style={{padding: '10px 0', maxHeight: '500px', }}
                // 禁用懒加载，否则没法校验未渲染的组件
                forceRender
            >
                <ListFieldset
                    context={props.context}
                    labelWidth={props.labelWidth}
                    key={index}
                    name={isHeader ? 'header' : `row${index + 1}`}
                    length={colNum}
                    fields={isHeader ? processedHeaderFields : processedRowFields}
                    value={value}
                    ref={(field) => {
                        this.refFields[index] = field;
                    }}
                    onChange={(changedValue) => {
                        const updater = (state) => {
                            const rowValues = state.value.rows || [];
                            return {
                                value: isHeader
                                    ? {...state.value, header: changedValue, }
                                    : {
                                        ...state.value,
                                        rows: rowIndexList
                                            .map((currentRowIndex) => {
                                                const rowValue = rowValues[currentRowIndex] || {};
                                                return currentRowIndex === rowIndex
                                                    ? {cols: changedValue, }
                                                    : rowValue;
                                            }),
                                    },
                            };
                        };

                        if(!('value' in this.props)){
                            this.setState(updater);
                        }
                        if(onChange){
                            onChange(updater(this.state).value);
                        }
                    }}
                />
            </TabPane>;
        });

        const fieldset = (
            <div>
                {Array.isArray(this.props.rowNum)
                    ? <FormField
                        label="表格行数"
                        value={rowNum + ''}
                        onChange={(rowNum) => {
                            this.setState({
                                rowNum,
                                activeTabKey: '0',
                            });
                        }}
                    >
                        <Select style={{ width: 100, }}>
                            {this.props.rowNum.map((num, index) =>
                                <Option key={index} value={num}>{num}</Option>
                            )}
                        </Select>
                    </FormField>
                    : null}
                {Array.isArray(this.props.colNum)
                    ? <FormField
                        label="表格列数"
                        value={colNum + ''}
                        onChange={(colNum) => {
                            this.setState({
                                colNum,
                                activeTabKey: '0',
                            });
                        }}
                    >
                        <Select style={{ width: 100, }}>
                            {this.props.colNum.map((num, index) =>
                                <Option key={index} value={num}>{num}</Option>
                            )}
                        </Select>
                    </FormField>
                    : null}
                <Tabs
                    activeKey={activeTabKey}
                    onChange={(activeTabKey) => {
                        this.setState({
                            activeTabKey,
                        });
                    }}
                    renderTabBar={()=><ScrollableInkTabBar />}
                    renderTabContent={()=><TabContent animated={false} />}
                    style={{border: '2px solid #f3f3f3', margin: '10px 0 20px', }}
                >
                    {rowTabs}
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

polyfill(TableFieldset);

export default TableFieldset;
