import React from 'react';
import DateTimeInputDemo from './DateTimeInputDemo';
import MarkdownElement from '../../MarkdownElement';
import doc from './doc.md';

class DateTimeInputDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>DateTimeInput 日期时间输入</h1>
                <h4>示例：</h4>
                <DateTimeInputDemo/>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default DateTimeInputDoc;
