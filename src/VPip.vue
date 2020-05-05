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
        v-if="isPipSupported"
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
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    defineComponent,
  } from '@vue/composition-api';

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
      const video = ref(null);
      const isPipSupported = ref(false);

      // Lifecycle Hooks
      onMounted(() => {
        isPipSupported.value = 'pictureInPictureEnabled' in document;
        video.value.addEventListener('enterpictureinpicture', () => {
          emit('video-in-pip', true);
        });
        video.value.addEventListener('leavepictureinpicture', () => {
          emit('video-in-pip', false);
        });
      });
      onBeforeUnmount(() => {
        video.value.removeEventListener('enterpictureinpicture');
        video.value.removeEventListener('leavepictureinpicture');
      });

      // Methods
      const togglePip = () => {
        // If there is no element in Picture-in-Picture yet, let’s request
        // Picture-in-Picture for the video, otherwise leave it.
        if (!document.pictureInPictureElement) {
          video.value.requestPictureInPicture().catch((error) => {
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
        video,
        isPipSupported,
        togglePip,
      };
    },
  });
</script>
