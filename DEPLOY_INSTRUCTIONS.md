# 🚀 Deploy Instructions - Choose Your Method

## ✅ Code is Ready!

Your code is pushed to GitHub and ready to deploy:
- Repository: https://github.com/eltphd/feelings-unplugged
- All changes committed and pushed
- Build tested and working
- Vercel CLI installed

## 🌐 Method 1: Web Interface (BEST for Auto-Deploy)

**Recommended!** This connects GitHub to Vercel for automatic deployments.

### Steps:
1. **Go to:** https://vercel.com
2. **Sign in** with GitHub
3. **Click:** "Add New Project"
4. **Select:** `feelings-unplugged` repository
5. **Configure:**
   - **Root Directory:** `altered-earth-web` ⚠️ IMPORTANT!
   - **Framework:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `.next` (auto)
6. **Click:** "Deploy"
7. **Wait:** 2-3 minutes
8. **Done!** ✅

### After Deployment:
- ✅ Your app is live!
- ✅ Every GitHub push = automatic deployment
- ✅ Preview deployments for PRs
- ✅ Set up custom domain in Settings → Domains

---

## 💻 Method 2: CLI Deployment (Quick Deploy)

For immediate deployment without web interface:

### Step 1: Login
```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged/altered-earth-web
vercel login
```
(This opens browser for authentication)

### Step 2: Deploy
```bash
vercel --prod
```

### Step 3: Follow Prompts
- Link to existing project? (No, create new)
- Project name: `feelings-unplugged`
- Directory: `.` (current directory)
- Override settings? (No)

### Done!
You'll get a deployment URL like: `https://feelings-unplugged-abc123.vercel.app`

---

## 🎯 Which Method Should You Use?

### Use Web Interface If:
- ✅ You want automatic deployments on every push
- ✅ You want easy domain management
- ✅ You want team collaboration
- ✅ You want built-in analytics
- ✅ **RECOMMENDED!** ⭐

### Use CLI If:
- ✅ You want to deploy immediately
- ✅ You're comfortable with command line
- ✅ You want to deploy from terminal

---

## 🌍 Setting Up Custom Domain

After deployment (either method):

### Step 1: Add Domain in Vercel
1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `app.feelingsunplugged.space`
4. Click **"Add"**

### Step 2: Configure DNS
Add this CNAME record:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: Automatic
```

### Step 3: Wait
- DNS propagation: 5-10 minutes
- SSL: Auto-enabled by Vercel
- Your app: `https://app.feelingsunplugged.space`

---

## 📱 Test After Deployment

Visit your deployment URL and test:
- ✅ `/emotions` - Emotion check-in
- ✅ `/timeline` - Emotion timeline
- ✅ `/prompts-feelings` - Prompts carousel
- ✅ `/settings` - Privacy settings
- ✅ Data persistence (check-in, reload page)

---

## 🔄 Auto-Deployment (Web Interface Only)

Once connected via web interface:
- ✅ Every push to `main` = automatic deployment
- ✅ Preview deployments for pull requests
- ✅ Build logs in Vercel Dashboard
- ✅ Instant rollback if needed

---

## 🆘 Need Help?

### Build Fails?
- Check build logs in Vercel Dashboard
- Verify Root Directory is set to `altered-earth-web`
- Check Node.js version (18+)

### Domain Not Working?
- Wait 10 minutes for DNS propagation
- Verify CNAME record
- Check SSL certificate status

### Pages Not Loading?
- Verify routes are correct
- Check browser console
- Ensure pages are in `app/` directory

---

## ✅ Recommended Next Steps

1. **Deploy via Web Interface** (Method 1) ⭐
2. **Test all pages** on your deployment URL
3. **Set up custom domain** (`app.feelingsunplugged.space`)
4. **Configure DNS** (CNAME record)
5. **Share with users!** 🎉

---

**Ready to deploy?** Go to https://vercel.com and follow Method 1! 🚀

