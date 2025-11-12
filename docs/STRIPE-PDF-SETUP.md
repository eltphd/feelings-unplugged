# Stripe PDF Setup - Do You Need to Upload PDFs?

**Short Answer:** ❌ **NO** - You don't upload PDFs to Stripe!

---

## How Your System Works

### Current Setup (Password-Protected Downloads)

**PDFs are hosted on YOUR website:**
- `feelingsunplugged.space/products/teen-journal-print.pdf`
- `feelingsunplugged.space/products/parent-guide-print.pdf`
- `feelingsunplugged.space/products/educator-toolkit-print.pdf`

**Stripe's Role:**
- ✅ Processes payment only
- ✅ Sends webhook to n8n when payment completes
- ❌ Does NOT host or deliver PDFs

**What Happens After Purchase:**
1. Customer pays via Stripe Payment Link
2. Stripe webhook triggers n8n workflow
3. n8n generates unique password
4. n8n sends email with password-protected download link
5. Customer clicks link → enters password → downloads from YOUR website

---

## What You Need in Stripe

### 1. Create Products (Not Files!)

**In Stripe Dashboard:**
- Go to: Products
- Create products with these names:
  - "Teen Journal - Feelings Unplugged" (must include "teen journal")
  - "Parent Guide - Feelings Unplugged" (must include "parent" or "caregiver")
  - "Educator Toolkit - Feelings Unplugged" (must include "educator" or "toolkit")

**Important:** Product names must include keywords so n8n can match them!

### 2. Create Payment Link

- Go to: Payment Links → Create payment link
- Add all three products
- Configure: Allow customers to select which products they want
- Copy payment link URL

**You do NOT need to:**
- ❌ Upload PDF files to Stripe
- ❌ Enable "Digital products" feature
- ❌ Add download files to products

### 3. Configure Webhook

- Webhook URL: `https://n8n.feelingsunplugged.space/webhook/stripe/checkout`
- Event: `checkout.session.completed`
- Signing secret: Already in `n8n.env`

---

## Why This Approach?

### Benefits:
✅ **Control:** PDFs stay on your website  
✅ **Security:** Password-protected downloads  
✅ **Flexibility:** Can update PDFs without touching Stripe  
✅ **Tracking:** Download tracking via your API  
✅ **Customization:** Custom download pages with branding  

### Alternative (Stripe Digital Products):
- ❌ Less control over delivery
- ❌ No password protection
- ❌ Harder to track downloads
- ❌ PDF updates require Stripe changes

---

## Your PDFs Are Already Set Up

**Location:** `products/` directory in your repo

**Files:**
- `teen-journal-print.pdf` ✅
- `parent-guide-print.pdf` ✅
- `educator-toolkit-print.pdf` ✅

**Deployed to:** `feelingsunplugged.space/products/`

**Download Pages:**
- `marketing/download-teen-journal.html` ✅
- `marketing/download-parent-guide.html` ✅
- `marketing/download-educator-toolkit.html` ✅

---

## Summary

**In Stripe, you need:**
- ✅ Products (with correct names)
- ✅ Payment Link
- ✅ Webhook configured

**You do NOT need:**
- ❌ PDF files uploaded to Stripe
- ❌ Stripe's digital product feature
- ❌ File hosting in Stripe

**Your PDFs:**
- ✅ Already on your website
- ✅ Already accessible via download pages
- ✅ Already password-protected

---

**TL;DR:** Stripe handles payment, your website handles PDF delivery. No PDF uploads needed in Stripe!

