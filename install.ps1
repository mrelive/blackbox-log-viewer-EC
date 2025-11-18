# Blackbox Decoder - Simple Installer
# This script installs the bbl-decode command globally on your PC

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Blackbox Decoder Installer" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js not detected"
    }
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "`nNode.js is required to run the decoder." -ForegroundColor Yellow
    Write-Host "Please install Node.js from: https://nodejs.org/`n" -ForegroundColor Cyan
    Write-Host "Press any key to open the Node.js website..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    Start-Process "https://nodejs.org/"
    Write-Host "`nAfter installing Node.js, run this installer again.`n" -ForegroundColor Yellow
    pause
    exit 1
}

# Check npm
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
    } else {
        throw "npm not detected"
    }
} catch {
    Write-Host "✗ npm is not available!" -ForegroundColor Red
    Write-Host "npm should come with Node.js. Please reinstall Node.js.`n" -ForegroundColor Yellow
    pause
    exit 1
}

# Install dependencies locally first
Write-Host "`nInstalling decoder dependencies..." -ForegroundColor Yellow
try {
    npm install --silent 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Dependencies installed" -ForegroundColor Green
    } else {
        throw "npm install failed"
    }
} catch {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    pause
    exit 1
}

# Install globally
Write-Host "`nInstalling bbl-decode globally..." -ForegroundColor Yellow
Write-Host "(This makes the decoder available system-wide)`n" -ForegroundColor Gray

try {
    # Use npm link for local development install
    $output = npm link 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Decoder installed successfully!" -ForegroundColor Green
    } else {
        throw "npm link failed: $output"
    }
} catch {
    Write-Host "✗ Installation failed" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`nYou may need to run this installer as Administrator." -ForegroundColor Yellow
    Write-Host "Right-click install.bat and select 'Run as administrator'`n" -ForegroundColor Yellow
    pause
    exit 1
}

# Verify installation
Write-Host "`nVerifying installation..." -ForegroundColor Yellow
try {
    $testOutput = bbl-decode --help 2>&1
    if ($testOutput -match "Betaflight Blackbox") {
        Write-Host "✓ Decoder is working correctly!" -ForegroundColor Green
    } else {
        Write-Host "⚠ Decoder installed but verification unclear" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Decoder installed but not immediately available" -ForegroundColor Yellow
    Write-Host "You may need to restart your terminal or computer.`n" -ForegroundColor Gray
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Installation Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "The decoder is now installed globally as: bbl-decode`n" -ForegroundColor White

Write-Host "Usage examples:" -ForegroundColor Yellow
Write-Host "  bbl-decode flight.bbl output.json --format json" -ForegroundColor Gray
Write-Host "  bbl-decode flight.bbl output.csv`n" -ForegroundColor Gray

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
