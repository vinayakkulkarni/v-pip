<template>
  <div :class="props.wrapper">
    <div :class="props.videoOptions.wrapper">
      <video
        ref="video"
        :src="props.videoOptions.src"
        :poster="props.videoOptions.poster"
        :class="props.videoOptions.class"
        :height="props.videoOptions.height"
        :width="props.videoOptions.width"
        controls
        playsinline
      />
    </div>
    <div :class="props.buttonOptions.wrapper">
      <button
        v-if="isPipSupported"
        :type="props.buttonOptions.type ?? 'button'"
        :class="props.buttonOptions.class"
        @click="togglePip"
      >
        {{ props.buttonOptions.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
  import type { ButtonHTMLAttributes } from 'vue';

  export type VideoOptionsProps = {
    wrapper?: string;
    src: string;
    poster?: string;
    class?: string;
    height?: string;
    width?: string;
  };

  export type ButtonOptionsProps = {
    wrapper?: string;
    type?: ButtonHTMLAttributes['type'];
    class?: string;
    label: string;
  };

  const props = withDefaults(
    defineProps<{
      videoOptions?: VideoOptionsProps;
      buttonOptions?: ButtonOptionsProps;
      wrapper?: string;
    }>(),
    {
      videoOptions: () => ({
        wrapper: '',
        src: '',
        poster: '',
        class: '',
        height: '100%',
        width: '100%',
      }),
      buttonOptions: () => ({
        wrapper: '',
        type: 'button',
        class: '',
        label: 'Toggle picture-in-picture',
      }),
      wrapper: '',
    },
  );

  const emit = defineEmits<{
    'video-in-pip': [isPip: boolean];
    'requesting-pip-failure': [error: unknown];
    'exiting-pip-failure': [error: unknown];
  }>();

  const video = useTemplateRef<HTMLVideoElement>('video');
  const isPipSupported = ref(false);

  const enteredPip = (): void => {
    emit('video-in-pip', true);
  };

  const leftPip = (): void => {
    emit('video-in-pip', false);
  };

  onMounted(() => {
    isPipSupported.value =
      'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;
    video.value?.addEventListener('enterpictureinpicture', enteredPip);
    video.value?.addEventListener('leavepictureinpicture', leftPip);
  });

  onBeforeUnmount(() => {
    video.value?.removeEventListener('enterpictureinpicture', enteredPip);
    video.value?.removeEventListener('leavepictureinpicture', leftPip);
  });

  const togglePip = async (): Promise<void> => {
    if (document.pictureInPictureElement) {
      try {
        await document.exitPictureInPicture();
      } catch (error) {
        emit('exiting-pip-failure', error);
      }
      return;
    }
    if (!video.value) return;
    try {
      await video.value.requestPictureInPicture();
    } catch (error) {
      emit('requesting-pip-failure', error);
    }
  };

  defineExpose({ togglePip });
</script>
