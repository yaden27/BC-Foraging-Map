# Crown Land Explorer

Vancouver-centred 200 km exploration map. Static Leaflet app; hosting serves `dist`. Keep the existing Site identity and private audience.

## Land evidence (2026-10-30)

The original parcel-only display omitted un-surveyed land. The current renderer combines live official WMS tiles from:

- ParcelMap BC `WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW`.
- LDFM 2026 `WHSE_FOREST_VEGETATION.ANA_LDFM_LND_DESIG_FOR_MGMT_SP` (catalogue 4574f131-470e-407c-bbcc-5b19d9adcc1b). Replaces the retired F_OWN product. Documentation: `land_designation_for_forest_management_august2026.pdf` and `ldfm_data_sources_by_designation_category.pdf` linked in-app. Sample live records report DATE_CREATED 2026-10-13.

The province's source rules explicitly define `for_mgmt_unit_2` as the remaining land after the preceding ranked designations, assumed Crown for strategic forest management planning. This is the provincial exclusion/inference product; we do not treat all empty map pixels as Crown. LDFM includes more than tree cover and is not filtered to forest.

### Display precedence

- Dark green: ParcelMap Crown Provincial / Crown Agency / Untitled Provincial, absent an explicit generalized-source conflict.
- Pale green: LDFM provincial administration, provincial Schedule B tenure or provincial lease, where no current ParcelMap polygon veto/unknown applies. Includes province-created residual inference, distinctly marked as inferred.
- Gray: explicit unknown/ambiguous designations (including ambiguous Schedule A and timber-licence-only records), or direct Crown vs other/unknown generalized-source conflict.
- Transparent: known other ownership/administration or no data; click distinguishes other ownership from no coverage. Never infer from missing pixels alone.

Current known non-provincial ParcelMap polygons veto generalized provincial estimates. Failed parcel source never yields new pale-green inference. If only the generalized source fails, directly registered provincial parcels can still display, with a partial-source status. Only direct/pale classes feed trail masking/counting. A geodesic 200km clip applies to painted tiles; outside points report no coverage.

**Important limit:** LDFM represents primary designation/administration and derived generalization, not a legal title. Provincial documentation restricts it to strategic/high-level planning, not operational analysis. The map is exploration reference only, not cadastral confirmation, public access or foraging authorization. Parks/protected areas and leases can still be provincial land. ILRR is not integrated: it requires BCeID/IDIR. Do not describe this as a live ILRR ownership layer.

Click a location to see its evidence class, then optionally query both official GetFeatureInfo records. The residual code is explicitly explained, and source dates displayed. No point lookups are sent automatically during panning.

## Rendering / caching

512px classified WMS source tiles render via server-side SLD rules. The client combines raster classes in one bounded pixel pass; no repeated downloads of large polygon datasets or geometry subtraction/union. CORS source images use a 96-entry memory LRU plus a 160-entry, seven-day CacheStorage cache when supported. Existing source failure behavior remains explicit. No blank source is taken as a successful exclusion check. Two one-click basemaps: OpenTopoMap contours/elevation and Esri satellite. Switching does not reload land tiles. Favorites remain local with GeoJSON export.

## Trails and current-view list

Official `WHSE_FOREST_TENURE.FTEN_REC_TRAILS_SVW` WMS lines show at zoom12+. Supplemental OSM paths/footways/steps/tracks via debounced Overpass POST at zoom14+, excluding sidewalk/crossing footways. Source service outages do not hide the independent land layer. Trail raster strokes and selected yellow highlight are clipped to the combined direct/inferred Crown mask. OSM attribution/ODbL retained.

Only explicit `sac_scale` determines hiking technical difficulty. T3–T6 are the app's ordinary-visitor warning threshold. Missing/unsupported ratings remain unlabelled, neutral dashed gray; MTB ratings never infer hiking difficulty. These are segment-level grades, not whole-route effort/current conditions or permission.

The sidebar indexes official raster trail geometry with a bounded ArcGIS query and combines it with cached OSM geometry. Same-name records normalize case/whitespace and group once; unnamed records stay separately identified. Actual segment/viewport clipping plus mask sampling every three screen pixels catches routes with both endpoints outside view. List/count only reflect loaded features; cap/failure/loading states disclose partial coverage. Padded caches avoid repeat requests within the same area. Clicking a row centres a visible point and highlights that group's geometry in yellow inside the land mask.

## Validation

`node --check dist/app.js`
`node test-land.cjs`
`node test-trails.cjs`

Tests cover residual vs direct provenance, non-Crown veto, unknown/conflicting data, failed sources, uncovered pixels and trail masks, viewport crossing, grouping, grade preservation, unrated records and MTB separation. Live browser QA verifies a mountain point with no ParcelMap record returning LDFM `for_mgmt_unit_2`, then trail list navigation and both basemaps.
