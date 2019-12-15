# 更新日志

## todo list
- 刚才看了一下，仅js minify 后也有 666kb，真6，这个体积有点大啊
    - 把 moment 也改成 引入外部的
    - 引入 bundle analyze 工具，查找较大的依赖包
    - 看看能否改成 依赖 antd，这样能避免重复依赖 rc-component
- 优化文档和demo
    - 针对组件增加 demo，增加页面上可以运行的 demo
    - 文档中代码增加语法高亮
    - 1.4.0 的改动没有更新文档
    - 把 文档和代码放到一起，参考 antd 的套路
- 增加 NumberedTextArea 组件
- [ ] 合并 webpack 配置
- [ ] 更新 webpack4 以支持 treeShaking 优化
- [x] 把 imageRequired，videoRequired 统一成 Required
- [ ] 在下一个大版本更新中 把 radioFieldset 组件的 defaultRadio 改为 defaultValue

## 2.1.0
- 修复当 radioFieldset 默认值为0时不选中的问题
- input 组件生命周期优化

## 2.1.0
- RadioOptionValue 增加 Number 类型支持
- ImageUpload 控件 的 rules 属性 imageRequired 统一为 required
- 自动从规则中判断是否需要线上控件前红色星号

## 2.0.0
- 修复 tab 组件来回切换时修改的文本丢失
- 全部 fieldset 组件改为受控组件
- props.data 改为 props.value

## 1.4.1
- 修复 tab 组件来回切换时修改的文本丢失

## 1.4.0
- ImageUpload 增加 responseParser，name 配置项
- 校验规则增加字符长度校验
- AutoForm 增加 children props 可以替换默认 提交按钮

## 1.3.2
- update package.json url

## 1.3.1
- migrate to biz-git

## 1.3.0
- 增加context配置方式

## 1.2.3 ~ 1.2.6
- fix 输入框过滤分隔字符的校验bug。
- fix ListFieldset props 中 length 改变的 bug
- 文档修改

## 1.2.2
- 添加插入标红词等输入框过滤分隔字符的校验。
- 修改构建js的导出。

## 1.2.1
- fix fieldsets 数据回填bug。
- 修改校验规则。

## 1.2.0 stable
- 修改模块export方式。
- 完善 docs 和 demos。
- 修改npm script。

## 1.1.3
- 修改 ListFieldset，TableFieldset组件,可变字节倒计。
- 修改按钮样式。
- fix labelWidth props传入。

## 1.1.2
- 修复RadioFieldset组件。
- 修改DateTimeInput 输入控件。

## 1.1.1
- 升级fieldsets组件。
- GroupFieldset组件与CollapseFieldset组件合并。
- 增加fieldset 分块提交。

## 1.1.0
- 增加字段转化组件，优化自动生成方案。
- 使 controls 和 fieldsets 可扩展。
- 增加Select control 和 多种fieldset组件。


## 1.0.0
- 自动生成表单组件包含9种基础输入控件。
- 包含3种复合结构字段组件。
- 通过读取json来渲染输出表单。
- 包含文档和单元测试用例。
- 最后，本项目主要满足一些基础通用表单的制作，会不停维护。


