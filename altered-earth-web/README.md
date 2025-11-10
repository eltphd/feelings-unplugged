# Feelings Unplugged – App README

Next.js 16 + React 19 app powering the live journaling experience at https://app.feelingsunplugged.space.

---

## 🌍 Production & Preview URLs

- **Production:** https://app.feelingsunplugged.space
- **Latest Vercel preview:** see the Deployment tab in the Vercel dashboard

The root-level `vercel.json` already runs all build/install commands from this directory, so deploys can be triggered from the repo root with `vercel --prod`.

---

## 🚀 Run Locally

```bash
npm install
npm run dev         # starts on http://localhost:3000
npm run lint        # type/lint checks
npm run build       # production build (SSG)
npm run analyze     # bundle size reports in .next/analyze
```

Everything persists in the browser via `localStorage`; no server or database is required. Clear the app data from the in-app settings page to reset state.

---

## ✨ Core Features

- Emotion check-ins with intensity + reflections
- Timeline analytics with streaks, most-felt emotions, weekly summaries
- Prompt carousel grouped by feeling (identity, future-self, hard days, joy, relationships)
- Privacy dashboard with export/delete controls and client-side backups
- DaisyUI-powered theming tuned for Gen Alpha / Gen Z attention spans

---

## 🧱 Key Directories

```
app/
├── page.tsx                  # Home dashboard overview
├── emotions/, timeline/, ... # Route groups for each experience
├── components/               # Layout, navigation, widgets, toast system
├── prompts-feelings/[id]/    # Dynamic route for prompt detail view
├── globals.css               # Tailwind + DaisyUI theme imports
└── layout.tsx                # Root layout (theme + font wiring)

components/                   # Shared UI (BottomNav, DashboardWidgets, etc.)
hooks/                        # Local storage + preference hooks
utils/                        # Prompt and emotion dictionaries
types/                        # Shared TypeScript interfaces
```

---

## 🧪 Testing & Quality

- Run `npm run lint` before committing—TypeScript + ESLint will catch most issues.
- Use `npm run analyze` after large UI changes to watch bundle size drift (see reports in `docs/reports/`).
- Manual QA checklist lives in `docs/reports/EFFICIENCY_SUMMARY.md`.

---

## 🔄 Deployment Notes

- Vercel auto-deploys from `main`.  
- To force a rebuild without cache: `vercel --prod --force`.
- Custom domain is managed in Vercel → Settings → Domains (`app.feelingsunplugged.space`).
- If the dashboard ever complains about a missing root directory, clear the “Root Directory” field (leave it blank) because the repo-level `vercel.json` handles `cd altered-earth-web` for you.

---

## 💝 Mission

Feelings Unplugged exists to give overwhelmed teens a soft place to land—free, private, and beautifully made.  
**Your brilliance is not conditional. Neither is theirs.**
