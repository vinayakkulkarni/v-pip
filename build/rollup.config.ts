import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import beep from '@rollup/plugin-beep';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';
import pkg from '../package.json';

export const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}
* @license ${pkg.license}
*/`;

const plugins = [
  alias({
    entries: {
      vue: 'vue/dist/vue.runtime.esm-browser.prod.js',
    },
  }),
  resolve({
    extensions: ['.js', '.ts', '.vue'],
    browser: true,
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  commonjs({
    extensions: ['.js', '.ts', '.vue'],
    exclude: 'src/**',
    include: 'node_modules/**',
  }),
  vue(),
  scss({
    output: 'dist/v-pip.css',
  }),
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  }),
  beep(),
];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      name: 'VPip',
      exports: 'named',
      strict: true,
      sourcemap: true,
      banner,
    },
    {
      file: pkg.module,
      format: 'es',
      name: 'VPip',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/v-pip.js',
      format: 'umd',
      name: 'VPip',
      exports: 'named',
      banner,
      sourcemap: true,
      globals: {
        vue: 'vue',
      },
    },
  ],
  plugins,
  external: ['vue'],
};
