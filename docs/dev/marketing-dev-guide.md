# Feelings Unplugged Marketing Dev Guide

This guide keeps contributors aligned when updating the marketing pages served from Cloudflare Pages.

---

## Directory Map

| Path | Purpose | Notes |
| --- | --- | --- |
| `/marketing/index.html` | Main marketing hub | Contains `<base href="/marketing/">` so it can be served from `/` or `/marketing/`. |
| `/marketing/*.html` | Subpages (teen journal, parent guide, educator toolkit) | Share the same base href and styling. |
| `/marketing/style.css` | Shared stylesheet | Cache headers defined in `_headers`. |
| `functions/[[path]].ts` | Cloudflare Pages Function | Routes `/` (and `/index.html`) to `/marketing/` while leaving other assets untouched. |
| `functions/robots.txt.ts` | Cloudflare Pages Function | Returns the canonical robots.txt (Cloudflare-managed content signals may still prepend text at the edge). |
| Cloudflare Web Analytics beacon | Instrumentation script | Manually embedded in every marketing page `<head>` using token `f98e1afdae084da6bfa84f10a6009b7e`. |
| `automation/n8n-cloudflare-pipeline.json` | Deploy + QA flow | Import into n8n for automated deploy verification. |

---

## Deployment Expectations

1. **Local QA (recommended)**  
   ```bash
   cd marketing
   python3 -m http.server 4173
   npx lighthouse http://localhost:4173/index.html --form-factor=mobile --screenEmulation.mobile=true --only-categories=performance,accessibility,best-practices,seo
   ```
   Target scores: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100, CLS ≤ 0.1.

2. **Push to `main`**  
   Cloudflare Pages auto-builds (`feelings-unplugged` project). Use the n8n flow or deploy hook to watch status and send alerts.

3. **Post-deploy checks**  
   - `https://feelingsunplugged.space/` should render the marketing hub (served via `functions/[[path]].ts`).  
   - `https://feelingsunplugged.space/robots.txt` should serve the Pages Function output; if Cloudflare adds a “content-signal” banner, disable content signals in the dashboard (Rules → Content → Content Signals).  
   - Re-run Lighthouse against production to ensure parity with local results.

---

## Implementation Guidelines

- **Do not duplicate HTML at the project root.** Use the base href plus the catch-all function to keep a single source of truth under `/marketing`.
- **Web Analytics** is wired via Cloudflare’s beacon script; update all pages if the token rotates.
- **Browser integrity/Bot Fight** features are disabled for marketing pages to avoid Cloudflare challenge scripts that hurt Lighthouse scores; re-enable only if security posture changes.
- **Always update asset paths absolutely** (e.g., `/marketing/style.css`) when adding new files so both `/` and `/marketing/` contexts work.
- **Favicons** are generated via `scripts/generate_favicon.py`. Run it after modifying brand colors and commit the resulting assets.
- **Robots.txt** modifications belong in the function. Update both `functions/robots.txt.ts` and `robots.txt` (reference copy) together to stay consistent.
- **Headers/Cache** rules live in `marketing/_headers`. Raise TTLs or add policies there instead of editing Cloudflare dashboard settings.
- **Content-Signals** are bypassed by serving robots via the Pages Function; if you see Cloudflare-managed text reappear, redeploy to ensure the function is active.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Root URL shows the old placeholder | Confirm `functions/[[path]].ts` is present and redeploy. |
| Styles missing on root | Confirm `<base href="/marketing/">` exists in every HTML file so asset paths resolve correctly. |
| Lighthouse SEO < 100 citing `Content-signal` | Turn off Cloudflare content signals (Rules → Content → Content Signals) or request ops to do so; the robots function alone cannot override it. |
| Beacon/CORS errors | Only include production analytics scripts with valid tokens. Remove unused scripts to maintain a clean console. |
| Cloudflare deploy mismatch | Use `automation/n8n-cloudflare-pipeline.json` or trigger a manual redeploy via the Pages dashboard. |

---

## Contact Points

- Ops Owner: Dr. Erica L. Tartt  
- Automation Maintainer: (assign when available)  
- Slack Channel: `#feelings-unplugged-ops`

Keep this doc updated when changing the deployment strategy or adding new automations.

