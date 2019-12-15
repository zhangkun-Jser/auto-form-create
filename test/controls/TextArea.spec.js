import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import TextArea from '../../src/controls/TextArea';
import Limiter from '../../src/common/Limiter';

describe('TextArea', () => {
  describe('Default', () => {
    const wrapper = shallow((
      <TextArea />
    ));

    it('should generate a textarea element', () => {
      expect(wrapper.find('textarea')).to.have.length(1);
    });

    it('should have class', () => {
      expect(wrapper.find('textarea').hasClass('rc-textarea')).to.equal(true);
    });
  });

  describe('Limiter', () => {
    const wrapper = shallow((
      <TextArea
        limiter={{
          type: 'byte',
          max: 100
        }}
      />
    ));

    it('should generate a Limiter element', () => {
      expect(wrapper.find(Limiter)).to.have.length(1);
    });

    it('should have props', () => {
      expect(wrapper.find(Limiter).props().type).to.equal('byte');
      expect(wrapper.find(Limiter).props().max).to.equal(100);
    });
  });

  it('should call event callback when change', () => {
    const onInputChange = sinon.spy();
    const wrapper = shallow(<TextArea onChange={onInputChange} />);
    wrapper.find('textarea').simulate('change', {target: {value: 'foo'}});
    expect(onInputChange.getCall(0).args[0]).to.equal('foo');
  })
});