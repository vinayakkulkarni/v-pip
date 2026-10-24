<script setup lang="ts">
  const REPO = 'https://github.com/vinayakkulkarni/v-pip';
  const NPM = 'https://www.npmjs.com/package/v-pip';
  const SITE = 'https://v-pip.vinayakkulkarni.dev';
  const INSTALL = 'pnpm add v-pip';
  const DESCRIPTION =
    'A Vue 3 component for the native Picture-in-Picture Web API. Float a video over every window, get enter and leave events, typed props.';

  const USAGE = `<script setup lang="ts">
  import { ref } from 'vue';
  import { VPip } from 'v-pip';

  const floating = ref(false);
</${'script'}>

<template>
  <VPip
    :video-options="{ src: '/clip.mp4', poster: '/clip.jpg' }"
    :button-options="{ label: 'Pop out' }"
    @video-in-pip="floating = $event"
  />
</template>`;

  useSeoMeta({
    ogType: 'website',
    ogUrl: `${SITE}/`,
    ogTitle: 'v-pip: picture-in-picture for Vue 3',
    ogDescription: DESCRIPTION,
    twitterCard: 'summary',
  });

  useHead({
    link: [{ rel: 'canonical', href: `${SITE}/` }],
    meta: [
      {
        name: 'theme-color',
        content: '#f4f7f9',
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: '#121519',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  });

  const PROPS = [
    [
      'video-options',
      '{ src, poster?, class?, wrapper?, width?, height? }',
      'Attributes for the video element and its wrapper.',
    ],
    [
      'button-options',
      '{ label, type?, class?, wrapper? }',
      'The toggle button. Hidden when the browser has no PiP API.',
    ],
    ['wrapper', 'string', 'Class on the outer element.'],
  ] as const;

  const EVENTS = [
    ['video-in-pip', 'boolean', 'true on enter, false on leave.'],
    [
      'requesting-pip-failure',
      'unknown',
      'requestPictureInPicture() rejected.',
    ],
    ['exiting-pip-failure', 'unknown', 'exitPictureInPicture() rejected.'],
  ] as const;
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header
      class="flex h-16 shrink-0 items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
    >
      <p class="font-mono text-sm text-ink">
        v-pip<span class="text-accent-ink">.</span>
      </p>
      <nav class="flex items-center gap-2" aria-label="Project">
        <OutboundLink
          :href="NPM"
          section="header"
          class="inline-flex h-9 items-center border border-rule px-3 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
        >
          npm
        </OutboundLink>
        <OutboundLink
          :href="REPO"
          section="header"
          class="inline-flex h-9 items-center gap-2 border border-rule px-3 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
            />
          </svg>
          <span class="hidden sm:inline">GitHub</span>
        </OutboundLink>
        <ThemeToggle />
      </nav>
    </header>

    <main class="flex flex-1 flex-col">
      <PipPlayground class="min-h-hero" />

      <section
        aria-labelledby="install-title"
        class="grid gap-10 border-t border-rule px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12"
      >
        <div class="lg:col-span-5">
          <h2
            id="install-title"
            class="font-display text-heading font-semibold tracking-tight"
          >
            Install
          </h2>
          <p class="mt-4 max-w-measure leading-relaxed text-ink-2">
            Vue 3 is the only peer dependency. The component ships no styles:
            pass your own classes through the option objects.
          </p>
        </div>
        <div class="flex min-w-0 flex-col gap-3 lg:col-span-7">
          <CopyCommand :command="INSTALL" />
          <pre
            class="overflow-x-auto border border-rule bg-paper-2 p-4 font-mono text-code leading-relaxed text-ink-2"
          ><code>{{ USAGE }}</code></pre>
        </div>

        <div class="lg:col-span-5">
          <h2 class="font-display text-heading font-semibold tracking-tight">
            Props
          </h2>
          <p class="mt-4 max-w-measure leading-relaxed text-ink-2">
            Call <code class="font-mono text-sm">togglePip()</code> on a
            template ref to drive the video from your own controls.
          </p>
        </div>
        <div class="min-w-0 overflow-x-auto lg:col-span-7">
          <table class="w-full min-w-table border-collapse text-left text-sm">
            <thead class="font-mono text-xs text-ink-3">
              <tr class="border-b border-rule">
                <th class="py-2 pr-4 font-normal">prop</th>
                <th class="py-2 pr-4 font-normal">type</th>
                <th class="py-2 font-normal">what it does</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="[name, kind, about] in PROPS"
                :key="name"
                class="border-b border-rule"
              >
                <td class="py-3 pr-4 font-mono text-ink">{{ name }}</td>
                <td class="py-3 pr-4 font-mono text-ink-2">{{ kind }}</td>
                <td class="py-3 text-ink-2">{{ about }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="lg:col-span-5">
          <h2 class="font-display text-heading font-semibold tracking-tight">
            Events
          </h2>
        </div>
        <div class="min-w-0 overflow-x-auto lg:col-span-7">
          <table class="w-full min-w-table border-collapse text-left text-sm">
            <thead class="font-mono text-xs text-ink-3">
              <tr class="border-b border-rule">
                <th class="py-2 pr-4 font-normal">event</th>
                <th class="py-2 pr-4 font-normal">payload</th>
                <th class="py-2 font-normal">when</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="[name, payload, about] in EVENTS"
                :key="name"
                class="border-b border-rule"
              >
                <td class="py-3 pr-4 font-mono text-ink">{{ name }}</td>
                <td class="py-3 pr-4 font-mono text-ink-2">{{ payload }}</td>
                <td class="py-3 text-ink-2">{{ about }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer
      class="flex flex-wrap items-center justify-between gap-4 border-t border-rule px-5 py-6 font-mono text-xs text-ink-3 sm:px-8 lg:px-12"
    >
      <p>MIT · made with Vue by Vinayak Kulkarni</p>
      <OutboundLink
        :href="REPO"
        section="footer"
        class="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-3"
      >
        github.com/vinayakkulkarni/v-pip
      </OutboundLink>
    </footer>
  </div>
</template>
