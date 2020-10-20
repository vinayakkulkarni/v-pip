<template>
  <div id="app">
    <v-pip
      :video-options="videoOptions"
      :button-options="buttonOptions"
      @video-in-pip="handlePIP"
      @requesting-pip-failure="handlePipOpenFailure"
      @exiting-pip-failure="handlePipExitFailure"
    />
  </div>
</template>

<script>
  import { VPip } from '../src';

  export default {
    components: {
      VPip,
    },
    data: () => ({
      pip: false,
      videoOptions: {
        wrapper: '',
        src:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      },
      buttonOptions: {
        wrapper: '',
        type: 'button',
        class: '',
        label: 'Toggle picture-in-picture',
      },
    }),
    methods: {
      handlePIP(e) {
        this.pip = e; // true or false
      },
      handlePipOpenFailure(e) {
        console.log('Video failed to enter Picture-in-Picture mode.', e);
      },
      handlePipExitFailure(e) {
        console.log('Video failed to leave Picture-in-Picture mode.', e);
      },
    },
  };
</script>
