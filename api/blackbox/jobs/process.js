import { getJob, JobStoreConfigError } from '../../_lib/jobStore.js';
import { runJob } from '../../_lib/jobProcessor.js';

export const config = { api: { bodyParser: false } };

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const jobId = String(req.query?.jobId || '').trim();
    if (!jobId) {
      return res.status(400).json({ error: 'Missing jobId' });
    }

    const existing = await getJob(jobId);
    if (!existing) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = await runJob(jobId);
    return res.status(200).json({
      jobId: job.jobId,
      status: job.status,
      error: job.error,
      completedAt: job.completedAt,
    });
  } catch (err) {
    console.error('[/api/blackbox/jobs/process]', err);
    if (err instanceof JobStoreConfigError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    if (err?.statusCode === 429) {
      const jobId = String(req.query?.jobId || '').trim();
      const latest = jobId ? await getJob(jobId) : null;
      return res.status(429).json({
        error: err.message,
        jobId: latest?.jobId,
        status: latest?.status,
        attempts: latest?.attempts,
        nextRetryAt: latest?.nextRetryAt,
      });
    }
    return res.status(err?.statusCode || 500).json({ error: err?.message || 'Job processing failed' });
  }
}
