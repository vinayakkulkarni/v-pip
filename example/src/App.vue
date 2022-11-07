<template>
  <v-github-icon url="https://github.com/vinayakkulkarni/v-pip" />
  <v-pip
    :video-options="state.video"
    :button-options="state.button"
    @video-in-pip="onPipEnter"
    @requesting-pip-failure="onPipFailure"
    @exiting-pip-failure="onPipExitFailure"
  />
  <div class="absolute bottom-4 right-4">
    <a
      href="https://app.netlify.com/sites/v-pip/deploys"
      aria-label="View deploys on Netlify"
      target="_blank"
      rel="noopener noreferrer"
      class="gray-400"
    >
      <img
        src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { VGithubIcon } from 'v-github-icon';
  import { VPip } from 'v-pip';

  export default defineComponent({
    components: {
      VPip,
      VGithubIcon,
    },
    setup() {
      const state = ref({
        pip: false,
        video: {
          wrapper: '',
          src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          poster:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        },
        button: {
          wrapper: '',
          type: 'button',
          class:
            'cursor-pointer inline-flex items-center justify-center mt-4 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          label: 'Toggle picture-in-picture',
        },
      });

      const onPipEnter = (e: boolean) => {
        state.value.pip = e;
      };
      const onPipFailure = (e: any) => {
        console.log('Video failed to enter Picture-in-Picture mode.', e);
      };
      const onPipExitFailure = (e: any) => {
        console.log('Video failed to leave Picture-in-Picture mode.', e);
      };

      return {
        state,
        onPipEnter,
        onPipFailure,
        onPipExitFailure,
      };
    },
  });
</script>
<style>
  @import 'v-github-icon/dist/v-github-icon.css';
</style>
