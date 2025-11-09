#!/bin/bash

# Feelings Unplugged - Vercel Deployment Script
# This script will deploy the app to Vercel

echo "🚀 Deploying Feelings Unplugged to Vercel..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the altered-earth-web directory."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

echo "✅ Vercel CLI ready"
echo ""
echo "🔐 Logging in to Vercel..."
echo "   (This will open your browser for authentication)"
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 Your app should be live at the URL shown above"
echo "🌍 To set up custom domain (app.feelingsunplugged.space):"
echo "   1. Go to https://vercel.com/dashboard"
echo "   2. Select your project"
echo "   3. Go to Settings → Domains"
echo "   4. Add domain: app.feelingsunplugged.space"
echo ""

