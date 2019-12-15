import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

const rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});// 基本设置

class MarkdownElement extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {text} = this.props,
            html = marked(text);

        return (
            <div className="markdown-body">
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        );
    }
}

MarkdownElement.propTypes = {
    text: PropTypes.string.isRequired
};

MarkdownElement.defaultProps = {
    text: ''
};

export default MarkdownElement;
