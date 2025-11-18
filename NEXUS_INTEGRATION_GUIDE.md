# Nexus Integration Guide: External GPLv3 Decoder (`bbl-decode`)

This guide shows how to integrate the external GPLv3 decoder CLI with your proprietary Electron-based Nexus application without bundling or linking the GPL code. Follow these steps to remain compliant while replacing previous in-backend conversion logic.

---
## 1. Overview
Previously: Nexus performed in-process parsing of `.bbl` flight logs.
Now: Nexus spawns an external decoder executable (`bbl-decode`) that converts a `.bbl` file to CSV or JSON. Nexus then ingests the resulting output file.

Key Principles:
- The decoder is NOT shipped inside your proprietary distribution.
- Invocation is strictly via an external process (no dynamic require / import / linking).
- Users obtain and install the decoder separately (see `COMPLIANCE_DISTRIBUTION_GUIDE.md`).
- Your app provides a UI + environment variable fallback for locating the decoder.

---
## 2. Decoder Installation (End-User)
Users install the decoder globally on their PC so it's available system-wide. Provide these instructions in your app's help/settings:

### Method 1: npm Global Install (Recommended)
```powershell
npm install -g betaflight-blackbox-explorer
```
After install, `bbl-decode` is automatically added to PATH and available from any terminal.

Verify installation:
```powershell
bbl-decode --help
```

### Method 2: Manual Install + PATH Setup
1. Download or clone the decoder repository.
2. In the decoder directory, run:
   ```powershell
   npm install
   npm link
   ```
3. `npm link` creates a global symlink; `bbl-decode` becomes available.

### Method 3: Manual PATH Addition (No npm)
1. Download/extract decoder to a permanent location (e.g., `C:\Tools\bbl-decoder\`).
2. Add that directory to your system PATH:
   - Windows: Settings → System → About → Advanced system settings → Environment Variables → edit `Path` → add `C:\Tools\bbl-decoder\bin`.
   - Restart terminal/app to pick up new PATH.
3. Verify: `bbl-decode --help`.

---
## 3. User Acquisition & License Disclosure (App-Side)
In your onboarding flow or a settings screen:
1. Explain that advanced log decoding requires an external open-source tool.
2. Link to the decoder repository + GPLv3 license text, plus installation instructions above.
3. Provide a button: "I have installed the decoder" which triggers path validation.
4. Show the third-party notice from `NOTICE_GPL_DECODER.txt` verbatim.

Do NOT download or auto-install the decoder silently; user consent ensures clear license acceptance.

---
## 4. Path Discovery Strategy
Resolution order at runtime (first success wins):
1. In-memory user setting (stored path from UI).
2. Environment variable `BBL_DECODER_PATH` (full file path).
3. Environment variable `BBL_DECODER_HOME` (directory containing the executable).
4. System `PATH` search for one of: `bbl-decode`, `bbl-decode.ps1`, `bbl-decode.cmd`.
5. (Optional) Last-used successful path cached in persistent settings.

Validation criteria:
- File exists and is executable (on Windows, a PowerShell script or CMD shim is acceptable).
- Running `bbl-decode --help` (or a dummy invocation with no args) returns a usage or non-zero error that still proves invocation (capture exit code, stderr).

---
## 5. Electron Architecture Placement
- Perform decoder spawning in the Electron Main Process (not Renderer) to avoid blocking UI and to improve security.
- Expose an IPC handler (e.g., `ipcMain.handle('decode-bbl', ...)`) that accepts: `{ inputPath, outputFormat }`.
- Renderer triggers the IPC call; Main Process resolves path and runs conversion.
- After completion, Main Process reads JSON (if requested) and sends parsed data back via IPC.

Optional: For very large logs, run the spawn logic inside a Worker Thread or a separate helper process (but usually spawning an external program is already isolated enough).

---
## 6. Conversion Flow
High-level sequence:
1. Validate input `.bbl` path (exists, readable).
2. Choose output format: `csv` or `json` (JSON recommended for structured ingestion).
3. Create a temp output file (e.g., using `fs.mkdtemp` + `path.join(tempDir, uniqueName)`).
4. Spawn decoder: `bbl-decode <input> <output> [--format json]`.
5. Wait for exit code; on `0` continue, else map error.
6. For JSON: stream or read file, parse; for CSV: either ingest line-by-line or offload to a worker for parsing.
7. Clean up temp files if desired (unless caching).

---
## 7. Node/Electron Code Examples

### 7.1 Path Resolution Helper (Main Process)
```js
// decoderPathResolver.js
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const CANDIDATE_FILENAMES = [
  'bbl-decode',          // Unix / global
  'bbl-decode.ps1',      // Windows PowerShell shim
  'bbl-decode.cmd'       // Windows CMD shim
];

function fileExists(p) {
  try { fs.accessSync(p, fs.constants.X_OK); return true; } catch { return false; }
}

function searchInPath() {
  const envPath = process.env.PATH || '';
  for (const dir of envPath.split(path.delimiter)) {
    for (const name of CANDIDATE_FILENAMES) {
      const full = path.join(dir, name);
      if (fileExists(full)) return full;
    }
  }
  return null;
}

export function resolveDecoderPath(userSettingPath) {
  if (userSettingPath && fileExists(userSettingPath)) return userSettingPath;

  const envFile = process.env.BBL_DECODER_PATH;
  if (envFile && fileExists(envFile)) return envFile;

  const envHome = process.env.BBL_DECODER_HOME;
  if (envHome) {
    for (const candidate of CANDIDATE_FILENAMES) {
      const full = path.join(envHome, candidate);
      if (fileExists(full)) return full;
    }
  }

  const fromPath = searchInPath();
  if (fromPath) return fromPath;

  throw new Error('Decoder executable not found. Set path in settings or environment.');
}

export function verifyDecoder(decoderPath) {
  const probe = spawnSync(decoderPath, ['--help'], { timeout: 4000 });
  if (probe.error) throw new Error(`Failed to execute decoder: ${probe.error.message}`);
  if (probe.status === null) throw new Error('Decoder help timed out.');
  // Non-zero is acceptable; presence of stdout/stderr indicates execution.
  return true;
}
```

### 7.2 Running a Conversion (Main Process)
```js
// decoderRunner.js
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveDecoderPath, verifyDecoder } from './decoderPathResolver.js';

function makeTempFile(ext = '.json') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bbl-')); 
  return path.join(dir, `out-${Date.now()}${ext}`);
}

export function decodeBbl({ inputPath, format = 'json', userDecoderPath }) {
  return new Promise((resolve, reject) => {
    try { fs.accessSync(inputPath, fs.constants.R_OK); } catch { return reject(new Error('Input file not readable')); }

    let decoderPath;
    try { decoderPath = resolveDecoderPath(userDecoderPath); verifyDecoder(decoderPath); }
    catch (e) { return reject(e); }

    const ext = format === 'csv' ? '.csv' : '.json';
    const outputPath = makeTempFile(ext);
    const args = [inputPath, outputPath];
    if (format === 'json') args.push('--format', 'json');

    const child = spawn(decoderPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderrBuf = '';
    child.stderr.on('data', d => { stderrBuf += d.toString(); });

    child.on('exit', code => {
      if (code !== 0) {
        return reject(new Error(`Decoder failed (exit ${code}). Stderr: ${stderrBuf.slice(0,500)}`));
      }
      try {
        if (format === 'json') {
          const raw = fs.readFileSync(outputPath, 'utf8');
          const parsed = JSON.parse(raw);
          return resolve({ format: 'json', outputPath, data: parsed });
        } else {
          // CSV: return path; parse downstream in worker if large.
          return resolve({ format: 'csv', outputPath });
        }
      } catch (e) {
        return reject(new Error(`Post-processing error: ${e.message}`));
      }
    });
    child.on('error', err => reject(new Error(`Spawn error: ${err.message}`)));
  });
}
```

### 7.3 IPC Wiring (Main Process)
```js
// in main.js
import { ipcMain } from 'electron';
import { decodeBbl } from './decoderRunner.js';

ipcMain.handle('decode-bbl', async (_event, { inputPath, format, userDecoderPath }) => {
  return await decodeBbl({ inputPath, format, userDecoderPath });
});
```

### 7.4 Renderer Usage
```js
// renderer.js
const result = await window.electron.invoke('decode-bbl', { inputPath, format: 'json' });
// result.data holds parsed JSON if format was json.
```

---
## 8. Progress & UX Considerations
- Large `.bbl` files can take time; show spinner or progress bar.
- Decoder does not stream structured progress; approximate via input file size vs elapsed time or add a timeout fallback message.
- Provide a cancel button: call `child.kill()` if user aborts (add PID tracking in `decodeBbl`).
- Surface stderr snippet on failure.

---
## 9. Error Handling Matrix
| Scenario | Detection | User Message | Action |
|----------|-----------|--------------|--------|
| Decoder missing | Path resolution throws | "Decoder not found. Configure path in Settings." | Open settings dialog |
| Input unreadable | accessSync fails | "Log file not readable." | Suggest checking permissions |
| Exit code != 0 | child exit code | "Decode failed (code X)." | Show stderr excerpt |
| JSON parse fail | JSON.parse throws | "Output corrupted or incomplete." | Offer retry |
| Timeout (optional) | manual timer | "Decoder taking longer than expected." | Allow cancel |

---
## 10. Security & Compliance Notes
- Never execute arbitrary user-provided paths without validation (ensure path is a file, not directory, and not inside disallowed locations).
- Treat decoder output as untrusted; validate JSON schema before deeper processing.
- Keep GPL separation: you do not bundle `bbl-decode`; you only spawn it.
- Reference docs: `COMPLIANCE_DISTRIBUTION_GUIDE.md`, `NOTICE_GPL_DECODER.txt`.
- If you later decide to aggregate, follow `DECODER_BUNDLE_LAYOUT.md`.

---
## 11. Performance Tips
- Prefer JSON format for structured ingestion (avoids CSV parse overhead).
- If using CSV for legacy reasons, parse in a worker to avoid blocking Electron main thread.
- Cache decoder path after first successful resolution.
- For repeated conversions, keep temporary directory and periodically clean.

---
## 12. Testing Checklist
1. Missing decoder path -> proper error.
2. Valid small `.bbl` -> fast JSON decode.
3. Large `.bbl` -> still responsive UI with spinner.
4. Simulated failure (rename executable mid-run) -> exit code error surfaced.
5. Stderr capture truncated safely.
6. JSON schema validation passes (fields: metadata, fields, frames, stats). 

---
## 13. Optional Enhancements
- Add a settings UI test button: "Validate Decoder" running `--help`.
- Add telemetry (non-personal) for conversion durations to refine UX.
- Implement streaming JSON ingestion if decoder later supports stdout streaming.
- Provide a fallback remote decoding service if local decoder absent.

---
## 14. Minimal License Notice Placement
Embed `NOTICE_GPL_DECODER.txt` contents in your app’s "About / Third-Party Licenses" view. Ensure it is displayed even if decoder not yet installed to inform user about potential usage.

---
## 15. Summary
You now outsource `.bbl` decoding to an external GPLv3 tool via a child process, maintaining clear legal separation while simplifying maintenance. All integration surfaces—path resolution, spawning, error handling, compliance, and UX—are covered above.
