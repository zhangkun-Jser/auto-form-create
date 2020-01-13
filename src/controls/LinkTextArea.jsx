/**
 * description: 带插入链接的区块文本输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextArea from './TextArea';
import Button from '../common/Button';

class LinkTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || '',
            });
        }
    }

    handleChange = value => {
        const { onChange } = this.props;
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        if (onChange) {
            onChange(value);
        }
    };

    insertLink = () => {
        const link = prompt('请输入超链接', 'http://');
        if (!link) {
            return;
        }
        const elem = this.textareaElem;
        const str = elem.value;
        const strBefore = str.substring(0, elem.selectionStart);
        const strAfter = str.substring(elem.selectionEnd);
        const selectedStr = str.substring(elem.selectionStart, elem.selectionEnd);
        const word = selectedStr ? selectedStr : '链接词';
        const newStr = strBefore + '{' + word + '||' + link + '}' + strAfter;

        this.setState({ value: newStr }, () => {
            elem.selectionStart = newStr.indexOf('{') + 1;
            elem.selectionEnd = newStr.indexOf('||');
            elem.blur();
            elem.focus();
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(newStr);
        }
    };

    render() {
        const props = this.props;
        const { limiter } = this.props;
        return (
            <div>
                <div>
                    <TextArea
                        className={props.className}
                        value={this.state.value}
                        limiter={{
                            ...limiter,
                            filterSymbol: true,
                        }}
                        disabled={props.disabled}
                        onChange={this.handleChange}
                        textRef={textarea => {
                            this.textareaElem = textarea;
                        }}
                    />
                </div>
                <div style={{ marginTop: 5 }}>
                    <Button onClick={this.insertLink} disabled={props.disabled}>
                        插入链接词
                    </Button>
                </div>
            </div>
        );
    }
}

LinkTextArea.propTypes = {
    value: PropTypes.string,
    limiter: PropTypes.shape({
        type: PropTypes.string,
        max: PropTypes.number,
        filterSymbol: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

LinkTextArea.defaultProps = {
    disabled: false,
};

export default LinkTextArea;
