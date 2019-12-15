import React from 'react';
import SelectDemo from './SelectDemo';
import MarkdownElement from '../../MarkdownElement';
import doc from './doc.md';

class SelectDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Select</h1>
                <h4>示例：</h4>
                <SelectDemo/>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default SelectDoc;
