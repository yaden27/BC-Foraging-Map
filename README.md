# BC Foraging Map

Home, Feedback and Support pages plus the complete Crown Land Explorer interactive map at `map/`. Static files work on GitHub Pages, including a repository subpath; no build or backend is required.

## Migration provenance

Original Sites project: `appgprj_6ae38ce5dcb481919e70dd7e2a9fb513`.
Source commit: `0ce1daf701f6b4872bed3a280d9f02d121094373` (retrieved directly from the Sites Git repository).
The original app and bundled Leaflet assets were copied into `map/`. Changes: default satellite basemap, matching button state, and links to the retained home/feedback/support pages. Original implementation notes: [docs/ORIGINAL-SITES.md](docs/ORIGINAL-SITES.md).

## Features

Official BC land layers and developed-area exclusions, trails and difficulty/list filtering, place/coordinate search, geolocation, browser-local saved places and GeoJSON export. Feedback composes email to markinzhang7@gmail.com. Donations remain disabled until a verified payment link is supplied.

Saved places on the old Sites origin cannot automatically transfer across domains; export GeoJSON there for backup. External BC, Esri, OpenStreetMap, OpenTopoMap and Overpass services still require network access and may be unavailable; the map retains its source-failure status messages.

## Checks

```
node --check map/app.js
node tests/test-land.cjs
node tests/test-trails.cjs
```

## Hosting

GitHub Pages serves `main` at the repository root. `.nojekyll` is retained. The existing `CNAME` is preserved; its DNS must point to GitHub Pages for the custom domain to work. No Sites credentials, account access configuration or Git authentication files are included.
