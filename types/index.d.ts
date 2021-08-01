import { Component } from 'vue';

declare global {
  interface HTMLVideoElement {
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
  }

  interface Document {
    readonly pictureInPictureElement: Element | null;
    exitPictureInPicture(): Promise<void>;
  }
}

export type VideoOptionsProps = {
  wrapper: string;
  src: string;
  poster: string;
  class: string;
  height: string;
  width: string;
};

export type ButtonOptionsProps = {
  wrapper: string;
  type: string;
  class: string;
  label: string;
};

type Props = {
  wrapper?: string;
  videoOptions?: VideoOptionsProps;
  buttonOptions?: ButtonOptionsProps;
};

type State = {
  isPipSupported: boolean;
  video: null | HTMLVideoElement;
};

export const VPip: Component;
