# Feelings Unplugged Automation Playbook

This playbook documents the automation patterns we run (and plan to run) against the Feelings Unplugged marketing site. It is designed so agents—orchestration platforms such as n8n—can execute the same workflows reliably.

---

## 1. Source of Truth

| Item | Value |
| --- | --- |
| Repository | `eltphd/feelings-unplugged` |
| Pages Project | `feelings-unplugged` |
| Production Domain | `feelingsunplugged.space` |
| Deployment Method | Cloudflare Pages (Git-connected) |

Secrets managed in n8n or CI need the following:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PROJECT_NAME` (`feelings-unplugged`)
- `CLOUDFLARE_API_TOKEN` (Pages Edit + Workers Scripts Edit)
- `GITHUB_TOKEN` (repo: workflow scope)
- Optional: `SLACK_WEBHOOK_URL`, `EMAIL_SMTP_*`, `LIGHTHOUSE_API_KEY`
- Google PageSpeed service-account env vars:
  - `GOOGLE_CLIENT_EMAIL`
  - `GOOGLE_PRIVATE_KEY` (use `\n` escape sequences in env files)

---

## 2. End-to-End Pipeline

### Trigger Paths
1. **Git push to `main`** → CI job (GitHub Actions) checks formatting/tests → if green, call Cloudflare Deploy Hook.
2. **Manual run in n8n** (see `automation/n8n-cloudflare-pipeline.json`) → refresh production from any commit hash or branch.
3. **Scheduled QA** (daily/weekly) → n8n Lighthouse run on production to catch regressions.

### Deploy Hook Workflow (serverless-friendly)
1. GitHub Action `deploy-pages.yml`:
   - Install dependencies (`npm ci` for QA scripts if needed).
   - Run smoke tests (HTML/Lighthouse Lite).
   - `curl -X POST https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/<hook>` with secret header.
2. n8n flow `Post Deploy QA` (`automation/n8n-cloudflare-pipeline.json` import):
   - Manual trigger → deploy hook.
   - Wait 60 seconds, poll `/accounts/:id/pages/projects/:name/deployments`.
   - On success, build a Google OAuth JWT from service-account env vars, exchange it for an access token, then call PageSpeed Insights API (mobile) to collect fresh Performance / A11y / BP / SEO scores + FCP/LCP/CLS/TBT.
   - Post Slack summary with deployment URL, Lighthouse scores, and Web Analytics dashboard deep link.

---

## 3. Recommended Automations

| Automation | Purpose | Suggested Tool | Notes |
| --- | --- | --- | --- |
| Deployment verify | Ensure Pages completed & alias updated | n8n HTTP nodes | Re-run if `latest_stage.status !== success`. |
| Production Lighthouse | Alert on CLS/contrast regressions | n8n + PageSpeed Insights (service account) | Run nightly; threshold CLS ≤ 0.1, Performance ≥ 95, BP = 100 (disable Browser Integrity / Bot Fight scripts if they introduce deprecated APIs). |
| Link crawler | Catch broken marketing links | n8n + `broken-link-checker` CLI in an Execute Command node | Run weekly. |
| Asset sync | Ensure `marketing/favicon*` + `robots.txt` present | GitHub Action | Block merges if missing. |
| Cache purge (optional) | Bust CDN when assets change | n8n HTTP node → `POST /zones/:id/purge_cache` | Use only for major revamps. |

---

## 4. Cloudflare API Reference (used in flows)

1. **Deployments list**
   ```
   GET https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments
   Headers: Authorization: Bearer <token>
   ```
2. **Trigger build (CI Hook)**  
   Configure in Pages UI → Settings → Deploy Hooks → copy URL.
3. **Purge cache**
   ```
   POST https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache
   Body: { "purge_everything": true }
   ```
4. **DNS / SSL (optional)**  
   Use Workers KV + Pages if needing dynamic rewrites.

---

## 5. QA Checks & Thresholds

- **Responsive QA**: 360px, 390px, 768px, 1280px (no horizontal scroll, CTA ≥ 48px height).
- **Lighthouse**: Mobile preset, Performance 95+, CLS ≤ 0.1, Best Practices 95+.  
  Script: `npx lighthouse <url> --form-factor=mobile --screenEmulation.mobile=true --only-categories=performance,accessibility,best-practices,seo`.
- Disable Cloudflare “Browser Integrity Check” and Bot Fight Mode for marketing pages if they inject `cdn-cgi/challenge-platform` scripts that trigger Best Practices warnings.
- **Robots**: `curl https://feelingsunplugged.space/robots.txt`. Must match repository copy (no `Content-signal` directives).
- **Favicon**: `curl -I https://feelingsunplugged.space/favicon.ico` should return `200`.

---

## 6. Secrets Handling

- Store tokens in n8n credentials vault. For JSON import, map credential placeholders (`{{ $json.CF_TOKEN }}`) to the saved credential.
- Rotate tokens quarterly. GitHub/Cloudflare tokens go in a shared password manager with expiry reminders.
- CI systems should retrieve secrets via GitHub Encrypted Secrets: `CF_API_TOKEN`, `CF_ACCOUNT_ID`, `PAGES_DEPLOY_HOOK`, etc.

---

## 7. Extending the Playbook

1. **PR Previews**: Use `wrangler pages dev` for ephemeral QA; integrate with GitHub checks.
2. **Content editors**: Provide a Netlify CMS or open-source alternative pointing at marketing folder, using GitHub App tokens.
3. **Incident rollback**: n8n flow to redeploy previous `deployment_id` via `POST /rollbacks`.
4. **Analytics**: Decide whether to enable Cloudflare Web Analytics or integrate Plausible/PostHog (see section §8 in repo root README when added).

---

## 8. Hand-Off Checklist for Agents

- Clone repo, install dependencies (`pip install --break-system-packages pillow`, etc.).
- Run `python3 scripts/generate_favicon.py` if icon updates.
- Execute Lighthouse target(s) before pushing.
- Use the n8n import file to recreate flows, set credentials, then enable schedules.
- Document any manual dashboard toggles in `docs/ops-log.md` (create if missing).

---

### Contacts

- Ops owner: Dr. Erica L. Tartt (`<insert email>`)
- Automation engineer on-call: TBD (add when defined)
- Incident Slack channel: `#feelings-unplugged-ops`


