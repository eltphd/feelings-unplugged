#!/bin/bash

# Setup Cloudflare KV Namespaces for Feelings Unplugged
# This script creates KV namespaces for contributions tracking

set -e

echo "🔧 Setting up Cloudflare KV Namespaces..."
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: wrangler CLI not found"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Not logged in to Cloudflare. Please run: wrangler login"
    exit 1
fi

echo "📦 Creating KV namespaces..."
echo ""

# Create CONTRIBUTIONS_KV namespace
echo "Creating CONTRIBUTIONS_KV namespace..."
CONTRIBUTIONS_OUTPUT=$(wrangler kv:namespace create CONTRIBUTIONS_KV 2>&1)
CONTRIBUTIONS_ID=$(echo "$CONTRIBUTIONS_OUTPUT" | grep -oP 'id = "\K[^"]+' | head -1)

if [ -z "$CONTRIBUTIONS_ID" ]; then
    echo "⚠️  Could not extract namespace ID. Check output:"
    echo "$CONTRIBUTIONS_OUTPUT"
    echo ""
    echo "You may need to create the namespace manually in the Cloudflare dashboard:"
    echo "1. Go to: https://dash.cloudflare.com/"
    echo "2. Navigate: Workers & Pages → KV"
    echo "3. Create namespace: CONTRIBUTIONS_KV"
    echo "4. Copy the namespace ID"
else
    echo "✅ Created CONTRIBUTIONS_KV namespace"
    echo "   Namespace ID: $CONTRIBUTIONS_ID"
fi

echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Add namespace binding to Cloudflare Pages:"
echo "   - Go to: https://dash.cloudflare.com/"
echo "   - Navigate: Workers & Pages → feelings-unplugged → Settings → Functions"
echo "   - Add KV namespace binding:"
echo "     Binding: CONTRIBUTIONS_KV"
echo "     Namespace: $CONTRIBUTIONS_ID"
echo ""
echo "2. Or add to wrangler.toml (if using Workers):"
echo "   [[kv_namespaces]]"
echo "   binding = \"CONTRIBUTIONS_KV\""
echo "   id = \"$CONTRIBUTIONS_ID\""
echo ""
echo "3. Set environment variable in Cloudflare Pages:"
echo "   - Go to: Settings → Environment Variables"
echo "   - Add: CONTRIBUTIONS_KV (will be auto-bound if namespace is configured)"
echo ""
echo "✅ KV namespace setup complete!"

