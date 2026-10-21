# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static project introduction, installation instructions, HTTP interface overview and
searchable 45-task catalogue. GitHub Pages publishes the root of `main`;
`.nojekyll` disables Jekyll. User prompts retain their original Chinese; the rest of
the site is in English.

## Current release snapshot

This site publishes the benchmark's **v1.9.0 stable release**, synchronized on
2026-10-21. The benchmark tag `v1.9.0` resolves to
`4202fe93cf3c4b138d360577d81778dc4878dd87`. Displayed versions are read from the
benchmark's sole package declaration, `livat_bench/_version.py`; the site has no
independent product or data version. CARLA 0.9.16 and Livat B3 v1.3.0 remain
external dependency requirements. All release and documentation links use the
same benchmark tag.

All 45 tasks have implemented scenes: 27 parking tasks and 18 exit tasks. The six equally
weighted categories contain named building 9, any mall lift lobby 9, special bay 6,
store 3, named exit 9 and any exit 9. Default static, complex static and dynamic
each contain 15 tasks. Parking uses `100 × (0.50 Q + 0.50 E)`; exits use `100 × E`.
Efficiency compares simulation time and manoeuvres using
`C = 0.018 × sim_time_s + 0.40 × manoeuvres`. Actual movement, waits, primitive
binding, turnarounds and image-capture ticks count; paused inference and network
latency do not. Distance remains a diagnostic metric and budget constraint.

Physical scene vehicles constrain navigation and occupancy, and ego contact fails
the attempt. Visual-only vehicles do not change occupancy, paths or reference cost.
Ordinary references retain the forward-search definition. Designed event witnesses
include triggers, waiting and returns, including reversing or legal turnarounds;
they are separate from optimal scoring references and are not global policy
optimality proofs.

The release snapshot passed 45-task / 108-reference offline validation. Independent
wheel installation passed and reused all 45 dependency-matched reference checks.
The 356-test result and 29 historical-trajectory comparisons retain their original
builds, with explicit source-equivalence evidence for release reuse. No new CARLA
run, RGB review or autonomous model evaluation is claimed for packaging or this
site update. This site publishes no model leaderboard or model scores.

Known limitations remain visible: cases 011/012 and 014/015 expose early lift-lobby
signage; the strict semantic-concealment requirement is unmet. Some historical
evidence and external source files are unavailable or changed, so a full source
audit is not claimed to pass. Image review covers only explicitly viewed frames.
See the [release notes](https://github.com/Starlento/livat-task-benchmark/blob/v1.9.0/docs/RELEASE_NOTES.md)
and [validation scope](https://github.com/Starlento/livat-task-benchmark/blob/v1.9.0/docs/RUNTIME_VALIDATION.md)
(private repository access required).

## Public catalogue and map boundary

`public-cases.json` is exported with `scripts/export_public_cases.py` from the
benchmark checkout, using `livat_bench.boundary.public_case`. Its only fields are
`case_id` and `user_input`. Private case objects are never copied then redacted.
The website uses no private repository credentials. Release assets stay in the
private benchmark repository and are not mirrored here.

The observer `GET /scene` is exclusively for human WebUI rendering. Models,
policies and execution clients must not access its map semantics through input,
memory, caches or tools. Building boundaries describe inferred B3 semantic cores,
not physical walls; semantic closure does not seal doors. Facilities and fixed
occupancy do not establish task eligibility. Map connectors are not scored exits
or proof of traversability.

## Complete interactive atlas

https://starlento.github.io/livat-benchmark-site/atlas.html

The owner authorized publishing the complete released atlas, including full-map
geometry, per-bay scores, answer sets and offline references, for human review.
`atlas.html` is copied byte-for-byte from the tagged benchmark's `task-atlas.html`.
Its SHA-256 is recorded in `atlas-sha256.txt`:

`8e9a816a4e952a953c814888880c01c8596ff91cd668801255b8c9876c4a63b5`

The snapshot contains 45 tasks, 1,325 bays, 2,715 continuous navigation curves and
108 scoring references. Dataset SHA-256:

`37a30356d46e1df4dcfb08c203c818ed0ee63b22da2f2a481c3a0e096f5c1c8b`

`releaseStatus` is `released`; `navigationRecordings` is empty. No run overlays,
images, trajectories or evidence files are published. Harnesses must not use the
atlas as prior map, answer or route knowledge. Public hosting does not authorize
model use of the atlas. Offline references are not autonomous model results.

## Updating

1. Use the intended release checkout. Read the version from `_version.py`, check
   the tag and commit, and verify the released atlas against its delivery manifest.
2. Reuse trusted, dependency-matched successful validation from that release.
   If relevant inputs change, follow the benchmark's incremental validation rules;
   preserve original runtime/image evidence identities and all known limitations.
3. Export the catalogue through `scripts/export_public_cases.py --output
   <SITE_CHECKOUT>/public-cases.json`. Check the two-field boundary and task count.
4. Check the atlas package version, release status and dataset SHA-256; require
   empty `navigationRecordings`. Copy the released file exactly and regenerate
   `atlas-sha256.txt`. Do not publish a development draft.
5. Synchronize current descriptions, scoring, counts, installation commands,
   release links and this record. Remove superseded result claims from active
   pages; preserve prior snapshots in Git history. Review desktop and narrow
   layouts, task search and atlas navigation before pushing to `main`.
6. Check the Pages deployment and compare the live homepage, catalogue and atlas
   with the committed files. `.gitattributes` fixes LF line endings for byte identity.

The atlas authorization does not extend to other private materials. Do not publish
credentials, evidence media or run records. Map distribution and installation
instructions are not provided by this website.

For a local preview, run `python -m http.server 8088 --bind 127.0.0.1` here.
