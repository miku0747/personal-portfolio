# Qihang Lu - Personal Portfolio Materials

Source materials for a future personal website. This repository is private; no website has been published.

## Materials

The supplied archive contains 41 original assets across seven categories, with original names preserved under `Additional information/`:

| Category | Original assets |
| --- | ---: |
| China Young Physicists' Tournament 2026 | 9 |
| First Robotics Competition 2026 | 9 |
| Game designs | 2 |
| Interactive design | 6 |
| Music | 8 |
| Robot kinetics summer school | 5 |
| SteppingStone Voluntary Program | 2 |

## Restore two large assets before building the website

The upload connection could not accept the two largest files in one request. Their exact original bytes are stored as parts under `large-file-parts/`.

After cloning this repository, run:

```sh
python3 restore_large_files.py
```

This recreates these files in their original folders and verifies their size and SHA-256 checksum:

- `Additional information/Interactive design/portfolio.pdf`
- `Additional information/First Robotics Competition 2026/Shooter test.mp4`

The remaining 39 assets are directly available in their original folders. The script does not overwrite modified files or delete the stored parts. Run it before a future site build that references the two large assets.

## Future website

Use the seven categories as project sections, linking relevant introductions, photographs, certificates, demonstrations, and portfolio documents. All original media remain unmodified.
