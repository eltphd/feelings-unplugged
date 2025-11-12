# Namecheap DNS → Cloudflare Pages Quick Setup

**Domain:** `feelingsunplugged.com`  
**Cloudflare Pages Project:** `feelings-unplugged`  
**Pages URL:** `feelings-unplugged.pages.dev`

---

## 🎯 Recommended: Transfer DNS to Cloudflare

**Why:** Easier management, automatic SSL, better performance, free CDN

### Step 1: Add Domain to Cloudflare

1. **Go to:** https://dash.cloudflare.com/
2. **Click:** "Add a Site" (top right)
3. **Enter:** `feelingsunplugged.com`
4. **Select Plan:** Free (click Continue)
5. **Cloudflare scans your DNS** - wait for scan to complete
6. **Review DNS records** - Cloudflare will import existing records
7. **Click:** "Continue" to proceed

### Step 2: Get Nameservers from Cloudflare

After adding the domain, Cloudflare will show you **2 nameservers**, for example:
```
dante.ns.cloudflare.com
gina.ns.cloudflare.com
```

**Copy these nameservers** - you'll need them for Namecheap.

### Step 3: Update Nameservers in Namecheap

1. **Go to:** https://www.namecheap.com/
2. **Login** to your account
3. **Go to:** Domain List → Click "Manage" next to `feelingsunplugged.com`
4. **Scroll down** to "Nameservers" section
5. **Select:** "Custom DNS" (instead of "Namecheap BasicDNS")
6. **Enter the 2 nameservers** from Cloudflare:
   - Nameserver 1: `dante.ns.cloudflare.com` (or whatever Cloudflare gave you)
   - Nameserver 2: `gina.ns.cloudflare.com` (or whatever Cloudflare gave you)
7. **Click:** "Save" or "✓" checkmark

### Step 4: Connect Domain in Cloudflare Pages

1. **In Cloudflare Dashboard:** Go to Workers & Pages → feelings-unplugged
2. **Click:** "Custom domains" tab
3. **Click:** "Set up a custom domain"
4. **Enter:** `feelingsunplugged.com`
5. **Click:** "Continue"
6. Cloudflare will automatically configure DNS records

### Step 5: Wait for DNS Propagation

- **Time:** 5-30 minutes (usually faster)
- **Check status:** Cloudflare will show "Active" when ready
- **Test:** Visit `feelingsunplugged.com` in browser

---

## 🔄 Alternative: Keep DNS at Namecheap

**If you prefer to keep DNS management at Namecheap:**

### Step 1: Add CNAME Records in Namecheap

**In Namecheap Advanced DNS:**

1. **Go to:** Domain List → feelingsunplugged.com → Advanced DNS
2. **Scroll to:** "HOST RECORDS" section
3. **Add CNAME record for www:**
   - **Type:** CNAME
   - **Host:** `www`
   - **Value:** `feelings-unplugged.pages.dev`
   - **TTL:** Automatic (or 3600)
   - **Click:** Save

4. **For root domain (@):**
   - **Option A:** If Namecheap supports CNAME on root:
     - **Type:** CNAME
     - **Host:** `@`
     - **Value:** `feelings-unplugged.pages.dev`
     - **TTL:** Automatic
   
   - **Option B:** If Namecheap doesn't support CNAME on root (most don't):
     - You'll need to use A records (Cloudflare doesn't provide static IPs for Pages)
     - **Better option:** Transfer DNS to Cloudflare (recommended above)

### Step 2: Connect Domain in Cloudflare Pages

1. **In Cloudflare Dashboard:** Go to Workers & Pages → feelings-unplugged
2. **Click:** "Custom domains" tab
3. **Click:** "Set up a custom domain"
4. **Enter:** `feelingsunplugged.com`
5. **Enter:** `www.feelingsunplugged.com` (if you added www CNAME)
6. **Click:** "Continue"
7. Cloudflare will verify DNS records

---

## 📋 DNS Records Summary

### If Using Cloudflare DNS (Recommended):

**Cloudflare will automatically create:**
- A record for `@` (root domain)
- CNAME record for `www`
- All other existing records (imported from Namecheap)

**You don't need to add anything manually** - Cloudflare handles it.

### If Keeping DNS at Namecheap:

**Add these records in Namecheap:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `feelings-unplugged.pages.dev` | Automatic |
| CNAME | `@` | `feelings-unplugged.pages.dev` | Automatic (if supported) |

**Note:** Most registrars don't support CNAME on root domain. If Namecheap doesn't, transfer DNS to Cloudflare.

---

## ✅ Verification

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

## 🆘 Troubleshooting

### "Domain not verified"
- **Wait:** DNS propagation takes 5-30 minutes
- **Check:** Nameservers are updated in Namecheap
- **Verify:** DNS records are correct

### "CNAME not allowed on root domain"
- **Solution:** Transfer DNS to Cloudflare (recommended)
- **Or:** Use A records if Cloudflare provides static IPs (they don't for Pages)

### "SSL certificate pending"
- **Wait:** SSL takes 5-10 minutes to provision
- **Check:** DNS is resolving correctly
- **Verify:** Domain is added in Cloudflare Pages

---

## 🎯 Quick Answer

**Where do I put DNS settings?**

- **If transferring to Cloudflare:** Update nameservers in **Namecheap**, then Cloudflare handles DNS
- **If keeping at Namecheap:** Add CNAME records in **Namecheap** Advanced DNS

**Recommendation:** Transfer DNS to Cloudflare - it's easier and better!

---

**Need help?** Check `docs/namecheap-cloudflare-pages-setup.md` for detailed guide.

