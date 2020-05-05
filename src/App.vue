<template>
  <div id="app" class="w-full h-full relative">
    <github-icon />
    <v-pip
      :video-options="videoOptions"
      :button-options="buttonOptions"
    />
    <div class="absolute bottom-0 right-0 pr-2">
      <a
        href="https://www.netlify.com"
        class="gray-400"
        aria-label="View source on GitHub"
        target="_blank"
        rel="noopener noreferrer">
          <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
      </a>
    </div>
  </div>
</template>

<script>
import VPip from 'v-pip';

export default {
  components: {
    VPip,
    GithubIcon: () => import(
      /* webpackChunkName: "GithubIcon" */ '@/components/GithubIcon.vue'
    ),
  },
  data: () => ({
    videoOptions: {
      wrapper: '',
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      alt: 'Placeholder Image',
    },
    buttonOptions: {
      wrapper: '',
      type: 'button',
      class: '',
      label: 'Toggle picture-in-picture',
    },
  }),
};
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
  body {
    font-family: 'Nunito', sans-serif;
    height: 100vh;
    width: 100vw;
    margin: 0;
    background-color: #485461;
    background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);
  }
  .absolute {
    position: absolute;
  }
  .bottom-0 {
    bottom: 0;
  }
  .right-0 {
    right: 0;
  }
  .relative {
    position: relative;
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .justify-center {
    justify-content: center;
  }
  .items-center {
    align-items: center;
  }
  .content-center {
    align-content: center;
  }
  .max-w-xs {
    max-width: 20rem !important;
  }
  .w-full {
    width: 100% !important;
  }
  .h-full {
    height: 100% !important;
  }
  .border {
    border-width: 1px;
  }
  .border-gray-400 {
    border-color: #cbd5e0;
  }
  .border-dotted {
    border-style: dotted;
  }
  .pr-2 {
    padding-right: 0.50rem;
  }
  .p-4 {
    padding: 1rem;
  }
  .text-center {
    text-align: center;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .object-contain {
    object-fit: contain;
  }
  .object-center {
    object-position: center;
  }
  .h-24 {
    height: 10rem;
  }
  .gray-400 {
    color: #cbd5e0
  }
  .btn {
    font-weight: 700 !important;
    margin-top: 0.75rem !important;
    color: white;
    background-color: #4299e1 !important;
    border: 0;
    font-size: 1rem;
    border-radius: 0.25rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
</style>
