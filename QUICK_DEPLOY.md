# ⚡ Quick Deploy to Vercel

## 🚀 Deploy Now (CLI Method)

Since Vercel CLI is installed, you can deploy immediately:

```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged/altered-earth-web
vercel --prod
```

This will:
1. Ask you to login (opens browser)
2. Create a new project (or link to existing)
3. Deploy to production
4. Give you a live URL

## 🌐 Or Use Web Interface (Recommended for Auto-Deploy)

For automatic deployments on every push:

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select "feelings-unplugged" repository
5. Set Root Directory to: `altered-earth-web`
6. Click "Deploy"

After this, every push to GitHub will auto-deploy!

## 📝 Next Steps After Deployment

1. ✅ Get your deployment URL
2. ✅ Test all pages (`/emotions`, `/timeline`, etc.)
3. ✅ Set up custom domain (`app.feelingsunplugged.space`)
4. ✅ Configure DNS (CNAME: `app` → `cname.vercel-dns.com`)

---

**Ready? Run:** `cd altered-earth-web && vercel --prod`

