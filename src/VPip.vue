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

<script>
  import {
    reactive,
    computed,
    onMounted,
    onBeforeUnmount,
    defineComponent,
  } from 'vue';

  export default defineComponent({
    name: 'VPip',
    props: {
      // Video related options
      videoOptions: {
        type: Object,
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
        type: Object,
        required: false,
        default: () => ({
          wrapper: '',
          type: 'button',
          class: '',
          label: 'Toggle picture-in-picture',
        }),
      },
      wrapper: {
        type: String,
        default: '',
        required: false,
      },
    },
    setup(props, { emit }) {
      // State
      const state = reactive({
        video: null,
        isPipSupported: false,
      });

      // Lifecycle Hooks
      onMounted(() => {
        state.isPipSupported = 'pictureInPictureEnabled' in document;
        state.video.addEventListener('enterpictureinpicture', () => {
          emit('video-in-pip', true);
        });
        state.video.addEventListener('leavepictureinpicture', () => {
          emit('video-in-pip', false);
        });
      });
      onBeforeUnmount(() => {
        state.video.removeEventListener('enterpictureinpicture');
        state.video.removeEventListener('leavepictureinpicture');
      });

      // Methods
      const togglePip = () => {
        // If there is no element in Picture-in-Picture yet, let’s request
        // Picture-in-Picture for the video, otherwise leave it.
        if (!document.pictureInPictureElement) {
          state.video.requestPictureInPicture().catch((error) => {
            // Video failed to enter Picture-in-Picture mode.
            emit('requesting-pip-failure', error);
          });
        } else {
          document.exitPictureInPicture().catch((error) => {
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
