import { Readable } from 'stream';

import { JobStoreConfigError, getJob } from '../../_lib/jobStore.js';

export const config = { api: { bodyParser: false, responseLimit: false } };

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const jobId = String(req.query?.jobId || '').trim();
    if (!jobId) {
      return res.status(400).json({ error: 'Missing jobId' });
    }

    const job = await getJob(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'completed') {
      return res.status(409).json({ error: `Job is ${job.status}` });
    }

    if (!job.outputBlobUrl) {
      return res.status(500).json({ error: 'Missing job output location' });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined;
    const blobResponse = await fetch(job.outputBlobUrl, { headers });
    if (!blobResponse.ok || !blobResponse.body) {
      return res.status(502).json({ error: `Unable to fetch output blob (${blobResponse.status})` });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', job.outputContentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${job.outputFilename || 'blackbox.out'}"`);

    const readable = Readable.fromWeb(blobResponse.body);
    readable.on('error', () => {
      if (!res.writableEnded) {
        res.end();
      }
    });
    readable.pipe(res);
  } catch (err) {
    console.error('[/api/blackbox/jobs/result]', err);
    if (err instanceof JobStoreConfigError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || 'Failed to load job result' });
  }
}
