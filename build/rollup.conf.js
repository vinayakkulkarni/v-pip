import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

const extensions = ['.js', '.ts', '.vue'];

const plugins = [
  alias({
    entries: {
      vue: 'vue/dist/vue.runtime.esm-browser.prod.js',
    },
  }),
  babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  commonjs(),
  resolve({ extensions, browser: true }),
  typescript({
    include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
    useTsconfigDeclarationDir: true,
  }),
  vue(),
];

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'VPip',
      file: 'dist/v-pip.esm.js',
    },
    plugins,
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      name: 'VPip',
      file: 'dist/v-pip.cjs.js',
    },
    plugins,
  },
  // UMD build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'VPip',
      file: 'dist/v-pip.js',
    },
    plugins,
  },
];
