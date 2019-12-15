import React from 'react';
import InputDemo from './InputDemo';
import TextAreaDemo from './TextAreaDemo';
import RedWordInputDemo from './RedWordInputDemo';
import LinkTextAreaDemo from './LinkTextAreaDemo';
import MarkdownElement from '../../MarkdownElement';
import doc from './doc.md';

class InputDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Input、TextArea 等输入框</h1>
                <h4>Input示例：</h4>
                <InputDemo/>
                <h4>TextArea示例：</h4>
                <TextAreaDemo/>
                <h4>插入标红词：</h4>
                <RedWordInputDemo/>
                <h4>插入链接词：</h4>
                <LinkTextAreaDemo/>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default InputDoc;