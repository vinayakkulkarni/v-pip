import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VPip',
    file: 'dist/v-pip.min.js',
    globals: {
      vue: 'Vue',
    },
  },
  plugins: [
    commonjs(),
    vue(),
    terser(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
  external: ['vue'],
};
