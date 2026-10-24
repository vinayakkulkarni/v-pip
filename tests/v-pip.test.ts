import { mount } from '@vue/test-utils';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { createApp } from 'vue';
import VPipPlugin, { VPip } from '../src/index';

type PipDocument = {
  pictureInPictureEnabled?: boolean;
  pictureInPictureElement?: Element | null;
  exitPictureInPicture?: () => Promise<void>;
};

const doc = document as unknown as PipDocument;
const videoProto = HTMLVideoElement.prototype as {
  requestPictureInPicture?: () => Promise<unknown>;
};

const VIDEO = { src: 'https://example.com/clip.mp4' };

beforeEach(() => {
  Object.defineProperty(document, 'pictureInPictureEnabled', {
    configurable: true,
    value: true,
  });
  Object.defineProperty(document, 'pictureInPictureElement', {
    configurable: true,
    writable: true,
    value: null,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  Reflect.deleteProperty(document, 'pictureInPictureEnabled');
  Reflect.deleteProperty(document, 'pictureInPictureElement');
  Reflect.deleteProperty(document, 'exitPictureInPicture');
  Reflect.deleteProperty(videoProto, 'requestPictureInPicture');
});

describe('VPip', () => {
  it('renders the video with the given options', () => {
    const wrapper = mount(VPip, {
      props: {
        videoOptions: { ...VIDEO, poster: 'https://example.com/p.jpg' },
      },
    });
    const video = wrapper.get('video');
    expect(video.attributes('src')).toBe(VIDEO.src);
    expect(video.attributes('poster')).toBe('https://example.com/p.jpg');
  });

  it('hides the toggle when the browser has no PiP support', async () => {
    Reflect.deleteProperty(document, 'pictureInPictureEnabled');
    const wrapper = mount(VPip, { props: { videoOptions: VIDEO } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('requests PiP on the rendered video element', async () => {
    const request = vi.fn(() => Promise.resolve({}));
    videoProto.requestPictureInPicture = request;
    const wrapper = mount(VPip, {
      props: {
        videoOptions: VIDEO,
        buttonOptions: { label: 'Pop out' },
      },
    });
    await wrapper.vm.$nextTick();
    const button = wrapper.get('button');
    expect(button.text()).toBe('Pop out');
    await button.trigger('click');
    expect(request).toHaveBeenCalledOnce();
    expect(request.mock.contexts[0]).toBe(wrapper.get('video').element);
  });

  it('exits PiP with document as the receiver', async () => {
    const exit = vi.fn(function (this: unknown) {
      expect(this).toBe(document);
      return Promise.resolve();
    });
    doc.exitPictureInPicture = exit;
    doc.pictureInPictureElement = document.createElement('video');
    const wrapper = mount(VPip, { props: { videoOptions: VIDEO } });
    await wrapper.vm.$nextTick();
    await wrapper.get('button').trigger('click');
    expect(exit).toHaveBeenCalledOnce();
    expect(wrapper.emitted('exiting-pip-failure')).toBeUndefined();
  });

  it('emits requesting-pip-failure when the request rejects', async () => {
    const error = new DOMException('Not allowed', 'NotAllowedError');
    videoProto.requestPictureInPicture = () => Promise.reject(error);
    const wrapper = mount(VPip, { props: { videoOptions: VIDEO } });
    await wrapper.vm.$nextTick();
    await wrapper.get('button').trigger('click');
    await vi.waitFor(() => {
      expect(wrapper.emitted('requesting-pip-failure')).toEqual([[error]]);
    });
  });

  it('emits video-in-pip on enter and leave events', async () => {
    const wrapper = mount(VPip, { props: { videoOptions: VIDEO } });
    const video = wrapper.get('video').element;
    video.dispatchEvent(new Event('enterpictureinpicture'));
    video.dispatchEvent(new Event('leavepictureinpicture'));
    expect(wrapper.emitted('video-in-pip')).toEqual([[true], [false]]);
  });

  it('stops listening after unmount', () => {
    const wrapper = mount(VPip, { props: { videoOptions: VIDEO } });
    const video = wrapper.get('video').element;
    wrapper.unmount();
    video.dispatchEvent(new Event('enterpictureinpicture'));
    expect(wrapper.emitted('video-in-pip')).toBeUndefined();
  });
});

describe('plugin install', () => {
  it('registers the VPip component globally', () => {
    const app = createApp({});
    app.use(VPipPlugin);
    expect(app.component('VPip')).toBe(VPip);
  });
});
