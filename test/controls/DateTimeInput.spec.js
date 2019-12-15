import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import DateTimeInput from '../../src/controls/DateTimeInput';
import moment from 'moment';
import DatePicker from 'rc-calendar/lib/Picker';

describe('DateTimeInput', () => {
  describe('Default', () => {
    const onChange = sinon.spy();
    const wrapper = shallow((
      <DateTimeInput onChange={onChange} />
    ));

    it('should generate elements properly', () => {
      expect(wrapper.find(DatePicker)).to.have.length(1);
      expect(wrapper.find(DatePicker).shallow().find('input')).to.have.length(1);
    });

    it('should call event callback and set input value when change', () => {
      wrapper.find(DatePicker).simulate('change', moment('2017-12-08 14:55:00', 'YYYY-MM-DD HH:mm:ss'));
      expect(onChange.getCall(0).args[0]).to.equal('2017-12-08 14:55:00');
      expect(wrapper.find(DatePicker).shallow().find('input').prop('value')).to.equal('2017-12-08 14:55:00');
    });

    it('should be disabled if set disabled', () => {
      const wrapper1 = shallow(
        <DateTimeInput disabled />
      );
      expect(wrapper1.find(DatePicker).prop('disabled')).to.equal(true);
      expect(wrapper1.find(DatePicker).shallow().find('input').prop('disabled')).to.equal(true);
    });
  });
});