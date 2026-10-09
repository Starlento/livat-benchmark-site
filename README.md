# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static public introduction, installation instructions, HTTP interface overview and
searchable 64-case catalogue. GitHub Pages publishes the root of `main`;
`.nojekyll` disables Jekyll.

## Current benchmark snapshot

The site is synchronized with the benchmark's **v1.3.0** release, commit
`156afbc0004d34d846e31db96e9e2feb617693fc`, on 2026-10-09.
Displayed versions are a snapshot of the benchmark's sole version declaration,
`livat_bench/_version.py`; this site does not define a separate protocol, Schema,
data or calibration version. CARLA 0.9.16 and Livat B3 v1.3.0 are external
dependency requirements. Release and documentation links are pinned to the same tag.

This snapshot adds natural user prompts and 20 exit tasks (three named exits with four cases each, plus eight any-exit cases). A vehicle footprint center entering the corresponding private region ends an exit task automatically. Exit distance/maneuver weights are 60/40; category weights are 45/15/15/25. Six cameras use a centered 2560x1440 front view and five 1920x1080 views. Inference wall-clock time is recorded without a termination budget.

The release retains device metadata, runtime state, request receipts and recovery,
endpoint-only RGB snapshots, local navigation annotations, and separate observer /
replay APIs. Historical images remain readable during the episode's HTTP service
lifetime; historical path and candidate capabilities expire after a new observation.
Final results remain readable for at most 120 seconds, with explicit acknowledgement
after saving.

162 unit tests and the 64-case / 128-reference offline validation passed for this release; 26 old parking episodes also passed scoring regression.
The release retains a failed full-source audit: 35 frozen files in the independently maintained adjacent agentic_parking harness drifted. Live interface and private-route controller checks are not
autonomous model results. This site publishes no model leaderboard or model scores.

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
its checksum is in `atlas-sha256.txt`. The 64 cases and 1,325 bays bind to dataset
`3d92c032fef595e11cd2e1a673a4bcf3599cf338af8e405797f2a65640888416`.
This snapshot includes 5,892 continuous navigation curves and no run overlays.
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
