/**
 * description: 日期时间输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/zh-cn';


const now = moment();
now.locale('zh-cn').utcOffset(8);

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;


class DateTimeInput extends React.Component{
    constructor(props){
        super(props);
        let value = null;
        if(props.value){
            value = moment(props.value, dateTimeFormat);
        }
        this.state = {
            value,
        };
    }

    getFormatter = () => {
        return this.props.showTime ? dateTimeFormat : 'YYYY-MM-DD';
    }
    handleChange = (value) => {
        // console.log('DatePicker change: ', (value && value.format(format)));
        this.setState({
            value,
        });
        const {onChange, } = this.props;
        if(onChange){
            onChange(value && value.format(this.getFormatter()) || '');
        }
    };

    render(){
        const props = this.props;
        const calendar = (<Calendar
            locale={zhCN}
            style={{ zIndex: 1000, }}
            dateInputPlaceholder={props.showTime ? '请输入日期时间' : '请输入日期'}
            formatter={this.getFormatter()}
            timePicker={props.showTime ? timePickerElement : null}
            defaultValue={now}
            showDateInput={props.showDateInput}
            disabledDate={props.disabledDate}
        />);
        return (
            <div style={{
                boxSizing: 'border-box',
                position: 'relative',
                display: 'block',
                lineHeight: 1.5,
            }}
            >
                <DatePicker
                    animation="slide-up"
                    disabled={props.disabled}
                    calendar={calendar}
                    value={this.state.value}
                    onChange={this.handleChange}
                >{({ value, }) => (
                        <span tabIndex="0">
                            <input
                                placeholder={props.showTime ? '请选择日期时间' : '请选择日期'}
                                className={classNames('rc-input', props.className)}
                                disabled={props.disabled}
                                readOnly
                                tabIndex="-1"
                                value={value && value.format(this.getFormatter()) || ''}
                            />
                        </span>
                    )}
                </DatePicker>
            </div>
        );
    }
}

DateTimeInput.propTypes = {
    value: PropTypes.string,
    showTime: PropTypes.bool,
    showDateInput: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    disabledDate: PropTypes.func,
};

DateTimeInput.defaultProps = {
    showTime: true,
    showDateInput: true,
    disabled: false,
    disabledDate: (current) => {
        // can not select days before today
        return current && current.valueOf() < moment().startOf('day');
    },
};

export default DateTimeInput;
