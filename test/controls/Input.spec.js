import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Input from '../../src/controls/Input';
import Limiter from '../../src/common/Limiter';

describe('Input', () => {
  describe('Default', () => {
    const wrapper = shallow((
      <Input />
    ));

    it('should generate a input element', () => {
      expect(wrapper.find('input')).to.have.length(1);
    });

    it('should have class', () => {
      expect(wrapper.find('input').hasClass('rc-input')).to.equal(true);
    });
  });

  describe('Limiter', () => {
    const wrapper = shallow((
      <Input
        limiter={{
          type: 'byte',
          max: 512
        }}
      />
    ));

    it('should generate a Limiter element', () => {
      expect(wrapper.find(Limiter)).to.have.length(1);
    });

    it('should have props', () => {
      expect(wrapper.find(Limiter).props().type).to.equal('byte');
      expect(wrapper.find(Limiter).props().max).to.equal(512);
    });
  });

  it('should call event callback when change', () => {
    const onInputChange = sinon.spy();
    const wrapper = shallow(<Input onChange={onInputChange} />);
    wrapper.find('input').simulate('change', {target: {value: 'foo'}});
    expect(onInputChange.getCall(0).args[0]).to.equal('foo');
  });
});