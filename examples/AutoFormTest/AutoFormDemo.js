import React from 'react';
import AutoForm from '../../src/index';

const descriptor = [{
    name: 'middle',
    fieldset: 'GroupFieldset',
    panelTitle: '多tab升级样式——中部tab物料',
    fields: [{
        name: 'tabList',
        fieldset: 'TabFieldset',
        length: [2, 3, ],
        fields: [{
            name: 'name',
            control: 'Input',
            label: 'Tab标题',
            rules: {
                required: true,
                minBytes: 6,
                maxBytes: 10,
            },
        },
        {
            name: 'columnList',
            fieldset: 'ListFieldset',
            numLabel: '产品数',
            length: 2,
            fields: [{
                name: 'title',
                control: 'Input',
                label: '产品描述',
                rules: {
                    required: true,
                    minBytes: 10,
                    maxBytes: 15,
                },
            }, ],
        },
        ],
    }, ],
    submit: true,
},   {
    name: 'countDown',
    fieldset: 'RadioFieldset',
    panelTitle: '宽版大图倒计时样式——倒计时',
    radioValueKey: 'type',
    radioLabel: '倒计时类型',
    optionFields: [
        {
            option: {value: '0', text: '无', },
            fields: [],
        },
        {
            option: {value: '1', text: '按秒', },
            fields: [
                {
                    name: 'date',
                    control: 'DateTimeInput',
                    label: '设定时间',
                    showTime: true,
                    rules: {required: true, },
                },
            ],
        },
        {
            option: {value: '2', text: '按天', },
            fields: [
                {
                    name: 'date',
                    control: 'DateTimeInput',
                    label: '设定日期',
                    showTime: false,
                    rules: {required: true, },
                },
            ],
        },
    ],
    submit: true,
},
{
    name: 'table',
    fieldset: 'TableFieldset',
    panelTitle: '大图轮展表格样式——表格物料',
    rowNum: [5, ],
    colNum: [2, 3, 4, 5, ],
    headerFields: [
        {
            name: 'text',
            control: 'Input',
            label: '文本',
            rules: {required: true, minBytes: 4, maxBytes: [24, 24, 16, 12, ], },
        },
    ],
    rowFields: [
        {
            name: 'text',
            control: 'Input',
            label: '文本',
            rules: {required: true, minBytes: 4, maxBytes: [24, 24, 16, 12, ], },
        },
        {
            name: 'link',
            control: 'Input',
            label: '链接',
            defaultValue: 'http://',
            rules: {required: true, url: true, maxBytes: 1024, },
        },
    ],
    submit: true,
},
];

const formData = {
    middle: {
        tabList: [
            {
                name: '限时特惠',
                columnList: [
                    {
                        title: '享2年电池保修！',
                    },
                    {
                        title: '周三企业聚惠日',
                    },
                ],
            },
            {
                name: '新品上市',
                columnList: [
                    {
                        title: 'R8官网限量发售',
                    },
                    {
                        title: '商用8代新品',
                    },
                ],
            },
            {
                name: '新品上33',
                columnList: [
                    {
                        title: 'R8官网限量发33',
                    },
                    {
                        title: '商用8代新33',
                    },
                ],
            },
        ],
    },
    countDown: {
        type: '1',
        date: '2019-12-09',
    },
    table: {
        header: [
            { text: '妙笔生花', },
            { text: '下笔如有神', },
            { text: '文思泉涌', },
        ],
        rows: [
            {
                cols: [
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                ],
            },
            {
                cols: [
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                ],
            },
            {
                cols: [
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                ],
            },
            {
                cols: [
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                    {
                        text: '词穷就用妙笔生花！',
                        link: 'http://sogou.com',
                    },
                ],
            },
        ],
    },
};

class AutoFormDemo extends React.Component{
    state = {
        value: formData,
    }

    handleSubmit = (values) => {
        console.log(values);
    };

    render(){
        const {value, } = this.state;

        return (
            <AutoForm
                onSubmit={this.handleSubmit}
                descriptor={descriptor}
                value={value}
                onChange={(value) => {
                    this.setState({value, });
                }}
            />
        );
    }
}

export default AutoFormDemo;
