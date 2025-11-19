#!/usr/bin/env node

/**
 * Simple CLI tool to convert Betaflight Blackbox .bbl files to CSV or JSON
 * Usage: node cli-convert.js <input.bbl> [output] [--format csv|json]
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Stub browser globals that the parser code expects
globalThis.window = { requestAnimationFrame: (cb) => setTimeout(cb, 16) };
globalThis.document = { createElement: () => ({ getContext: () => null }) };
globalThis.$ = function(selector) {
  return {
    length: 0,
    addClass: function() { return this; },
    removeClass: function() { return this; },
    toggleClass: function() { return this; },
    css: function() { return this; },
    html: function() { return this; },
    text: function() { return this; },
    show: function() { return this; },
    hide: function() { return this; },
    on: function() { return this; },
    off: function() { return this; }
  };
};
globalThis.$.extend = Object.assign;
globalThis.semver = {
  gte: (v1, v2) => {
    const parse = v => v.split('.').map(x => parseInt(x) || 0);
    const a = parse(v1), b = parse(v2);
    for (let i = 0; i < 3; i++) {
      if (a[i] > b[i]) return true;
      if (a[i] < b[i]) return false;
    }
    return true;
  },
  lte: (v1, v2) => !globalThis.semver.gt(v1, v2),
  gt: (v1, v2) => {
    const parse = v => v.split('.').map(x => parseInt(x) || 0);
    const a = parse(v1), b = parse(v2);
    for (let i = 0; i < 3; i++) {
      if (a[i] > b[i]) return true;
      if (a[i] < b[i]) return false;
    }
    return false;
  },
  lt: (v1, v2) => !globalThis.semver.gte(v1, v2)
};
globalThis.console = console;

// Import the parser
const { FlightLog } = await import('./src/flightlog.js');

const args = process.argv.slice(2);

// Support --version to integrate with Nexus updater (prints vX.Y.Z)
if (args.includes('--version')) {
  try {
    const pkg = require('./package.json');
    console.log(pkg.version ? `v${pkg.version}` : 'v0.0.0');
  } catch {
    console.log('v0.0.0');
  }
  process.exit(0);
}

if (args.length === 0 || args.includes('--help')) {
  console.log(`
Betaflight Blackbox BBL to CSV/JSON Converter

Usage: node cli-convert.js <input.bbl> [output] [--format csv|json] [--split] [--log N]

Arguments:
  input.bbl    Path to the input blackbox .bbl file (required)
  output       Path to the output file (optional, defaults to input.csv or input.json)
  --format     Output format: 'csv' or 'json' (optional, defaults to 'csv')
  --split      Split multi-flight logs into separate files (output-1.csv, output-2.csv, etc.)
  --log N      Convert only flight number N (0-indexed, use with multi-flight logs)

Examples:
  node cli-convert.js flight.bbl
  node cli-convert.js flight.bbl --format json
  node cli-convert.js "SAMPLES/Best Yet V8.bbl" output.csv
  node cli-convert.js "SAMPLES/Best Yet V8.bbl" output.json --format json
  node cli-convert.js "SAMPLES/Flight 3.bbl" --split --format json
  node cli-convert.js "SAMPLES/Flight 3.bbl" --log 2 --format json
`);
  process.exit(0);
}

// Parse arguments
const formatIndex = args.findIndex(arg => arg === '--format');
let format = 'csv';
if (formatIndex !== -1 && args[formatIndex + 1]) {
  format = args[formatIndex + 1].toLowerCase();
  args.splice(formatIndex, 2); // Remove --format and its value
}

const splitIndex = args.findIndex(arg => arg === '--split');
let splitFlights = false;
if (splitIndex !== -1) {
  splitFlights = true;
  args.splice(splitIndex, 1); // Remove --split
}

const logIndex = args.findIndex(arg => arg === '--log');
let specificLog = null;
if (logIndex !== -1 && args[logIndex + 1]) {
  specificLog = parseInt(args[logIndex + 1]);
  args.splice(logIndex, 2); // Remove --log and its value
}

if (!['csv', 'json', 'binary'].includes(format)) {
  console.error(`Error: Invalid format '${format}'. Use 'csv', 'json', or 'binary'.`);
  process.exit(1);
}

const inputFile = args[0];
const defaultExt = format === 'json' ? '.json' : '.csv';
const outputFile = args[1] || inputFile.replace(/\.bbl$/i, defaultExt);

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

console.log(`Converting: ${inputFile}`);
console.log(`Output:     ${outputFile}\n`);

try {
  // Read the blackbox file
  const fileData = fs.readFileSync(inputFile);
  console.log(`Read ${fileData.length} bytes`);
  
  // Parse the log
  console.log('Parsing log...');
  const flightLog = new FlightLog(fileData);
  
  const logCount = flightLog.getLogCount();
  if (logCount === 0) {
    console.error('Error: No valid logs found in file');
    process.exit(1);
  }
  
  console.log(`Found ${logCount} log(s)`);
  
  // Determine which logs to process
  let logsToProcess = [];
  if (specificLog !== null) {
    if (specificLog < 0 || specificLog >= logCount) {
      console.error(`Error: Log index ${specificLog} out of range (0-${logCount - 1})`);
      process.exit(1);
    }
    logsToProcess = [specificLog];
  } else if (splitFlights) {
    logsToProcess = Array.from({ length: logCount }, (_, i) => i);
  } else {
    logsToProcess = [0]; // Default: first log only
  }
  
  // Process each log
  for (const logIdx of logsToProcess) {
    console.log(`\n--- Processing log ${logIdx + 1}/${logCount} ---`);
    
    const opened = flightLog.openLog(logIdx);
    
    if (!opened) {
      const error = flightLog.getLogError(logIdx);
      console.error(`Warning: Failed to open log ${logIdx}: ${error}`);
      continue;
    }
    
    // Get log info
    const fieldNames = flightLog.getMainFieldNames();
    const stats = flightLog.getStats();
    const sysConfig = flightLog.getSysConfig();
    const minTime = flightLog.getMinTime();
    const maxTime = flightLog.getMaxTime();
    const frameCount = stats.frame.I ? stats.frame.I.count : 0;
    
    console.log(`Fields: ${fieldNames.length}`);
    console.log(`Frames: ${frameCount}`);
    console.log(`Duration: ${((maxTime - minTime) / 1000000).toFixed(2)}s`);
    
    // Determine output filename
    let currentOutputFile;
    if (splitFlights && logCount > 1) {
      const ext = format === 'json' ? '.json' : '.csv';
      const baseName = outputFile.replace(/\.(csv|json)$/i, '');
      currentOutputFile = `${baseName}-flight${logIdx + 1}${ext}`;
    } else {
      currentOutputFile = outputFile;
    }
    
    // Generate output based on format
    if (format === 'json') {
      console.log('Generating JSON...');
      await generateJSONStream(flightLog, fieldNames, sysConfig, minTime, maxTime, currentOutputFile, logIdx, logCount);
    } else if (format === 'binary') {
      console.log('Generating Binary...');
      await generateBinaryStream(flightLog, fieldNames, sysConfig, minTime, maxTime, currentOutputFile, logIdx, logCount);
    } else {
      console.log('Generating CSV...');
      await generateCSVStream(flightLog, fieldNames, sysConfig, minTime, maxTime, currentOutputFile);
    }
    const outSize = fs.statSync(currentOutputFile).size;
    console.log(`✓ Output: ${currentOutputFile} (${outSize} bytes)`);
  }
  
  console.log(`\n✓ Success! Converted ${logsToProcess.length} log(s)`);
  
} catch (error) {
  console.error(`\n✗ Error: ${error.message}`);
  if (error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }
  process.exit(1);
}

async function generateCSVStream(flightLog, fieldNames, sysConfig, minTime, maxTime, outputFile) {
  await new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(outputFile, { encoding: 'utf8', highWaterMark: 1<<20 });
    ws.on('error', reject);
    ws.on('finish', resolve);

    // System config headers
    ws.write('"Product","Blackbox flight data recorder by Nicholas Sherlock"\n');
    if (sysConfig) {
      const writeKV = (k, v, quoteV=false) => {
        if (v === undefined || v === null) return;
        if (Array.isArray(v)) { ws.write(`"${k}","${v.join(',')}"\n`); return; }
        if (quoteV || typeof v === 'string') ws.write(`"${k}","${String(v)}"\n`);
        else ws.write(`"${k}",${v}\n`);
      };
      writeKV('firmwareType', sysConfig.firmwareType);
      writeKV('firmware', sysConfig.firmware, true);
      writeKV('firmwarePatch', sysConfig.firmwarePatch);
      writeKV('firmwareVersion', sysConfig.firmwareVersion, true);
      writeKV('Firmware revision', sysConfig['Firmware revision'], true);
      writeKV('Firmware date', sysConfig['Firmware date'], true);
      writeKV('Board information', sysConfig['Board information'], true);
      writeKV('Log start datetime', sysConfig['Log start datetime'], true);
      writeKV('Craft name', sysConfig['Craft name'], true);
      writeKV('frameIntervalI', sysConfig.frameIntervalI);
      writeKV('frameIntervalPNum', sysConfig.frameIntervalPNum);
      writeKV('frameIntervalPDenom', sysConfig.frameIntervalPDenom);
      writeKV('minthrottle', sysConfig.minthrottle);
      writeKV('maxthrottle', sysConfig.maxthrottle);
      writeKV('gyroScale', sysConfig.gyroScale);
      writeKV('motorOutput', sysConfig.motorOutput);
      writeKV('acc_1G', sysConfig.acc_1G);
      writeKV('vbatscale', sysConfig.vbatscale);
      writeKV('vbatmincellvoltage', sysConfig.vbatmincellvoltage);
      writeKV('vbatwarningcellvoltage', sysConfig.vbatwarningcellvoltage);
      writeKV('vbatmaxcellvoltage', sysConfig.vbatmaxcellvoltage);
      writeKV('vbatref', sysConfig.vbatref);
      writeKV('currentMeterOffset', sysConfig.currentMeterOffset);
      writeKV('currentMeterScale', sysConfig.currentMeterScale);

      const outputFields = [
        'looptime', 'gyro_sync_denom', 'pid_process_denom', 'thrMid', 'thrExpo',
        'tpa_mode', 'tpa_rate', 'tpa_breakpoint', 'rc_rates', 'rc_expo', 'rates', 'rate_limits',
        'rollPID', 'pitchPID', 'yawPID', 'levelPID', 'magPID',
        'd_max_gain', 'd_max_advance', 'dterm_filter_type', 'dterm_lpf_hz', 'dterm_lpf_dyn_hz',
        'dterm_filter2_type', 'dterm_lpf2_hz', 'yaw_lpf_hz', 'dterm_notch_hz', 'dterm_notch_cutoff',
        'itermWindupPointPercent', 'iterm_relax', 'iterm_relax_type', 'iterm_relax_cutoff',
        'pidAtMinThrottle', 'anti_gravity_gain', 'anti_gravity_cutoff_hz', 'anti_gravity_p_gain',
        'abs_control_gain', 'use_integrated_yaw', 'ff_transition', 'ff_averaging', 'ff_smooth_factor',
        'ff_jitter_factor', 'ff_boost', 'ff_max_rate_limit', 'yawRateAccelLimit', 'rateAccelLimit',
        'pidSumLimit', 'pidSumLimitYaw', 'deadband', 'yaw_deadband',
        'gyro_lpf', 'gyro_soft_type', 'gyro_lowpass_hz', 'gyro_lowpass_dyn_hz', 'gyro_soft2_type',
        'gyro_lowpass2_hz', 'gyro_notch_hz', 'gyro_notch_cutoff', 'gyro_to_use',
        'dyn_notch_max_hz', 'dyn_notch_count', 'dyn_notch_q', 'dyn_notch_min_hz',
        'dshot_bidir', 'motor_poles', 'gyro_rpm_notch_harmonics', 'gyro_rpm_notch_q',
        'gyro_rpm_notch_min', 'rpm_filter_fade_range_hz', 'rpm_notch_lpf',
        'acc_lpf_hz', 'acc_hardware', 'baro_hardware', 'mag_hardware',
        'gyro_cal_on_first_arm', 'airmode_activate_throttle'
      ];
      for (const field of outputFields) writeKV(field, sysConfig[field]);

      // Remaining fields not yet written
      if (sysConfig && typeof sysConfig === 'object') {
        for (const key of Object.keys(sysConfig)) {
          // Skip duplicates already written by checking presence in output buffer is costly; assume explicit list covers most.
          const val = sysConfig[key];
          if (val === undefined || val === null) continue;
          // Heuristic: avoid writing duplicates for known keys
          if (['firmwareType','firmware','firmwarePatch','firmwareVersion','Firmware revision','Firmware date','Board information','Log start datetime','Craft name','frameIntervalI','frameIntervalPNum','frameIntervalPDenom','minthrottle','maxthrottle','gyroScale','motorOutput','acc_1G','vbatscale','vbatmincellvoltage','vbatwarningcellvoltage','vbatmaxcellvoltage','vbatref','currentMeterOffset','currentMeterScale',...outputFields].includes(key)) continue;
          writeKV(key, val);
        }
      }
    }

    // Header row
    ws.write(fieldNames.map(name => `"${name}"`).join(',') + '\n');

    const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
    for (const chunk of chunks) {
      for (const frame of chunk.frames) {
        for (let i=0;i<frame.length;i++) if (frame[i] === null || frame[i] === undefined) frame[i] = 'NaN';
        ws.write(frame.join(',') + '\n');
      }
    }
    ws.end();
  });
}

async function generateJSONStream(flightLog, fieldNames, sysConfig, minTime, maxTime, outputFile, logIdx = 0, totalLogs = 1) {
  await new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(outputFile, { encoding: 'utf8', highWaterMark: 1<<20 });
    ws.on('error', reject);
    ws.on('finish', resolve);

    const metadata = {
      product: "Blackbox flight data recorder by Nicholas Sherlock",
      firmware: {},
      craft: {},
      config: {},
      flightInfo: { logIndex: logIdx, totalLogs, logNumber: logIdx + 1 }
    };

    if (sysConfig) {
      if (sysConfig.firmwareType !== undefined) metadata.firmware.type = sysConfig.firmwareType;
      if (sysConfig.firmware) metadata.firmware.version = sysConfig.firmware;
      if (sysConfig.firmwarePatch !== undefined) metadata.firmware.patch = sysConfig.firmwarePatch;
      if (sysConfig.firmwareVersion) metadata.firmware.fullVersion = sysConfig.firmwareVersion;
      if (sysConfig['Firmware revision']) metadata.firmware.revision = sysConfig['Firmware revision'];
      if (sysConfig['Firmware date']) metadata.firmware.date = sysConfig['Firmware date'];
      if (sysConfig['Board information']) metadata.craft.board = sysConfig['Board information'];
      if (sysConfig['Craft name']) metadata.craft.name = sysConfig['Craft name'];
      if (sysConfig['Log start datetime']) metadata.craft.logStartTime = sysConfig['Log start datetime'];
      for (const key in sysConfig) {
        if (sysConfig.hasOwnProperty(key) && !['Firmware revision', 'Firmware date', 'Board information', 'Craft name', 'Log start datetime'].includes(key)) {
          metadata.config[key] = sysConfig[key];
        }
      }
    }

    // Begin JSON stream
    ws.write('{');
    ws.write(`"metadata":${JSON.stringify({ ...metadata, })},`);
    ws.write(`"fields":${JSON.stringify(fieldNames.map((name, index) => ({ name, index })))},`);
    // Stream frames
    ws.write('"frames":[');
    let first = true;
    const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
    let frameCount = 0;
    for (const chunk of chunks) {
      for (const frame of chunk.frames) {
        const cleaned = frame.map(val => (val === null || val === undefined) ? null : val);
        if (!first) ws.write(',');
        ws.write(JSON.stringify(cleaned));
        first = false;
        frameCount++;
      }
    }
    const duration = ((maxTime - minTime) / 1000000);
    const stats = { duration, frameCount, fieldCount: fieldNames.length, totalFrames: frameCount, sampleRate: duration > 0 ? Math.round(frameCount / duration) : 0 };
    ws.write(`],"stats":${JSON.stringify(stats)}}`);
    ws.end();
  });
}

async function generateBinaryStream(flightLog, fieldNames, sysConfig, minTime, maxTime, outputFile, logIdx = 0, totalLogs = 1) {
  await new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(outputFile);
    ws.on('error', reject);
    ws.on('finish', resolve);

    const metadata = {
      headers: fieldNames,
      product: "Blackbox flight data recorder by Nicholas Sherlock",
      firmware: {},
      craft: {},
      config: {},
      flightInfo: { logIndex: logIdx, totalLogs, logNumber: logIdx + 1 }
    };

    if (sysConfig) {
      if (sysConfig.firmwareType !== undefined) metadata.firmware.type = sysConfig.firmwareType;
      if (sysConfig.firmware) metadata.firmware.version = sysConfig.firmware;
      if (sysConfig.firmwarePatch !== undefined) metadata.firmware.patch = sysConfig.firmwarePatch;
      if (sysConfig.firmwareVersion) metadata.firmware.fullVersion = sysConfig.firmwareVersion;
      if (sysConfig['Firmware revision']) metadata.firmware.revision = sysConfig['Firmware revision'];
      if (sysConfig['Firmware date']) metadata.firmware.date = sysConfig['Firmware date'];
      if (sysConfig['Board information']) metadata.craft.board = sysConfig['Board information'];
      if (sysConfig['Craft name']) metadata.craft.name = sysConfig['Craft name'];
      if (sysConfig['Log start datetime']) metadata.craft.logStartTime = sysConfig['Log start datetime'];
      for (const key in sysConfig) {
        if (sysConfig.hasOwnProperty(key) && !['Firmware revision', 'Firmware date', 'Board information', 'Craft name', 'Log start datetime'].includes(key)) {
          metadata.config[key] = sysConfig[key];
        }
      }
    }

    // Write JSON Header + Newline
    const headerStr = JSON.stringify(metadata);
    ws.write(headerStr);
    ws.write('\n');

    // Write Binary Data
    const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
    for (const chunk of chunks) {
      // Calculate buffer size for this chunk
      // chunk.frames is an array of arrays (rows)
      // Each row has fieldNames.length values
      // Each value is a Float32 (4 bytes)
      const numRows = chunk.frames.length;
      const numCols = fieldNames.length;
      const bufferSize = numRows * numCols * 4;
      const buffer = Buffer.allocUnsafe(bufferSize);
      
      let offset = 0;
      for (const frame of chunk.frames) {
        for (let i = 0; i < numCols; i++) {
          let val = frame[i];
          // Handle null/undefined/NaN -> 0 or NaN? 
          // Float32Array defaults to 0, but let's be explicit.
          // Standard CSV parser turns nulls into NaNs usually or empty strings.
          // Let's use 0 for null/undefined to be safe, or NaN if it was meant to be a number.
          if (val === null || val === undefined) val = 0; 
          // Ensure it's a number
          val = Number(val);
          
          buffer.writeFloatLE(val, offset);
          offset += 4;
        }
      }
      ws.write(buffer);
    }
    
    ws.end();
  });
}
