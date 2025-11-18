#!/usr/bin/env node
// Build decoder bundle using esbuild API (CommonJS)
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['cli-convert-cjs-entry.js'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: ['node18'],
  outfile: 'decoder-entry.cjs',
  logLevel: 'info'
}).catch(err => {
  console.error('[build-decoder] Failed:', err);
  process.exit(1);
});
