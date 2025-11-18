#!/usr/bin/env node

/**
 * Simple CLI tool to convert Betaflight Blackbox .bbl files to CSV or JSON
 * Usage: node cli-convert.js <input.bbl> [output] [--format csv|json]
 */

import fs from 'fs';
import path from 'path';

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

if (!['csv', 'json'].includes(format)) {
  console.error(`Error: Invalid format '${format}'. Use 'csv' or 'json'.`);
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
      generateJSON(flightLog, fieldNames, sysConfig, minTime, maxTime, currentOutputFile, logIdx, logCount);
    } else {
      console.log('Generating CSV...');
      generateCSV(flightLog, fieldNames, sysConfig, minTime, maxTime, currentOutputFile);
    }
    
    console.log(`✓ Output: ${currentOutputFile} (${fs.statSync(currentOutputFile).size} bytes)`);
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

function generateCSV(flightLog, fieldNames, sysConfig, minTime, maxTime, outputFile) {
  // Add system config headers - output ALL fields from sysConfig
  let csv = '';
  csv += '"Product","Blackbox flight data recorder by Nicholas Sherlock"\n';
  
  // Add all system config values in the same order as the perfect sample
  if (sysConfig) {
    // Basic firmware info
    if (sysConfig.firmwareType !== undefined) csv += `"firmwareType",${sysConfig.firmwareType}\n`;
    if (sysConfig.firmware) csv += `"firmware","${sysConfig.firmware}"\n`;
    if (sysConfig.firmwarePatch !== undefined) csv += `"firmwarePatch",${sysConfig.firmwarePatch}\n`;
    if (sysConfig.firmwareVersion) csv += `"firmwareVersion","${sysConfig.firmwareVersion}"\n`;
    // Note: These fields use the exact header names with spaces as keys in sysConfig
    if (sysConfig['Firmware revision']) csv += `"Firmware revision","${sysConfig['Firmware revision']}"\n`;
    if (sysConfig['Firmware date']) csv += `"Firmware date","${sysConfig['Firmware date']}"\n`;
    if (sysConfig['Board information']) csv += `"Board information","${sysConfig['Board information']}"\n`;
    if (sysConfig['Log start datetime']) csv += `"Log start datetime","${sysConfig['Log start datetime']}"\n`;
    if (sysConfig['Craft name']) csv += `"Craft name","${sysConfig['Craft name']}"\n`;
    
    // Frame intervals
    if (sysConfig.frameIntervalI !== undefined) csv += `"frameIntervalI",${sysConfig.frameIntervalI}\n`;
    if (sysConfig.frameIntervalPNum !== undefined) csv += `"frameIntervalPNum",${sysConfig.frameIntervalPNum}\n`;
    if (sysConfig.frameIntervalPDenom !== undefined) csv += `"frameIntervalPDenom",${sysConfig.frameIntervalPDenom}\n`;
    
    // Throttle
    if (sysConfig.minthrottle !== undefined) csv += `"minthrottle",${sysConfig.minthrottle}\n`;
    if (sysConfig.maxthrottle !== undefined) csv += `"maxthrottle",${sysConfig.maxthrottle}\n`;
    
    // Gyro and motor
    if (sysConfig.gyroScale !== undefined) csv += `"gyroScale",${sysConfig.gyroScale}\n`;
    if (sysConfig.motorOutput) csv += `"motorOutput","${sysConfig.motorOutput.join(',')}"\n`;
    
    // Accelerometer and battery
    if (sysConfig.acc_1G !== undefined) csv += `"acc_1G",${sysConfig.acc_1G}\n`;
    if (sysConfig.vbatscale !== undefined) csv += `"vbatscale",${sysConfig.vbatscale}\n`;
    if (sysConfig.vbatmincellvoltage !== undefined) csv += `"vbatmincellvoltage",${sysConfig.vbatmincellvoltage}\n`;
    if (sysConfig.vbatwarningcellvoltage !== undefined) csv += `"vbatwarningcellvoltage",${sysConfig.vbatwarningcellvoltage}\n`;
    if (sysConfig.vbatmaxcellvoltage !== undefined) csv += `"vbatmaxcellvoltage",${sysConfig.vbatmaxcellvoltage}\n`;
    if (sysConfig.vbatref !== undefined) csv += `"vbatref",${sysConfig.vbatref}\n`;
    
    // Current meter
    if (sysConfig.currentMeterOffset !== undefined) csv += `"currentMeterOffset",${sysConfig.currentMeterOffset}\n`;
    if (sysConfig.currentMeterScale !== undefined) csv += `"currentMeterScale",${sysConfig.currentMeterScale}\n`;
    
    // Output ALL remaining sysConfig fields dynamically
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
    
    for (const field of outputFields) {
      const value = sysConfig[field];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          csv += `"${field}","${value.join(',')}"\n`;
        } else {
          csv += `"${field}",${value}\n`;
        }
      }
    }
    
    // Add any remaining fields not explicitly listed
    for (const key in sysConfig) {
      if (sysConfig.hasOwnProperty(key) && !csv.includes(`"${key}"`)) {
        const value = sysConfig[key];
        if (value !== undefined && value !== null && typeof value !== 'object') {
          csv += `"${key}",${value}\n`;
        } else if (Array.isArray(value)) {
          csv += `"${key}","${value.join(',')}"\n`;
        }
      }
    }
  }
  
  // Add field names (quoted) - no blank line before, perfect sample doesn't have one
  csv += fieldNames.map(name => `"${name}"`).join(',') + '\n';
  
  // Get all chunks and extract frames
  const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
  let rowCount = 0;
  
  for (const chunk of chunks) {
    for (const frame of chunk.frames) {
      // Convert null/undefined to NaN to match perfect sample format
      const cleanedFrame = frame.map(val => {
        if (val === null || val === undefined) {
          return 'NaN';
        }
        return val;
      });
      csv += cleanedFrame.join(',') + '\n';
      rowCount++;
    }
  }
  
  // Write output (remove trailing newline to match perfect sample format)
  csv = csv.trimEnd();  // Remove any trailing whitespace/newlines
  fs.writeFileSync(outputFile, csv);
}

function generateJSON(flightLog, fieldNames, sysConfig, minTime, maxTime, outputFile, logIdx = 0, totalLogs = 1) {
  const output = {
    metadata: {
      product: "Blackbox flight data recorder by Nicholas Sherlock",
      firmware: {},
      craft: {},
      config: {},
      flightInfo: {
        logIndex: logIdx,
        totalLogs: totalLogs,
        logNumber: logIdx + 1
      }
    },
    fields: fieldNames.map((name, index) => ({ name, index })),
    frames: [],
    stats: {
      duration: ((maxTime - minTime) / 1000000),
      frameCount: 0,
      fieldCount: fieldNames.length,
      totalFrames: 0,
      sampleRate: 0
    }
  };

  // Extract firmware info
  if (sysConfig) {
    if (sysConfig.firmwareType !== undefined) output.metadata.firmware.type = sysConfig.firmwareType;
    if (sysConfig.firmware) output.metadata.firmware.version = sysConfig.firmware;
    if (sysConfig.firmwarePatch !== undefined) output.metadata.firmware.patch = sysConfig.firmwarePatch;
    if (sysConfig.firmwareVersion) output.metadata.firmware.fullVersion = sysConfig.firmwareVersion;
    if (sysConfig['Firmware revision']) output.metadata.firmware.revision = sysConfig['Firmware revision'];
    if (sysConfig['Firmware date']) output.metadata.firmware.date = sysConfig['Firmware date'];
    
    // Craft info
    if (sysConfig['Board information']) output.metadata.craft.board = sysConfig['Board information'];
    if (sysConfig['Craft name']) output.metadata.craft.name = sysConfig['Craft name'];
    if (sysConfig['Log start datetime']) output.metadata.craft.logStartTime = sysConfig['Log start datetime'];
    
    // All config values
    for (const key in sysConfig) {
      if (sysConfig.hasOwnProperty(key) && 
          !['Firmware revision', 'Firmware date', 'Board information', 'Craft name', 'Log start datetime'].includes(key)) {
        output.metadata.config[key] = sysConfig[key];
      }
    }
  }

  // Get all chunks and extract frames
  const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
  
  for (const chunk of chunks) {
    for (const frame of chunk.frames) {
      // Convert null/undefined to null for JSON (more appropriate than "NaN" string)
      const cleanedFrame = frame.map(val => (val === null || val === undefined) ? null : val);
      output.frames.push(cleanedFrame);
      output.stats.frameCount++;
    }
  }
  
  // Calculate stats
  output.stats.totalFrames = output.stats.frameCount;
  if (output.stats.duration > 0) {
    output.stats.sampleRate = Math.round(output.stats.frameCount / output.stats.duration);
  }

  // Write JSON output
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf8');
}
