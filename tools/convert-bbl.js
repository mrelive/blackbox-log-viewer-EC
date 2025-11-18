#!/usr/bin/env node

/**
 * CLI tool to convert blackbox .bbl files to CSV via IPC
 * Usage: node tools/convert-bbl.js <input.bbl> [output.csv]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnDecoder } from '../src/ipc-client-utils.js';
import { DecoderClient } from '../src/ipc-client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
Blackbox BBL to CSV Converter (via IPC)

Usage: node tools/convert-bbl.js <input.bbl> [output.csv]

Arguments:
  input.bbl    Path to the input blackbox .bbl file (required)
  output.csv   Path to the output CSV file (optional, defaults to input name + .csv)

Options:
  --help, -h   Show this help message

Examples:
  node tools/convert-bbl.js flight.bbl
  node tools/convert-bbl.js flight.bbl output.csv
  node tools/convert-bbl.js "SAMPLES/Best Yet V8.bbl"

Note: This tool starts an IPC decoder server, sends a decode request, 
      then shuts down the server. It avoids loading GUI dependencies directly.
`);
  process.exit(0);
}

const inputFile = args[0];
const outputFile = args[1] || inputFile.replace(/\.bbl$/i, '.csv');

// Validate input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

// Validate input file is readable
try {
  fs.accessSync(inputFile, fs.constants.R_OK);
} catch (err) {
  console.error(`Error: Cannot read input file: ${inputFile}`);
  process.exit(1);
}

const absolutePath = path.resolve(inputFile);

console.log(`Converting: ${inputFile}`);
console.log(`Output:     ${outputFile}`);
console.log('');

let decoderProcess = null;
let client = null;

try {
  // Start IPC server
  console.log('Starting decoder server...');
  decoderProcess = await spawnDecoder({ port: 8081 });
  
  // Connect client
  client = new DecoderClient({ port: 8081 });
  client.on('progress', (data) => {
    process.stdout.write(`  Progress: ${data.percent}% - ${data.message}\r`);
  });
  
  await client.connect();
  console.log('Connected to decoder');
  console.log('');
  
  // Decode file
  console.log('Decoding...');
  const result = await client.decodeFile(absolutePath, 'csv');
  
  console.log('\n  Decode complete!');
  
  // Write CSV
  console.log('Writing output file...');
  fs.writeFileSync(outputFile, result.data.csv);
  
  console.log('');
  console.log('✓ Conversion complete!');
  console.log(`  Output file: ${outputFile}`);
  console.log(`  Size: ${fs.statSync(outputFile).size} bytes`);
  
} catch (error) {
  console.error('');
  console.error('✗ Conversion failed:');
  console.error(`  ${error.message}`);
  console.error('');
  process.exit(1);
  
} finally {
  // Cleanup
  if (client) {
    try {
      await client.disconnect();
    } catch (e) {
      // Ignore
    }
  }
  
  if (decoderProcess && !decoderProcess.killed) {
    try {
      decoderProcess.kill();
    } catch (e) {
      // Ignore
    }
  }
}
