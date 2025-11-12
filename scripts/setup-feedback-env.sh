#!/bin/bash

# Setup script for Feedback System Environment Variables
# This script helps configure Cloudflare Pages environment variables for the feedback system

set -e

echo "🔧 Feedback System Setup"
echo "========================"
echo ""
echo "This script will help you configure Cloudflare Pages environment variables"
echo "for the feedback system."
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Installing..."
    npm install -g wrangler
    echo "✅ Wrangler installed"
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 You need to login to Cloudflare first."
    echo "This will open your browser for authentication."
    echo ""
    read -p "Press ENTER to continue with login..."
    wrangler login
    echo ""
fi

echo "✅ Authenticated with Cloudflare"
echo ""

PROJECT_NAME="feelings-unplugged"
echo "Using project: $PROJECT_NAME"
echo ""

# Get n8n webhook URL
echo "📝 n8n Webhook Configuration"
echo "============================"
echo ""
echo "To set up email notifications, you need to:"
echo "1. Import the n8n workflow from: automation/n8n-feedback-handler.json"
echo "2. Activate the workflow"
echo "3. Copy the webhook URL (it will look like: https://your-n8n-instance.com/webhook/feedback)"
echo ""
read -p "Enter your n8n webhook URL (or press ENTER to skip): " N8N_WEBHOOK

if [ -z "$N8N_WEBHOOK" ]; then
    echo "⚠️  Skipping n8n webhook setup. You can add it later via Cloudflare Dashboard."
    N8N_WEBHOOK=""
fi

echo ""
echo "📦 Setting Cloudflare Pages Environment Variables"
echo "=================================================="
echo ""

# Set environment variables using wrangler
if [ -n "$N8N_WEBHOOK" ]; then
    echo "Setting N8N_FEEDBACK_WEBHOOK..."
    wrangler pages secret put N8N_FEEDBACK_WEBHOOK \
        --project-name="$PROJECT_NAME" \
        --secret="$N8N_WEBHOOK" || {
        echo "⚠️  Failed to set via CLI. You can set it manually in Cloudflare Dashboard:"
        echo "   Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
        echo "   Add: N8N_FEEDBACK_WEBHOOK = $N8N_WEBHOOK"
    }
    echo "✅ N8N_FEEDBACK_WEBHOOK set"
fi

echo ""
echo "📋 Optional: Cloudflare KV Storage"
echo "===================================="
echo ""
echo "To store feedback in Cloudflare KV (optional):"
echo "1. Go to: https://dash.cloudflare.com/"
echo "2. Workers & Pages → KV"
echo "3. Create a namespace called 'FEEDBACK_KV'"
echo "4. Go to: Workers & Pages → $PROJECT_NAME → Settings → Variables"
echo "5. Add KV namespace binding: FEEDBACK_KV"
echo ""

echo "✅ Setup Complete!"
echo ""
echo "📊 Summary:"
echo "==========="
if [ -n "$N8N_WEBHOOK" ]; then
    echo "✅ N8N_FEEDBACK_WEBHOOK configured"
else
    echo "⚠️  N8N_FEEDBACK_WEBHOOK not set (optional)"
fi
echo "⚠️  FEEDBACK_KV not set (optional - configure manually in dashboard)"
echo ""
echo "🔗 Next Steps:"
echo "=============="
echo "1. Import n8n workflow: automation/n8n-feedback-handler.json"
echo "2. Test feedback form: https://feelingsunplugged.space/marketing/feedback.html"
echo "3. Scan QR code from PDF to verify it works"
echo ""

