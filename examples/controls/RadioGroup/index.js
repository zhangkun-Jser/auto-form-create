import React from 'react';
import RadioGroupDemo from './RadioGroupDemo';
import MarkdownElement from '../../MarkdownElement';
import doc from './doc.md';

class RadioGroupDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>RadioGroup</h1>
                <h4>示例：</h4>
                <RadioGroupDemo/>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default RadioGroupDoc;
