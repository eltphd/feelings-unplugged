# Password-Protected Download System Setup

## Overview

This system provides:
- ✅ Password-protected download pages (one per product)
- ✅ Unique password per purchase
- ✅ Product mapping (customers only get what they paid for)
- ✅ Download tracking per customer
- ✅ Gratitude messaging showing impact
- ✅ Support for multi-product purchases (1, 2, or all 3)

## How It Works

1. **Customer purchases** via Stripe Payment Link (can select 1, 2, or all 3 products)
2. **Stripe webhook** triggers n8n workflow
3. **n8n generates** unique passwords for each purchased product
4. **Email sent** with password-protected download links
5. **Customer clicks link** → enters password → downloads PDF
6. **Downloads tracked** for analytics

## Files Created

### Download Pages
- `marketing/download-teen-journal.html` - Password-protected Teen Journal download
- `marketing/download-parent-guide.html` - Password-protected Parent Guide download  
- `marketing/download-educator-toolkit.html` - Password-protected Educator Toolkit download

### API Functions
- `functions/api/[[path]].ts` - Password verification and download tracking endpoints

### Automation
- `automation/n8n-stripe-fulfillment.json` - Updated workflow with password generation

## Stripe Setup Required

### 1. Create Products in Stripe

Create three products with clear names:
- **Teen Journal** - Product name should include "teen journal"
- **Parent Guide** - Product name should include "parent" or "caregiver"
- **Educator Toolkit** - Product name should include "educator" or "toolkit"

### 2. Create Payment Link with Multiple Products

1. Go to Stripe Dashboard → Payment Links
2. Click "Create payment link"
3. Add all three products
4. Configure:
   - Allow customers to select quantity
   - Allow customers to select which products they want
   - Set success redirect URL (optional)
5. Copy the payment link URL

### 3. Configure Webhook

- Webhook URL: `https://your-n8n-url/webhook/stripe/checkout`
- Event: `checkout.session.completed`
- Signing secret: Already in `n8n.env`

## Password Generation Logic

Each purchase gets:
- Base password: 12 random characters (A-Z, 2-9, excludes confusing chars)
- Product-specific suffixes:
  - Teen Journal: `{base}TJ`
  - Parent Guide: `{base}PG`
  - Educator Toolkit: `{base}ET`

Example: `K7M9P2Q4R8S1TJ` for Teen Journal

## Product Mapping

The workflow maps Stripe line items to products by checking:
1. Product description (case-insensitive)
2. Product ID (if available)
3. Product name

**Important**: Ensure your Stripe product names/descriptions include these keywords:
- Teen Journal: "teen journal", "journal"
- Parent Guide: "parent", "caregiver"
- Educator Toolkit: "educator", "toolkit"

## Download Tracking

Downloads are tracked via:
- Purchase ID (Stripe session ID)
- Product type
- Password used
- Timestamp
- IP address (if available)

**Storage**: Currently uses Cloudflare KV (if configured) or falls back to simple validation.

## Email Template Features

- ✅ Password displayed clearly for each product
- ✅ Direct links to password-protected pages
- ✅ Gratitude message showing impact (1 purchase = 1 free copy per product)
- ✅ Purchase ID for customer reference
- ✅ Note that passwords don't expire

## Testing

1. Make a test purchase in Stripe (test mode)
2. Check email for passwords and links
3. Click download link
4. Enter password
5. Verify download works
6. Check download tracking (if KV configured)

## Next Steps

1. **Update SPF record** (see `docs/update-spf-record.md`)
2. **Create Stripe products** with proper naming
3. **Create Payment Link** with all three products
4. **Test purchase flow** end-to-end
5. **Configure Cloudflare KV** (optional, for better tracking):
   - Create KV namespace: `passwords` and `downloads`
   - Add to `wrangler.toml` or Cloudflare Dashboard
   - Update `functions/api/[[path]].ts` to use KV

## Troubleshooting

**Passwords not working?**
- Check product names in Stripe match keywords
- Verify webhook is receiving events
- Check n8n workflow logs

**Downloads not tracking?**
- KV namespace may not be configured (tracking will still work, just not stored)
- Check Cloudflare Functions logs

**Wrong products sent?**
- Verify Stripe product names include correct keywords
- Check n8n workflow "Build Download Payload" node logic

