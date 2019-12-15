import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {expect} from 'chai';

import VideoUpload from '../../src/controls/VideoUpload';

describe('VideoUpload', () => {
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
      "data": "http://www.xxx.com/test.mp4",
      "errors": null,
      "fieldErrors": {},
      "msgs": []
    };
    const onChange = (value) => {
      expect(value).to.equal(response.data);
    };
    const wrapper = mount(
      <VideoUpload
        onChange={onChange}
        uploadRules={{
          size: 2*1024,
          key: 'mp4'
        }}
      />
    );

    const files = [{
      name: 'test.mp4',
      type: 'video/mp4',
      size: 1024 * 1024
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
      <VideoUpload
        uploadRules={{
          size: 2*1024,
          key: 'mp4'
        }}
      />
    );

    const files = [{
      name: 'test.mp4',
      type: 'video/mp4',
      size: 1024 * 1024
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
      <VideoUpload
        uploadRules={{
          size: 2*1024,
          key: 'mp4'
        }}
      />
    );

    const files = [{
      name: 'test.avi',
      type: 'video/avi',
      size: 1024 * 1024
    }];
    wrapper.find('input[type="file"]').simulate('change', {
      target: {files}
    });
    expect(wrapper.find('p.form-upload-status').text()).to.equal('视频格式不符合');
  });

  it('file size error', () => {
    const wrapper = mount(
      <VideoUpload
        uploadRules={{
          size: 2*1024,
          key: 'mp4'
        }}
      />
    );

    const files = [{
      name: 'test.mp4',
      type: 'video/mp4',
      size: 3 * 1024 * 1024
    }];
    wrapper.find('input[type="file"]').simulate('change', {
      target: {files}
    });
    expect(wrapper.find('p.form-upload-status').text()).to.equal('视频超过了限制大小');
  });
});