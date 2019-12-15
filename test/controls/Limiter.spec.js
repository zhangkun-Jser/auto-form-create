import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Limiter from '../../src/common/Limiter';

describe('Limiter', () => {
  it('should default show the bytes length of input value', () => {
    const wrapper = shallow((
      <Limiter max={10} inputValue="{测试}测试" />
    ));
    expect(wrapper.text()).to.equal('10 / 10 字节');
  });

  it('should default show the characters length of input value', () => {
    const wrapper = shallow((
      <Limiter max={10} inputValue="{测试}测试" type="char" />
    ));
    expect(wrapper.text()).to.equal('6 / 10 字符');
  });

  it('should has correct class', () => {
    const wrapper1 = shallow((
      <Limiter max={10} inputValue="{测试}测试" />
    ));
    const wrapper2 = shallow((
      <Limiter max={9} inputValue="{测试}测试" />
    ));
    expect(wrapper1.hasClass('rc-limiter rc-limiter-gray')).to.equal(true);
    expect(wrapper2.hasClass('rc-limiter rc-limiter-red')).to.equal(true);
  });

  it('should show the bytes length of input value when filter special symbol', () => {
    const wrapper1 = shallow((
      <Limiter max={10} inputValue="{测试}测试" filterSymbol/>
    ));
    const wrapper2 = shallow((
      <Limiter max={10} inputValue="{文字||http://}测试" filterSymbol/>
    ));
    expect(wrapper1.text()).to.equal('8 / 10 字节');
    expect(wrapper2.text()).to.equal('8 / 10 字节');
  });

});