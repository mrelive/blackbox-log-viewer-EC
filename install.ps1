# Blackbox Decoder - Simple Installer
# This script installs the bbl-decode command globally on your PC

Write-Host "" 
Write-Host '========================================' -ForegroundColor Cyan
Write-Host '  Blackbox Decoder Installer' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host 'Checking for Node.js...' -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js not detected"
    }
} catch {
    Write-Host 'ERROR: Node.js is not installed!' -ForegroundColor Red
    Write-Host "" 
    Write-Host 'Node.js is required to run the decoder.' -ForegroundColor Yellow
    Write-Host 'Please install Node.js from: https://nodejs.org/' -ForegroundColor Cyan
    Write-Host ""
    Write-Host 'Press any key to open the Node.js website...' -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    Start-Process "https://nodejs.org/"
    Write-Host "" 
    Write-Host 'After installing Node.js, run this installer again.' -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Check npm
Write-Host 'Checking for npm...' -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "npm found: $npmVersion" -ForegroundColor Green
    } else {
        throw "npm not detected"
    }
} catch {
    Write-Host 'ERROR: npm is not available!' -ForegroundColor Red
    Write-Host 'npm should come with Node.js. Please reinstall Node.js.' -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Install dependencies locally first
Write-Host "" 
Write-Host 'Installing decoder dependencies...' -ForegroundColor Yellow
try {
    npm install --silent 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host 'Dependencies installed' -ForegroundColor Green
    } else {
        throw "npm install failed"
    }
} catch {
    Write-Host 'ERROR: Failed to install dependencies' -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    pause
    exit 1
}

# Prepare global install (clean stale shims and retry on EBUSY)
Write-Host "" 
Write-Host 'Installing bbl-decode globally...' -ForegroundColor Yellow
Write-Host 'This makes the decoder available system-wide' -ForegroundColor Gray
Write-Host ""

function Remove-StaleShims {
    param(
        [string]$ToolBaseName = 'bbl-decode'
    )
    try {
        # npm global bin dir (most reliable)
        $globalBin = (npm bin -g 2>$null)
        if ($globalBin -and (Test-Path $globalBin)) {
            Get-ChildItem -Path $globalBin -Filter "$ToolBaseName*" -ErrorAction SilentlyContinue | ForEach-Object {
                Write-Host "  - Removing stale shim: $($_.FullName)" -ForegroundColor Gray
                Remove-Item -Force -ErrorAction SilentlyContinue $_.FullName
            }
        }

        # Common Windows locations
        $appdataNpm = Join-Path $env:APPDATA 'npm'
        if (Test-Path $appdataNpm) {
            Get-ChildItem -Path $appdataNpm -Filter "$ToolBaseName*" -ErrorAction SilentlyContinue | ForEach-Object {
                Write-Host "  - Removing stale shim: $($_.FullName)" -ForegroundColor Gray
                Remove-Item -Force -ErrorAction SilentlyContinue $_.FullName
            }
        }

        # nvm-managed node dir for current version
        $nodeVerRaw = (node -v 2>$null)
        if ($nodeVerRaw) {
            $nodeVer = $nodeVerRaw.Trim().TrimStart('v')
            $nvmDir = Join-Path $env:LOCALAPPDATA 'nvm'
            $nvmNodeDir = Join-Path $nvmDir ("v$nodeVer")
            if (Test-Path $nvmNodeDir) {
                Get-ChildItem -Path $nvmNodeDir -Filter "$ToolBaseName*" -ErrorAction SilentlyContinue | ForEach-Object {
                    Write-Host "  - Removing stale shim: $($_.FullName)" -ForegroundColor Gray
                    Remove-Item -Force -ErrorAction SilentlyContinue $_.FullName
                }
            }
        }
    } catch {
        Write-Host "  ! Warning cleaning shims: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Unlink any previous global link of this package
try {
    Write-Host 'Cleaning previous global install...' -ForegroundColor Yellow
    npm unlink -g betaflight-blackbox-explorer 2>$null | Out-Null
} catch { }

# First attempt
$linkSucceeded = $false
$maxAttempts = 3
for ($i=1; $i -le $maxAttempts -and -not $linkSucceeded; $i++) {
    try {
        if ($i -gt 1) {
            Write-Host "Retry attempt $i of $maxAttempts..." -ForegroundColor Yellow
        }
        # Clean stale shims before retry
        Remove-StaleShims

        # Prefer npm install -g . for a stable global install; fallback to npm link
        $output = npm install -g . 2>&1
        if ($LASTEXITCODE -ne 0) {
            # Fallback to link if install -g fails (e.g., permission issues)
            $output = npm link 2>&1
        }

        if ($LASTEXITCODE -eq 0) {
            $linkSucceeded = $true
            break
        } else {
            if ($output -match 'EBUSY' -or $output -match 'EPERM' -or $output -match 'resource busy') {
                Write-Host 'Encountered a lock (EBUSY/EPERM). Cleaning and retrying...' -ForegroundColor Yellow
                Start-Sleep -Seconds 2
                continue
            } else {
                throw "npm global install failed: $output"
            }
        }
    } catch {
        if ($i -ge $maxAttempts) {
            Write-Host 'ERROR: Installation failed' -ForegroundColor Red
            Write-Host "Error: $_" -ForegroundColor Red
            Write-Host "" 
            Write-Host 'You may need to run this installer as Administrator.' -ForegroundColor Yellow
            Write-Host "Right-click install.bat and select 'Run as administrator'" -ForegroundColor Yellow
            Write-Host ""
            pause
            exit 1
        } else {
            Start-Sleep -Seconds 2
        }
    }
}

if ($linkSucceeded) {
    Write-Host 'Decoder installed successfully!' -ForegroundColor Green
}

# Verify installation
Write-Host "" 
Write-Host 'Verifying installation...' -ForegroundColor Yellow
try {
    $testOutput = bbl-decode --help 2>&1
    if ($testOutput -match 'Betaflight Blackbox') {
        Write-Host 'Decoder is working correctly!' -ForegroundColor Green
    } else {
        Write-Host 'Warning: Decoder installed but verification unclear' -ForegroundColor Yellow
    }
} catch {
    Write-Host 'Warning: Decoder installed but not immediately available' -ForegroundColor Yellow
    Write-Host 'You may need to restart your terminal or computer.' -ForegroundColor Gray
    Write-Host "" 
}

Write-Host "" 
Write-Host '========================================' -ForegroundColor Cyan
Write-Host '  Installation Complete!' -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ""

Write-Host 'The decoder is now installed globally as: bbl-decode' -ForegroundColor White
Write-Host ""

Write-Host 'Usage examples:' -ForegroundColor Yellow
Write-Host '  bbl-decode flight.bbl output.json --format json' -ForegroundColor Gray
Write-Host '  bbl-decode flight.bbl output.csv' -ForegroundColor Gray
Write-Host ""

Write-Host 'Press any key to exit...' -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
