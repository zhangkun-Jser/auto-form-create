import React from 'react';
import MarkdownElement from '../MarkdownElement';
import doc from './doc.md';

class IntroduceDoc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <MarkdownElement text={doc}/>
            </div>
        );
    }
}

export default IntroduceDoc;