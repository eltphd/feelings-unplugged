# ⚙️ Vercel Configuration Guide

## ✅ Current Status

- ✅ Code is pushed to GitHub
- ✅ Local build works perfectly
- ✅ Vercel CLI is installed
- ⚠️ Vercel project needs root directory configuration

## 🔧 Fix Deployment Issue

The deployment is failing because Vercel needs to know the **root directory** is `altered-earth-web`.

### Solution: Configure via Vercel Dashboard

**This MUST be done via the web interface** (cannot be set in vercel.json):

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Find your project: **"altered-earth-web"**
3. Click on it to open project settings

### Step 2: Set Root Directory
1. Go to **Settings** → **General**
2. Scroll down to **Root Directory**
3. Click **"Edit"**
4. Enter: `altered-earth-web`
5. Click **"Save"**

### Step 3: Connect GitHub Repository
1. Go to **Settings** → **Git**
2. Click **"Connect Git Repository"**
3. Select: **"feelings-unplugged"**
4. Set **Root Directory:** `altered-earth-web`
5. Set **Production Branch:** `main`
6. Click **"Save"**

### Step 4: Verify Build Settings
1. Go to **Settings** → **General**
2. Verify:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
   - **Node.js Version:** 18.x or latest

### Step 5: Trigger New Deployment
After saving settings, Vercel will automatically:
- ✅ Detect the new configuration
- ✅ Trigger a new deployment
- ✅ Build from the correct directory

Or manually trigger:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Or push a new commit to `main` branch

## 🎯 Why This Is Needed

Your repository structure:
```
feelings-unplugged/
├── altered-earth-web/    ← Next.js app is here
│   ├── app/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

Vercel needs to know to build from `altered-earth-web/` directory, not the repository root.

## ✅ After Configuration

Once configured:
- ✅ Every push to `main` = automatic deployment
- ✅ Builds will work correctly
- ✅ All pages will deploy
- ✅ Custom domain can be set up

## 📱 Next Steps

1. ✅ **Configure root directory** in Vercel Dashboard
2. ✅ **Connect GitHub repository**
3. ✅ **Verify deployment succeeds**
4. ✅ **Set up custom domain** (`app.feelingsunplugged.space`)
5. ✅ **Test all pages**

## 🔗 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Project Settings:** https://vercel.com/ericas-projects-637268fc/altered-earth-web/settings
- **Deployments:** https://vercel.com/ericas-projects-637268fc/altered-earth-web/deployments
- **GitHub Repo:** https://github.com/eltphd/feelings-unplugged

---

**The configuration only takes 2 minutes in the web interface!** 🚀

