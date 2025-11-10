# Feelings Unplugged – Vercel Deployment Guide _(canonical)_

This is the single source of truth for deploying the Next.js app.  
If you keep this file updated, no other deployment notes are needed.

---

## 1. Repo Layout & Build Commands

- The Next.js app lives in `altered-earth-web/`.
- A root-level `vercel.json` handles `cd altered-earth-web` before install/build/dev.
- Local builds continue to run from `altered-earth-web/` with the usual `npm` scripts.

---

## 2. Recommended: Deploy from the Vercel Dashboard

1. Go to https://vercel.com and open the `feelingsunplugged` project (or import the repo if it’s new).
2. **Project Settings → General → Root Directory**  
   - Leave this blank (or set to `.`).  
   - The root-level `vercel.json` already handles building the subdirectory.
3. **Build & Output Settings** (usually auto-filled):  
   - Install Command: `npm install`  
   - Build Command: `npm run build`  
   - Output Directory: `.next`  
   - Framework: Next.js
4. Save changes, then trigger a redeploy (Deployments tab → `Redeploy`) or push to `main`.

**Result:** Vercel installs/builds from the repo root, but the commands inside `vercel.json` jump into `altered-earth-web/`, so the app deploys correctly.

---

## 3. CLI Deploy (when you need a manual push)

```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged
vercel --prod
```

- On first run, select the existing project when prompted.  
- Keep “Root Directory” as `.` when the CLI asks; the shared `vercel.json` handles the subdirectory.
- Subsequent `vercel --prod` runs reuse the saved settings.

If you ever need to force a rebuild without cache:

```bash
vercel --prod --force
```

---

## 4. Custom Domain (`app.feelingsunplugged.space`)

1. Vercel Dashboard → Project → **Settings → Domains** → `Add`.
2. Add `app.feelingsunplugged.space`.
3. At your DNS host, create:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: Automatic
```

4. Wait a few minutes; SSL certs issue automatically.

---

## 5. Post-Deploy Checklist

- Homepage renders the new UI.  
- `/emotions`, `/timeline`, `/prompts-feelings`, `/settings` all load.  
- Local storage interactions work (check-in, reload, export/delete).  
- Responsive layout looks good on mobile.  
- Domain + HTTPS show as secure.

---

## 6. Troubleshooting

**Error:** “The specified Root Directory `altered-earth-web` does not exist.”  
→ Clear the Root Directory field (set to blank or `.`) and redeploy. The `vercel.json` now handles the subdirectory.

**Build failures:**  
- Check deployment logs in Vercel.  
- Ensure dependencies in `altered-earth-web/package.json` are up to date.  
- Run `npm install && npm run build` locally inside `altered-earth-web/` to confirm.

**Need a clean slate?**  
- In the dashboard, use “Clear Build Cache & Redeploy.”

---

## 7. Keeping This Doc Accurate

- Update this file whenever deployment steps change.  
- Delete any new deployment notes that duplicate what’s here.  
- Mention the date and reason when making major changes (git history handles the rest).

_Last verified: November 2025 after production deploy to `app.feelingsunplugged.space`._
