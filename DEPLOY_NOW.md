# 🚀 Deploy to Vercel - Quick Start Guide

## ✅ Ready to Deploy!

Your Feelings Unplugged app is ready to deploy. Follow these simple steps:

## 🌐 Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel
1. Open https://vercel.com
2. Sign in with your GitHub account
3. Click **"Add New Project"**

### Step 2: Import Repository
1. Find **"feelings-unplugged"** in your repositories list
2. Click **"Import"**

### Step 3: Configure Project
1. **Project Name:** `feelings-unplugged` (or `app-feelings-unplugged`)
2. **Root Directory:** Click "Edit" and set to: `altered-earth-web`
3. **Framework Preset:** Next.js (auto-detected)
4. **Build Command:** `npm run build` (auto-filled)
5. **Output Directory:** `.next` (auto-filled)
6. **Install Command:** `npm install` (auto-filled)

### Step 4: Environment Variables
- None needed for now (all data is client-side)

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://feelings-unplugged-abc123.vercel.app`

## 🌍 Set Custom Domain

### Step 1: Add Domain in Vercel
1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `app.feelingsunplugged.space`
4. Click **"Add"**

### Step 2: Configure DNS
Vercel will show you DNS records. Add this CNAME record:

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

## 📱 Test Your Deployment

After deployment, test these pages:
- ✅ `/emotions` - Emotion check-in
- ✅ `/timeline` - Emotion timeline  
- ✅ `/prompts-feelings` - Journaling prompts
- ✅ `/settings` - Privacy settings

## 🎉 What Happens Next

### Automatic Deployments
- Every push to `main` branch = automatic deployment
- Preview deployments for pull requests
- Instant rollback if needed

### Monitoring
- View deployments in Vercel Dashboard
- Check build logs
- Monitor performance
- View analytics (optional)

## 🔄 Updating Your App

To update your app:
```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged/altered-earth-web

# Make changes, then:
git add -A
git commit -m "Your update message"
git push

# Vercel auto-deploys in 2 minutes!
```

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

## 📊 Post-Deployment Checklist

- [ ] App deploys successfully
- [ ] All pages load correctly
- [ ] Emotion check-in works
- [ ] Timeline displays entries
- [ ] Prompts carousel works
- [ ] Settings page functional
- [ ] Data persists in localStorage
- [ ] Mobile responsive
- [ ] Custom domain configured
- [ ] SSL certificate active

## 🎯 Next Steps

1. **Deploy to Vercel** (follow steps above)
2. **Test all features** on mobile and desktop
3. **Configure custom domain** (`app.feelingsunplugged.space`)
4. **Share with users!** 🎉

---

**Ready to deploy?** Go to https://vercel.com and follow the steps above!

Your app will be live in under 5 minutes! ⚡

