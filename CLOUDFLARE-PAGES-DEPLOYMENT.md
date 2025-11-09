# 🚀 Cloudflare Pages Deployment Guide

## 📋 What You're Deploying

**Static Marketing Site** for Feelings Unplugged
- Files: `index.html`, `teen-journal.html`, `parent-guide.html`, `educator-toolkit.html`, `style.css`
- Security: `_headers` (security headers for Cloudflare)
- Domains: `altered.earth` OR `feelingsunplugged.space` (your choice)

---

## 🎯 Two Deployment Options

### **Option A: Dashboard Deployment (Easiest - 5 minutes)**
No CLI needed, perfect for one-time setup.

### **Option B: CLI Deployment with Wrangler**
For automated deployments from command line.

---

## 🌐 Option A: Deploy via Cloudflare Dashboard

### **Step 1: Login to Cloudflare**
1. Go to https://dash.cloudflare.com/
2. Login with your account
3. Click "Workers & Pages" in left sidebar

### **Step 2: Create New Pages Project**
1. Click "Create application" → "Pages" → "Connect to Git"
2. **OR** click "Upload assets" for direct upload

### **Step 3A: Connect to Git (Recommended)**
1. Authorize Cloudflare to access your GitHub
2. Select your repository: `feelings-unplugged`
3. Configure build settings:
   - **Branch:** `claude/firefly-ui-mobile-redesign-011CUxXuhTBz4vUCNptkxDaZ` (or main if merged)
   - **Build command:** Leave blank (static files, no build needed)
   - **Build output directory:** `/` (root directory)
4. Click "Save and Deploy"
5. Wait 1-2 minutes... Done!

### **Step 3B: Direct Upload (Alternative)**
1. Click "Upload assets"
2. Drag and drop these files:
   - index.html
   - teen-journal.html
   - parent-guide.html
   - educator-toolkit.html
   - style.css
   - _headers
3. Click "Deploy site"
4. Wait 1 minute... Done!

### **Step 4: Get Your URL**
Cloudflare will give you a URL like:
- `https://feelings-unplugged-abc123.pages.dev`

Test this URL to make sure everything works!

### **Step 5: Add Custom Domain**
1. In your Pages project → Settings → Custom domains
2. Click "Set up a custom domain"
3. Enter: `feelingsunplugged.space` (or `altered.earth`)
4. Cloudflare will:
   - Detect your domain (if already on Cloudflare)
   - OR show you DNS records to add
5. Click "Activate domain"
6. Wait 5 minutes for DNS propagation
7. SSL auto-enabled (https://)

---

## 💻 Option B: Deploy via Wrangler CLI

### **Step 1: Install Wrangler**
```bash
npm install -g wrangler
```

### **Step 2: Login to Cloudflare**
```bash
wrangler login
```
This opens browser for authorization.

### **Step 3: Create Pages Project**
```bash
cd /home/user/feelings-unplugged

wrangler pages project create feelings-unplugged
```

When prompted:
- **Production branch:** main (or your branch name)

### **Step 4: Deploy**
```bash
wrangler pages deploy . --project-name=feelings-unplugged
```

This uploads:
- All HTML files
- style.css
- _headers
- Any images/assets

### **Step 5: View Deployment**
Wrangler will output:
```
✨ Deployment complete!
🌎 https://feelings-unplugged.pages.dev
```

### **Step 6: Add Custom Domain**
```bash
wrangler pages domain add feelingsunplugged.space --project-name=feelings-unplugged
```

OR do it in dashboard (easier for DNS configuration).

---

## 🔧 DNS Configuration (After Deployment)

Once deployed, configure your domains:

### **For feelingsunplugged.space**

**If domain is already on Cloudflare:**
- Cloudflare auto-detects and configures DNS
- Just activate the domain in Pages settings

**If domain is on another registrar (Namecheap, etc):**

Add these records in your registrar:

```
Type: CNAME
Name: @
Value: feelings-unplugged.pages.dev
TTL: Auto

Type: CNAME
Name: www
Value: feelings-unplugged.pages.dev
TTL: Auto
```

**OR** transfer nameservers to Cloudflare (recommended):
- Cloudflare Dashboard → Add Site → Follow instructions
- Update nameservers at your registrar
- Wait 24-48 hours for propagation

---

## 🎨 What Gets Deployed

Your static site structure:
```
feelingsunplugged.space/
├── index.html              → Homepage/product hub
├── teen-journal.html       → Journal product page
│   └── Links to: app.feelingsunplugged.space
├── parent-guide.html       → Parent guide
├── educator-toolkit.html   → Educator toolkit
├── style.css              → Firefly aesthetic styles
└── _headers               → Security headers
```

---

## ✅ Deployment Checklist

**Before Deployment:**
- [x] All files committed to git
- [x] Links updated to app.feelingsunplugged.space
- [x] Firefly aesthetic styles applied
- [x] Mobile-responsive design tested
- [x] Security headers configured (_headers file)

**During Deployment:**
- [ ] Choose deployment method (Git or Direct Upload)
- [ ] Deploy to Cloudflare Pages
- [ ] Test preview URL (.pages.dev)
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness

**After Deployment:**
- [ ] Add custom domain (feelingsunplugged.space or altered.earth)
- [ ] Configure DNS records
- [ ] Wait for DNS propagation (5-10 minutes)
- [ ] Test custom domain with https://
- [ ] Verify SSL certificate active
- [ ] Test all links to web app

---

## 🌍 Multiple Domain Strategy

You can deploy the SAME content to BOTH domains:

### **Deployment 1: altered.earth**
```bash
wrangler pages deploy . --project-name=altered-earth-hub
```
Then add custom domain: `altered.earth`

### **Deployment 2: feelingsunplugged.space**
```bash
wrangler pages deploy . --project-name=feelings-unplugged
```
Then add custom domain: `feelingsunplugged.space`

**OR** use domain redirects:
- Primary: `feelingsunplugged.space` (hosts the site)
- Redirect: `altered.earth` → redirects to feelingsunplugged.space

---

## 🚨 Troubleshooting

### **"Build failed"**
- Static sites don't need builds
- Set build command to blank/empty
- Set output directory to `/` or leave blank

### **"404 Not Found"**
- Make sure `index.html` is in root directory
- Check build output directory is set to `/`
- Verify files uploaded correctly

### **"DNS not resolving"**
- Wait 5-10 minutes for DNS propagation
- Check DNS records are correct
- Use https://dnschecker.org to verify

### **"SSL not working"**
- Cloudflare auto-provisions SSL
- Wait 5-10 minutes after adding domain
- Check SSL mode is "Full" or "Full (Strict)" in SSL/TLS settings

### **"Links to web app broken"**
- Verify app.feelingsunplugged.space is configured in Vercel
- Check CNAME record for app subdomain
- Test web app URL directly

---

## 💰 Cost

| Service | Cost |
|---------|------|
| **Cloudflare Pages Hosting** | $0 (Free forever) |
| **Bandwidth** | $0 (Unlimited) |
| **SSL Certificate** | $0 (Auto-included) |
| **Build minutes** | $0 (500 builds/month free) |
| **Custom domain** | $0 (use your existing domains) |
| **TOTAL** | **$0/month** |

---

## 📊 After Deployment

### **Analytics (Free)**
- Cloudflare Dashboard → Your Pages Project → Analytics
- Page views, bandwidth, geographic distribution

### **Performance**
- Global CDN (fast worldwide)
- Automatic image optimization
- HTTP/3 and Brotli compression

### **Updates**
If using Git integration:
```bash
# Make changes locally
git add -A
git commit -m "Update content"
git push

# Cloudflare auto-deploys in 1-2 minutes!
```

If using direct upload:
- Upload files again via dashboard
- Cloudflare creates new deployment
- Old deployment remains accessible (rollback available)

---

## 🎯 Recommended Setup

**Best practice for your use case:**

1. **Deploy to Cloudflare Pages** (feelingsunplugged.space)
   - Connect to Git (auto-deploys on push)
   - Add custom domain: `feelingsunplugged.space`
   - Use altered.earth for publication hub (separate deployment later)

2. **Configure DNS:**
   - `feelingsunplugged.space` → Cloudflare Pages
   - `app.feelingsunplugged.space` → Vercel (CNAME to cname.vercel-dns.com)

3. **Test:**
   - Static site: https://feelingsunplugged.space/
   - Web app: https://app.feelingsunplugged.space/
   - Verify links between them work

---

## 📞 Support

**Cloudflare:**
- Docs: https://developers.cloudflare.com/pages/
- Community: https://community.cloudflare.com/
- Discord: https://discord.cloudflare.com/

**Need Help?**
- Check deployment logs in Cloudflare Dashboard
- Most common issue: DNS propagation time (wait 10 minutes)
- Second most common: Build settings (use blank for static sites)

---

**Ready to deploy?** Start with **Option A** (Dashboard) - it's the fastest way to get live!

Once deployed, your static site will be live worldwide in under 2 minutes. ⚡
