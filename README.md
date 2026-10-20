# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static public introduction, installation instructions, HTTP interface overview and
searchable 41-task catalogue. GitHub Pages publishes the root of `main`;
`.nojekyll` disables Jekyll.

## Current benchmark snapshot

The site is synchronized with the benchmark's **v1.8.0** release on `main`, tag
`v1.8.0`, on 2026-10-20, at the owner's request; it previously tracked the
`v1.7.3+paper.1` paper release. Displayed versions are a snapshot of the benchmark's
sole version declaration, `livat_bench/_version.py`. CARLA 0.9.16 and Livat B3 v1.3.0
are external dependency requirements. Release and documentation links are pinned to the
same tag.

The 41 tasks fall into six equally weighted categories: named building 9 (mall lift
lobbies 1–4 and office towers A–E), any mall lift lobby 3, special bay 6, store 5,
named exit 9 and any exit 9. Parking scores `100 × (0.50 Q + 0.50 E)`, exit `100 E`.
Junction turns are complete mouth-to-mouth curves with fixed-radius arcs and Dubins
joins; the vehicle is an oriented point. All 92 references drive forward only.

Global `GET /scene` remains exclusively for human observer WebUI rendering. Models,
policies and execution clients must not access or consume global map semantics through
input, memory, caches or tools. Building semantic boundaries are not walls, facilities
and occupancy do not establish eligibility, and map connectors are not scored exits.

270 unit tests and the 41-task / 92-reference validation passed. All 41 full-match and
37 distinct partial-quality references, the ten dead-end turnarounds and live-smoke ran
on a dedicated CARLA instance; semantic, exit and motion evidence was re-captured and
reviewed. The full external source audit could not be repeated because the frozen
map-authoring source was unavailable. The wheel built from the tagged archive passed
standalone installation checks. Live runs are private-route controller fixtures, not
autonomous model results. This site publishes no model leaderboard or model scores.

User prompts are shown in the original Chinese exactly as given to the model; the rest
of the site is in English.

## Public case catalogue

`public-cases.json` is exported by `scripts/export_public_cases.py` in the private
benchmark repository using `livat_bench.boundary.public_case`. Its only fields are
`case_id` and `user_input`. Re-export in the private workspace, review, then commit
this file here. No private repository credentials are used by the website.

## Complete interactive atlas

https://starlento.github.io/livat-benchmark-site/atlas.html

The owner explicitly authorized publishing the complete local referee atlas,
including full-map geometry, per-bay scores, answer sets and offline reference routes.
`atlas.html` is copied byte-for-byte from the tagged benchmark's `task-atlas.html`;
its checksum is in `atlas-sha256.txt`. The 41 tasks and 1,325 bays bind to dataset
`c7e18c2431e447174b00064f44e8a7b674ea67601818ac6467b2b4944ec7a178`.
This snapshot includes 2,695 continuous navigation curves and no run overlays.
Human review only: harnesses must not use the atlas as prior map, answer or route
knowledge. Offline references are not autonomous model scores.

## Updating

1. Use the intended benchmark release checkout. Read its package version from
   `livat_bench/_version.py` and verify its release tag resolves to that commit.
2. Run the benchmark unit suite and `Bench.ps1 validate`. Preserve any source-audit
   limitations and the original scope of runtime / image / performance evidence.
3. Re-export the catalogue using `scripts/export_public_cases.py` with
   `--output <SITE_CHECKOUT>/public-cases.json` from the benchmark checkout.
4. Check that `task-atlas.html` has the same package version and dataset SHA-256
   as the release, and that `navigationRecordings` is empty. Copy the approved
   atlas exactly, then refresh `atlas-sha256.txt` from its actual bytes.
5. Synchronize the homepage, installation command, release / documentation links,
   and this snapshot record. Review desktop and narrow layouts, task search and
   atlas navigation before publishing to `main`.
6. Verify the deployed homepage and atlas checksum. `.gitattributes` enforces LF
   line endings so Windows checkouts preserve the published atlas bytes.

This authorization covers the complete atlas snapshot, not automatic publication of
other private materials. Images, recordings, evidence and keys must not enter this
repository. The benchmark and release assets remain private; links to them require
access permission. Map distribution and installation instructions are not available
from this site yet.

For a local preview, run `python -m http.server 8088 --bind 127.0.0.1` in this directory.
