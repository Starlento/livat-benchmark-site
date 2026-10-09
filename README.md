# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static public introduction, installation instructions, HTTP interface overview and
searchable 64-case catalogue. GitHub Pages publishes the root of `main`;
`.nojekyll` disables Jekyll.

## Current benchmark snapshot

The site is synchronized with the benchmark's **v1.4.0** release, commit
`f5a7ee69615a7b8d36aee79cfe80b9b89ce2d263`, on 2026-10-09.
Displayed versions are a snapshot of the benchmark's sole version declaration,
`livat_bench/_version.py`; this site does not define a separate protocol, Schema,
data or calibration version. CARLA 0.9.16 and Livat B3 v1.3.0 are external
dependency requirements. Release and documentation links are pinned to the same tag.

This snapshot adds a single human-observer `GET /scene` for 9 B3 cores, 13 access connectors and 1,325 bays with independent charging, accessible and compact flags. The harness project's WebUI may render it for humans; models, policies and execution clients must not access or consume it, including via input, memory, caches or tool returns. Semantic boundaries are not collision walls, facilities and occupancy do not imply task eligibility, and map connectors are not scored exit regions.

`observer` serves the static scene without CARLA. `campaign-next --observer-port` starts a separate observer per attempt. `abandon` retains a zero-score valid attempt; it cannot earn an infrastructure retry. Operator-only `campaign-status` and `campaign-recover --note` inspect and register verified saved evidence under an OS lock, retaining attempts and an audit; unknown or corrupted interruptions cannot be forced into retries.

The release retains device metadata, runtime state, request receipts and recovery,
endpoint-only RGB snapshots, local navigation annotations, and separate observer /
replay APIs. Historical images remain readable during the episode's HTTP service
lifetime; historical path and candidate capabilities expire after a new observation.
Final results remain readable for at most 120 seconds, with explicit acknowledgement
after saving.

183 unit tests and the 64-case / 128-reference offline validation passed for this release; 33 unchanged historical episodes also passed scoring regression. The formal wheel passed independent installation, immutable resource, standard-library client and static observer HTTP checks. No new CARLA fixture or image review was run; previous evidence retains its original build identity.
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
`cbccb29f946c1bf35f1a1aaf3ae6a55408ca874ec846a89c1c9af8368e943915`.
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
