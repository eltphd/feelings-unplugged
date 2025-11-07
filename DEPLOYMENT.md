# Feelings Unplugged - Cloudflare Pages Deployment Guide

## 🚀 Quick Deploy (3 Methods)

### Method 1: Direct Upload (Fastest - 5 minutes)

**Perfect for:** Immediate deployment, no git required

1. **Prepare files:**
   ```bash
   cd /Users/tarttphd/Downloads/feelings-unplugged
   ls
   # You should see: index.html, style.css, teen-journal.html, parent-guide.html, educator-toolkit.html, _headers
   ```

2. **Go to Cloudflare Dashboard:**
   - Navigate to: https://dash.cloudflare.com/
   - Click **Pages** in the left sidebar
   - Click **Create a project**
   - Select **Direct Upload**

3. **Upload files:**
   - Drag and drop the entire `feelings-unplugged` folder
   - Or click **Select from computer** and upload all files
   - Project name: `feelings-unplugged`
   - Click **Deploy site**

4. **Done!** Your site will be live at: `https://feelings-unplugged.pages.dev`

---

### Method 2: Git + Cloudflare Pages (Recommended for updates)

**Perfect for:** Version control, easy updates, professional workflow

#### Step 1: Initialize Git Repository

```bash
cd /Users/tarttphd/Downloads/feelings-unplugged

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Feelings Unplugged site

- Landing page with product cards
- Teen Journal page (120-page guide)
- Parent Guide page (60-page guide)
- Educator Toolkit page (40-page guide)
- Dark academia styling with soft glow aesthetic

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### Step 2: Push to GitHub

```bash
# Create new repo on GitHub first:
# Go to: https://github.com/new
# Name: feelings-unplugged
# Description: Evidence-based emotional regulation tools for teens, parents, and educators
# Public or Private: Your choice
# DO NOT initialize with README (you already have files)

# Then push:
git remote add origin https://github.com/YOUR-USERNAME/feelings-unplugged.git
git branch -M main
git push -u origin main
```

#### Step 3: Connect to Cloudflare Pages

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click **Create a project** → **Connect to Git**
3. **Authorize GitHub** access
4. **Select repository:** `feelings-unplugged`
5. **Configure build settings:**
   - Project name: `feelings-unplugged`
   - Production branch: `main`
   - Build command: (leave empty - static HTML)
   - Build output directory: `/`
6. Click **Save and Deploy**

**Your site will be live in 1-2 minutes!**

---

### Method 3: Wrangler CLI (For developers)

**Perfect for:** Command-line workflow, automation

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Authenticate
wrangler login

# Deploy
cd /Users/tarttphd/Downloads/feelings-unplugged
wrangler pages deploy . --project-name=feelings-unplugged

# Follow prompts to create project
# Your site will be live immediately
```

---

## 🌐 Custom Domain Setup

### Option A: Cloudflare-Managed Domain

If your domain is already on Cloudflare:

1. **Cloudflare Dashboard** → **Pages** → **feelings-unplugged**
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `journals.measurementally.com` or `feelings-unplugged.baseops.co`)
5. Click **Continue** → **Activate domain**

DNS records are configured automatically. SSL is automatic.

### Option B: External Domain

If your domain is NOT on Cloudflare:

1. Add CNAME record at your DNS provider:
   ```
   Type: CNAME
   Name: feelings-unplugged (or subdomain of choice)
   Value: feelings-unplugged.pages.dev
   ```

2. Follow steps from Option A above

---

## 🔧 Configuration Options

### Environment Variables (if needed later)

If you add forms, analytics, or payment processing:

1. **Cloudflare Dashboard** → **Pages** → **feelings-unplugged** → **Settings**
2. Scroll to **Environment variables**
3. Add variables for production/preview

### Headers & Redirects

The `_headers` file is already configured with:
- Security headers (XSS protection, frame protection)
- Cache control for performance
- CORS policies

To add redirects, create `_redirects` file:
```
/old-page  /new-page  301
/shop/*    https://stripe-checkout-url  200
```

---

## 📊 Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads at Cloudflare Pages URL
- [ ] All pages accessible (index, teen-journal, parent-guide, educator-toolkit)
- [ ] CSS styling applied correctly (dark academia aesthetic)
- [ ] Fonts loading (Crimson Text, Libre Baskerville)
- [ ] Links work between pages
- [ ] Responsive on mobile (test with browser dev tools)
- [ ] Security headers present (check with: https://securityheaders.com/)

---

## 🛠️ Making Updates

### With Git (Method 2):

```bash
# Make changes to HTML/CSS files
# Then:
git add .
git commit -m "Update: description of changes"
git push

# Cloudflare Pages auto-deploys on push (30-60 seconds)
```

### With Direct Upload (Method 1):

1. Make changes locally
2. Go to **Cloudflare Dashboard** → **Pages** → **feelings-unplugged**
3. Click **Create deployment**
4. Upload updated files
5. Click **Save and Deploy**

### With Wrangler CLI (Method 3):

```bash
# Make changes, then:
wrangler pages deploy . --project-name=feelings-unplugged
```

---

## 💰 Adding E-Commerce (Stripe Integration)

To sell the digital/print products:

### Quick Option: Stripe Payment Links

1. Create products in Stripe Dashboard
2. Generate payment links
3. Replace `href="#"` in purchase buttons with Stripe links:
   ```html
   <a href="https://buy.stripe.com/YOUR-LINK-HERE" class="btn btn-primary">
     Digital PDF - $19.99
   </a>
   ```

### Advanced Option: Cloudflare Workers + Stripe

Let me know if you want me to build a checkout flow with Cloudflare Workers!

---

## 📈 Analytics Setup

### Cloudflare Web Analytics (Free, Privacy-Friendly)

1. **Cloudflare Dashboard** → **Web Analytics**
2. Click **Add a site**
3. Enter domain
4. Copy the script tag
5. Add to all HTML files before `</body>`:
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "YOUR-TOKEN"}'></script>
   ```

---

## 🆘 Troubleshooting

### Site not loading:
- Check deployment status in Cloudflare Dashboard
- Verify all files uploaded correctly
- Check browser console for errors

### Styling broken:
- Ensure `style.css` is in the root directory
- Check `_headers` file isn't blocking CSS

### Fonts not loading:
- Google Fonts should work automatically
- If blocked, check browser console

### Custom domain not working:
- DNS propagation takes 5-60 minutes
- Verify CNAME record is correct
- Check SSL certificate status in dashboard

---

## 📞 Support Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Cloudflare Community:** https://community.cloudflare.com/
- **Status Page:** https://www.cloudflarestatus.com/

---

## 🎯 Recommended Next Steps

1. **Deploy immediately** using Method 1 or 2
2. **Test on mobile** devices
3. **Set up custom domain** (if desired)
4. **Add analytics** (Cloudflare Web Analytics)
5. **Integrate Stripe** for payments (when ready)
6. **Create social media assets** (link to site)
7. **Launch!** 🚀

---

**Your site is ready to deploy. Choose your method and go live!**

Built with intention by Dr. Erica L. Tartt
Generated with [Claude Code](https://claude.com/claude-code)
