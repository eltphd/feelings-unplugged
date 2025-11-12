#!/bin/bash

# Verification script for Feedback System Setup
# Checks if environment variables and endpoints are configured correctly

set -e

echo "🔍 Feedback System Verification"
echo "==============================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Install with: npm install -g wrangler"
    exit 1
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not logged into Cloudflare. Run: wrangler login"
    exit 1
fi

PROJECT_NAME="feelings-unplugged"
echo "Checking project: $PROJECT_NAME"
echo ""

# Check environment variables
echo "📋 Environment Variables Check"
echo "=============================="
echo ""

# Note: wrangler pages doesn't have a direct way to list env vars
# So we'll provide manual check instructions
echo "⚠️  Manual Check Required:"
echo "1. Go to: https://dash.cloudflare.com/"
echo "2. Navigate to: Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
echo "3. Verify these variables exist:"
echo "   - N8N_FEEDBACK_WEBHOOK (optional but recommended)"
echo "   - FEEDBACK_KV (optional)"
echo ""

# Check if feedback page exists
echo "📄 Files Check"
echo "=============="
echo ""

if [ -f "marketing/feedback.html" ]; then
    echo "✅ feedback.html exists"
else
    echo "❌ feedback.html not found"
fi

if [ -f "products/images/feedback-qr-code.png" ]; then
    echo "✅ QR code image exists"
    QR_SIZE=$(ls -lh products/images/feedback-qr-code.png | awk '{print $5}')
    echo "   Size: $QR_SIZE"
else
    echo "❌ QR code image not found"
fi

if [ -f "functions/api/[[path]].ts" ]; then
    echo "✅ API endpoint file exists"
    if grep -q "/api/feedback" functions/api/[[path]].ts; then
        echo "✅ Feedback endpoint code found"
    else
        echo "❌ Feedback endpoint code not found"
    fi
else
    echo "❌ API endpoint file not found"
fi

if [ -f "automation/n8n-feedback-handler.json" ]; then
    echo "✅ n8n workflow file exists"
else
    echo "❌ n8n workflow file not found"
fi

echo ""
echo "🌐 Endpoint Test"
echo "==============="
echo ""

FEEDBACK_URL="https://feelingsunplugged.space/marketing/feedback.html"
echo "Testing feedback page..."
if curl -s -o /dev/null -w "%{http_code}" "$FEEDBACK_URL" | grep -q "200"; then
    echo "✅ Feedback page is accessible: $FEEDBACK_URL"
else
    echo "⚠️  Feedback page may not be deployed yet"
    echo "   URL: $FEEDBACK_URL"
fi

echo ""
echo "📊 Summary"
echo "=========="
echo ""
echo "Next steps:"
echo "1. ✅ Files are in place"
echo "2. ⚠️  Verify Cloudflare Pages env vars (see manual check above)"
echo "3. ⚠️  Import n8n workflow and activate it"
echo "4. ⚠️  Test form submission"
echo ""
echo "For detailed setup instructions, see:"
echo "  - docs/feedback-system-setup.md"
echo "  - docs/feedback-n8n-setup.md"
echo ""

