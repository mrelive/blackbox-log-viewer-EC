/**
 * /api/blackbox/convert
 *
 * POST  multipart/form-data
 *   file       - BBL/BFL file (required)
 *   logIndex   - 0-based log index to decode (optional, default 0)
 *
 * Query params:
 *   format     - "csv" (default) | "json"
 *
 * Response (format=csv): text/csv
 * Response (format=json): application/json { fields, frames, sysConfig, logCount, logIndex }
 */

import { getFlightLog } from '../_lib/setup.js';
import { prepareFlightLogPayload, writeCsvPayload, writeJsonPayload } from '../_lib/flightlogConversion.js';
import { MultipartLimitError, getField, getUploadedBuffer, parseMultipart } from '../_lib/multipart.js';
import { constants as zlibConstants, createBrotliCompress, createGzip } from 'node:zlib';

// Disable Vercel's default body parser so busboy can read the raw stream.
export const config = { api: { bodyParser: false, responseLimit: '50mb' } };

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

function createResponseWriter(req, res) {
  const accepted = String(req.headers['accept-encoding'] || '').toLowerCase();
  res.setHeader('Vary', 'Accept-Encoding');

  if (accepted.includes('br')) {
    res.setHeader('Content-Encoding', 'br');
    const stream = createBrotliCompress({
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 4,
      },
    });
    stream.pipe(res);
    return stream;
  }

  if (accepted.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
    const stream = createGzip({ level: 6 });
    stream.pipe(res);
    return stream;
  }

  return res;
}

function normalizeFormat(input) {
  return String(input ?? 'csv').toLowerCase() === 'json' ? 'json' : 'csv';
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fields, files } = await parseMultipart(req);

    const fileBuffer = getUploadedBuffer(files, 'file');

    const logIndexRaw = getField(fields, 'logIndex') ?? req.query?.logIndex ?? '0';
    const logIndex = Math.max(0, parseInt(logIndexRaw, 10) || 0);

    const format = normalizeFormat(req.query?.format ?? getField(fields, 'format') ?? 'csv');

    const FlightLog = await getFlightLog();
    const payload = prepareFlightLogPayload(FlightLog, fileBuffer, logIndex);
    const writer = createResponseWriter(req, res);
    res.setHeader('X-BBL-Log-Count', String(payload.logCount || 1));
    res.setHeader('X-BBL-Selected-Log-Index', String(payload.logIndex || 0));

    if (format === 'json') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      await writeJsonPayload(writer, payload);
      return writer.end();
    }

    // Default CSV stream response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="blackbox.csv"');
    await writeCsvPayload(writer, payload);
    return writer.end();

  } catch (err) {
    console.error('[/api/blackbox/convert]', err);
    if (err instanceof MultipartLimitError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    if (Number.isInteger(err?.statusCode)) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || 'Conversion failed' });
  }
}
