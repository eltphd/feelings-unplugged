# 🔧 Fix Vercel Deployment

## Issue
The deployment is showing errors. This is likely because Vercel needs to be configured to build from the correct directory.

## Solution: Configure via Web Interface

The easiest way to fix this is to configure the project properly in Vercel's web interface:

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/ericas-projects-637268fc/altered-earth-web/settings
2. Or go to: https://vercel.com/dashboard

### Step 2: Configure Root Directory
1. Go to **Settings** → **General**
2. Scroll to **Root Directory**
3. Click **"Edit"**
4. Set to: `altered-earth-web`
5. Click **"Save"**

### Step 3: Configure Build Settings
1. Go to **Settings** → **General**
2. Verify these settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
   - **Node.js Version:** 18.x (or latest)

### Step 4: Connect GitHub (Recommended)
1. Go to **Settings** → **Git**
2. Click **"Connect Git Repository"**
3. Select **"feelings-unplugged"** repository
4. Set **Root Directory** to: `altered-earth-web`
5. Set **Production Branch** to: `main`
6. Click **"Save"**

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger auto-deployment

## Alternative: Deploy from Correct Directory

If you want to deploy via CLI from the repository root:

```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged
vercel --prod --cwd altered-earth-web
```

## Verify Deployment

After fixing the configuration:
1. Check build logs in Vercel Dashboard
2. Verify all pages are building correctly
3. Test the deployment URL
4. Check that all routes work

## Next Steps

1. ✅ Configure root directory in Vercel
2. ✅ Connect GitHub repository
3. ✅ Set up auto-deployment
4. ✅ Set up custom domain
5. ✅ Test all pages

---

**The local build works perfectly, so the issue is just Vercel configuration!**

