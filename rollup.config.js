import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  preserveSymlinks: true,
  input: ['marked-calendar.js'],
  output: {
    file: 'build/marked-calendar.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel()
  ]
};