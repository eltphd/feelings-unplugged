# Import Feedback Workflow to n8n

## Quick Steps

### 1. Access n8n
- **URL**: http://localhost:5678
- **Username**: `admin` (from n8n.env)
- **Password**: Check `n8n.env` file

### 2. Import Workflow
1. Click **"Workflows"** in the left sidebar
2. Click **"Import from File"** button (top right)
3. Select: `automation/n8n-feedback-handler.json`
4. Click **"Import"**

### 3. Activate Workflow
1. Click the **"Active"** toggle (top right of the workflow editor)
2. The workflow is now listening for feedback submissions

### 4. Get Webhook URL
1. Click on the **"Feedback Webhook"** node (first node in the workflow)
2. In the node settings, find **"Production URL"**
3. Copy the URL - it will look like: `http://localhost:5678/webhook/feedback`
4. **Important**: If you're using n8n locally, you'll need to expose it publicly or use a tunnel (see below)

### 5. Configure Cloudflare Pages
1. Go to: https://dash.cloudflare.com/
2. Navigate to: **Workers & Pages** → **feelings-unplugged** → **Settings** → **Environment Variables**
3. Click **"Add variable"**
4. Add:
   - **Variable name**: `N8N_FEEDBACK_WEBHOOK`
   - **Value**: Your webhook URL from step 4
5. Click **"Save"**

## Making Local n8n Accessible

If n8n is running locally (localhost), Cloudflare Functions won't be able to reach it. You have two options:

### Option A: Use Cloudflare Tunnel (Recommended)
1. Install Cloudflare Tunnel: `brew install cloudflare/cloudflare/cloudflared`
2. Create tunnel: `cloudflared tunnel create n8n`
3. Run tunnel: `cloudflared tunnel run n8n`
4. Use the public URL provided by Cloudflare Tunnel

### Option B: Deploy n8n Publicly
- Deploy n8n to a cloud service (Railway, Render, etc.)
- Use the public URL for the webhook

### Option C: Use ngrok (Quick Test)
1. Install ngrok: `brew install ngrok`
2. Run: `ngrok http 5678`
3. Use the ngrok URL (e.g., `https://abc123.ngrok.io/webhook/feedback`)

## Testing

Once configured:
1. Visit: https://feelingsunplugged.space/marketing/feedback.html
2. Fill out and submit the form
3. Check `care@feelingsunplugged.com` for the email
4. Check n8n execution logs to verify the workflow ran

## Troubleshooting

**Workflow not activating?**
- Check n8n logs: `docker logs n8n`
- Verify workflow JSON is valid
- Try deactivating and reactivating

**Email not sending?**
- Check SMTP credentials in n8n.env
- Verify SendGrid API key is valid
- Check n8n execution logs for errors

**Webhook not receiving data?**
- Verify `N8N_FEEDBACK_WEBHOOK` is set in Cloudflare Pages
- Test webhook URL directly with curl
- Check Cloudflare Functions logs

