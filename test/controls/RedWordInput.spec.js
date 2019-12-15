import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {expect} from 'chai';

import RedWordInput from '../../src/controls/RedWordInput';

describe('RedWordInput', () => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <RedWordInput
      limiter={{
        max: 24
      }}
      onChange={onChange}
    />
  );

  it('insert red word success', () => {
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('Input').prop('value')).to.equal('{标红词}');
    expect(onChange.getCall(0).args[0]).to.equal('{标红词}');
  });

  it('should call event callback when change', () => {
    const onInputChange = sinon.spy();
    const wrapper1 = mount(<RedWordInput limiter={{max:24}} onChange={onInputChange} />);
    wrapper1.find('input').simulate('change', {target: {value: 'foo'}});
    expect(onInputChange.getCall(0).args[0]).to.equal('foo');
  });
});