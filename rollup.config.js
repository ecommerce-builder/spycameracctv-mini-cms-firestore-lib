import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const plugins = [
  typescript(),
  replace({
    'VERSION': pkg.version
  }),
];

const external = Object.keys(
  Object.assign({}, pkg.peerDependencies, pkg.dependencies)
);
external.push('firebase/firestore');

export default [
  /**
   * browser builds
   */
  {
    input: 'lib/index.ts',
    treeshake: false,
    output: [
      { file: pkg.browser, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins,
    external,
  },

  /**
   * Library build
   */
  {
    input: 'lib/index.ts',
    treeshake: false,
    output: [
      {
        file: 'dist/spycam-cms-client-min.js',
        format: 'umd',
        sourcemap: false,
        name: 'SpycameraCMSClient',
        globals: {
        }
      },
    ],
    plugins: [...plugins, uglify()],
    external,
  },
  {
    input: 'lib/index.ts',
    treeshake: false,
    output: [
      {
        file: 'dist/spycam-cms-client.js',
        format: 'umd',
        sourcemap: 'inline',
        name: 'SpycameraCMSClient',
        globals: {
        }
      },
    ],
    plugins: [...plugins],
    external,
  }
];
