Needs Playwright (not a dependency here): `export PW_DIR=<dir whose node_modules has playwright>` and, if its browser is not installed, `export CHROMIUM=<path to chrome / headless-shell binary>`.
Refresh the snapshot from https://noeltock.com/ai (rewrites `index.html`, `site.css`, `media/`): `node cards/extract.mjs`. Layout and the card height (`--card-h`) live in `cards.css`.
Render `assets/cards/*.png` from the local page (2x, transparent corners, asserts zero non-local requests): `node cards/shoot.mjs`.
