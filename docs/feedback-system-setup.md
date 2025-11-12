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

### Step 1: Configure Cloudflare Pages Environment Variables

**Option A: Using Setup Script (Recommended)**
```bash
chmod +x scripts/setup-feedback-env.sh
./scripts/setup-feedback-env.sh
```

**Option B: Manual Setup**
1. Go to: https://dash.cloudflare.com/
2. Navigate to: **Workers & Pages** → **feelings-unplugged** → **Settings** → **Environment Variables**
3. Add variable:
   - **Name**: `N8N_FEEDBACK_WEBHOOK`
   - **Value**: `https://your-n8n-instance.com/webhook/feedback` (get this from n8n after importing workflow)
4. (Optional) Add KV namespace binding:
   - **Name**: `FEEDBACK_KV`
   - **Value**: Create KV namespace first, then bind it here

### Step 2: Import and Configure n8n Workflow

**See detailed guide**: `docs/feedback-n8n-setup.md`

Quick steps:
1. Import `automation/n8n-feedback-handler.json` into n8n
2. Email node is pre-configured with SMTP credentials from `n8n.env`
3. Activate the workflow
4. Copy the webhook URL from the "Feedback Webhook" node
5. Add that URL to Cloudflare Pages as `N8N_FEEDBACK_WEBHOOK` (see Step 1)

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

