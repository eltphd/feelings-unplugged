# 🚀 Vercel Deployment - Two Options

## Option 1: Web Interface (Easiest - Recommended)

Since your code is already on GitHub, the easiest way is to connect via the web interface:

### Step 1: Go to Vercel
1. Open https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**

### Step 2: Import Repository
1. Find **"feelings-unplugged"** in your repositories
2. Click **"Import"**

### Step 3: Configure Project
- **Project Name:** `feelings-unplugged` (or your preferred name)
- **Root Directory:** Click "Edit" → Set to: `altered-earth-web`
- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)
- **Install Command:** `npm install` (auto-filled)

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app will be live!

### Step 5: Set Up Auto-Deploy
- ✅ Auto-deploy is enabled by default
- Every push to `main` branch = automatic deployment
- Preview deployments for pull requests

---

## Option 2: Vercel CLI (Command Line)

If you prefer command line deployment:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged/altered-earth-web
vercel login
```

### Step 3: Deploy
```bash
vercel --prod
```

Or use the deployment script:
```bash
./DEPLOY.sh
```

---

## 🌍 Setting Up Custom Domain

After deployment:

### Step 1: Add Domain in Vercel
1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `app.feelingsunplugged.space`
4. Click **"Add"**

### Step 2: Configure DNS
Add this CNAME record in your DNS provider:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: Automatic (or 3600)
```

### Step 3: Wait for DNS
- DNS propagation: 5-10 minutes
- SSL certificate: Auto-enabled by Vercel
- Your app will be live at: `https://app.feelingsunplugged.space`

---

## ✅ After Deployment

### Test Your App
- ✅ Visit your deployment URL
- ✅ Test `/emotions` page
- ✅ Test `/timeline` page
- ✅ Test `/prompts-feelings` page
- ✅ Test `/settings` page
- ✅ Verify data persistence (check-in, then reload)

### Monitor Deployments
- View deployments in Vercel Dashboard
- Check build logs
- Monitor performance
- View analytics (optional)

---

## 🔄 Auto-Deployment

Once connected via web interface:
- ✅ Every push to `main` = automatic deployment
- ✅ Preview deployments for pull requests
- ✅ Instant rollback if needed
- ✅ Build logs available in dashboard

---

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Verify Node.js version (18+)
- Ensure all dependencies are in package.json

### Domain Not Working
- Wait 10 minutes for DNS propagation
- Verify CNAME record is correct
- Check SSL certificate status in Vercel

### Pages Not Loading
- Verify routes are correct
- Check browser console for errors
- Ensure pages are in `app/` directory

---

## 📊 Recommended: Use Web Interface

**Why use the web interface?**
- ✅ Easier setup
- ✅ Auto-deployment configured automatically
- ✅ Better visibility of deployments
- ✅ Easy domain management
- ✅ Built-in analytics
- ✅ Team collaboration features

---

**Ready to deploy?** Go to https://vercel.com and follow Option 1 above! 🚀

