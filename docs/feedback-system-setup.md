# Feedback System Setup

## Overview

The feedback system allows users to share feedback on Feelings Unplugged guides through a web form. QR codes in each PDF guide link directly to the feedback page, making it easy for users to provide input.

## Key Benefits

✅ **Dynamic Content**: The feedback page content can be updated anytime without regenerating PDFs  
✅ **Always Accessible**: QR codes in every guide ensure users always have a way to provide feedback  
✅ **Flexible**: Form submissions can be handled via Cloudflare Functions, n8n webhooks, or both

## Components

### 1. Feedback Page
- **Location**: `marketing/feedback.html`
- **URL**: `https://feelingsunplugged.space/marketing/feedback.html`
- **Features**:
  - Simple, accessible form
  - Role selection (Teen, Parent, Educator, etc.)
  - Guide selection (which guide was used)
  - Optional name and email
  - Success message after submission

### 2. QR Codes
- **Location**: `products/images/feedback-qr-code.png`
- **Generated via**: Online QR code API (qr-server.com)
- **URL Encoded**: `https://feelingsunplugged.space/marketing/feedback.html`
- **Added to**: All three PDF guides on credits pages

### 3. API Endpoint
- **Location**: `functions/api/[[path]].ts`
- **Endpoint**: `POST /api/feedback`
- **Handling**:
  - Stores feedback in Cloudflare KV (if `FEEDBACK_KV` is configured)
  - Sends to n8n webhook (if `N8N_FEEDBACK_WEBHOOK` is configured)
  - Returns success response

### 4. n8n Workflow (Optional)
- **Location**: `automation/n8n-feedback-handler.json`
- **Function**: Receives feedback webhook, formats email, sends to care@feelingsunplugged.com
- **Setup**: Import workflow into n8n and configure email credentials

## Setup Instructions

### Cloudflare Pages Environment Variables

Add these to your Cloudflare Pages project settings:

```
FEEDBACK_KV = <your-kv-namespace-binding>  # Optional: for storing feedback
N8N_FEEDBACK_WEBHOOK = https://your-n8n-instance.com/webhook/feedback  # Optional: for email notifications
```

### n8n Setup (Optional)

1. Import `automation/n8n-feedback-handler.json` into n8n
2. Configure email node with SMTP credentials:
   - `FULFILLMENT_FROM_EMAIL` (from n8n.env)
   - `FULFILLMENT_FROM_NAME` (from n8n.env)
   - SMTP settings from n8n.env
3. Copy the webhook URL and add to Cloudflare Pages env as `N8N_FEEDBACK_WEBHOOK`

### Testing

1. Visit `https://feelingsunplugged.space/marketing/feedback.html`
2. Fill out and submit the form
3. Check email inbox (if n8n configured) or KV storage (if configured)
4. Scan QR code from PDF to verify it works

## Updating Feedback Page

Since QR codes point to a URL (not embedded content), you can update the feedback page anytime:

1. Edit `marketing/feedback.html`
2. Push changes to git
3. Cloudflare Pages auto-deploys
4. All QR codes automatically point to the updated page

**No PDF regeneration needed!** This is the key benefit - you're not locked into static content.

## Future Enhancements

- Add feedback analytics dashboard
- Create feedback review interface
- Add thank-you email to users who provide email
- Integrate with Airtable or Google Sheets for feedback tracking
- Add feedback categories/tags for better organization

