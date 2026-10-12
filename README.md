# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static public introduction, installation instructions, HTTP interface overview and
searchable 64-case catalogue. GitHub Pages publishes the root of `main`;
`.nojekyll` disables Jekyll.

## Current benchmark snapshot

The site is synchronized with the benchmark's **v1.7.1** release, commit
`ce584c784d6b9583b714ebd89b735d7772b2ea36`, on 2026-10-12.
Displayed versions are a snapshot of the benchmark's sole version declaration,
`livat_bench/_version.py`; this site does not define a separate protocol, Schema,
data or calibration version. CARLA 0.9.16 and Livat B3 v1.3.0 are external
dependency requirements. Release and documentation links are pinned to the same tag.

This snapshot fixes destination match distance to the bay polygon centroid's shortest Euclidean distance to the target building polygon area, ignoring intervening obstacles. Building components and holes are preserved. The 20/40/60/80m Q bands and eligibility/facility rules remain. This geometric line does not certify a walking or driving path.

Parking driving and maneuver baselines use the same shortest route from the task start to a currently submittable Q=1 bay. Each efficiency is capped at full credit. The current set has 44 parking references and 40 exit references; 28 parking routes changed and 6 parking cases have zero-distance baselines. Cases, requests and starts are unchanged.

`GET /local-slots` exposes model-usable anonymous bay geometry in the rear-axle-relative 60x40m window: 40m forward, 20m rear, 20m to either side. Free/occupied/unknown support remains observation-grounded; no printed bay number, global/tracking identity, charging/accessible semantics or task suitability is exposed. Parking accepts only current `local_slots` `polygon_local_m` geometry. Eligibility, real occupancy/dimensions, unique correspondence, fresh observation, motion and budgets still apply. Path limits are reported as `termination_reasons`; `GET /observation?view=decision` provides the lighter decision view.

Global `GET /scene` remains exclusively for human observer WebUI rendering. Models, policies and execution clients must not access or consume global map semantics through input, memory, caches or tools. Building semantic boundaries are not walls, facilities and occupancy do not establish eligibility, and map connectors are not scored exits.

`observer` serves the static scene without CARLA. `campaign-next --observer-port` starts a separate observer per attempt. `abandon` retains a zero-score valid attempt; it cannot earn an infrastructure retry. Operator-only `campaign-status` and `campaign-recover --note` inspect and register verified saved evidence under an OS lock, retaining attempts and an audit; unknown or corrupted interruptions cannot be forced into retries.

The release retains device metadata, runtime state, request receipts and recovery,
endpoint-only RGB snapshots, local navigation annotations, and separate observer /
replay APIs. Historical images remain readable during the episode's HTTP service
lifetime; historical path capabilities expire after a new observation; old local coordinates cannot be directly submitted as current geometry.
Final results remain readable for at most 120 seconds, with explicit acknowledgement
after saving.

232 tests and the 64-case / 84-reference validation passed. 1,531 positive distance annotations were independently recomputed; all 44 current parking references score 100 in offline replay, with 44 prior references and 3 saved runs also replayed for comparison. The formal wheel passed independent installation, immutable-resource, standard-library client and execution/observer HTTP checks. No new CARLA run or physical RGB capture/review took place. Historical records keep their original build identities and scores. These checks are not autonomous/model scores. Start new campaigns with the matching package/client/schema; do not resume old experiments across scoring builds.
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
`5fb00d9b78016196fc13ce7998c26475926b143ea7705374e4dad9939277f9ad`.
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
