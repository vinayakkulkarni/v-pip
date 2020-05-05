import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
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
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
      commonjs(),
      vue(),
    ],
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
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
      commonjs(),
      vue(),
    ],
    external: ['@vue/composition-api'],
  },
  // UMD build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'VPip',
      file: 'dist/v-pip.js',
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
      vue(),
    ],
    external: ['@vue/composition-api'],
  },
];
