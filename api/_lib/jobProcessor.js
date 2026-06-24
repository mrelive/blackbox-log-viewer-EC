import { createReadStream, createWriteStream } from 'fs';
import { mkdtemp, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

import { getFlightLog } from './setup.js';
import { prepareFlightLogPayload, writeCsvPayload, writeJsonPayload } from './flightlogConversion.js';
import {
  acquireJobLock,
  computeRetryDelayMs,
  getJob,
  getJobMaxAttempts,
  readBlobBuffer,
  releaseJobLock,
  storeJobOutput,
  updateJob,
} from './jobStore.js';

async function finalizeWritable(writable) {
  await new Promise((resolve, reject) => {
    writable.on('finish', resolve);
    writable.on('error', reject);
    writable.end();
  });
}

export async function runJob(jobId) {
  const existing = await getJob(jobId);
  if (!existing) {
    const err = new Error('Job not found');
    err.statusCode = 404;
    throw err;
  }

  if (existing.status === 'completed') {
    return existing;
  }

  if (existing.status === 'processing') {
    return existing;
  }

  const maxAttempts = getJobMaxAttempts();
  const attempts = Number(existing.attempts || 0);
  if (existing.status === 'failed' && attempts >= maxAttempts) {
    return existing;
  }

  if (existing.status === 'failed' && existing.nextRetryAt) {
    const retryAtMs = Date.parse(existing.nextRetryAt);
    if (Number.isFinite(retryAtMs) && Date.now() < retryAtMs) {
      const err = new Error(`Job backoff active until ${existing.nextRetryAt}`);
      err.statusCode = 429;
      throw err;
    }
  }

  const lockOwner = await acquireJobLock(jobId, `proc-${Date.now()}`);
  if (!lockOwner) {
    const latest = await getJob(jobId);
    return latest || existing;
  }

  let workDir = null;
  try {
    const processing = await updateJob(jobId, {
      status: 'processing',
      error: null,
      nextRetryAt: null,
      attempts: attempts + 1,
      processorId: lockOwner,
      startedAt: new Date().toISOString(),
    });

    const fileBuffer = await readBlobBuffer(processing.inputBlobUrl);

    const FlightLog = await getFlightLog();
    const payload = prepareFlightLogPayload(FlightLog, fileBuffer, processing.logIndex);

    const ext = processing.format === 'json' ? 'json' : 'csv';
    const contentType = processing.format === 'json' ? 'application/json; charset=utf-8' : 'text/csv; charset=utf-8';

    workDir = await mkdtemp(join(tmpdir(), 'bbl-job-'));
    const outputPath = join(workDir, `output.${ext}`);
    const writable = createWriteStream(outputPath, { encoding: 'utf8' });

    if (processing.format === 'json') {
      await writeJsonPayload(writable, payload);
    } else {
      await writeCsvPayload(writable, payload);
    }
    await finalizeWritable(writable);

    const blob = await storeJobOutput(jobId, {
      streamOrBuffer: createReadStream(outputPath),
      contentType,
      filename: `blackbox.${ext}`,
    });

    return await updateJob(jobId, {
      status: 'completed',
      outputBlobUrl: blob.url,
      outputContentType: contentType,
      outputFilename: `blackbox.${ext}`,
      completedAt: new Date().toISOString(),
      error: null,
      nextRetryAt: null,
      processorId: null,
    });
  } catch (error) {
    const latest = await getJob(jobId);
    const latestAttempts = Number(latest?.attempts || attempts || 0);
    const retryDelayMs = computeRetryDelayMs(latestAttempts || 1);
    const nextRetryAt = new Date(Date.now() + retryDelayMs).toISOString();

    await updateJob(jobId, {
      status: 'failed',
      error: error?.message || 'Job failed',
      nextRetryAt,
      processorId: null,
    });
    throw error;
  } finally {
    await releaseJobLock(jobId, lockOwner).catch(() => {});
    if (workDir) {
      await rm(workDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}
