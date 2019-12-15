import React from 'react';
import MarkdownElement from '../MarkdownElement';
import doc from './doc.md';
import AutoFormDemo from './AutoFormDemo';

class AutoFormDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>AutoForm 简单示例 </h1>
                <h4>使用自动表单实现同样的表单：</h4>
                <div style={{padding: 10, border: '1px solid #ccc'}}>
                    <AutoFormDemo/>
                </div>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default AutoFormDoc;