import React from 'react';
import MarkdownElement from '../MarkdownElement';
import doc from './doc.md';
import FormDemo from './FormDemo';

class FormDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Form 与 FormField </h1>
                <h4>非自动表单使用示例：</h4>
                <div style={{padding: 10, border: '1px solid #ccc'}}>
                    <FormDemo/>
                </div>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default FormDoc;