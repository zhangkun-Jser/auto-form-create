/**
 * description: 用于图片上传的 输入框
 */
import React from 'react';
import PropTypes from 'prop-types';
import Upload from 'rc-upload';
import Input from './Input';
import Button from '../common/Button';

const imageTypes = {
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
};

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        const {
            action: defaultAction,
            uploadRules,
            context: { ImageUpload: { data, action, responseParser = ({ data }) => data, name } = {} } = {},
        } = props;
        const me = this;
        this.uploaderProps = {
            name,
            action: action || defaultAction,
            data: {
                key: uploadRules.key,
                ...data,
            },
            beforeUpload(file) {
                if (uploadRules.types) {
                    const types = uploadRules.types.map(type => {
                        return imageTypes[type];
                    });
                    if (types.indexOf(file.type) === -1) {
                        me.setState({
                            status: '图片格式不符合',
                        });
                        return false;
                    }
                }

                if (file.size > uploadRules.size * 1024) {
                    me.setState({
                        status: '图片超过了限制大小',
                    });
                    return false;
                }
            },
            onSuccess(response) {
                if (response.status === 1) {
                    me.handleChange(responseParser(response));
                } else {
                    me.setState({
                        value: '',
                        status: '上传失败：' + response.errors.join(','),
                    });
                }
            },
            onError(err) {
                me.setState({
                    value: '',
                    status: '上传失败：' + err.message,
                });
            },
        };
        this.state = {
            value: props.value || '',
            status: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
                status: null,
            });
        }
    }

    handleChange = value => {
        const { onChange } = this.props;
        if (!('value' in this.props)) {
            this.setState({
                value,
                status: null,
            });
        }
        if (onChange) {
            onChange(value);
        }
    };

    render() {
        const props = this.props;
        return (
            <div>
                <Upload
                    {...this.uploaderProps}
                    style={{ outline: 'none', cursor: 'pointer' }}
                    disabled={props.disabled}
                >
                    <Input className={props.className} value={this.state.value} disabled />
                    <Button className="ghost-btn" style={{ marginLeft: 5 }} disabled={props.disabled}>
                        上传图片
                    </Button>
                </Upload>
                {this.state.status ? <p className="form-upload-status">{this.state.status}</p> : null}
            </div>
        );
    }
}

ImageUpload.propTypes = {
    value: PropTypes.string,
    action: PropTypes.string,
    uploadRules: PropTypes.shape({
        size: PropTypes.number,
        types: PropTypes.array,
        key: PropTypes.string,
    }),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

ImageUpload.defaultProps = {
    action: '/uploadImage.do',
    disabled: false,
};

export default ImageUpload;
