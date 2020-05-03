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
  export default {
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
    data: () => ({
      isPip: false,
    }),
    computed: {
      isPipSupported() {
        return 'pictureInPictureEnabled' in document;
      },
    },
    mounted() {
      const { video } = this.$refs;
      video.addEventListener('enterpictureinpicture', () => {
        this.isPip = true;
        this.$emit('video-in-pip', true);
      });
      video.addEventListener('leavepictureinpicture', () => {
        this.isPip = false;
        this.$emit('video-in-pip', false);
      });
    },
    beforeDestroy() {
      const { video } = this.$refs;
      // clear all listeners
      video.removeEventListener('enterpictureinpicture');
      video.removeEventListener('leavepictureinpicture');
      this.isPip = false;
    },
    methods: {
      togglePip() {
        const { video } = this.$refs;
        // If there is no element in Picture-in-Picture yet, let’s request
        // Picture-in-Picture for the video, otherwise leave it.
        if (!document.pictureInPictureElement) {
          video.requestPictureInPicture().catch((error) => {
            // Video failed to enter Picture-in-Picture mode.
            this.$emit('requesting-pip-failure', error);
          });
        } else {
          document.exitPictureInPicture().catch((error) => {
            // Video failed to leave Picture-in-Picture mode.
            this.$emit('exiting-pip-failure', error);
          });
        }
      },
    },
  };
</script>
