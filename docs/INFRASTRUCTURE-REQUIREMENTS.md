# Infrastructure Requirements - What Needs to Stay Running?

**Last Updated:** November 12, 2025

---

## 🎯 Quick Answer

**Cloud Services (Always On):** ✅  
**Local Services (Need Computer On):** ⚠️

---

## ☁️ Cloud Services (Always Available)

These run on Cloudflare's servers and work 24/7:

### ✅ Cloudflare Pages
- **What:** Your marketing website
- **Status:** Always on
- **URLs:** 
  - `feelingsunplugged.space`
  - `feelingsunplugged.com` (when DNS configured)
- **Computer needed?** ❌ NO

### ✅ Cloudflare Functions
- **What:** API endpoints (`/api/*`)
- **Status:** Always on
- **Endpoints:**
  - `/api/track-contribution`
  - `/api/feedback`
  - `/api/track-download`
- **Computer needed?** ❌ NO

### ✅ Cloudflare KV
- **What:** Data storage (contributions, feedback)
- **Status:** Always on
- **Computer needed?** ❌ NO

### ✅ Stripe
- **What:** Payment processing
- **Status:** Always on
- **Computer needed?** ❌ NO

---

## 💻 Local Services (Need Your Computer On)

These run on your computer and require it to be running:

### ⚠️ n8n (Docker Container)
- **What:** Automation workflows
- **Status:** Runs locally on port 5678
- **Workflows:**
  - Stripe fulfillment (sends download emails)
  - Feedback handler (sends feedback emails)
  - Contribution notifications (sends contribution emails)
- **Computer needed?** ✅ **YES**
- **If computer is off:** ❌ Workflows won't run

### ⚠️ Cloudflare Tunnel
- **What:** Exposes local n8n to internet
- **Status:** Runs locally, connects to Cloudflare
- **URL:** `https://n8n.feelingsunplugged.space`
- **Computer needed?** ✅ **YES**
- **If computer is off:** ❌ Webhooks won't reach n8n

---

## 🔴 What Breaks If Computer Is Off?

### If Your Computer Is Off:

❌ **Stripe fulfillment won't work**
- Stripe webhook can't reach n8n
- Customers won't get download emails
- Payments process, but no fulfillment

❌ **Feedback emails won't send**
- Feedback form submissions won't trigger emails
- Data still stored in KV (if configured)
- But no email notifications

❌ **Contribution notifications won't send**
- Contribution tracking still works (API stores in KV)
- But no email notifications

✅ **Website still works**
- Marketing site accessible
- API endpoints work
- PDFs downloadable (if not password-protected)

✅ **Payments still process**
- Stripe accepts payments
- But fulfillment (email delivery) won't happen until computer is back on

---

## ✅ Solutions

### Option 1: Keep Computer On (Current Setup)
- **Pros:** Simple, no changes needed
- **Cons:** Computer must stay on 24/7
- **Best for:** Development/testing, or if you have a dedicated server

### Option 2: Move n8n to Cloud (Recommended for Production)

**Option 2A: n8n Cloud (Paid)**
- **Cost:** ~$20/month
- **Setup:** Sign up at n8n.cloud
- **Pros:** Fully managed, always on
- **Cons:** Monthly cost

**Option 2B: Self-Hosted on VPS**
- **Cost:** ~$5-10/month (DigitalOcean, Linode, etc.)
- **Setup:** Install Docker on VPS, run n8n there
- **Pros:** Full control, cheaper than n8n.cloud
- **Cons:** You manage updates/maintenance

**Option 2C: Cloudflare Workers (Future)**
- **Cost:** Free (within limits)
- **Setup:** Rewrite workflows as Cloudflare Workers
- **Pros:** Fully serverless, always on
- **Cons:** Requires rewriting workflows

### Option 3: Hybrid Approach
- **Keep:** Critical workflows in cloud
- **Local:** Development/testing workflows
- **Best for:** Gradual migration

---

## 📊 Current Architecture

```
┌─────────────────┐
│   Cloudflare    │  ✅ Always On
│     Pages       │
└────────┬────────┘
         │
         ├──> API Endpoints (Cloudflare Functions) ✅ Always On
         │
         └──> PDFs (Static Files) ✅ Always On

┌─────────────────┐
│     Stripe      │  ✅ Always On
└────────┬────────┘
         │
         └──> Webhook ──> Cloudflare Tunnel ──> n8n ⚠️ Needs Computer On

┌─────────────────┐
│  Your Computer  │  ⚠️ Must Stay On
│                 │
│  - n8n (Docker) │
│  - Tunnel       │
└─────────────────┘
```

---

## 🎯 Recommendations

### For Production Use:

1. **Short Term:** Keep computer on or use a dedicated server
2. **Medium Term:** Move n8n to cloud (n8n.cloud or VPS)
3. **Long Term:** Consider Cloudflare Workers for critical workflows

### For Development/Testing:

- Current setup is fine
- Just remember workflows won't work if computer is off
- Test with computer on

---

## 🔧 Quick Checks

### Is n8n Running?
```bash
docker ps | grep n8n
```

### Is Tunnel Running?
```bash
ps aux | grep cloudflared
```

### Test Webhook Access
```bash
curl https://n8n.feelingsunplugged.space/webhook/feedback
```

---

## 📋 Summary

| Service | Location | Needs Computer On? |
|---------|----------|-------------------|
| Website | Cloudflare | ❌ NO |
| API Endpoints | Cloudflare | ❌ NO |
| PDF Downloads | Cloudflare | ❌ NO |
| Payment Processing | Stripe | ❌ NO |
| **n8n Workflows** | **Your Computer** | **✅ YES** |
| **Cloudflare Tunnel** | **Your Computer** | **✅ YES** |

**Critical:** For production, consider moving n8n to cloud hosting.

---

**TL;DR:** Website and payments work 24/7. Workflows (email sending) only work when your computer is on. For production, move n8n to cloud.

