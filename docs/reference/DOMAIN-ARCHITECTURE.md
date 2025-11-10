# 🌐 Domain Architecture Guide

## 📋 Overview

This document outlines the complete domain strategy for **Altered.Earth** (publication brand) and **Feelings Unplugged** (product brand).

---

## 🎯 Brand Strategy

### **Altered.Earth** - Publication Brand
Your main publication hub showcasing all products, research, news, and opportunities.

### **Feelings Unplugged** - Product Brand
Dedicated product line for emotional wellness journaling tools.

---

## 🌍 Domain Structure

### **Primary Domains (Owned)**

```
altered.earth
├── Purpose: Publication hub & product showcase
├── Hosting: Cloudflare Pages (FREE)
├── Content: marketing/index.html (main landing), product links, research, news
└── Status: OWNED ✅

feelingsunplugged.space
├── Purpose: Feelings Unplugged product site
├── Hosting: Vercel static project (`feelings-unplugged-marketing`)
├── Content: marketing/teen-journal.html, marketing/parent-guide.html, marketing/educator-toolkit.html
└── Status: OWNED ✅
```

### **Subdomains**

```
app.feelingsunplugged.space
├── Purpose: Interactive web journaling app (Next.js)
├── Hosting: Vercel (FREE)
├── Framework: Next.js 16 with firefly aesthetic redesign
└── Status: CONFIGURED (DNS setup required)
```

---

## 🚀 Deployment Architecture

### **Static Sites (Cloudflare Pages)**

**Project #1: Altered.Earth Hub**
```
Repository: /home/user/feelings-unplugged/marketing
Domain: altered.earth
Files: index.html (product hub)
Deploy: Cloudflare Pages or Vercel static (optional)
Cost: $0/month
```

**Project #2: Feelings Unplugged**
```
Repository: /home/user/feelings-unplugged/marketing
Domain: feelingsunplugged.space
Files: teen-journal.html, parent-guide.html, educator-toolkit.html, style.css
Deploy: Vercel (`feelings-unplugged-marketing`)
Cost: $0/month
```

### **Web App (Vercel)**

**Project: Feelings Unplugged App**
```
Repository: /home/user/feelings-unplugged/altered-earth-web/
Domain: app.feelingsunplugged.space
Framework: Next.js 16 + React 19 + Tailwind CSS 4
Deploy: Vercel
Cost: $0/month
Backup URL: altered-earth-green.vercel.app
```

---

## 🔧 DNS Configuration

### **For feelingsunplugged.space (Static Site)**

Add these records in your domain registrar (Namecheap/etc):

```
Type: A
Name: @
Value: [Cloudflare Pages provides these IPs]
TTL: Auto

Type: CNAME
Name: www
Value: [your-project].pages.dev
TTL: Auto
```

### **For app.feelingsunplugged.space (Web App)**

Add these records in your domain registrar:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: Auto
```

### **For altered.earth (Publication Hub)**

Add these records in your domain registrar:

```
Type: A
Name: @
Value: [Cloudflare Pages provides these IPs]
TTL: Auto

Type: CNAME
Name: www
Value: [your-project].pages.dev
TTL: Auto
```

---

## 📁 File Structure & Links

### **Static Site Files**

```
/home/user/feelings-unplugged/marketing
├── index.html                 → Will be at altered.earth
├── teen-journal.html          → Will be at feelingsunplugged.space/teen-journal.html
│   └── Links to: app.feelingsunplugged.space (2 places)
├── parent-guide.html          → Will be at feelingsunplugged.space/parent-guide.html
├── educator-toolkit.html      → Will be at feelingsunplugged.space/educator-toolkit.html
├── style.css                  → Shared styles
└── _headers                   → Security headers (Cloudflare/Vercel)
```

### **Web App Files**

```
/home/user/feelings-unplugged/altered-earth-web/
├── app/
│   ├── page.tsx              → Homepage with firefly redesign
│   ├── journal/page.tsx      → 30-day journal
│   ├── playlists/page.tsx    → Playlist builders
│   ├── weekly-review/page.tsx → Review dashboard
│   ├── resources/page.tsx    → Crisis resources
│   ├── articles/             → Educational content
│   ├── components/
│   │   ├── BottomNav.tsx     → Mobile navigation
│   │   ├── DashboardWidgets.tsx → Mood tracking, streaks
│   │   └── FloatingActionButton.tsx
│   └── globals.css           → Firefly aesthetic styles
├── tailwind.config.js        → Design tokens
└── package.json
```

---

## 🔗 Current URL Mappings

### **Production URLs (After DNS Setup)**

```
https://altered.earth/
└── Publication hub (all products)

https://feelingsunplugged.space/
├── /                          → teen-journal.html
├── /parent-guide.html         → Parent Guide
└── /educator-toolkit.html     → Educator Toolkit

https://app.feelingsunplugged.space/
├── /                          → Dashboard (mood tracking, streaks)
├── /journal                   → 30-day journal
├── /playlists                 → Playlist builders
├── /weekly-review             → Review dashboard
├── /resources                 → Crisis resources
└── /articles                  → Educational magazine
```

### **Temporary URLs (Until DNS Configured)**

```
https://altered-earth-green.vercel.app/
└── Backup web app URL (still works)
```

---

## 💰 Cost Summary

| Service | Domain/Hosting | Cost/Year |
|---------|---------------|-----------|
| **altered.earth** | Domain (owned) | $0 (already owned) |
| **feelingsunplugged.space** | Domain | ~$12-15 |
| **Cloudflare Pages** | Hosting for static sites | $0 |
| **Vercel** | Hosting for web app | $0 |
| **SSL Certificates** | Auto-provided | $0 |
| **CDN/Bandwidth** | Unlimited | $0 |
| **TOTAL** | | **~$12-15/year** |

---

## 🎨 Design System Consistency

Both static site and web app share the **Firefly Light Aesthetic**:

### **Color Palette - Terracotta Forest**
```css
Terracotta: #E07A5F  /* Warm healing clay */
Forest:     #3A5A40  /* Grounded green */
Amber:      #D4A574  /* Firefly glow */
Sage:       #81B29A  /* Calm sage */
Cream:      #F4F1DE  /* Warm cream */
Off-white:  #FDFBF7  /* Surface */
```

### **Typography**
```css
Serif:  'Crimson Text' (body, emotional content)
Sans:   'Space Grotesk' (headers, UI elements)
```

### **Key Features**
- ✨ Firefly glow effects (warm amber/terracotta shadows)
- 🎯 Mobile-first (44-56px touch targets)
- 🎨 Consistent button styles
- 📱 Responsive breakpoints (320px → 1920px)
- ♿ Accessibility (WCAG AA compliant)

---

## ✅ Deployment Checklist

### **Phase 1: Purchase Domain** ✅
- [x] Purchased feelingsunplugged.space

### **Phase 2: Update Code** ✅
- [x] Updated teen-journal.html links (2 places)
- [x] Updated DEPLOYMENT.md
- [x] Created DOMAIN-ARCHITECTURE.md

### **Phase 3: Configure DNS** ⏳
- [ ] Add CNAME for app.feelingsunplugged.space → Vercel
- [ ] Add A/CNAME for feelingsunplugged.space → Cloudflare Pages
- [ ] Add A/CNAME for altered.earth → Cloudflare Pages
- [ ] Wait 5-10 minutes for DNS propagation
- [ ] Verify HTTPS/SSL enabled on all domains

### **Phase 4: Deploy Static Sites** ⏳
- [ ] Deploy to Cloudflare Pages (altered.earth)
- [ ] Deploy to Cloudflare Pages (feelingsunplugged.space)

### **Phase 5: Configure Vercel** ⏳
- [ ] Add custom domain: app.feelingsunplugged.space
- [ ] Verify deployment works
- [ ] Test all links from static site → web app

### **Phase 6: Testing** ⏳
- [ ] Test on mobile (iOS Safari, Chrome Android)
- [ ] Verify firefly animations work
- [ ] Test mood tracking & streak celebrations
- [ ] Check all internal links
- [ ] Test crisis resources page

---

## 🔄 Vercel Project Cleanup

### **Keep:**
- ✅ Current production project (rename to use app.feelingsunplugged.space)

### **Investigate:**
- ⚠️ `altered-earth.vercel.app` → NFT art project (may not be yours)

### **Delete (After DNS Migration):**
- ❌ `altered-earth-app.vercel.app` → Duplicate
- ❌ `altered-earth-web.vercel.app` → 404/doesn't exist
- ❌ `feelings-unplugged.vercel.app` → Old marketing page (replaced by feelingsunplugged.space)

---

## 📊 Analytics Setup (Optional)

Once deployed, add analytics to track engagement:

### **Free Options:**
1. **Vercel Analytics** - Built-in (1-click enable)
2. **Cloudflare Analytics** - Built-in with Cloudflare Pages
3. **Plausible** - Privacy-focused ($9/month)

### **Metrics to Track:**
- Daily active users
- Streak retention rates
- Most used features (journal, playlists, articles)
- Mobile vs desktop usage
- Crisis resources page views

---

## 🆘 Support Resources

**DNS Issues:**
- Namecheap DNS Help: https://www.namecheap.com/support/knowledgebase/category/38/dns-management/
- Cloudflare DNS Help: https://developers.cloudflare.com/dns/

**Hosting Issues:**
- Vercel Discord: https://vercel.com/discord
- Cloudflare Community: https://community.cloudflare.com/

**SSL/HTTPS:**
- Both Vercel and Cloudflare auto-provision SSL certificates
- Wait 5-10 minutes after DNS setup for SSL to activate

---

## 🎯 Next Steps

1. **Configure DNS records** (see DNS Configuration section above)
2. **Deploy static sites** to Cloudflare Pages
3. **Add custom domain** in Vercel
4. **Test everything** on mobile devices
5. **Share with beta testers** to get feedback

---

**Last Updated:** 2025 (Firefly aesthetic redesign complete)
**Production URLs:** app.feelingsunplugged.space, feelingsunplugged.space, altered.earth
**Backup URL:** altered-earth-green.vercel.app (until DNS configured)
