# n8n Feedback Workflow Setup Guide

## Quick Setup

### Step 1: Import Workflow

1. Open your n8n instance
2. Click **"Workflows"** → **"Import from File"**
3. Select: `automation/n8n-feedback-handler.json`
4. Click **"Import"**

### Step 2: Configure Email Node

The workflow uses environment variables from your `n8n.env` file:

- `FULFILLMENT_FROM_EMAIL` - Sender email (already configured: `fulfillment@feelingsunplugged.com`)
- `FULFILLMENT_FROM_NAME` - Sender name (already configured: `Feelings Unplugged`)
- SMTP settings are already in `n8n.env`:
  - Host: `smtp.sendgrid.net`
  - Port: `587`
  - User: `apikey`
  - Password: (stored in `n8n.env` - do not commit to git)

**The email node should automatically use these credentials.**

### Step 3: Activate Workflow

1. Click the **"Active"** toggle in the top right
2. The workflow is now listening for feedback submissions

### Step 4: Get Webhook URL

1. Click on the **"Feedback Webhook"** node
2. Copy the **"Production URL"** (it will look like: `https://your-n8n-instance.com/webhook/feedback`)
3. Save this URL - you'll need it for Cloudflare Pages

### Step 5: Add Webhook URL to Cloudflare Pages

**Option A: Using Script**
```bash
chmod +x scripts/setup-feedback-env.sh
./scripts/setup-feedback-env.sh
```

**Option B: Manual Setup**
1. Go to: https://dash.cloudflare.com/
2. Navigate to: **Workers & Pages** → **feelings-unplugged** → **Settings** → **Environment Variables**
3. Click **"Add variable"**
4. Add:
   - **Variable name**: `N8N_FEEDBACK_WEBHOOK`
   - **Value**: `https://your-n8n-instance.com/webhook/feedback` (your webhook URL from Step 4)
5. Click **"Save"**
6. Redeploy the site (or wait for next git push)

## Testing

1. Visit: https://feelingsunplugged.space/marketing/feedback.html
2. Fill out and submit the form
3. Check your email inbox (`care@feelingsunplugged.com`)
4. You should receive an email with the feedback details

## Troubleshooting

**No email received?**
- Check n8n workflow execution logs
- Verify SMTP credentials in `n8n.env`
- Check that workflow is activated
- Verify webhook URL is correct in Cloudflare Pages env vars

**Webhook not receiving data?**
- Check Cloudflare Functions logs
- Verify `N8N_FEEDBACK_WEBHOOK` env var is set correctly
- Test webhook URL directly with curl:
  ```bash
  curl -X POST https://your-n8n-instance.com/webhook/feedback \
    -H "Content-Type: application/json" \
    -d '{"test": "data"}'
  ```

**Form submission fails?**
- Check browser console for errors
- Verify `/api/feedback` endpoint is accessible
- Check Cloudflare Functions logs

