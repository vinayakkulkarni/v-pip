import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// Cloudflare compatibility date — keep the two copies below in sync.
const COMPATIBILITY_DATE = '2026-10-24';

export default defineNuxtConfig({
  compatibilityDate: COMPATIBILITY_DATE,

  modules: ['@nuxtjs/color-mode'],

  devtools: { enabled: false },

  // The demo runs the library from source, so dev, typecheck and build never
  // wait on `vp pack` and always exercise the current component.
  alias: {
    'v-pip': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Cookie-backed so the server renders the right class on <html>; the
  // module's inline head script resolves "system" before first paint.
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'v-pip-color-mode',
  },

  // Public IDs ship in the HTML; they are not secrets. Override per env with
  // NUXT_PUBLIC_GTAG_ID, NUXT_PUBLIC_PLAUSIBLE_SCRIPT_ID, etc. An empty
  // gtagId skips GA4 entirely (no measurement ID is issued yet).
  runtimeConfig: {
    public: {
      gtagId: 'G-9G1LDM83ZK',
      plausibleScriptId: 'pa-NpYzId_yyORE56LNOkDf0',
      plausibleApiHost: 'https://analytics.geoql.in',
      openpanelClientId: 'af9b6cdc-d669-4a43-8f59-6f3aaa7365ed',
      openpanelApiUrl: 'https://events.geoql.in/api',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'v-pip: picture-in-picture for Vue 3',
      meta: [
        {
          name: 'description',
          content:
            'A Vue 3 component for the native Picture-in-Picture Web API. Float a video over every window, get enter and leave events, typed props.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          href: '/fonts/clash-display-600.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/satoshi-400.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
    },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
      // Merged into the generated .output/server/wrangler.json.
      wrangler: {
        name: 'v-pip-demo',
        account_id: 'bd11b1c42ee2759044a1769f80f704dd',
        compatibility_date: COMPATIBILITY_DATE,
        workers_dev: true,
        preview_urls: false,
        routes: [{ pattern: 'v-pip.vinayakkulkarni.dev', custom_domain: true }],
        observability: { enabled: true },
      },
    },
  },

  typescript: {
    strict: true,
  },
});
