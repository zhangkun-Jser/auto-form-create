import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {expect} from 'chai';

import ImageUpload from '../../src/controls/ImageUpload';

describe('ImageUpload', () => {
  let requests;
  let xhr;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = req => requests.push(req);
  });

  afterEach(() => {
    xhr.restore();
  });

  it('upload success', (done) => {
    const response = {
      "status" : 1,
      "data": "http://www.xxx.com/test.png",
      "errors": null,
      "fieldErrors": {},
      "msgs": []
    };
    const onChange = (value) => {
      expect(value).to.equal(response.data);
    };
    const wrapper = mount(
      <ImageUpload
        onChange={onChange}
        uploadRules={{
          size: 2,
          types: ['png'],
          key: '200x100'
        }}
      />
    );

    const files = [{
      name: 'test.png',
      type: 'image/png',
      size: 1024
    }];
    wrapper.find('input[type="file"]').simulate('change', {
      target: {files}
    });
    setTimeout(() => {
      requests[0].respond(200, {}, JSON.stringify(response));
      wrapper.update();
      expect(wrapper.find('Input').prop('value')).to.equal(response.data);
      done();
    }, 100);
  });

  it('upload error', (done) => {
    const wrapper = mount(
      <ImageUpload
        uploadRules={{
          size: 2,
          types: ['png'],
          key: '200x100'
        }}
      />
    );

    const files = [{
      name: 'test.png',
      type: 'image/png',
      size: 1024
    }];
    wrapper.find('input[type="file"]').simulate('change', {
      target: {files}
    });
    setTimeout(() => {
      requests[0].respond(400, {}, `error 400`);
      wrapper.update();
      expect(wrapper.find('p.form-upload-status').text()).to.include('上传失败：');
      done();
    }, 100);
  });

  it('file type error', () => {
    const wrapper = mount(
      <ImageUpload
        uploadRules={{
          size: 2,
          types: ['png'],
          key: '200x100'
        }}
      />
    );

    const files = [{
      name: 'test.png',
      type: 'image/jpeg',
      size: 1024
    }];
    wrapper.find('input[type="file"]').simulate('change', {
      target: {files}
    });
    expect(wrapper.find('p.form-upload-status').text()).to.equal('图片格式不符合');
  });

  it('file size error', () => {
    const wrapper = mount(
      <ImageUpload
        uploadRules={{
          size: 2,
          types: ['png'],
          key: '200x100'
        }}
      />
    );

    const files = [{
      name: 'test.png',
      type: 'image/png',
      size: 3 * 1024
    }];
    wrapper.find('input[type="file"]').simulate('change', {
      target: {files}
    });
    expect(wrapper.find('p.form-upload-status').text()).to.equal('图片超过了限制大小');
  });
});