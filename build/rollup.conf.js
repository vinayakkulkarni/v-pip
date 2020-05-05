import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'VPip',
      file: 'dist/v-pip.esm.js',
    },
    plugins: [babel(), vue()],
    external: ['@vue/composition-api'],
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      name: 'VPip',
      file: 'dist/v-pip.cjs.js',
    },
    plugins: [babel(), commonjs(), vue()],
    external: ['@vue/composition-api'],
  },
  // UMD build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'VPip',
      file: 'dist/v-pip.umd.js',
      globals: {
        '@vue/composition-api': 'vueCompositionApi',
      },
    },
    plugins: [vue()],
    external: ['@vue/composition-api'],
  },
];
