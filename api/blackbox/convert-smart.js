import { prepareFlightLogPayload, writeCsvPayload, writeJsonPayload } from '../_lib/flightlogConversion.js';
import { normalizeFormat } from '../_lib/jobStore.js';
import { MultipartLimitError, getField, getUploadedBuffer, parseMultipart } from '../_lib/multipart.js';
import { getFlightLog } from '../_lib/setup.js';
import { constants as zlibConstants, createBrotliCompress, createGzip } from 'node:zlib';

export const config = { api: { bodyParser: false, responseLimit: false } };

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Idempotency-Key');
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

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fields, files } = await parseMultipart(req);

    const fileEntry = files.file;
    const fileBuffer = getUploadedBuffer(files, 'file');
    const format = normalizeFormat(getField(fields, 'format') ?? req.query?.format ?? 'csv');
    const logIndexRaw = getField(fields, 'logIndex') ?? req.query?.logIndex ?? '0';
    const logIndex = Math.max(0, Number.parseInt(String(logIndexRaw), 10) || 0);

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

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="blackbox.csv"');
    await writeCsvPayload(writer, payload);
    return writer.end();
  } catch (error) {
    console.error('[/api/blackbox/convert-smart]', error);

    if (error instanceof MultipartLimitError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    if (Number.isInteger(error?.statusCode)) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: error?.message || 'Smart conversion failed' });
  }
}
