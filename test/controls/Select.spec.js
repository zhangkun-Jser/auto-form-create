import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import Select from '../../src/controls/Select';
import RcSelect, { Option } from 'rc-select';

describe('Select', () => {
  const options = [
    {"value": "black", "text": "黑色"},
    {"value": "white", "text": "白色"}
  ];
  const onChange = sinon.spy();
  const wrapper = shallow(
    <Select
      options={options}
      onChange={onChange}
    />
  );

  it('render success', () => {
    expect(wrapper.find(RcSelect)).to.have.length(1);
    expect(wrapper.find(RcSelect).children()).to.have.length(2);
    expect(wrapper.find(RcSelect).childAt(0).prop('children')).to.equal('黑色');
    expect(wrapper.find(RcSelect).childAt(1).prop('children')).to.equal('白色');
  });

});