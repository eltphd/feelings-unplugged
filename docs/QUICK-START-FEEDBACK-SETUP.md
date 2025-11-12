# Quick Start: Feedback System Setup

## 🚀 Two-Step Setup

### Step 1: Configure Cloudflare Pages Environment Variables

**Method 1: Dashboard (Easiest)**
1. Go to: https://dash.cloudflare.com/
2. Navigate to: **Workers & Pages** → **feelings-unplugged** → **Settings** → **Environment Variables**
3. Click **"Add variable"**
4. Add:
   - **Variable name**: `N8N_FEEDBACK_WEBHOOK`
   - **Value**: `https://your-n8n-instance.com/webhook/feedback` (you'll get this after Step 2)
5. Click **"Save"**

**Method 2: Using Script**
```bash
./scripts/setup-cloudflare-feedback-env.sh
```

### Step 2: Import and Activate n8n Workflow

1. **Open n8n** (your n8n instance)
2. **Import workflow**:
   - Click **"Workflows"** → **"Import from File"**
   - Select: `automation/n8n-feedback-handler.json`
   - Click **"Import"**
3. **Verify email configuration**:
   - The email node is pre-configured with:
     - From: `fulfillment@feelingsunplugged.com`
     - SMTP: SendGrid (already in n8n.env)
   - No changes needed unless you want different settings
4. **Activate workflow**:
   - Click the **"Active"** toggle (top right)
   - Workflow is now listening
5. **Copy webhook URL**:
   - Click on **"Feedback Webhook"** node
   - Copy the **"Production URL"**
   - It looks like: `https://your-n8n-instance.com/webhook/feedback`
6. **Add webhook URL to Cloudflare**:
   - Go back to Step 1
   - Update `N8N_FEEDBACK_WEBHOOK` with the URL you just copied
   - Or add it if you skipped Step 1

### Step 3: Test (You'll handle this)

1. Visit: https://feelingsunplugged.space/marketing/feedback.html
2. Fill out and submit the form
3. Check `care@feelingsunplugged.com` for the email
4. Scan QR code from a PDF to verify it works

## ✅ Verification

Run the verification script:
```bash
./scripts/verify-feedback-setup.sh
```

## 📚 Detailed Documentation

- **Full setup guide**: `docs/feedback-system-setup.md`
- **n8n workflow guide**: `docs/feedback-n8n-setup.md`

## 🔧 Troubleshooting

**No email received?**
- Check n8n workflow execution logs
- Verify workflow is activated
- Check SMTP credentials in n8n.env

**Webhook not working?**
- Verify `N8N_FEEDBACK_WEBHOOK` is set in Cloudflare Pages
- Test webhook URL directly with curl
- Check Cloudflare Functions logs

**Form not submitting?**
- Check browser console for errors
- Verify `/api/feedback` endpoint exists
- Check Cloudflare Functions deployment

