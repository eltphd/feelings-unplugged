# Buy One · Gift One Campaign Strategy

**Last Updated:** November 12, 2025

## Overview

The Buy One · Gift One campaign is Feelings Unplugged's commitment to making emotional regulation tools accessible to all teens, regardless of economic barriers. Every paid PDF purchase automatically funds a complimentary copy for a youth, caregiver, or educator in an under-resourced community.

## How It Works

### For Teen Journal Purchases
1. Customer purchases Teen Journal PDF via Stripe
2. **Automated:** n8n workflow sends download email with password
3. **Automated:** Purchase triggers 1 free copy allocation
4. Free copies distributed to:
   - Youth-serving organizations
   - Community clinics
   - Under-resourced schools
   - Mutual aid networks

### For Parent Guide Purchases (Waitlist → Launch)
1. Customer joins waitlist
2. When guide launches, customer purchases via Stripe
3. **Automated:** Purchase triggers 1 free caregiver copy allocation
4. Free copies distributed to:
   - Caregiver cohorts in under-resourced schools
   - Community clinics
   - Mutual aid networks

### For Educator Toolkit Purchases (Waitlist → Launch)
1. Customer joins waitlist
2. When toolkit launches, customer purchases via Stripe
3. **Automated:** Purchase triggers 1 free educator kit allocation
4. Free kits distributed to:
   - Title I schools
   - Community centers
   - Youth programs
   - After-school programs

## Tracking System

### Current Implementation

**Stripe Fulfillment Workflow** (`automation/n8n-stripe-fulfillment.json`):
- Already calculates `contributions` based on products purchased
- Email includes gratitude message showing impact
- Formula: `1 purchase = 1 free copy per product`

**API Endpoint** (`functions/api/[[path]].ts`):
- `/api/track-contribution` - Tracks each contribution
- Stores in Cloudflare KV (if `CONTRIBUTIONS_KV` configured)
- Can send to n8n webhook for notifications

### Data Collection

**What We Track:**
- Purchase ID (from Stripe)
- Products purchased
- Customer email (for follow-up)
- Timestamp
- IP address (for analytics)
- Contribution count (1 per product)

**Where It's Stored:**
- Cloudflare KV: `CONTRIBUTIONS_KV` namespace
- Key format: `contribution:{timestamp}:{random}`
- Value: JSON with all contribution data

## Distribution Strategy

### Phase 1: Signal Collection (Current)
- Collect waitlist signups for Parent Guide and Educator Toolkit
- Track Teen Journal purchases and contributions
- Build database of distribution partners

### Phase 2: Partner Network (Next 1-2 Months)
- Identify 5-10 distribution partners:
  - Title I schools
  - Community clinics
  - Youth-serving nonprofits
  - Mutual aid networks
- Create partner application process
- Set up quarterly distribution schedule

### Phase 3: Automated Distribution (3-6 Months)
- Build distribution dashboard
- Automate partner notifications
- Track distribution metrics
- Generate impact reports

## Marketing Messaging

### Key Messages
- **"Buy One · Gift One"** - Clear, simple promise
- **"Every purchase funds a free copy"** - Direct impact
- **"Access, not excuses"** - Mission alignment
- **"Your support creates real impact"** - Gratitude

### Where It Appears
- ✅ All marketing pages (index, product pages)
- ✅ Stripe fulfillment emails
- ✅ Waitlist pages
- ✅ PDF credits pages
- ✅ Web app (future)

## Metrics & Reporting

### Key Metrics to Track
- Total contributions (purchases = contributions)
- Distribution partners engaged
- Free copies distributed
- Geographic distribution
- Partner feedback

### Reporting Frequency
- **Weekly:** Contribution count
- **Monthly:** Distribution summary
- **Quarterly:** Impact report

## Next Steps

### Immediate (This Week)
- [x] Add contribution tracking API endpoint
- [x] Update Stripe fulfillment to track contributions
- [x] Create waitlist pages
- [ ] Set up Cloudflare KV for contributions (optional)

### Short Term (Next Month)
- [ ] Identify 3-5 distribution partners
- [ ] Create partner application form
- [ ] Set up distribution workflow
- [ ] Design impact dashboard

### Medium Term (Next Quarter)
- [ ] Launch automated distribution
- [ ] Create quarterly impact reports
- [ ] Expand partner network
- [ ] Add contribution tracking to web app

## Technical Implementation

### Cloudflare KV Setup (Optional)
```bash
# Create KV namespace
wrangler kv:namespace create CONTRIBUTIONS_KV

# Add to wrangler.toml
[[kv_namespaces]]
binding = "CONTRIBUTIONS_KV"
id = "your-namespace-id"
```

### n8n Webhook (Optional)
- Webhook URL: `/webhook/contributions`
- Purpose: Email notifications for new contributions
- Can trigger thank-you emails or partner notifications

## Support & Questions

For questions about the Buy One · Gift One campaign:
- Email: `care@feelingsunplugged.com`
- Documentation: This file
- Tracking: Cloudflare KV + n8n workflows

---

**Campaign Status:** ✅ Active  
**Contributions Tracked:** Via Stripe fulfillment workflow  
**Distribution:** Manual (Phase 1) → Automated (Phase 3)

