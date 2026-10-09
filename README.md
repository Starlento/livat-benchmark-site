# Livat Benchmark public site

Live site: https://starlento.github.io/livat-benchmark-site/

Static public introduction, installation instructions, HTTP v3 overview and searchable
44-case catalogue. GitHub Pages publishes the root of `main`; `.nojekyll` disables Jekyll.

`public-cases.json` is exported by `scripts/export_public_cases.py` in the private
benchmark repository using `livat_bench.boundary.public_case`. Its only fields are
`case_id` and `user_input`. Re-export in the private workspace, review, then commit
this file here. No private repository credentials are used by the website.

Do not copy the referee atlas, answer tables, reference routes, full-map geometry,
images, recordings, evidence or keys into this repository. The benchmark and release
assets remain private; links to them require access permission. Map distribution is
not available from this site yet. No autonomous model results are published here.

For a local preview, run `python -m http.server 8088 --bind 127.0.0.1` in this directory.
