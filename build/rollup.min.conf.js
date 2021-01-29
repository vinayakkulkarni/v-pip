import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

const extensions = ['.js', '.ts', '.vue'];

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VPip',
    file: 'dist/v-pip.min.js',
  },
  plugins: [
    resolve({ extensions, browser: true }),
    commonjs({ extensions, exclude: 'src/**' }),
    alias({
      entries: {
        vue: 'vue/dist/vue.runtime.esm-browser.prod.js',
      },
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
    vue(),
    typescript({
      include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
  ],
};
