#!/usr/bin/env node
/**
 * CommonJS entry point for bundled decoder.
 * Bundled via esbuild into dist/cli-convert.cjs.
 */
const fs = require('fs');
const path = require('path');

// Stub browser globals expected by parser code
global.window = { requestAnimationFrame: (cb) => setTimeout(cb, 16) };
global.document = { createElement: () => ({ getContext: () => null }) };
// Minimal jQuery-like stub
global.$ = function() { return { length:0, addClass(){return this;}, removeClass(){return this;}, toggleClass(){return this;}, css(){return this;}, html(){return this;}, text(){return this;}, show(){return this;}, hide(){return this;}, on(){return this;}, off(){return this;} }; };
global.$.extend = Object.assign;
// Semver helpers used in parser conditionals
global.semver = {
  gte: (v1,v2)=>{const p=v=>v.split('.').map(x=>parseInt(x)||0);const a=p(v1),b=p(v2);for(let i=0;i<3;i++){if(a[i]>b[i])return true;if(a[i]<b[i])return false;}return true;},
  lte: (v1,v2)=>!global.semver.gt(v1,v2),
  gt: (v1,v2)=>{const p=v=>v.split('.').map(x=>parseInt(x)||0);const a=p(v1),b=p(v2);for(let i=0;i<3;i++){if(a[i]>b[i])return true;if(a[i]<b[i])return false;}return false;},
  lt: (v1,v2)=>!global.semver.gte(v1,v2)
};

const { FlightLog } = require('./src/flightlog.js');

const pkg = require('./package.json');
const args = process.argv.slice(2);
// Semantic release tag (provided by workflow env) falls back to package version
const releaseTag = process.env.DECODER_RELEASE_TAG || `v${pkg.version}`;

if (args.includes('--version')) {
  console.log(releaseTag);
  process.exit(0);
}

if (args.length === 0 || args.includes('--help')) {
  console.log(`\nECHO CORP Blackbox Decoder ${releaseTag}\n\nUsage: bbl-decode <input.bbl> [output] [--format csv|json] [--split] [--log N]\n`);
  process.exit(0);
}

// Parse flags
const takeFlag = (name) => { const i=args.indexOf(name); if(i!==-1){ const val=args[i+1]; args.splice(i, val?2:1); return val||true; } return null; };
let format = (takeFlag('--format')||'csv').toLowerCase();
let splitFlights = Boolean(takeFlag('--split'));
let specificLogRaw = takeFlag('--log');
let specificLog = specificLogRaw!=null ? parseInt(specificLogRaw,10) : null;

if(!['csv','json'].includes(format)){ console.error(`Invalid format '${format}'`); process.exit(1); }

const inputFile = args[0];
if(!inputFile){ console.error('Input .bbl file required'); process.exit(1); }
if(!fs.existsSync(inputFile)){ console.error('Input file not found: '+inputFile); process.exit(1); }
const defaultExt = format==='json'?'.json':'.csv';
const outputFile = args[1] || inputFile.replace(/\.bbl$/i, defaultExt);

try {
  const fileData = fs.readFileSync(inputFile);
  const flightLog = new FlightLog(fileData);
  const logCount = flightLog.getLogCount();
  if(logCount===0){ console.error('No valid logs found'); process.exit(1); }
  let logsToProcess = [];
  if(specificLog!=null){ if(specificLog<0||specificLog>=logCount){ console.error('Log index out of range'); process.exit(1);} logsToProcess=[specificLog]; }
  else if(splitFlights){ logsToProcess = Array.from({length:logCount}, (_,i)=>i); }
  else { logsToProcess=[0]; }

  for(const idx of logsToProcess){
    if(!flightLog.openLog(idx)){ console.warn('Failed to open log', idx, flightLog.getLogError(idx)); continue; }
    const fieldNames = flightLog.getMainFieldNames();
    const stats = flightLog.getStats();
    const minTime = flightLog.getMinTime();
    const maxTime = flightLog.getMaxTime();
    let outName = outputFile;
    if(splitFlights && logCount>1){ const base=outputFile.replace(/\.(csv|json)$/i,''); const ext=format==='json'?'.json':'.csv'; outName = `${base}-flight${idx+1}${ext}`; }

    if(format==='json') {
      const jsonOut = buildJSON(flightLog, fieldNames, minTime, maxTime, idx, logCount);
      fs.writeFileSync(outName, JSON.stringify(jsonOut,null,2));
    } else {
      const csvOut = buildCSV(flightLog, fieldNames, minTime, maxTime);
      fs.writeFileSync(outName, csvOut);
    }
    console.log('✓ Output', outName);
  }
  console.log('✓ Success');
} catch(err){
  console.error('Conversion failed:', err.message);
  process.exit(1);
}

function buildCSV(flightLog, fieldNames, minTime, maxTime){
  let csv = fieldNames.map(n=>`"${n}"`).join(',')+'\n';
  const chunks = flightLog.getChunksInTimeRange(minTime,maxTime);
  for(const chunk of chunks){
    for(const frame of chunk.frames){
      const cleaned = frame.map(v => (v==null?'NaN':v));
      csv += cleaned.join(',')+'\n';
    }
  }
  return csv.trimEnd();
}
function buildJSON(flightLog, fieldNames, minTime, maxTime, logIdx, totalLogs){
  const out={fields: fieldNames.map((n,i)=>({name:n,index:i})), frames: [], meta:{logIndex:logIdx,totalLogs,logNumber:logIdx+1}};
  const chunks = flightLog.getChunksInTimeRange(minTime,maxTime);
  for(const chunk of chunks){ for(const frame of chunk.frames){ out.frames.push(frame.map(v=> (v==null?null:v))); } }
  return out;
}
