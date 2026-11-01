# BetterCatanduanes

A Catanduanes community website and public budget transparency portal, built with React, TypeScript, and Vite. Budget data comes from the BetterGov.ph Budget API.

## Development

Requires Node.js 22.12+ and pnpm 10.7.1.

```sh
pnpm install
pnpm dev
```

The committed BetterGov snapshot supplies all budget data. Development and builds do not fetch upstream data.

## Updating budget data

```sh
pnpm data:sync
pnpm test:snapshot
pnpm lint
pnpm build
```

`data:sync` downloads the overview, complete scoped queries, districts, enacted budgets, and details for every project linked from the query results (including rejected matches). It allows two upstream requests at a time, uses timeouts, and retries transient failures. Any failed or incomplete refresh leaves the previous snapshot intact.

Review the changes to `data/bettergov/snapshot.json`, commit the update, and deploy normally to publish it. Running the refresh locally does not update the public site. There is no automatic expiry or browser fallback to BetterGov.

Builds validate the snapshot against the configured scope and API host, then prepare the merged project list, query evidence, exclusions, district cards, overview, project totals, and GAA results/yearly totals as two content-hashed JSON bundles. Visitors load one bundle for the main Transparency page and a second when viewing GAA or its query notes. Matching, deduplication and baseline totals run during the build. Interactive filters still run locally. Individual project details load separately from this site's own origin. Missing or incompatible snapshots fail with instructions to run `pnpm data:sync`. The footer distinguishes the last sync from the upstream source build date.

`pnpm check` is an optional **live** API diagnostic. Run it deliberately; ordinary builds do not invoke it. `pnpm setup` also contacts BetterGov and changes portal configuration, after which a new snapshot is required. `VITE_API_BASE` or the config's `api` setting selects the upstream host; synchronize and build with matching settings.

Source links and PDF links still point to their original publishers. Budget amounts are appropriations and proposals, not proof of spending or completed work.

## Deployment and documentation

- [Deployment](docs/deploy.md)
- [Upstream API and matching rules](docs/api.md)
- [Citizen reporting](docs/reporting.md)

`pnpm deploy:cloudflare` builds and deploys the static website. No database or Worker bindings are required.
