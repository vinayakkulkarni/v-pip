import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'umd',
      name: 'VPip',
      file: 'dist/v-pip.js',
      globals: {
        vue: 'vue',
      },
    },
    {
      format: 'cjs',
      file: 'dist/v-pip.cjs.js',
      globals: {
        vue: 'vue',
      },
    },
    {
      format: 'es',
      file: 'dist/v-pip.esm.js',
      globals: {
        vue: 'vue',
      },
    },
  ],
  plugins: [
    commonjs(),
    vue(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
  external: ['vue'],
};
