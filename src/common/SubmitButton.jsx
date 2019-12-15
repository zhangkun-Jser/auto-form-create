import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


export default class SubmitButton extends React.Component{
    static propTypes = {
        labelWidth: PropTypes.number,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        labelWidth: 140,
    }

    render(){
        const {labelWidth, onClick, } = this.props;
        return <div className="form-item">
            <div className="item-con" style={{marginLeft: labelWidth + 10, }}>
                <Button onClick={onClick}>
                    保存
                </Button>
            </div>
        </div>;
    }
}
