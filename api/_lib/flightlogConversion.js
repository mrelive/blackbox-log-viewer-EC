import { once } from 'events';

export async function writeChunk(writable, chunk) {
  if (writable.write(chunk)) return;
  await once(writable, 'drain');
}

export function prepareFlightLogPayload(FlightLog, fileBuffer, requestedLogIndex) {
  const logIndex = Math.max(0, Number.parseInt(String(requestedLogIndex ?? '0'), 10) || 0);
  const flightLog = new FlightLog(fileBuffer);
  const logCount = flightLog.getLogCount();

  if (!logCount) {
    const err = new Error('No valid logs found in file');
    err.statusCode = 422;
    throw err;
  }

  const idx = Math.min(logIndex, logCount - 1);
  if (!flightLog.openLog(idx)) {
    const logError = flightLog.getLogError ? flightLog.getLogError(idx) : 'unknown';
    const err = new Error(`Failed to open log ${idx}: ${logError}`);
    err.statusCode = 422;
    throw err;
  }

  return {
    flightLog,
    logCount,
    logIndex: idx,
    fieldNames: flightLog.getMainFieldNames(),
    sysConfig: flightLog.getSysConfig(),
    minTime: flightLog.getMinTime(),
    maxTime: flightLog.getMaxTime(),
  };
}

function serializeCsvHeader(fieldNames, sysConfig) {
  const rows = [];
  rows.push('"Product","Blackbox flight data recorder by Nicholas Sherlock"');

  if (sysConfig && typeof sysConfig === 'object') {
    for (const key of Object.keys(sysConfig)) {
      const v = sysConfig[key];
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        rows.push(`"${key}","${v.join(',')}"`);
      } else if (typeof v === 'string') {
        rows.push(`"${key}","${v.replace(/"/g, '""')}"`);
      } else {
        rows.push(`"${key}",${v}`);
      }
    }
  }

  rows.push(fieldNames.map((n) => `"${n}"`).join(','));
  return `${rows.join('\n')}\n`;
}

export async function writeCsvPayload(writable, payload) {
  const { flightLog, fieldNames, sysConfig, minTime, maxTime } = payload;
  await writeChunk(writable, serializeCsvHeader(fieldNames, sysConfig));

  const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
  for (const chunk of chunks) {
    for (const frame of chunk.frames) {
      await writeChunk(writable, `${frame.map((v) => (v == null ? 'NaN' : v)).join(',')}\n`);
    }
  }
}

export async function writeJsonPayload(writable, payload) {
  const { flightLog, fieldNames, sysConfig, minTime, maxTime, logCount, logIndex } = payload;

  await writeChunk(writable, '{"fields":');
  await writeChunk(writable, JSON.stringify(fieldNames));
  await writeChunk(writable, ',"frames":[');

  let isFirstFrame = true;
  const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
  for (const chunk of chunks) {
    for (const frame of chunk.frames) {
      const serialized = JSON.stringify(frame.map((v) => (v == null ? null : v)));
      if (isFirstFrame) {
        await writeChunk(writable, serialized);
        isFirstFrame = false;
      } else {
        await writeChunk(writable, ',');
        await writeChunk(writable, serialized);
      }
    }
  }

  await writeChunk(writable, '],"sysConfig":');
  await writeChunk(writable, JSON.stringify(sysConfig));
  await writeChunk(writable, ',"logCount":');
  await writeChunk(writable, String(logCount));
  await writeChunk(writable, ',"logIndex":');
  await writeChunk(writable, String(logIndex));
  await writeChunk(writable, '}');
}
