import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {expect} from 'chai';

import RadioGroup from '../../src/controls/RadioGroup';
import Radio from 'rc-checkbox';

describe('RadioGroup', () => {
  const options = [
    {"value": "black", "text": "黑色"},
    {"value": "white", "text": "白色"}
  ];
  const onChange = sinon.spy();
  const wrapper = mount(
    <RadioGroup
      options={options}
      onChange={onChange}
    />
  );

  it('render success', () => {
    expect(wrapper.find(Radio)).to.have.length(2);
    expect(wrapper.find('.rc-radio-label-text').at(0).text()).to.equal('黑色');
    expect(wrapper.find('.rc-radio-label-text').at(1).text()).to.equal('白色');
  });

  it('should call event callback when change', () => {
    wrapper.find('input').at(1).simulate('change', { target: { checked: true } });
    expect(onChange.getCall(0).args[0]).to.equal('white');
  });
});