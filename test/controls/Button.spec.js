import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Button from '../../src/common/Button';

describe('Button', () => {
  describe('Default', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow((
      <Button onClick={onButtonClick} className="test">按钮</Button>
    ));

    it('should generate a button element', () => {
      expect(wrapper.type()).to.equal('button');
    });

    it('should contain the label passed to it', () => {
      expect(wrapper.text()).to.equal('按钮');
    });

    it('should have type=button by default', () => {
      expect(wrapper.prop('type')).to.equal('button');
    });

    it('should have class', () => {
      expect(wrapper.hasClass('rc-btn test')).to.equal(true);
    });

    it('simulates click events', () => {
      wrapper.simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
    });
  });

  it('should show the type if passed button or submit', () => {
    const wrapper1 = shallow((
      <Button htmlType='submit'>
        submit
      </Button>
      )),
      wrapper2 = shallow((
        <Button htmlType='reset'>
          reset
        </Button>
      ));
    expect(wrapper1.prop('type')).to.equal('submit');
    expect(wrapper2.prop('type')).to.equal('reset');
  });

  it('should be disabled if set disabled', () => {
    const wrapper1 = shallow(
      <Button disabled>
        Button
      </Button>
    );
    expect(wrapper1.prop('disabled')).to.equal(true);
  });
});