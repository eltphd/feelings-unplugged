#!/bin/bash

# Cloudflare Pages Deployment Script for Feelings Unplugged
# Run this script to deploy your static site to Cloudflare Pages

set -e  # Exit on error

echo "🚀 Cloudflare Pages Deployment"
echo "================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Installing..."
    npm install -g wrangler
    echo "✅ Wrangler installed"
fi

# Check if logged in
echo "Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo ""
    echo "🔐 You need to login to Cloudflare first."
    echo "This will open your browser for authentication."
    echo ""
    read -p "Press ENTER to continue with login..."
    wrangler login
    echo ""
fi

echo "✅ Authenticated with Cloudflare"
echo ""

# Show files to be deployed
echo "📦 Files to deploy:"
ls -lh index.html teen-journal.html parent-guide.html educator-toolkit.html style.css _headers 2>/dev/null | awk '{print "  - " $9 " (" $5 ")"}'
echo ""

# Ask for project name
echo "📝 Project Configuration"
echo "========================"
echo ""
echo "Choose a project name (lowercase, hyphens only):"
echo "  1. feelings-unplugged (recommended)"
echo "  2. altered-earth-hub"
echo "  3. custom name"
echo ""
read -p "Enter choice (1-3) or project name: " choice

case $choice in
    1)
        PROJECT_NAME="feelings-unplugged"
        ;;
    2)
        PROJECT_NAME="altered-earth-hub"
        ;;
    3)
        read -p "Enter custom project name: " PROJECT_NAME
        ;;
    *)
        PROJECT_NAME="$choice"
        ;;
esac

echo ""
echo "Using project name: $PROJECT_NAME"
echo ""

# Deploy
echo "🚀 Deploying to Cloudflare Pages..."
echo "===================================="
echo ""

wrangler pages deploy . \
    --project-name="$PROJECT_NAME" \
    --branch=main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Next Steps:"
echo "=============="
echo "1. Your site is live at: https://$PROJECT_NAME.pages.dev"
echo "2. Test the preview URL above"
echo "3. Add custom domain in Cloudflare Dashboard:"
echo "   - Go to: https://dash.cloudflare.com/"
echo "   - Workers & Pages → $PROJECT_NAME → Custom domains"
echo "   - Add: feelingsunplugged.space (or altered.earth)"
echo ""
echo "4. Configure DNS (if domain not on Cloudflare):"
echo "   Type: CNAME"
echo "   Name: @"
echo "   Value: $PROJECT_NAME.pages.dev"
echo ""
echo "💡 View deployment: https://dash.cloudflare.com/"
echo ""
