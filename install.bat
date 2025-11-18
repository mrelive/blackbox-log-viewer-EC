@echo off
REM Blackbox Decoder Simple Installer
REM Double-click this file to install

echo.
echo ========================================
echo   Blackbox Decoder Installer
echo ========================================
echo.

REM Check if running as administrator (optional but recommended)
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Note: Not running as Administrator.
    echo If installation fails, right-click this file
    echo and select "Run as administrator"
    echo.
    timeout /t 3 >nul
)

REM Run the PowerShell installer
powershell.exe -ExecutionPolicy Bypass -File "%~dp0install.ps1"

REM Keep window open if there was an error
if %errorLevel% neq 0 (
    echo.
    echo Installation encountered an error.
    pause
)
