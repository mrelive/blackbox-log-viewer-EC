# BBL CLI Converter - Usage Guide

## Overview

The BBL CLI converter (`bbl-decode`) is a command-line tool that converts Betaflight Blackbox `.bbl` log files to CSV or JSON format. It automatically detects and handles multi-flight logs.

## Installation

See [INSTALLATION.md](INSTALLATION.md) for installation instructions.

## Basic Usage

### Convert to CSV (default)
```powershell
bbl-decode flight.bbl
# Creates: flight.csv
```

### Convert to JSON
```powershell
bbl-decode flight.bbl --format json
# Creates: flight.json
```

### Specify output filename
```powershell
bbl-decode flight.bbl output.csv
bbl-decode flight.bbl analysis.json --format json
```

## Multi-Flight Log Support

Many `.bbl` files contain multiple flights from a single battery session. The converter automatically detects these and provides options to handle them.

### View flight count
```powershell
bbl-decode flight.bbl
```
Output will show: `Found 5 log(s)` (example)

### Default behavior
By default, only the **first flight** (log index 0) is converted:
```powershell
bbl-decode multi-flight.bbl output.json --format json
# Converts only flight #1 (index 0)
```

### Split into separate files
Use `--split` to convert all flights into separate files:
```powershell
bbl-decode multi-flight.bbl output --split --format json
```
Creates:
- `output-flight1.json` (72.6s duration, 56.3 MB)
- `output-flight2.json` (65.5s duration, 51.3 MB)
- `output-flight3.json` (35.3s duration, 27.0 MB)
- `output-flight4.json` (1.2s duration, 0.95 MB)
- `output-flight5.json` (5.4s duration, 4.2 MB)

### Extract specific flight
Use `--log N` to convert only flight number N (0-indexed):
```powershell
bbl-decode multi-flight.bbl flight2.json --log 1 --format json
# Extracts only flight #2 (index 1)
```

Flight indices:
- Flight #1 = `--log 0`
- Flight #2 = `--log 1`
- Flight #3 = `--log 2`
- etc.

## Output Formats

### CSV Format
- Header section with system configuration (firmware, PIDs, rates, etc.)
- Field names row (quoted)
- Frame data rows (time series)
- Compatible with Excel, Google Sheets, pandas, R

Example CSV structure:
```csv
"Product","Blackbox flight data recorder by Nicholas Sherlock"
"firmwareType",3
"firmware","4.5"
...
"loopIteration","time","gyroADC[0]","gyroADC[1]",...
0,0,1.2,3.4,...
1,125,1.3,3.5,...
```

### JSON Format
Structured output with metadata, fields, frames, and statistics:

```json
{
  "metadata": {
    "product": "Blackbox flight data recorder by Nicholas Sherlock",
    "firmware": {
      "type": 3,
      "version": "4.5",
      "patch": 2,
      "fullVersion": "4.5.2",
      "revision": "Betaflight 4.5.2 (024f8e13d) STM32G47X"
    },
    "craft": {
      "board": "BEFH BETAFPVG473",
      "name": "AIR65 PRO"
    },
    "flightInfo": {
      "logIndex": 0,
      "totalLogs": 5,
      "logNumber": 1
    }
  },
  "fields": [
    { "name": "loopIteration", "index": 0 },
    { "name": "time", "index": 1 },
    ...
  ],
  "frames": [
    [0, 0, 1.2, 3.4, ...],
    [1, 125, 1.3, 3.5, ...],
    ...
  ],
  "stats": {
    "duration": 35.32,
    "frameCount": 283840,
    "fieldCount": 72,
    "totalFrames": 283840,
    "sampleRate": 8038
  }
}
```

**Flight info fields:**
- `logIndex`: 0-based index of this flight in the original file
- `totalLogs`: Total number of flights detected in the file
- `logNumber`: 1-based flight number (user-friendly)

## Command Reference

### Syntax
```
bbl-decode <input.bbl> [output] [--format csv|json] [--split] [--log N]
```

### Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `input.bbl` | Input blackbox log file (required) | `flight.bbl` |
| `output` | Output filename (optional, auto-generated if omitted) | `output.csv` |
| `--format` | Output format: `csv` or `json` (default: `csv`) | `--format json` |
| `--split` | Split multi-flight logs into separate files | `--split` |
| `--log N` | Convert only flight N (0-indexed) | `--log 2` |

### Examples

**Basic conversion:**
```powershell
bbl-decode flight.bbl
bbl-decode flight.bbl output.csv
```

**JSON output:**
```powershell
bbl-decode flight.bbl --format json
bbl-decode flight.bbl analysis.json --format json
```

**Multi-flight handling:**
```powershell
# Split all flights
bbl-decode session.bbl --split --format json

# Extract specific flight
bbl-decode session.bbl flight3.json --log 2 --format json

# Default (first flight only)
bbl-decode session.bbl output.json --format json
```

**Path with spaces:**
```powershell
bbl-decode "C:\Users\Pilot\Logs\Flight 3.bbl" --split --format json
```

## Output Details

### Console output
```
Converting: SAMPLES/Flight 3.bbl
Output:     flight3.json

Read 8220672 bytes
Parsing log...
Found 5 log(s)

--- Processing log 1/5 ---
Fields: 72
Frames: 283840
Duration: 35.32s
Generating JSON...
✓ Output: flight3-flight1.json (28355874 bytes)

--- Processing log 2/5 ---
...

✓ Success! Converted 5 log(s)
```

### File sizes
Typical file sizes (depends on duration and sample rate):
- **CSV**: ~250 KB/second of flight
- **JSON**: ~800 KB/second of flight

Example for 60-second flight:
- BBL (compressed): ~1.5 MB
- CSV: ~15 MB
- JSON: ~48 MB

## Troubleshooting

### "Decoder not found"
- Ensure you've run `install.bat` or `install.ps1`
- Verify with: `bbl-decode --help`
- See [INSTALLATION.md](INSTALLATION.md)

### "No valid logs found"
- File may be corrupted
- Wrong file type (ensure it's a `.bbl` file)
- Try opening in Betaflight Blackbox Explorer first

### "Failed to open log"
- Specific flight may have corrupted header
- Use `--split` to extract other flights that may be valid
- Check console warnings for details

### Memory issues (large files)
- Use `--split` to process flights individually
- CSV format uses less memory than JSON
- Close other applications before processing large logs

## Integration with Other Tools

### Python/pandas
```python
import pandas as pd
df = pd.read_csv('flight.csv', skiprows=145)  # Skip header rows
print(df['gyroADC[0]'].mean())
```

### Python/JSON
```python
import json
with open('flight.json') as f:
    data = json.load(f)
print(f"Duration: {data['stats']['duration']}s")
print(f"Frame count: {data['stats']['frameCount']}")
```

### Excel/Google Sheets
1. Open CSV file
2. Data is ready to analyze (no preprocessing needed)
3. Headers are in first ~145 rows

### R
```r
library(readr)
df <- read_csv("flight.csv", skip=145)
summary(df$`gyroADC[0]`)
```

## Additional Resources

- **Installation Guide**: [INSTALLATION.md](INSTALLATION.md)
- **Nexus Integration**: [NEXUS_DEV_GUIDE.md](NEXUS_DEV_GUIDE.md)
- **GPL Compliance**: [COMPLIANCE_DISTRIBUTION_GUIDE.md](COMPLIANCE_DISTRIBUTION_GUIDE.md)
- **Source Repository**: https://github.com/mrelive/blackbox-log-viewer-EC

## Support

- GitHub Issues: https://github.com/mrelive/blackbox-log-viewer-EC/issues
- Original Blackbox Viewer: https://blackbox.betaflight.com/
