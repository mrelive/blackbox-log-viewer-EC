# Blackbox Decoder CLI — Installation Guide

This guide shows how to install the `bbl-decode` command globally on your PC so it's available from any terminal or application.

---
## ⚡ Easiest Method: Double-Click Installer (Windows)

**For non-technical users:**

1. **Download or extract** this decoder to a folder (e.g., `Downloads\bbl-decoder\`)
2. **Double-click** `install.bat`
3. Follow the prompts

The installer will:
- Check if Node.js is installed (opens download page if missing)
- Install all dependencies automatically
- Make `bbl-decode` available globally
- Verify everything works

**That's it!** After installation, your Nexus app can find the decoder automatically.

> **Note:** If you don't have Node.js yet, the installer will open nodejs.org for you. Install Node.js, then run `install.bat` again.

---
## Prerequisites (For Manual Methods Below)
- **Node.js 18+** (check with `node --version`)
- **npm** (included with Node.js; check with `npm --version`)

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/).

---
## Method 1: npm Global Install (For Technical Users)

### Windows
Open PowerShell or Command Prompt as Administrator (optional but recommended):
```powershell
npm install -g betaflight-blackbox-explorer
```

### macOS / Linux
```bash
sudo npm install -g betaflight-blackbox-explorer
```
(Use `sudo` if you get permission errors.)

### Verification
```powershell
bbl-decode --help
```
You should see usage instructions. If not, restart your terminal and try again.

---
## Method 2: Install from Local Clone (Developers)

### Step 1: Clone or Download
```powershell
git clone https://github.com/mrelive/blackbox-log-viewer-EC.git
cd blackbox-log-viewer-EC
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Link Globally
```powershell
npm link
```
This creates a global symlink to the local repository. Now `bbl-decode` is available system-wide and any changes you make to the repo will be reflected immediately.

### Verification
```powershell
bbl-decode --help
```

### Unlink (if needed)
```powershell
npm unlink -g betaflight-blackbox-explorer
```

---
## Method 3: Manual PATH Setup (No npm Global Install)

### Step 1: Extract to a Permanent Location
Download/clone the decoder and place it somewhere permanent, e.g.:
- Windows: `C:\Tools\bbl-decoder\`
- macOS/Linux: `/usr/local/bbl-decoder/` or `~/bbl-decoder/`

### Step 2: Install Dependencies Locally
```powershell
cd C:\Tools\bbl-decoder
npm install
```

### Step 3: Add to System PATH

#### Windows (GUI)
1. Open **Settings** → **System** → **About** → **Advanced system settings**.
2. Click **Environment Variables**.
3. Under **System variables**, select **Path** and click **Edit**.
4. Click **New** and add: `C:\Tools\bbl-decoder\bin`.
5. Click **OK** to save.
6. Restart any open terminals/apps.

#### Windows (PowerShell, current user only)
```powershell
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$currentPath;C:\Tools\bbl-decoder\bin", "User")
```
Restart terminal.

#### macOS / Linux (add to `.bashrc` / `.zshrc`)
```bash
export PATH="$PATH:/usr/local/bbl-decoder/bin"
```
Reload shell:
```bash
source ~/.bashrc  # or ~/.zshrc
```

### Verification
```powershell
bbl-decode --help
```

---
## Usage
Once installed, use the decoder from any terminal or from within applications:

### Convert to JSON (Recommended)
```powershell
bbl-decode input.bbl output.json --format json
```

### Convert to CSV
```powershell
bbl-decode input.bbl output.csv
```

### From Another App (e.g., Electron)
Apps spawn the decoder as a child process:
```js
const { spawn } = require('child_process');
const child = spawn('bbl-decode', ['input.bbl', 'output.json', '--format', 'json']);
```

See `NEXUS_INTEGRATION_GUIDE.md` for full integration details.

---
## Troubleshooting

### "bbl-decode: command not found"
- Ensure Node.js/npm are installed: `node --version`.
- Verify PATH includes npm global bin: `npm config get prefix` → should be in PATH.
- On Windows, restart terminal/IDE after install.
- On macOS/Linux, check `~/.npm-global/bin` or `/usr/local/bin` is in PATH.

### Permission Errors (npm install -g)
- Windows: Run PowerShell/CMD as Administrator.
- macOS/Linux: Use `sudo npm install -g ...`.

### "Cannot find module" at Runtime
- Ensure you ran `npm install` in the decoder directory before using it.

### Decoder Works Manually, But Not From App
- Check that the app's child process can see the same PATH.
- Provide explicit path via environment variable: `BBL_DECODER_PATH=C:\Tools\bbl-decoder\bin\bbl-decode.ps1`.

---
## Uninstall

### If Installed via npm Global
```powershell
npm uninstall -g betaflight-blackbox-explorer
```

### If Linked via npm Link
```powershell
npm unlink -g betaflight-blackbox-explorer
```

### If Added to PATH Manually
Remove the directory from your PATH environment variable (reverse Step 3 above).

---
## License
This decoder is licensed under **GPLv3**. See `LICENSE` for full text.

When used by proprietary applications, the decoder must remain a separate executable invoked via process spawn. See `COMPLIANCE_DISTRIBUTION_GUIDE.md` for details.

---
## Support
- Issues: [GitHub Issues](https://github.com/mrelive/blackbox-log-viewer-EC/issues)
- Documentation: See `NEXUS_INTEGRATION_GUIDE.md` for app integration details.
