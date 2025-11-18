# Prerequisites for Nexus Application

This application requires the BBL Decoder CLI tool to process Betaflight Blackbox log files.

## Required External Tool

### BBL Decoder CLI (GPL v3)

**Download:** https://github.com/mrelive/blackbox-log-viewer-EC/releases

**Installation Steps:**
1. Download the latest release ZIP file
2. Extract to any location on your computer
3. Run the installer:
   - **Windows**: Double-click `install.bat`
   - **Alternative**: Open terminal in extracted folder and run `npm install -g`

**Verify Installation:**
```powershell
bbl-decode --help
```

If you see usage instructions, the decoder is correctly installed.

## Why Separate Installation?

The BBL Decoder is licensed under GNU General Public License v3.0 (GPL v3), which requires it to be distributed separately from proprietary software. This decoder is a derivative of the Betaflight Blackbox Explorer project.

## License Information

- **BBL Decoder**: GPL v3 (https://www.gnu.org/licenses/gpl-3.0.html)
- **Original Betaflight Blackbox Explorer**: GPL v3
- **This Application (Nexus)**: Proprietary

The decoder operates as a completely separate external process and does not affect the licensing of this application.

## Support

- **Decoder Issues**: https://github.com/mrelive/blackbox-log-viewer-EC/issues
- **Original Betaflight Project**: https://github.com/betaflight/blackbox-log-viewer
