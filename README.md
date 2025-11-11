# Feelings Unplugged

Evidence-based emotional regulation tools for Gen Alpha/Gen Z teens, their caregivers, and the adults who support them.

---

## 💫 Live Experiences

- **Production web app:** https://app.feelingsunplugged.space  
  Next.js 16 experience with emotion check-ins, timelines, prompts, and privacy controls.
- **Marketing/packaging assets:** `marketing/` (`index.html`, `teen-journal.html`, `parent-guide.html`, `educator-toolkit.html`, `downloads.html`, `_headers`, `style.css`)  
  Static landing pages deployed via Cloudflare Pages (with Cloudflare Web Analytics embedded). Stripe payment link: https://buy.stripe.com/00wcN43Dm1gK78g6nX4Rq06.

Deployment steps for the app live in the canonical [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## 🧭 Repository Map

```
feelings-unplugged/
├── altered-earth-web/         # Next.js application (production experience)
│   ├── app/                   # App router pages & routes
│   ├── components/            # Reusable UI (DaisyUI theme)
│   ├── hooks/, utils/, types/ # Client-side data + helpers
│   ├── package.json           # App scripts & dependencies
│   └── README.md              # App-specific usage notes
├── docs/
│   ├── reports/               # Current performance & efficiency reports
│   └── reference/             # Domain plan, print handoffs, designer briefs
├── marketing/                 # Static marketing site (HTML/CSS + Cloudflare headers)
├── products/, branding/, content/   # PDF deliverables & creative assets
├── indesign-scripts/          # MCP automation helpers for print production
├── archive/                   # Older docs & reports kept for historical context
├── DEPLOYMENT.md              # Canonical Vercel deploy instructions
└── README.md                  # You are here
```

Everything you need for the live app lives inside `altered-earth-web/`; print-production artifacts and packaging collateral stay at the repo root.

---

## 🚀 Local Development

```bash
git clone https://github.com/eltphd/feelings-unplugged.git
cd feelings-unplugged/altered-earth-web
npm install
npm run dev
```

Visit http://localhost:3000 to explore the journaling experience.  
The app is 100% client-side: all emotion entries, notes, and privacy controls are saved to the user’s browser via `localStorage`.

---

## 🛠 Tooling Highlights

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 3 + DaisyUI custom theme (`feelingsunplugged`)
- **State:** Local hooks + storage utilities (no server-side database)
- **CI/CD:** Vercel (production + previews), `vercel.json` in repo root orchestrates subdirectory builds
- **Automation:** n8n workflows (`automation/n8n-cloudflare-pipeline.json`, `automation/n8n-stripe-fulfillment.json`) handle Cloudflare deploy QA + Stripe digital delivery
- **Bundle auditing:** `npm run analyze` generates `.next/analyze` reports (see `docs/reports/`)

---

## 📚 Documentation You’ll Revisit Often

- [`DEPLOYMENT.md`](./DEPLOYMENT.md) – how to redeploy or troubleshoot Vercel
- [`docs/reports/PERFORMANCE_REPORT.md`](./docs/reports/PERFORMANCE_REPORT.md) – latest bundle and perf opportunities
- [`docs/reports/EFFICIENCY_SUMMARY.md`](./docs/reports/EFFICIENCY_SUMMARY.md) – current state-of-the-product snapshot
- [`docs/reference/DOMAIN-ARCHITECTURE.md`](./docs/reference/DOMAIN-ARCHITECTURE.md) – domain + DNS strategy
- [`docs/reference/README_How_To_Use_These_Files.md`](./docs/reference/README_How_To_Use_These_Files.md) – print journizine briefing package

Outdated or superseded docs now live in `archive/docs/` so it’s easy to find the active guidance.

---

## 🤝 Contributing & Next Steps

1. Work from the repo root (`feelings-unplugged`) on `main`.
2. Make updates inside `altered-earth-web/` or the docs directories.
3. Run `npm run lint` / `npm run build` before pushing if you change app code.
4. Commit, push, and watch Vercel deploy automatically to `app.feelingsunplugged.space`.

Ideas for the upcoming milestone (see the reports for more detail):
- Add loading skeletons to timeline/prompts routes
- Run Lighthouse + bundle audits and capture baselines
- Explore privacy-first analytics or PWA-lite caching for offline journaling

---

## ✨ Mission

Feelings Unplugged is built to make high-quality, culturally competent emotional regulation tools accessible to teens who need them most.  
**Your brilliance is not conditional. Neither is theirs.**
