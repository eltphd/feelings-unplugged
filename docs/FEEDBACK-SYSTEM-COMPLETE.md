# Feedback System - Final Setup Step

## ✅ Completed Automatically

1. ✅ Feedback page created
2. ✅ QR codes added to all PDFs
3. ✅ API endpoint created
4. ✅ n8n workflow imported and activated
5. ✅ Cloudflare Tunnel configured and started

## 📝 ONE MANUAL STEP REQUIRED

### Set Cloudflare Pages Environment Variable

**Why manual?** Cloudflare Pages environment variables require dashboard access or specific API permissions that aren't available via CLI.

**Quick Steps (30 seconds):**

1. Go to: **https://dash.cloudflare.com/**
2. Navigate to: **Workers & Pages** → **feelings-unplugged** → **Settings** → **Environment Variables**
3. Click **"Add variable"**
4. Set:
   - **Variable name**: `N8N_FEEDBACK_WEBHOOK`
   - **Value**: `https://n8n.feelingsunplugged.space/webhook/feedback`
5. Click **"Save"**

**That's it!** The feedback system will be fully functional.

## 🧪 Testing

After setting the env var:

1. Visit: https://feelingsunplugged.space/marketing/feedback.html
2. Fill out and submit the form
3. Check `care@feelingsunplugged.com` for the email
4. Scan QR code from any PDF to verify it works

## 🔧 Tunnel Management

**Check tunnel status:**
```bash
ps aux | grep cloudflared
```

**View tunnel logs:**
```bash
tail -f .cloudflared/tunnel.log
```

**Restart tunnel:**
```bash
kill $(cat .cloudflared/tunnel.pid)
cloudflared tunnel run n8n > .cloudflared/tunnel.log 2>&1 &
echo $! > .cloudflared/tunnel.pid
```

**Stop tunnel:**
```bash
kill $(cat .cloudflared/tunnel.pid)
```

## 📋 Current Configuration

- **Webhook URL**: `https://n8n.feelingsunplugged.space/webhook/feedback`
- **Local n8n**: `http://localhost:5678`
- **Tunnel Config**: `.cloudflared/config.yml`
- **Tunnel Status**: Running in background

