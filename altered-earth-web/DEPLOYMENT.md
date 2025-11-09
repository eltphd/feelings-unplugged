# 🚀 DEPLOYMENT GUIDE - Get Your Journizine Online in 5 Minutes

## ✅ What's Already Done

- ✓ Web app built and working
- ✓ Git repository initialized
- ✓ All code committed
- ✓ Ready to deploy!

---

## 🌐 Option 1: Deploy to Vercel (RECOMMENDED - FREE)

### Step 1: Create GitHub Repository (2 minutes)

1. Go to https://github.com/new
2. Repository name: `altered-earth-journizine`
3. Description: "Interactive mental health journizine for teens"
4. Make it **Public** (so it's free)
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click "Create repository"

### Step 2: Push Code to GitHub (1 minute)

GitHub will show you commands. Run these in Terminal:

```bash
cd /Users/tarttphd/Downloads/feelings-unplugged/altered-earth-web

git remote add origin https://github.com/YOUR-USERNAME/altered-earth-journizine.git
git branch -M main
git push -u origin main
```

*(Replace `YOUR-USERNAME` with your GitHub username)*

### Step 3: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Click "Import Project"
4. Select `altered-earth-journizine` repository
5. Click "Deploy"
6. Wait 2 minutes... DONE! 🎉

**Your site will be live at:** `https://altered-earth-journizine.vercel.app`

### Step 4: (Optional) Custom Domain

Want `alteredearth.com` instead?
1. Buy domain on Namecheap ($12/year)
2. In Vercel → Settings → Domains → Add your domain
3. Update DNS settings (Vercel gives you instructions)

---

## 📱 Option 2: Deploy to Netlify (Alternative - Also FREE)

1. Go to https://app.netlify.com/start
2. Click "Import from Git"
3. Connect GitHub
4. Select repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

---

## 🔥 What Happens After Deployment

### Your journizine will be:
- ✅ **Live worldwide** (anyone can access it)
- ✅ **Free forever** (no hosting costs)
- ✅ **Fast** (CDN-powered)
- ✅ **Secure** (HTTPS enabled)
- ✅ **Mobile-friendly** (works on all devices)

### You can:
- Share the link on social media
- Send to schools/therapists
- Add to your email signature
- Print QR codes that link to it

---

## 📊 Analytics (Optional)

Want to see how many teens are using it?

### Free Options:
1. **Vercel Analytics** (built-in, 1-click enable)
2. **Google Analytics** (add tracking code)
3. **Plausible** ($9/month, privacy-focused)

---

## 🔄 How to Update Your Site

After deployment, anytime you want to update:

```bash
cd /Users/tarttphd/Downloads/feelings-unplugged/altered-earth-web

# Make your changes, then:
git add -A
git commit -m "Description of changes"
git push

# Vercel auto-deploys in 2 minutes!
```

---

## ✨ Next Steps After Deployment

1. **Test it on your phone** - Make sure it works on mobile
2. **Share with 1-2 teens** - Get feedback
3. **Add Google Analytics** - Track usage
4. **Share on social media** - Spread the word
5. **Consider custom domain** - More professional

---

## 🆘 Troubleshooting

**Build fails?**
- Check the build logs in Vercel
- Make sure all files are committed (`git status`)

**Site not updating?**
- Clear your browser cache
- Check deployment logs in Vercel dashboard

**Need help?**
- Vercel Discord: https://vercel.com/discord
- Email support: support@vercel.com

---

## 💰 Cost Breakdown

| Item | Cost |
|------|------|
| **Hosting (Vercel)** | $0/month |
| **SSL Certificate** | $0 (included) |
| **Bandwidth** | $0 (unlimited for personal sites) |
| **Custom Domain (optional)** | ~$12/year |
| **TOTAL** | **$0 to start** |

---

## 🎯 What You'll Have

After following these steps:

✅ Professional website live at `yoursite.vercel.app`
✅ Free hosting forever
✅ Automatic deployments (push to GitHub → site updates)
✅ HTTPS/SSL security
✅ Global CDN (fast worldwide)
✅ Mobile-responsive
✅ Zero maintenance

**Ready to deploy? Follow Step 1 above!** 🚀
