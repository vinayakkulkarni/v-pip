import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VPip',
    file: 'dist/v-pip.min.js',
    globals: {
      '@vue/composition-api': 'vueCompositionApi',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
    vue(),
  ],
  external: ['@vue/composition-api'],
};
