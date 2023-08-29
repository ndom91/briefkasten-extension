import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import zip from 'rollup-plugin-zip'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'

const production = !process.env.ROLLUP_WATCH
const firefox = process.argv.includes('--firefox')

function firefoxManifest() {
  return {
    name: 'firefox-manifest',
    generateBundle(options, bundle) {
      const current = JSON.parse(bundle['manifest.json'].source)
      current.background = { scripts: [current.background.service_worker] }
      bundle['manifest.json'].source = JSON.stringify(current, null, 2)
    },
  }
}

export default {
  input: 'manifest.json',
  // output: {
  //   dir: "dist",
  //   format: "esm",
  // },
  output: {
    format: 'esm',
    name: 'briefkasten',
    dir: 'dist',
    // file: 'build/bundle.js'
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    postcss({ minimize: production }),
    // the plugins below are optional
    resolve({
      browser: true, // @NOTE: OG
      dedupe: ['svelte'],
    }),
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    commonjs(),
    // Empties the output dir before a new build
    emptyDir(),
    // If we're building for production, minify
    production && terser(),
    // Make adjustments for firefox
    firefox && firefoxManifest(),
    // Outputs a zip file in ./releases
    production && zip({ dir: 'releases' }),
  ],
}
