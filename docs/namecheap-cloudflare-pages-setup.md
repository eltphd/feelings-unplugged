# Namecheap Domain → Cloudflare Pages Setup Guide

**Domain:** `feelingsunplugged.com`  
**Hosting:** Cloudflare Pages  
**Last Updated:** November 12, 2025

---

## Overview

This guide explains how to point your Namecheap domain (`feelingsunplugged.com`) to Cloudflare Pages hosting.

**Two Options:**
1. **Transfer DNS to Cloudflare** (Recommended - Free, faster, easier)
2. **Keep DNS at Namecheap** (Use CNAME/A records)

---

## Option 1: Transfer DNS to Cloudflare (Recommended)

### Why This Is Better
- ✅ Free DNS management
- ✅ Faster DNS resolution
- ✅ Easier to manage (all in one place)
- ✅ Automatic SSL certificates
- ✅ Better performance (Cloudflare CDN)

### Steps

#### Step 1: Add Domain to Cloudflare

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com/
2. **Click "Add a Site"**
3. **Enter**: `feelingsunplugged.com`
4. **Select Plan**: Free plan is fine
5. **Cloudflare will scan your current DNS records**

#### Step 2: Update Nameservers in Namecheap

Cloudflare will give you 2 nameservers, something like:
```
dante.ns.cloudflare.com
gina.ns.cloudflare.com
```

**In Namecheap:**
1. Go to: **Domain List** → **feelingsunplugged.com** → **Manage**
2. Scroll to **"Nameservers"** section
3. Select **"Custom DNS"**
4. Enter the 2 nameservers Cloudflare provided
5. Click **"Save"**

**Wait:** 5-30 minutes for DNS propagation

#### Step 3: Connect Domain to Cloudflare Pages

1. **In Cloudflare Dashboard**: Go to **Workers & Pages** → **feelings-unplugged**
2. **Click**: **"Custom domains"** tab
3. **Click**: **"Set up a custom domain"**
4. **Enter**: `feelingsunplugged.com`
5. **Click**: **"Continue"**
6. Cloudflare will automatically configure DNS

#### Step 4: Update Cloudflare Pages Project

1. **In Cloudflare Pages**: Go to **feelings-unplugged** → **Settings** → **Builds & deployments**
2. **Custom domain**: Should show `feelingsunplugged.com`
3. **Root directory**: Set to `/marketing` (if needed)
4. **Build command**: Leave empty (static site)
5. **Output directory**: Leave empty or set to `/marketing`

#### Step 5: Configure Landing Page

Since you want `feelingsunplugged.com` to show the landing page (`index-com.html`):

**Option A: Rename file**
- Rename `marketing/index-com.html` to `marketing/index.html` (backup current first)
- Or create a redirect

**Option B: Use Cloudflare Workers/Redirects**
- Create `_redirects` file in `marketing/`:
  ```
  /  /marketing/index-com.html  200
  ```

**Option C: Use Cloudflare Page Rules**
- Create page rule: `feelingsunplugged.com/*` → Rewrite to `/marketing/index-com.html`

---

## Option 2: Keep DNS at Namecheap (Alternative)

If you prefer to keep DNS management at Namecheap:

### Step 1: Get Cloudflare Pages URL

1. **In Cloudflare Dashboard**: Go to **Workers & Pages** → **feelings-unplugged**
2. **Find**: Your project URL (e.g., `feelings-unplugged.pages.dev`)
3. **Copy** this URL

### Step 2: Add DNS Records in Namecheap

**In Namecheap Advanced DNS:**

#### For Root Domain (`feelingsunplugged.com`):

**Option A: Use A Records (if Cloudflare provides IPs)**
```
Type: A
Host: @
Value: [Cloudflare Pages IP - check Cloudflare docs]
TTL: Automatic
```

**Option B: Use CNAME (if supported)**
```
Type: CNAME
Host: @
Value: feelings-unplugged.pages.dev
TTL: Automatic
```

**Note:** Some registrars don't support CNAME on root domain. If Namecheap doesn't support it, you'll need to:
- Use A records (if Cloudflare provides static IPs)
- Or transfer DNS to Cloudflare (Option 1)

#### For WWW Subdomain:
```
Type: CNAME
Host: www
Value: feelings-unplugged.pages.dev
TTL: Automatic
```

### Step 3: Connect Domain in Cloudflare Pages

1. **In Cloudflare Pages**: Go to **feelings-unplugged** → **Custom domains**
2. **Add**: `feelingsunplugged.com`
3. **Add**: `www.feelingsunplugged.com`
4. Cloudflare will verify DNS records

---

## Verification

After setup, verify:

```bash
# Check DNS resolution
dig feelingsunplugged.com +short
dig www.feelingsunplugged.com +short

# Check SSL certificate
curl -I https://feelingsunplugged.com
```

**Expected:**
- DNS resolves to Cloudflare Pages
- HTTPS works (SSL auto-configured)
- Site loads correctly

---

## Troubleshooting

### "Domain not verified"
- **Wait**: DNS propagation can take up to 48 hours (usually 5-30 minutes)
- **Check**: DNS records are correct in Namecheap
- **Verify**: Nameservers are updated (if using Option 1)

### "SSL certificate pending"
- **Wait**: SSL certificates take 5-10 minutes to provision
- **Check**: DNS is resolving correctly
- **Verify**: Domain is added in Cloudflare Pages

### "Site not loading"
- **Check**: Root directory is set correctly in Cloudflare Pages
- **Verify**: `index-com.html` is in the correct location
- **Test**: Visit `feelings-unplugged.pages.dev` directly (should work)

### "CNAME not allowed on root domain"
- **Solution**: Transfer DNS to Cloudflare (Option 1)
- **Or**: Use A records if Cloudflare provides static IPs

---

## Current Configuration

**Project:** `feelings-unplugged`  
**Cloudflare Account:** `a38191cd453b3f9dc61e9108cb40fcc1`  
**Current Domain:** `feelingsunplugged.space`  
**New Domain:** `feelingsunplugged.com`  

**Files:**
- Landing page: `marketing/index-com.html`
- Main site: `marketing/index.html` (for `.space` domain)

---

## Next Steps After Setup

1. ✅ Test `feelingsunplugged.com` loads correctly
2. ✅ Verify SSL certificate is active
3. ✅ Test all links work
4. ✅ Update any hardcoded URLs in code
5. ✅ Set up redirects if needed (`www` → root, or vice versa)

---

## Support

If you encounter issues:
1. Check Cloudflare Pages deployment logs
2. Verify DNS records with `dig` command
3. Check Cloudflare dashboard for errors
4. Email: `care@feelingsunplugged.com`

---

**Recommended:** Use Option 1 (Transfer DNS to Cloudflare) for easiest management.

