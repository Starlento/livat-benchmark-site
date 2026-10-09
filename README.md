# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static public introduction, installation instructions, HTTP v3 overview and searchable
44-case catalogue. GitHub Pages publishes the root of `main`; `.nojekyll` disables Jekyll.

`public-cases.json` is exported by `scripts/export_public_cases.py` in the private
benchmark repository using `livat_bench.boundary.public_case`. Its only fields are
`case_id` and `user_input`. Re-export in the private workspace, review, then commit
this file here. No private repository credentials are used by the website.

## Complete interactive atlas

https://starlento.github.io/livat-benchmark-site/atlas.html

The owner explicitly authorized publishing the complete local referee atlas, including
full-map geometry, per-bay scores, answer sets and offline reference routes.
`atlas.html` is copied byte-for-byte from the benchmark's `task-atlas.html`; its
checksum is in `atlas-sha256.txt`. The 44 cases and 1,325 bays bind to dataset
`e415445c070f813ef675d2dfa7d471ad18c0eda5f7c322dc339d62bddb38557d`.
Human review only: harnesses must not use the atlas as prior map or answer knowledge.
Offline references are not autonomous model results.

Updates: validate the benchmark, verify the atlas dataset hash, confirm no navigation
run overlays, copy the approved atlas snapshot and refresh its SHA-256 checksum.
Other private materials are not automatically published. Images, recordings, evidence
and keys must not enter this repository. The benchmark and release
assets remain private; links to them require access permission. Map distribution is
not available from this site yet. No autonomous model results are published here.

For a local preview, run `python -m http.server 8088 --bind 127.0.0.1` in this directory.
