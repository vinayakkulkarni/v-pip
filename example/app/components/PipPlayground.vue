<script setup lang="ts">
  import { VPip } from 'v-pip';
  import type { ButtonOptionsProps, VideoOptionsProps } from 'v-pip';

  const LOG_SIZE = 5;

  const VIDEO: VideoOptionsProps = {
    src: '/media/flower.mp4',
    poster: '/media/flower.jpg',
    class: 'block aspect-video h-auto w-full bg-screen',
    width: '960',
    height: '540',
  };

  const BUTTON: ButtonOptionsProps = {
    wrapper: 'mt-4',
    class:
      'inline-flex h-10 items-center border border-accent-ink bg-accent px-4 font-mono text-sm text-screen transition-colors hover:bg-accent-ink hover:text-paper',
    label: 'Toggle picture-in-picture',
  };

  const { track } = useAnalytics();

  const pip = useTemplateRef<InstanceType<typeof VPip>>('pip');
  const floating = ref(false);
  const supported = ref<boolean | null>(null);
  const log = ref<string[]>([]);

  onMounted(() => {
    supported.value = document.pictureInPictureEnabled === true;
  });

  function record(line: string) {
    log.value = [line, ...log.value].slice(0, LOG_SIZE);
  }

  function reason(error: unknown): string {
    return error instanceof Error ? error.name : 'Unknown';
  }

  function onPip(value: boolean) {
    floating.value = value;
    record(`@video-in-pip → ${value}`);
    track('pip_changed', { floating: value });
  }

  function onRequestFailure(error: unknown) {
    record(`@requesting-pip-failure → ${reason(error)}`);
    track('pip_failure', { phase: 'request', reason: reason(error) });
  }

  function onExitFailure(error: unknown) {
    record(`@exiting-pip-failure → ${reason(error)}`);
    track('pip_failure', { phase: 'exit', reason: reason(error) });
  }

  function onComponentClick(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
      track('pip_toggle', { trigger: 'component' });
    }
  }

  async function toggleFromOutside() {
    track('pip_toggle', { trigger: 'external' });
    await pip.value?.togglePip();
  }
</script>

<template>
  <section
    aria-labelledby="playground-title"
    class="grid content-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12"
  >
    <div class="min-w-0 lg:col-span-5">
      <p class="font-mono text-xs tracking-wide text-ink-3 uppercase">
        Video state
      </p>
      <p
        class="mt-2 font-display text-state font-semibold tracking-tight"
        :class="floating ? 'text-accent-ink' : 'text-ink'"
        aria-live="polite"
      >
        {{ floating ? 'floating' : 'docked' }}
      </p>
      <h1
        id="playground-title"
        class="mt-8 max-w-headline font-display text-heading font-semibold tracking-tight"
      >
        Picture-in-picture for Vue 3.
      </h1>
      <p class="mt-4 max-w-measure leading-relaxed text-ink-2">
        One component around the native Picture-in-Picture Web API. Pop the
        video out, switch tabs, and it keeps playing on top of every window.
      </p>
    </div>

    <div class="flex min-w-0 flex-col gap-6 lg:col-span-7">
      <div
        class="border border-rule bg-paper-2 p-3 sm:p-5"
        @click="onComponentClick"
      >
        <VPip
          ref="pip"
          :video-options="VIDEO"
          :button-options="BUTTON"
          @video-in-pip="onPip"
          @requesting-pip-failure="onRequestFailure"
          @exiting-pip-failure="onExitFailure"
        />
        <p
          v-if="supported === false"
          class="mt-4 font-mono text-xs leading-relaxed text-ink-2"
        >
          This browser has no Picture-in-Picture API, so v-pip hides its button.
          Try Chrome, Edge or Safari.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <p class="font-mono text-xs text-ink-3">exposed method</p>
          <button
            type="button"
            class="mt-2 inline-flex h-10 items-center border border-rule px-4 font-mono text-sm text-ink-2 transition-colors hover:border-ink-3 hover:text-ink disabled:opacity-40"
            :disabled="supported !== true"
            @click="toggleFromOutside"
          >
            pip.togglePip()
          </button>
        </div>
        <div class="min-w-0">
          <p class="font-mono text-xs text-ink-3">events</p>
          <ol class="mt-2 font-mono text-xs leading-relaxed" aria-live="polite">
            <li v-if="log.length === 0" class="text-ink-3">
              Toggle the video to see events.
            </li>
            <li
              v-for="(line, index) in log"
              :key="`${index}-${line}`"
              class="truncate"
              :class="index === 0 ? 'text-ink' : 'text-ink-3'"
            >
              {{ line }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
