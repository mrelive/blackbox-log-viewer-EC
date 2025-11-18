# Optional: Separate Decoder Bundle Layout (Mere Aggregation)

Only use this if you intentionally ship the GPLv3 decoder alongside your proprietary app as a separate package ("mere aggregation"). If you are not distributing the decoder, you do not need this.

Suggested structure inside a standalone `decoder/` folder placed next to your app:

```
decoder/
  LICENSE                  # GPLv3 license text
  README.md                # Decoder readme and usage
  cli-convert.js           # Decoder CLI entry (if distributing this repo’s decoder)
  bin/
    bbl-decode.ps1
    bbl-decode.cmd
  src/                     # Complete corresponding source code
    ...
```

Compliance requirements when aggregating:
- Include the full GPLv3 license text (`decoder/LICENSE`).
- Provide complete Corresponding Source for the exact decoder binary you ship (or a valid written offer per GPLv3 §6). Including `src/` is the simplest path.
- Preserve all copyright and license notices.
- Keep your proprietary app separate and invoke the decoder via process spawn only.

Invocation guidance remains the same as in `COMPLIANCE_DISTRIBUTION_GUIDE.md`.
