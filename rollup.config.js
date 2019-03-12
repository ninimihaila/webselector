import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/inject.js',
  output: {
    format: 'iife',
    file: 'bin/inject.js',
    name: 'webselector'
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: [],
      include: [
        'node_modules/**'
      ]
    })
  ]
};
