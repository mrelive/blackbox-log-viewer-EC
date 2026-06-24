import { randomUUID } from 'crypto';

import { put } from '@vercel/blob';
import { kv } from '@vercel/kv';

const JOB_KEY_PREFIX = 'bbl:job:';
const IDEMPOTENCY_KEY_PREFIX = 'bbl:idempotency:';
const JOB_LOCK_KEY_PREFIX = 'bbl:lock:';
const DEFAULT_JOB_TTL_SECONDS = 60 * 60 * 6;
const DEFAULT_JOB_MAX_ATTEMPTS = 3;
const DEFAULT_JOB_RETRY_BASE_MS = 3000;
const DEFAULT_JOB_RETRY_MAX_MS = 60000;

export class JobStoreConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'JobStoreConfigError';
    this.statusCode = 500;
  }
}

function ensureJobStoreConfigured() {
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const hasKvConfig = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

  if (!hasBlobToken || !hasKvConfig) {
    throw new JobStoreConfigError(
      'Async conversion is not configured. Set BLOB_READ_WRITE_TOKEN, KV_REST_API_URL, and KV_REST_API_TOKEN.'
    );
  }
}

function buildJobKey(jobId) {
  return `${JOB_KEY_PREFIX}${jobId}`;
}

function buildIdempotencyKey(value) {
  return `${IDEMPOTENCY_KEY_PREFIX}${value}`;
}

function buildJobLockKey(jobId) {
  return `${JOB_LOCK_KEY_PREFIX}${jobId}`;
}

function getJobTtlSeconds() {
  const raw = Number.parseInt(String(process.env.BBL_JOB_TTL_SECONDS ?? ''), 10);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return DEFAULT_JOB_TTL_SECONDS;
}

export function getJobLockTtlSeconds() {
  const raw = Number.parseInt(String(process.env.BBL_JOB_LOCK_TTL_SECONDS ?? ''), 10);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return 60;
}

export function getJobMaxAttempts() {
  const raw = Number.parseInt(String(process.env.BBL_JOB_MAX_ATTEMPTS ?? ''), 10);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return DEFAULT_JOB_MAX_ATTEMPTS;
}

export function getRetryBaseMs() {
  const raw = Number.parseInt(String(process.env.BBL_JOB_RETRY_BASE_MS ?? ''), 10);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return DEFAULT_JOB_RETRY_BASE_MS;
}

export function getRetryMaxMs() {
  const raw = Number.parseInt(String(process.env.BBL_JOB_RETRY_MAX_MS ?? ''), 10);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return DEFAULT_JOB_RETRY_MAX_MS;
}

export function computeRetryDelayMs(attemptNumber) {
  const exponent = Math.max(0, Number(attemptNumber || 1) - 1);
  const raw = getRetryBaseMs() * (2 ** exponent);
  return Math.min(raw, getRetryMaxMs());
}

function nowIso() {
  return new Date().toISOString();
}

export function normalizeFormat(input) {
  const format = String(input ?? 'csv').toLowerCase();
  if (format === 'json') return 'json';
  return 'csv';
}

export async function createJob({ filename, mimeType, format, logIndex, fileBuffer }) {
  ensureJobStoreConfigured();

  const jobId = randomUUID();
  const ext = format === 'json' ? 'json' : 'csv';
  const safeFile = filename || `upload-${jobId}.bbl`;

  const inputBlob = await put(`blackbox/jobs/${jobId}/input-${safeFile}`, fileBuffer, {
    access: 'private',
    contentType: mimeType || 'application/octet-stream',
    addRandomSuffix: false,
  });

  const record = {
    jobId,
    status: 'queued',
    format,
    logIndex,
    inputBlobUrl: inputBlob.url,
    outputBlobUrl: null,
    outputContentType: null,
    outputFilename: `blackbox.${ext}`,
    error: null,
    attempts: 0,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    completedAt: null,
  };

  await kv.set(buildJobKey(jobId), record, { ex: getJobTtlSeconds() });
  return record;
}

export async function getJobByIdempotencyKey(idempotencyKey) {
  ensureJobStoreConfigured();
  if (!idempotencyKey) return null;
  const mappedJobId = await kv.get(buildIdempotencyKey(idempotencyKey));
  if (!mappedJobId) return null;
  return getJob(String(mappedJobId));
}

export async function setIdempotencyMapping(idempotencyKey, jobId) {
  ensureJobStoreConfigured();
  if (!idempotencyKey || !jobId) return;
  await kv.set(buildIdempotencyKey(idempotencyKey), jobId, { ex: getJobTtlSeconds() });
}

export async function getJob(jobId) {
  ensureJobStoreConfigured();
  if (!jobId) return null;
  return kv.get(buildJobKey(jobId));
}

export async function updateJob(jobId, patch) {
  const existing = await getJob(jobId);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...patch,
    updatedAt: nowIso(),
  };

  await kv.set(buildJobKey(jobId), updated, { ex: getJobTtlSeconds() });
  return updated;
}

export async function acquireJobLock(jobId, lockOwner) {
  ensureJobStoreConfigured();
  const lockKey = buildJobLockKey(jobId);
  const owner = lockOwner || randomUUID();
  const acquired = await kv.set(lockKey, owner, {
    nx: true,
    ex: getJobLockTtlSeconds(),
  });
  return acquired ? owner : null;
}

export async function releaseJobLock(jobId, lockOwner) {
  ensureJobStoreConfigured();
  const lockKey = buildJobLockKey(jobId);
  const currentOwner = await kv.get(lockKey);
  if (currentOwner && String(currentOwner) === String(lockOwner)) {
    await kv.del(lockKey);
    return true;
  }
  return false;
}

export async function storeJobOutput(jobId, { streamOrBuffer, contentType, filename }) {
  ensureJobStoreConfigured();

  const outputBlob = await put(`blackbox/jobs/${jobId}/output-${filename}`, streamOrBuffer, {
    access: 'private',
    contentType,
    addRandomSuffix: false,
  });

  return outputBlob;
}

export async function readBlobBuffer(blobUrl) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;
  const response = await fetch(blobUrl, { headers });
  if (!response.ok) {
    throw new Error(`Unable to fetch blob content (${response.status})`);
  }
  const arr = await response.arrayBuffer();
  return Buffer.from(arr);
}
