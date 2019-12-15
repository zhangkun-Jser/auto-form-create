import React from 'react';
import UploadDemo from './UploadDemo';
import MarkdownElement from '../../MarkdownElement';
import doc from './doc.md';

class UploadDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Upload 上传控件</h1>
                <h4>Upload示例：</h4>
                <UploadDemo/>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default UploadDoc;
