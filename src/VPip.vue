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
  import { VideoOptionsProps, ButtonOptionsProps, State } from '../types';

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
      // State
      const state: State = reactive({
        video: null,
        isPipSupported: false,
      });

      // Lifecycle Hooks
      onMounted(() => {
        state.isPipSupported = 'pictureInPictureEnabled' in document;
        state.video?.addEventListener('enterpictureinpicture', enteredPip);
        state.video?.addEventListener('leavepictureinpicture', leftPip);
      });
      onBeforeUnmount(() => {
        state.video?.removeEventListener('enterpictureinpicture', () => {});
        state.video?.removeEventListener('leavepictureinpicture', () => {});
      });
      /**
       * Emit an event when entered PiP mode
       *
       * @returns {void}
       */
      function enteredPip(): void {
        emit('video-in-pip', true);
      }
      /**
       * Emit an event when left PiP mode
       *
       * @returns {void}
       */
      function leftPip(): void {
        emit('video-in-pip', false);
      }
      // Methods
      const togglePip = () => {
        // If there is no element in Picture-in-Picture yet, let’s request
        // Picture-in-Picture for the video, otherwise leave it.
        const { pictureInPictureElement, exitPictureInPicture } =
          document as Document;
        if (!pictureInPictureElement && state.video) {
          state.video.requestPictureInPicture().catch((error: any) => {
            // Video failed to enter Picture-in-Picture mode.
            emit('requesting-pip-failure', error);
          });
        } else {
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
