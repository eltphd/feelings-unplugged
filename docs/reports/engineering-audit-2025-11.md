# Engineering Infrastructure Audit — November 10, 2025

## Repository Topology

| Path | Ownership | Purpose | Status | Actions |
| --- | --- | --- | --- | --- |
| `altered-earth-web/` | App | Next.js 16 production app routed at `app.feelingsunplugged.space` | ✅ Healthy | Keep as primary app workspace; all builds/deploys run from here. |
| `vercel.json` (root) | Infra | Forces install/build steps to run inside `altered-earth-web/` | ✅ Correct | Do not override with CLI defaults; retain at repo root. |
| `docs/` | Ops | Active documentation (`reports/`, `reference/`) | ✅ Organized | Continue adding dated reports here; archive previous versions under `archive/docs/` when superseded. |
| `archive/` | Archive | Historical documentation/assets | ✅ Contained | Leave untouched; helpful for provenance. |
| `branding/`, `products/`, `content/` | Marketing | Static assets and collateral | ✅ Useful | Document owners and update cadence; add README if workflows change. |
| Static marketing pages (`index.html`, etc.) | Marketing | Landing pages intended for Cloudflare Pages | 🟡 Pending deploy | Decide on hosting (Cloudflare Pages or Vercel static) and set up CI deploy; currently lives only in repo. |
| `indesign-scripts/` | Production | MCP automation scripts for print journizine | ✅ Valid | Updated to reference the new content plan; keep for production handoff. |

## Branch & Workflow Overview

- Default branch: `main`  
- Remote: `https://github.com/eltphd/feelings-unplugged.git`
- Working tree: clean prior to latest changes; commits flow from `main` → Vercel auto-deploy.
- Recommendation: introduce lightweight branch protection requiring CI (lint + build) before merge.

## Build & Deploy

- Production hosting: Vercel project `altered-earth-web` (confirmed via `altered-earth-web/.vercel/project.json`).
- Root link was reset (`rm -rf .vercel`) and CLI relinked from `altered-earth-web/`.
- Auto-deploy: Git push to `main` triggers build; manual `vercel deploy --prod --cwd altered-earth-web` also supported.
- Outstanding task: Delete the accidental “feelings-unplugged” project in Vercel dashboard to remove “No production deployment” warning.

## Tooling & Tests

- Lint/build scripts live in `altered-earth-web/package.json`.
- No automated CI currently; manual commands:
  ```bash
  cd altered-earth-web
  npm run lint
  npm run build
  ```
- Recommendation: add GitHub Action that runs `npm ci`, `npm run lint`, `npm run build`, and Lighthouse CI (see `docs/reports/lighthouse-*.json`).

## Metrics & Logs

- Lighthouse desktop/mobile JSON written to `docs/reports/`.
- Suggest storing future reports as `docs/reports/lighthouse-YYYY-MM-DD-*.json` for time-series comparisons.

## Next Engineering Steps

1. **CI Pipeline:** Add GitHub Actions workflow to run lint/build/Lighthouse on PRs.
2. **Monitoring:** Enable Vercel Analytics or integrate privacy-first analytics (PostHog self-hosted, Fathom, etc.).
3. **QA:** Establish Playwright tests for key flows (emotion check-in, prompts start, data export/delete).
4. **Static Site Deploy:** Decide on Cloudflare Pages vs Vercel static site; set up deploy script and DNS.

