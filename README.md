# Qihang Lu · Personal Portfolio

A static English portfolio with a dark, atmospheric space theme and seven project pages: robotics, interactive design, physics, summer school, game design, music, and volunteering.

## Preview locally

Run `python3 -m http.server 8000` from the repository root, then open http://localhost:8000. No build step is required.

## Structure

- `index.html`: homepage
- `projects/`: seven detail pages
- `styles.css` and `app.js`: responsive styling and interactions
- `site-assets/`: optimized cover images
- `Additional information/`: original supporting materials
- `large-file-parts/`: verified parts for two large originals

The website reconstructs the large PDF and video in the browser when requested, verifies their SHA-256 on secure origins, and opens them using temporary blob URLs. To restore the original files on disk, run `python3 restore_large_files.py`.

## Publishing

Live portfolio: https://qihang-lu-portfolio.sagefawn2.chatgpt.site

The website is publicly hosted with Sites; this GitHub repository remains private. The published copy includes H.264 playback versions of four HEVC videos; the original files in this repository are preserved. Hosting is separate from GitHub, so changes here do not automatically deploy. Relative paths support a project subdirectory.

## Validation

All 138 local HTML file references across eight pages were checked and JavaScript syntax was validated. Browser rendering and interactive QA remain pending because the available browser runtime could not be installed in the development environment.

