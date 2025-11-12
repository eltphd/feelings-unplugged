#!/bin/bash

# Cloudflare Pages Environment Variables Setup for Feedback System
# Uses Cloudflare API to set environment variables

set -e

echo "🔧 Cloudflare Pages Feedback System Setup"
echo "=========================================="
echo ""

# Configuration
PROJECT_NAME="feelings-unplugged"
ACCOUNT_ID="a38191cd453b3f9dc61e9108cb40fcc1"

# Check for API token
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN not set in environment"
    echo ""
    echo "Please set it:"
    echo "  export CLOUDFLARE_API_TOKEN='your-token-here'"
    echo ""
    echo "Or run wrangler login first, then this script will use your session."
    echo ""
    read -p "Press ENTER to continue with manual instructions..."
    
    echo ""
    echo "📝 Manual Setup Instructions"
    echo "============================"
    echo ""
    echo "1. Go to: https://dash.cloudflare.com/"
    echo "2. Navigate to: Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
    echo "3. Add these variables:"
    echo ""
    echo "   Variable: N8N_FEEDBACK_WEBHOOK"
    echo "   Value: https://your-n8n-instance.com/webhook/feedback"
    echo "   (Get this URL after importing n8n workflow - see docs/feedback-n8n-setup.md)"
    echo ""
    echo "   Variable: FEEDBACK_KV (Optional)"
    echo "   Value: Create KV namespace first, then bind it here"
    echo ""
    exit 0
fi

echo "✅ Using Cloudflare API Token"
echo ""

# Get n8n webhook URL
echo "📝 n8n Webhook Configuration"
echo "============================"
echo ""
echo "To complete setup, you need to:"
echo "1. Import n8n workflow: automation/n8n-feedback-handler.json"
echo "2. Activate the workflow"
echo "3. Copy the webhook URL from the 'Feedback Webhook' node"
echo ""
read -p "Enter your n8n webhook URL (or press ENTER to skip): " N8N_WEBHOOK

if [ -z "$N8N_WEBHOOK" ]; then
    echo ""
    echo "⚠️  Skipping webhook setup. You can add it later:"
    echo "   Cloudflare Dashboard → Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
    echo ""
    echo "✅ Setup script complete!"
    echo ""
    echo "Next steps:"
    echo "1. Import n8n workflow (see docs/feedback-n8n-setup.md)"
    echo "2. Add N8N_FEEDBACK_WEBHOOK env var manually in Cloudflare Dashboard"
    echo ""
    exit 0
fi

echo ""
echo "📦 Setting Environment Variable via Cloudflare API"
echo "==================================================="
echo ""

# Note: Cloudflare Pages env vars must be set via dashboard or wrangler
# API doesn't support setting Pages env vars directly
echo "⚠️  Cloudflare API doesn't support setting Pages env vars directly."
echo ""
echo "Please set the environment variable manually:"
echo ""
echo "1. Go to: https://dash.cloudflare.com/"
echo "2. Navigate to: Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
echo "3. Click 'Add variable'"
echo "4. Set:"
echo "   Name: N8N_FEEDBACK_WEBHOOK"
echo "   Value: $N8N_WEBHOOK"
echo "5. Click 'Save'"
echo ""
echo "✅ After setting, redeploy the site or wait for next git push"
echo ""

