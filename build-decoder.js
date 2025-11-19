#!/usr/bin/env node
// Build decoder bundle using esbuild API to avoid CLI quirks
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['cli-convert-cjs-entry.js'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: ['node18'],
  outfile: 'dist/cli-convert.cjs',
  banner: { js: '#!/usr/bin/env node' },
  logLevel: 'info'
}).catch(err => {
  console.error('[build-decoder] Failed:', err);
  process.exit(1);
});
