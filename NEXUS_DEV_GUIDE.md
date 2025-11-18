# Nexus Development Guide: BBL Decoder Integration

**Quick Start for Developers**

This guide shows how to integrate the external `bbl-decode` CLI into the Nexus Electron app.

---

## 1. Overview

**What Changed:**
- **Before:** Nexus parsed `.bbl` files in-process using the parser modules directly.
- **Now:** Nexus spawns an external `bbl-decode` command that converts `.bbl` → JSON/CSV.

**Why:**
- Clean separation: GPL decoder stays external; Nexus remains proprietary.
- Simpler maintenance: Parser updates don't require Nexus changes.
- Better performance: Offload heavy parsing to separate process.

---

## 2. User Installation (Tell Users This)

**Easiest Method:**
1. Download the decoder from: https://github.com/mrelive/blackbox-log-viewer-EC
2. Extract and double-click `install.bat`
3. Done! The `bbl-decode` command is now globally available.

**Alternative (npm):**
```powershell
npm install -g betaflight-blackbox-explorer
```

---

## 3. Nexus Code Integration

### 3.1 Path Resolution (Main Process)

Create `src/decoder/pathResolver.js`:

```javascript
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CANDIDATES = ['bbl-decode', 'bbl-decode.ps1', 'bbl-decode.cmd'];

function fileExists(p) {
  try { fs.accessSync(p, fs.constants.X_OK); return true; } catch { return false; }
}

function searchPath() {
  const envPath = process.env.PATH || '';
  for (const dir of envPath.split(path.delimiter)) {
    for (const name of CANDIDATES) {
      const full = path.join(dir, name);
      if (fileExists(full)) return full;
    }
  }
  return null;
}

export function resolveDecoder(userPath) {
  // 1. User setting
  if (userPath && fileExists(userPath)) return userPath;
  
  // 2. BBL_DECODER_PATH env var
  const envPath = process.env.BBL_DECODER_PATH;
  if (envPath && fileExists(envPath)) return envPath;
  
  // 3. BBL_DECODER_HOME env var
  const envHome = process.env.BBL_DECODER_HOME;
  if (envHome) {
    for (const candidate of CANDIDATES) {
      const full = path.join(envHome, candidate);
      if (fileExists(full)) return full;
    }
  }
  
  // 4. System PATH
  const fromPath = searchPath();
  if (fromPath) return fromPath;
  
  throw new Error('Decoder not found. Please install bbl-decode.');
}
```

### 3.2 Conversion Runner (Main Process)

Create `src/decoder/runner.js`:

```javascript
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveDecoder } from './pathResolver.js';

function makeTempFile(ext = '.json') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bbl-'));
  return path.join(dir, `out-${Date.now()}${ext}`);
}

export function convertBbl({ inputPath, format = 'json', userDecoderPath }) {
  return new Promise((resolve, reject) => {
    // Validate input
    try {
      fs.accessSync(inputPath, fs.constants.R_OK);
    } catch {
      return reject(new Error('Input file not readable'));
    }

    // Find decoder
    let decoderPath;
    try {
      decoderPath = resolveDecoder(userDecoderPath);
    } catch (e) {
      return reject(e);
    }

    // Setup output
    const ext = format === 'csv' ? '.csv' : '.json';
    const outputPath = makeTempFile(ext);
    const args = [inputPath, outputPath];
    if (format === 'json') args.push('--format', 'json');

    // Spawn decoder
    const child = spawn(decoderPath, args, { 
      stdio: ['ignore', 'pipe', 'pipe'] 
    });

    let stderrBuf = '';
    child.stderr.on('data', d => { stderrBuf += d.toString(); });

    child.on('exit', code => {
      if (code !== 0) {
        const errMsg = stderrBuf.slice(0, 500);
        return reject(new Error(`Decoder failed (exit ${code}): ${errMsg}`));
      }

      try {
        if (format === 'json') {
          const raw = fs.readFileSync(outputPath, 'utf8');
          const data = JSON.parse(raw);
          return resolve({ format: 'json', outputPath, data });
        } else {
          return resolve({ format: 'csv', outputPath });
        }
      } catch (e) {
        return reject(new Error(`Parse error: ${e.message}`));
      }
    });

    child.on('error', err => {
      reject(new Error(`Spawn error: ${err.message}`));
    });
  });
}
```

### 3.3 IPC Handler (Main Process)

In your `main.js` or equivalent:

```javascript
import { ipcMain } from 'electron';
import { convertBbl } from './decoder/runner.js';

// Setup IPC handler
ipcMain.handle('decode-bbl', async (_event, { inputPath, format, userDecoderPath }) => {
  try {
    return await convertBbl({ inputPath, format, userDecoderPath });
  } catch (error) {
    throw error; // Will be caught by renderer
  }
});
```

### 3.4 Renderer Usage

In your renderer process:

```javascript
// Convert to JSON (recommended)
try {
  const result = await window.electron.invoke('decode-bbl', {
    inputPath: 'C:\\Users\\...\\flight.bbl',
    format: 'json'
  });
  
  // result.data contains parsed JSON:
  // { metadata: {...}, fields: [...], frames: [...], stats: {...} }
  console.log(`Converted ${result.data.frames.length} frames`);
  
  // Use the data...
  processFlightData(result.data);
  
} catch (error) {
  // Show error to user
  showError(`Failed to decode log: ${error.message}`);
}

// Or CSV (if you need CSV format)
try {
  const result = await window.electron.invoke('decode-bbl', {
    inputPath: 'C:\\Users\\...\\flight.bbl',
    format: 'csv'
  });
  
  // result.outputPath contains path to CSV file
  // Read and parse it as needed
  
} catch (error) {
  showError(`Failed to decode log: ${error.message}`);
}
```

---

## 4. Settings UI (Optional but Recommended)

Add a settings option for users to specify decoder path:

```javascript
// In settings dialog
<input 
  type="file" 
  id="decoderPath"
  placeholder="Auto-detect from PATH"
/>
<button onclick="testDecoder()">Test Decoder</button>

// Test function
async function testDecoder() {
  const customPath = document.getElementById('decoderPath').value;
  try {
    // Send test IPC to verify path works
    await window.electron.invoke('test-decoder', { decoderPath: customPath });
    showSuccess('Decoder found and working!');
  } catch (error) {
    showError(`Decoder test failed: ${error.message}`);
  }
}
```

Add test handler in main process:

```javascript
import { spawnSync } from 'node:child_process';
import { resolveDecoder } from './decoder/pathResolver.js';

ipcMain.handle('test-decoder', async (_event, { decoderPath }) => {
  const resolved = resolveDecoder(decoderPath);
  const result = spawnSync(resolved, ['--help'], { timeout: 3000 });
  if (result.error) throw new Error(`Cannot execute: ${result.error.message}`);
  return { path: resolved, working: true };
});
```

---

## 5. Error Handling

Common errors and user messages:

| Error | User Message | Action |
|-------|--------------|--------|
| "Decoder not found" | "Decoder not installed. Click here to download." | Link to decoder download |
| "Input file not readable" | "Cannot open log file. Check permissions." | File picker retry |
| Exit code != 0 | "Decode failed. File may be corrupted." | Show stderr excerpt |
| JSON parse error | "Decoder output invalid. Update decoder." | Link to update |

Example error handler:

```javascript
try {
  const result = await window.electron.invoke('decode-bbl', { inputPath, format: 'json' });
  return result.data;
} catch (error) {
  if (error.message.includes('not found')) {
    showInstallPrompt(); // Open decoder download page
  } else if (error.message.includes('not readable')) {
    showFileError();
  } else {
    showGenericError(error.message);
  }
  throw error;
}
```

---

## 6. Performance Tips

- **Prefer JSON:** Faster to parse than CSV; structured data.
- **Cache decoder path:** After first successful resolution, save to settings.
- **Show progress:** Large files take time; show spinner or progress estimate.
- **Worker threads:** For huge logs, parse JSON in a worker to keep UI responsive.

---

## 7. Testing Checklist

- [ ] Decoder not installed → clear error message
- [ ] Decoder in PATH → auto-detected
- [ ] Custom path in settings → used correctly
- [ ] Small .bbl file → fast conversion
- [ ] Large .bbl file (>100MB) → UI stays responsive
- [ ] Invalid .bbl file → graceful error
- [ ] Network drive file → works or clear error

---

## 8. JSON Output Structure

The decoder returns JSON in this format:

```json
{
  "metadata": {
    "firmwareType": "Betaflight",
    "firmwareRevision": "4.3.0",
    "craftName": "MyQuad",
    "loopTime": 125,
    ...
  },
  "fields": [
    { "name": "time", "index": 0 },
    { "name": "gyroADC[0]", "index": 1 },
    ...
  ],
  "frames": [
    [0, 1.2, 3.4, ...],  // Each frame is an array matching fields order
    [125, 1.3, 3.5, ...],
    ...
  ],
  "stats": {
    "totalFrames": 123456,
    "duration": 154.2,
    "sampleRate": 8000
  }
}
```

Access data:

```javascript
const { metadata, fields, frames } = result.data;

// Get field index
const gyroXIdx = fields.findIndex(f => f.name === 'gyroADC[0]');

// Read values
frames.forEach((frame, i) => {
  const time = frame[0];
  const gyroX = frame[gyroXIdx];
  // ... process data
});
```

---

## 9. Legal Compliance (Important!)

**DO NOT bundle the decoder with Nexus.**

In your Nexus distribution:
- Include a third-party notice (see `NOTICE_GPL_DECODER.txt` in decoder repo)
- Link to decoder download: https://github.com/mrelive/blackbox-log-viewer-EC
- Mention GPL license and that decoder is separate

**Why:** The decoder is GPLv3. Nexus is proprietary. Spawning as external process keeps them legally separate.

---

## 10. Quick Reference Commands

**User installs decoder:**
```powershell
# Extract decoder folder, then:
install.bat
```

**Test if decoder is installed:**
```powershell
bbl-decode --help
```

**Manual conversion (for testing):**
```powershell
bbl-decode flight.bbl output.json --format json
bbl-decode flight.bbl output.csv
```

---

## 11. Support & Updates

- Decoder repo: https://github.com/mrelive/blackbox-log-viewer-EC
- Issues: https://github.com/mrelive/blackbox-log-viewer-EC/issues
- Full integration guide: See `NEXUS_INTEGRATION_GUIDE.md` in decoder repo

---

## Quick Start Summary

1. **User installs decoder** (one-time): Extract → run `install.bat`
2. **Nexus finds decoder**: Auto-detect via PATH or user setting
3. **Nexus converts logs**: Spawn `bbl-decode`, get JSON back
4. **Nexus uses data**: Parse JSON and display to user

That's it! The decoder handles all the complex parsing; Nexus just spawns it and reads JSON.
