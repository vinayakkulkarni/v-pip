import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.ts', '.vue'];

const plugins = [
  resolve({ extensions, browser: true }),
  vue(),
  alias({
    entries: {
      vue: 'vue/dist/vue.runtime.esm-browser.prod.js',
    },
  }),
  babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  typescript({
    include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
    useTsconfigDeclarationDir: true,
    clean: true,
  }),
];

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      name: 'VPip',
      exports: 'named',
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
