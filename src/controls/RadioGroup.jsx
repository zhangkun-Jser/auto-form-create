/**
 * author: KCFE
 * date: 2017/10/12
 * description: radio组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'rc-checkbox';
import { polyfill, } from 'react-lifecycles-compat';


class RadioGroup extends React.Component{

    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        options: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]),
                    text: PropTypes.string,
                }),
            ])
        ),
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        disabled: false,
    }

    constructor(props){
        super(props);
        const {value = '', } = props;

        this.state = {
            value,
        };
    }

    componentWillReceiveProps(nextProps){
        if('value' in nextProps){
            const {value = '', } = nextProps;
            this.setState({
                value,
            });
        }
    }

    handleChange = ({target: {value, }, }) => {
        const {onChange, } = this.props;
        if(!('value' in this.props)){
            this.setState({ value, });
        }
        if(onChange){
            onChange(value);
        }
    };

    render(){
        const {options, disabled, } = this.props;
        const {value, } = this.state;

        return <span>
            {options.map((option, index) => {
                const optionValue = typeof option === 'string' ? option : option.value;
                const optionText = typeof option === 'string' ? option : option.text;
                return <label key={index} className="rc-radio-label">
                    <Radio
                        type="radio"
                        prefixCls="rc-radio"
                        checked={value === optionValue}
                        value={optionValue}
                        onChange={this.handleChange}
                        disabled={disabled}
                    />
                    <span className="rc-radio-label-text">{optionText}</span>
                </label>;
            })}
        </span>;
    }
}

polyfill(RadioGroup);

export default RadioGroup;
