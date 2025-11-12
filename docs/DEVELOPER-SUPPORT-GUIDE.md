# Developer Support Guide - Feelings Unplugged

## Overview

This guide helps developers and technical managers understand and maintain the Feelings Unplugged infrastructure, particularly Cloudflare Pages, n8n automation, and the feedback system.

**Last Updated:** November 12, 2025  
**Maintained By:** Development Team

**Recent Updates:**
- ✅ Buy One · Gift One contribution tracking system
- ✅ Cloudflare KV setup for contributions
- ✅ n8n contribution notifications workflow
- ✅ Marketing pages waitlist system
- ✅ Namecheap DNS → Cloudflare Pages configuration

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Cloudflare Pages Setup](#cloudflare-pages-setup)
3. [n8n Automation System](#n8n-automation-system)
4. [Feedback System](#feedback-system)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)
7. [Key Files & Locations](#key-files--locations)

---

## Architecture Overview

### Components

```
┌─────────────────┐
│  Cloudflare     │
│  Pages          │
│  (Marketing)    │
└────────┬────────┘
         │
         ├───> /api/feedback ──> n8n Webhook ──> Email
         │
         └───> Static HTML/CSS/JS
```

**Key Services:**
- **Cloudflare Pages**: Hosts marketing site (`feelingsunplugged.space` + `feelingsunplugged.com`)
- **Cloudflare Functions**: API endpoints (`/api/*`)
- **Cloudflare KV**: Data storage (contributions, feedback, downloads)
- **n8n**: Automation workflows (Docker container, port 5678)
- **Cloudflare Tunnel**: Exposes local n8n publicly (`n8n.feelingsunplugged.space`)

---

## Cloudflare Pages Setup

### Project Configuration

- **Project Name**: `feelings-unplugged`
- **Account ID**: `a38191cd453b3f9dc61e9108cb40fcc1`
- **Domain**: `feelingsunplugged.space`
- **Deployment**: Git-connected (auto-deploys on push to `main`)

### Environment Variables

**Current Secrets:**
- `N8N_FEEDBACK_WEBHOOK`: `https://n8n.feelingsunplugged.space/webhook/feedback`
- `N8N_CONTRIBUTIONS_WEBHOOK`: `https://n8n.feelingsunplugged.space/webhook/contributions` (optional)

**KV Namespaces:**
- `CONTRIBUTIONS_KV`: Stores buy-one-give-one contribution data
- `FEEDBACK_KV`: Stores feedback submissions (optional)
- `DOWNLOADS_KV`: Stores download tracking data (optional)

**To View/Edit:**
1. Go to: https://dash.cloudflare.com/
2. Navigate: Workers & Pages → feelings-unplugged → Settings → Environment Variables

**To Set via CLI:**
```bash
# Requires wrangler login first
echo "value" | wrangler pages secret put VARIABLE_NAME --project-name=feelings-unplugged
```

### Deployment

**Automatic:**
- Pushes to `main` branch auto-deploy
- Cloudflare Pages watches GitHub repo

**Manual:**
```bash
# Using wrangler
wrangler pages deploy marketing --project-name=feelings-unplugged

# Or trigger via Cloudflare Dashboard
```

### Key Files

- **Marketing Site**: `marketing/` directory
- **API Functions**: `functions/api/[[path]].ts`
- **Deployment Config**: `wrangler.jsonc` (if exists)

---

## n8n Automation System

### Overview

n8n runs in a Docker container and handles:
1. **Stripe Fulfillment**: Processes purchases, generates passwords, sends download emails
2. **Deploy QA**: Triggers Cloudflare deployments and runs Lighthouse checks
3. **Feedback Handler**: Receives feedback submissions, formats and emails them

### Access

- **Local URL**: http://localhost:5678
- **Public URL**: https://n8n.feelingsunplugged.space (via Cloudflare Tunnel)
- **Credentials**: See `n8n.env` file

### Workflows

Located in: `automation/`

1. **n8n-stripe-fulfillment.json**: Stripe checkout processing
2. **n8n-cloudflare-pipeline.json**: Deployment automation
3. **n8n-feedback-handler.json**: Feedback form processing

### Managing Workflows

**Import Workflow:**
```bash
# Via n8n UI (recommended)
1. Open http://localhost:5678
2. Workflows → Import from File
3. Select automation/*.json

# Via API (requires API key)
curl -X POST http://localhost:5678/api/v1/workflows \
  -H "X-N8N-API-KEY: your-key" \
  -H "Content-Type: application/json" \
  -d @automation/workflow.json
```

**Get API Key:**
1. Open n8n: http://localhost:5678
2. Settings → API
3. Create API key

**Check Workflow Status:**
```bash
# Via API
curl -X GET http://localhost:5678/api/v1/workflows \
  -H "X-N8N-API-KEY: your-key" | jq '.data[] | {name, active}'
```

### Docker Management

**Start n8n:**
```bash
docker start n8n
```

**Stop n8n:**
```bash
docker stop n8n
```

**View Logs:**
```bash
docker logs n8n
```

**Check Status:**
```bash
docker ps --filter "name=n8n"
```

---

## Feedback System

### Architecture

```
User scans QR code in PDF
    ↓
Opens: https://feelingsunplugged.space/marketing/feedback.html
    ↓
Submits form → POST /api/feedback
    ↓
Cloudflare Function forwards to n8n webhook
    ↓
n8n workflow formats and emails to care@feelingsunplugged.com
```

### Components

1. **Feedback Page**: `marketing/feedback.html`
2. **QR Codes**: `products/images/feedback-qr-code.png` (added to all PDFs)
3. **API Endpoint**: `functions/api/[[path]].ts` (handles `/api/feedback`)
4. **n8n Workflow**: `automation/n8n-feedback-handler.json`
5. **Cloudflare Tunnel**: Exposes n8n webhook publicly

### Cloudflare Tunnel Setup

**Tunnel Configuration:**
- **Config File**: `.cloudflared/config.yml`
- **Tunnel ID**: `4da8c59f-5011-4fa7-aaff-3c7c72c68f80`
- **Hostname**: `n8n.feelingsunplugged.space`
- **Service**: `http://localhost:5678`

**Tunnel Management:**

**Check Status:**
```bash
ps aux | grep cloudflared
```

**Start Tunnel:**
```bash
cloudflared tunnel run n8n
```

**Stop Tunnel:**
```bash
pkill -f "cloudflared tunnel run"
```

**View Logs:**
```bash
tail -f .cloudflared/tunnel.log
```

**Auto-Start Service (macOS):**
The tunnel is configured to start automatically on boot via launchd:
- **Service File**: `~/Library/LaunchAgents/com.cloudflare.tunnel.n8n.plist`
- **Status**: `launchctl list | grep cloudflare`
- **Reload**: `launchctl load ~/Library/LaunchAgents/com.cloudflare.tunnel.n8n.plist`

**Tunnel Login (One-Time):**
```bash
cloudflared tunnel login
# Opens browser to authorize
```

**Create New Tunnel:**
```bash
cloudflared tunnel create tunnel-name
cloudflared tunnel route dns tunnel-name hostname.domain.com
```

### Testing Feedback System

1. **Test Form Submission:**
   ```bash
   curl -X POST https://feelingsunplugged.space/api/feedback \
     -H "Content-Type: application/json" \
     -d '{"role":"educator","guide":"teen-journal","feedback":"Test feedback"}'
   ```

2. **Check n8n Execution:**
   - Open n8n: http://localhost:5678
   - View "Executions" tab
   - Check for "Feelings Unplugged Feedback Handler" executions

3. **Verify Email:**
   - Check `care@feelingsunplugged.com` inbox
   - Should receive formatted feedback email

---

## Common Tasks

### Adding New Environment Variable

**Via Dashboard (Recommended):**
1. Go to: https://dash.cloudflare.com/
2. Workers & Pages → feelings-unplugged → Settings → Environment Variables
3. Add variable
4. Redeploy (or wait for next git push)

**Via CLI:**
```bash
wrangler login
echo "value" | wrangler pages secret put VARIABLE_NAME --project-name=feelings-unplugged
```

### Updating n8n Workflow

1. **Edit Workflow:**
   - Open n8n: http://localhost:5678
   - Edit workflow in UI
   - Export: Workflows → Export

2. **Save to Repo:**
   ```bash
   # Copy exported JSON to automation/
   cp exported-workflow.json automation/workflow-name.json
   git add automation/workflow-name.json
   git commit -m "Update workflow"
   git push
   ```

### Deploying Marketing Site Changes

**Automatic (Recommended):**
```bash
# Just push to main
git add marketing/
git commit -m "Update marketing site"
git push origin main
# Cloudflare Pages auto-deploys
```

**Manual:**
```bash
wrangler pages deploy marketing --project-name=feelings-unplugged
```

### Updating API Functions

**Files**: `functions/api/[[path]].ts`

**Deploy:**
```bash
# Changes auto-deploy with git push
git add functions/
git commit -m "Update API"
git push origin main
```

**Test Locally:**
```bash
wrangler pages dev marketing --project-name=feelings-unplugged
```

### Restarting n8n

```bash
docker restart n8n
```

### Restarting Cloudflare Tunnel

```bash
# Stop
pkill -f "cloudflared tunnel run"

# Start
cloudflared tunnel run n8n > .cloudflared/tunnel.log 2>&1 &

# Or reload service (macOS)
launchctl unload ~/Library/LaunchAgents/com.cloudflare.tunnel.n8n.plist
launchctl load ~/Library/LaunchAgents/com.cloudflare.tunnel.n8n.plist
```

---

## Troubleshooting

### Feedback Form Not Working

**Check 1: Environment Variable**
```bash
# Verify N8N_FEEDBACK_WEBHOOK is set
wrangler pages secret list --project-name=feelings-unplugged
```

**Check 2: n8n Workflow Active**
```bash
# Via API
curl -X GET http://localhost:5678/api/v1/workflows \
  -H "X-N8N-API-KEY: your-key" | jq '.data[] | select(.name=="Feelings Unplugged Feedback Handler") | .active'
```

**Check 3: Tunnel Running**
```bash
ps aux | grep cloudflared
curl -I https://n8n.feelingsunplugged.space/healthz
```

**Check 4: Cloudflare Functions Logs**
- Go to: Cloudflare Dashboard → Workers & Pages → feelings-unplugged → Logs
- Look for `/api/feedback` requests

### n8n Not Accessible

**Check Docker:**
```bash
docker ps --filter "name=n8n"
docker logs n8n
```

**Restart:**
```bash
docker restart n8n
```

### Tunnel Not Working

**Check Config:**
```bash
cat .cloudflared/config.yml
```

**Check Credentials:**
```bash
ls -la ~/.cloudflared/*.json
```

**Test Tunnel:**
```bash
cloudflared tunnel run n8n --loglevel debug
```

**Check DNS:**
```bash
dig n8n.feelingsunplugged.space
# Should show CNAME to Cloudflare
```

### Deployment Issues

**Check Build Logs:**
- Cloudflare Dashboard → Workers & Pages → feelings-unplugged → Deployments
- Click on deployment → View logs

**Common Issues:**
- Missing environment variables
- Build errors in functions
- Missing dependencies

**Redeploy:**
```bash
# Trigger redeploy via dashboard or:
wrangler pages deploy marketing --project-name=feelings-unplugged
```

---

## Key Files & Locations

### Configuration Files

- `n8n.env`: n8n environment variables (SMTP, Stripe, etc.)
- `.cloudflared/config.yml`: Cloudflare Tunnel configuration
- `wrangler.jsonc`: Wrangler/Cloudflare configuration (if exists)

### Source Code

- `marketing/`: Marketing site HTML/CSS/JS
- `functions/api/`: Cloudflare Functions (API endpoints)
- `products/`: PDF source files (HTML)
- `automation/`: n8n workflow JSON files

### Documentation

- `docs/DEVELOPER-SUPPORT-GUIDE.md`: This file
- `docs/feedback-system-setup.md`: Feedback system setup details
- `docs/feedback-n8n-setup.md`: n8n workflow setup
- `docs/FEEDBACK-SYSTEM-COMPLETE.md`: Final setup checklist
- `docs/automation/cloudflare-automation.md`: Cloudflare automation playbook

### Scripts

- `scripts/setup-feedback-env.sh`: Feedback env setup helper
- `scripts/import-feedback-workflow.sh`: n8n workflow import helper
- `scripts/configure-cloudflare-pages-env.sh`: Env var configuration
- `scripts/verify-feedback-setup.sh`: Verification script

---

## Quick Reference

### Important URLs

- **Marketing Site**: https://feelingsunplugged.space
- **Feedback Page**: https://feelingsunplugged.space/marketing/feedback.html
- **n8n Local**: http://localhost:5678
- **n8n Public**: https://n8n.feelingsunplugged.space
- **Cloudflare Dashboard**: https://dash.cloudflare.com/

### Important Commands

```bash
# Check n8n status
docker ps --filter "name=n8n"

# Check tunnel status
ps aux | grep cloudflared

# View tunnel logs
tail -f .cloudflared/tunnel.log

# List Cloudflare Pages secrets
wrangler pages secret list --project-name=feelings-unplugged

# Deploy manually
wrangler pages deploy marketing --project-name=feelings-unplugged
```

### Support Contacts

- **Technical Issues**: Check Cloudflare Dashboard logs
- **n8n Issues**: Check Docker logs and n8n execution history
- **Deployment Issues**: Check Cloudflare Pages deployment logs

---

## Maintenance Schedule

### Daily
- ✅ Automatic (no action needed)
  - Cloudflare Tunnel auto-starts on boot
  - n8n runs in Docker container
  - Git pushes auto-deploy

### Weekly
- Review Cloudflare Pages deployment logs
- Check n8n workflow execution history
- Verify feedback submissions are being processed

### Monthly
- Review and update environment variables if needed
- Check tunnel and n8n container health
- Review error logs

---

## Notes for Non-Technical Managers

### What Runs Automatically

- ✅ Marketing site deployments (on git push)
- ✅ Cloudflare Tunnel (on computer boot)
- ✅ n8n workflows (always running in Docker)
- ✅ Feedback form processing (automatic)

### What Requires Manual Action

- ⚠️ Adding new environment variables (via dashboard)
- ⚠️ Updating n8n workflows (via n8n UI)
- ⚠️ Troubleshooting issues (see Troubleshooting section)

### Key Metrics to Monitor

1. **Feedback Submissions**: Check `care@feelingsunplugged.com` inbox
2. **Deployment Success**: Cloudflare Dashboard → Deployments
3. **n8n Workflow Executions**: n8n UI → Executions tab
4. **Tunnel Status**: `ps aux | grep cloudflared`

---

**Last Updated:** November 12, 2025  
**Next Review:** December 2025

