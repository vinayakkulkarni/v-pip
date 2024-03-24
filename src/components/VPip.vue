<template>
  <div :class="wrapper">
    <div :class="videoOptions.wrapper">
      <video
        ref="video"
        :src="videoOptions.src"
        :poster="videoOptions.poster"
        :class="videoOptions.class"
        :height="videoOptions.height"
        :width="videoOptions.width"
        controls
      />
    </div>
    <div :class="buttonOptions.wrapper">
      <button
        v-if="state.isPipSupported"
        :type="buttonOptions.type"
        :class="buttonOptions.class"
        @click="togglePip"
      >
        {{ buttonOptions.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    reactive,
    onMounted,
    onBeforeUnmount,
    defineComponent,
    PropType,
  } from 'vue';
  import type { ButtonHTMLAttributes } from 'vue';

  declare global {
    interface HTMLVideoElement {
      requestPictureInPicture(): Promise<PictureInPictureWindow>;
    }
    interface Document {
      readonly pictureInPictureElement: Element | null;
      exitPictureInPicture(): Promise<void>;
    }
  }

  type VideoOptionsProps = {
    wrapper: string;
    src: string;
    poster: string;
    class: string;
    height: string;
    width: string;
  };

  type ButtonOptionsProps = {
    wrapper: string;
    type?: ButtonHTMLAttributes['type'];
    class: string;
    label: string;
  };

  type State = {
    isPipSupported: boolean;
    video: null | HTMLVideoElement;
  };

  export default defineComponent({
    name: 'VPip',
    props: {
      // Video related options
      videoOptions: {
        type: Object as PropType<VideoOptionsProps>,
        required: false,
        default: () => ({
          wrapper: '',
          src: '',
          poster: '',
          class: '',
          height: '100%',
          width: '100%',
        }),
      },
      // button related options
      buttonOptions: {
        type: Object as PropType<ButtonOptionsProps>,
        required: false,
        default: () => ({
          wrapper: '',
          type: 'button',
          class: '',
          label: 'Toggle picture-in-picture',
        }),
      },
      wrapper: {
        type: String as PropType<string>,
        default: '',
        required: false,
      },
    },
    emits: ['video-in-pip', 'requesting-pip-failure', 'exiting-pip-failure'],
    setup(_, { emit }) {
      const state: State = reactive({
        video: null,
        isPipSupported: false,
      });

      onMounted(() => {
        state.isPipSupported = 'pictureInPictureEnabled' in document;
        state.video?.addEventListener('enterpictureinpicture', enteredPip);
        state.video?.addEventListener('leavepictureinpicture', leftPip);
      });

      onBeforeUnmount(() => {
        state.video?.removeEventListener('enterpictureinpicture', leftPip);
        state.video?.removeEventListener('leavepictureinpicture', leftPip);
      });

      const enteredPip = (): void => {
        emit('video-in-pip', true);
      };

      const leftPip = (): void => {
        emit('video-in-pip', false);
      };

      const togglePip = () => {
        // If there is no element in Picture-in-Picture yet, let’s request
        // Picture-in-Picture for the video, otherwise leave it.
        const { pictureInPictureElement, exitPictureInPicture } =
          document as Document;
        if (!pictureInPictureElement && state.video) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.video.requestPictureInPicture().catch((error: any) => {
            // Video failed to enter Picture-in-Picture mode.
            emit('requesting-pip-failure', error);
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          exitPictureInPicture().catch((error: any) => {
            // Video failed to leave Picture-in-Picture mode.
            emit('exiting-pip-failure', error);
          });
        }
      };

      return {
        state,
        togglePip,
      };
    },
  });
</script>
