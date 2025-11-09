# ⚡ Quick Start: Deploy Your Static Site Now

**Estimated time:** 5 minutes to deployment

---

## 🚀 One-Command Deployment

```bash
./deploy-to-cloudflare.sh
```

That's it! The script will:
1. ✅ Check if you're logged in to Cloudflare
2. ✅ Prompt you to login if needed (opens browser)
3. ✅ Deploy all your static files
4. ✅ Give you a live URL

---

## 📋 What You Need

- [x] Cloudflare account (free) - https://dash.cloudflare.com/sign-up
- [x] Files are ready (they are! ✅)
- [x] Wrangler installed (done! ✅)

---

## 🎯 Step-by-Step

### **Option 1: Automated Script (Recommended)**

```bash
# From /home/user/feelings-unplugged/ directory
./deploy-to-cloudflare.sh
```

Follow the prompts:
1. Login to Cloudflare (browser opens)
2. Choose project name (use "feelings-unplugged")
3. Wait 30 seconds
4. Done! You'll get a live URL

### **Option 2: Manual Commands**

```bash
# Login first
wrangler login

# Deploy
wrangler pages deploy . --project-name=feelings-unplugged

# You'll get: https://feelings-unplugged.pages.dev
```

---

## 🌐 After Deployment

Your site will be live at:
```
https://feelings-unplugged.pages.dev
```

**Test it immediately!** Click the URL to verify:
- ✅ Homepage loads
- ✅ teen-journal.html page works
- ✅ Firefly styles applied
- ✅ Links to app.feelingsunplugged.space work

---

## 🔧 Add Custom Domain (Optional - 2 minutes)

Once deployed, add your custom domain:

### **Method 1: Cloudflare Dashboard**
1. Go to https://dash.cloudflare.com/
2. Workers & Pages → feelings-unplugged
3. Custom domains → "Set up a custom domain"
4. Enter: `feelingsunplugged.space`
5. Click "Activate domain"

Cloudflare will:
- Auto-configure DNS if domain is on Cloudflare
- OR show you DNS records to add if domain is elsewhere

### **Method 2: CLI**
```bash
wrangler pages domain add feelingsunplugged.space --project-name=feelings-unplugged
```

---

## 📊 Deployment Checklist

**Before running script:**
- [x] All files committed and pushed ✅
- [x] Links updated to app.feelingsunplugged.space ✅
- [x] Firefly aesthetic complete ✅

**Run deployment:**
- [ ] Run `./deploy-to-cloudflare.sh`
- [ ] Login to Cloudflare when prompted
- [ ] Note the .pages.dev URL you receive

**After deployment:**
- [ ] Test preview URL
- [ ] Add custom domain (feelingsunplugged.space)
- [ ] Configure DNS if needed
- [ ] Test custom domain with https://

---

## 🚨 Troubleshooting

**Script won't run:**
```bash
chmod +x deploy-to-cloudflare.sh
./deploy-to-cloudflare.sh
```

**"Command not found: wrangler"**
```bash
npm install -g wrangler
```

**"You are not authenticated"**
```bash
wrangler login
# Browser will open for OAuth
```

**"Project already exists"**
- Use different project name, OR
- Deploy to existing project (it will update)

---

## 💡 Pro Tips

1. **Git Integration:** After first deploy via CLI, connect to Git in Cloudflare Dashboard for auto-deploys on push

2. **Multiple Domains:** Deploy same content twice with different project names:
   ```bash
   wrangler pages deploy . --project-name=feelings-unplugged
   wrangler pages deploy . --project-name=altered-earth-hub
   ```

3. **Rollback:** Cloudflare keeps all deployments. Rollback in dashboard if needed.

4. **Analytics:** Check analytics in Cloudflare Dashboard after deployment

---

## 📞 Need Help?

**Check deployment logs:**
```bash
wrangler pages deployment list --project-name=feelings-unplugged
```

**View project in browser:**
https://dash.cloudflare.com/

---

**Ready?** Run the script now:
```bash
./deploy-to-cloudflare.sh
```

Your site will be live worldwide in under 60 seconds! 🚀
