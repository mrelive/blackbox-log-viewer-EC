# GPLv3 Compliance Guide for Using the External Decoder

This repo contains a GPLv3-licensed decoder CLI (`bbl-decode`). To keep your proprietary application compliant, do not bundle or link this decoder into your app. Instead, run it strictly as an external program supplied by the user or installed separately.

## Safe Default: Do Not Distribute the Decoder
- Keep the decoder completely out of your app’s distribution (no binaries, no source, no code copy-paste).
- At runtime, your app discovers a user-provided decoder executable via a path or environment variable and spawns it as a separate process.
- Provide users with clear instructions to download the decoder from its source and to accept its license before use.

Recommended discovery order (override-friendly):
- `BBL_DECODER_PATH` exact file path to executable (e.g., `C:\Tools\bbl-decode.ps1`).
- `BBL_DECODER_HOME` folder containing the executable (expects `bbl-decode`/`bbl-decode.ps1` inside).
- System `PATH` lookup for `bbl-decode`.

Recommended invocation examples (Windows PowerShell):
```
$decoder = $env:BBL_DECODER_PATH
if (-not $decoder) {
  if ($env:BBL_DECODER_HOME) { $decoder = Join-Path $env:BBL_DECODER_HOME "bbl-decode.ps1" }
}
if (-not $decoder) { $decoder = "bbl-decode" }

if (-not (Get-Command $decoder -ErrorAction SilentlyContinue)) {
  throw "Decoder not found. Set BBL_DECODER_PATH or install decoder."
}

$args = @("input.bbl", "output.json", "--format", "json")
$p = Start-Process -FilePath $decoder -ArgumentList $args -NoNewWindow -PassThru -Wait
if ($p.ExitCode -ne 0) { throw "Decoder failed with exit code $($p.ExitCode)" }
```

What to include with your proprietary app in this mode:
- A third-party notice entry acknowledging the external decoder and its license (see `NOTICE_GPL_DECODER.txt`).
- Installation instructions and a link to the decoder project and its license.
- Do not include any decoder binaries or source.

Why this is compliant:
- Your app and the decoder are independent programs.
- You do not distribute the GPLv3 program; users obtain it separately.
- Your app performs inter-process communication by spawning an executable, not linking/deriving a combined work.

## Alternative (If Ever Needed): Mere Aggregation on the Same Medium
If you later choose to place your proprietary app and the decoder side-by-side in one installer/zip without combining or linking them, that can be compliant as “mere aggregation” under GPLv3, provided:
- The decoder remains a separate executable used via process spawn.
- You include the GPLv3 license text and provide the Corresponding Source for the exact decoder you distribute (or a valid written offer as defined by GPLv3 §6).
- You preserve all copyright and license notices.

If you aggregate:
- Put the decoder in its own directory, e.g., `decoder/`.
- Include: `decoder/` source tree or a clearly documented, valid source code offer; `decoder/LICENSE` (GPLv3); and any notices.
- Keep your proprietary code strictly separate and do not link to the decoder’s code.

## Third-Party Notice (Copy-Ready)
Use the `NOTICE_GPL_DECODER.txt` provided in this repo as a minimal, copy-ready entry you can ship with your proprietary app to acknowledge the external decoder when used.

## Quick Compliance Checklist
- Not bundling decoder: Include a third-party notice + install instructions + no decoder binaries/source.
- If ever aggregating: Keep decoder separate; include GPLv3 license and source/offer; do not link; preserve notices.
- In all cases: Decoder is invoked as an external process; your app remains proprietary and separate.
