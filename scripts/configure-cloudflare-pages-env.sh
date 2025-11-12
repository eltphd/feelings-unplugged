#!/bin/bash

# Configure Cloudflare Pages environment variable for feedback webhook

set -e

WEBHOOK_URL="https://n8n.feelingsunplugged.space/webhook/feedback"
PROJECT_NAME="feelings-unplugged"

echo "🔧 Configuring Cloudflare Pages Environment Variable"
echo "===================================================="
echo ""
echo "Project: $PROJECT_NAME"
echo "Variable: N8N_FEEDBACK_WEBHOOK"
echo "Value: $WEBHOOK_URL"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Installing..."
    npm install -g wrangler
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

# Set environment variable using wrangler pages secret
echo "Setting N8N_FEEDBACK_WEBHOOK..."
wrangler pages secret put N8N_FEEDBACK_WEBHOOK \
    --project-name="$PROJECT_NAME" \
    --secret="$WEBHOOK_URL" || {
    echo ""
    echo "⚠️  Could not set via CLI. Please set manually:"
    echo ""
    echo "1. Go to: https://dash.cloudflare.com/"
    echo "2. Navigate to: Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
    echo "3. Click 'Add variable'"
    echo "4. Set:"
    echo "   Name: N8N_FEEDBACK_WEBHOOK"
    echo "   Value: $WEBHOOK_URL"
    echo "5. Click 'Save'"
    echo ""
    exit 1
}

echo ""
echo "✅ Environment variable set successfully!"
echo ""
echo "📋 Summary:"
echo "   Variable: N8N_FEEDBACK_WEBHOOK"
echo "   Value: $WEBHOOK_URL"
echo ""
echo "💡 The feedback system is now fully configured!"
echo "   Test it at: https://feelingsunplugged.space/marketing/feedback.html"

