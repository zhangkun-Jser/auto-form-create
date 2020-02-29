# auto-form-create 表单自动生成组件

[![GitHub stars](https://img.shields.io/github/stars/zhangkun-Jser/auto-form-create.svg?style=social&label=Stars)](https://www.npmjs.com/package/auto-form-create)
[![GitHub forks](https://img.shields.io/github/forks/zhangkun-Jser/auto-form-create.svg?style=social&label=Fork)](https://www.npmjs.com/package/auto-form-create)

[![NPM](https://nodei.co/npm/auto-form-create.png)](https://nodei.co/npm/auto-form-create/)

## 介绍
- 本组件源于广告业务中复杂的表单生成需求，现在抽离通用逻辑开源并提供更广泛的适用性。
- 本组件基于React开发，其中包括表单中常用的一些输入控件controls 和字段组fieldsets 可供使用。
- 表单数据以`json对象`组织，可自动回填数据。
- 可根据 `json对象数组` 自动渲染生成表单，表单中包含校验，并支持一些特殊的动态输入形式。
- 系统无关性，在多个系统中引用本组件，使用一份`json对象数组`配置，可以渲染得到同样的表单。可做到一处配置，处处所见。
- 当`输入控件Controls` 和 `字段组Fieldsets` 不满足需求时，可以插件形式扩展。


## 安装
```
npm install auto-form-create
```

## 使用示例
```
import AutoForm from 'auto-form-create';
import formDesc from './108.json';

ReactDom.render(
    <AutoForm
        data={dataObj}
        onSubmit={(values) => {
          console.log(values);
        }}
        descriptor={formDesc}
    />,
    this.el
);
```
引入样式：
```
import 'auto-form-create/assets/index.css';
```

引入组件中的输入控件
```
import { Controls } from 'auto-form-create';
const Input = Controls.Input;
```

引入组件中的字段组
```
import { Fieldsets } from 'auto-form-create';
const ListFieldset = Fieldsets.ListFieldset;
```

也可以全局引用构建后的文件，[Try it on CodePen](https://codepen.io/CharmSun/pen/ZJVNMa)
```
<link rel="stylesheet" type="text/css" href="//unpkg.com/auto-form-create@2.3.2/dist/auto-form-create.min.css">
<script src="//unpkg.com/react/umd/react.production.min.js"></script>
<script src="//unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="//unpkg.com/auto-form-create@2.3.2/dist/auto-form-create.min.js"></script>
```

## 设计方案
![image](../assets/images/auto-form.png)

AutoForm组件通过data属性`（json对象）`可以回填表单数据json对象，
通过descriptor属性`（json对象的数组，每一项对应一个字段）`自动渲染生成整个表单，
descriptor 的json数组中每一项json对象基本与字段FormField和输入控件的props属性对应上，每一项渲染对应的FormField 和Fieldsets组件。

所有单个表单字段全部抽象为FormField组件，包括字段名，附加说明，值，默认值，值的校验等，
FormField组件的子组件为Controls中的输入控件，输入的值通过onChange事件传递值至FormField组件。

Form表单中还会有字段组Fieldsets，这类组件是多个字段的组合，字段组中包含的多个字段可以按输入需求变化，最后字段组的值会按字段组的name收集。
Fieldsets组件以FormField为基础，也可以嵌套Fieldsets组件。

Controls中的组件和Fieldsets中的组件，是可以扩展的，以满足更多的表单输入需求。
扩展开发的Controls 组件和Fieldsets 组件，添加至 Controls 和 Fieldsets 中即可用于自动生成。

## 目录结构
```
assets        //各组件样式
├── styles
└── index.less
examples     //示例及文档
src          //源码
├── common      
    ├── 
├── controls   //各输入控件
    ├── 
├── fieldsets  //各形式字段组
    ├── 
├── AutoForm.jsx
├── FieldConverter.jsx
├── Form.jsx
├── FormField.jsx
└── index.jsx
test          //单元测试
```

## Test Case
```
npm test
```

## 生成文档和示例
```
npm run doc
```
## CHANGELOG
##### 2.3.0
- 针对组件增加 demo，增加页面上可以运行的 demo
- 文档中代码增加语法高亮
- 1.4.0 的改动没有更新文档
- 把 文档和代码放到一起，参考 antd 的套路
- 把 imageRequired，videoRequired 统一成 Required

##### 2.1.0
- 修复当 radioFieldset 默认值为0时不选中的问题
- input 组件生命周期优化

##### 2.1.0
- RadioOptionValue 增加 Number 类型支持
- ImageUpload 控件 的 rules 属性 imageRequired 统一为 required
- 自动从规则中判断是否需要线上控件前红色星号

##### 2.0.0
- 修复 tab 组件来回切换时修改的文本丢失
- 全部 fieldset 组件改为受控组件
- props.data 改为 props.value

##### 1.4.1
- 修复 tab 组件来回切换时修改的文本丢失

##### 1.4.0
- ImageUpload 增加 responseParser，name 配置项
- 校验规则增加字符长度校验
- AutoForm 增加 children props 可以替换默认 提交按钮

##### 1.3.2
- update package.json url

##### 1.3.1
- migrate to biz-git

##### 1.3.0
- 增加context配置方式

##### 1.2.3 ~ 1.2.6
- fix 输入框过滤分隔字符的校验bug。
- fix ListFieldset props 中 length 改变的 bug
- 文档修改

##### 1.2.2
- 添加插入标红词等输入框过滤分隔字符的校验。
- 修改构建js的导出。

##### 1.2.1
- fix fieldsets 数据回填bug。
- 修改校验规则。

##### 1.2.0 stable
- 修改模块export方式。
- 完善 docs 和 demos。
- 修改npm script。

##### 1.1.3
- 修改 ListFieldset，TableFieldset组件,可变字节倒计。
- 修改按钮样式。
- fix labelWidth props传入。

##### 1.1.2
- 修复RadioFieldset组件。
- 修改DateTimeInput 输入控件。

##### 1.1.1
- 升级fieldsets组件。
- GroupFieldset组件与CollapseFieldset组件合并。
- 增加fieldset 分块提交。

##### 1.1.0
- 增加字段转化组件，优化自动生成方案。
- 使 controls 和 fieldsets 可扩展。
- 增加Select control 和 多种fieldset组件。


##### 1.0.0
- 自动生成表单组件包含9种基础输入控件。
- 包含3种复合结构字段组件。
- 通过读取json来渲染输出表单。
- 包含文档和单元测试用例。
- 最后，本项目主要满足一些基础通用表单的制作，会不停维护。


