#!/bin/bash

# Import n8n workflow via API
# This script attempts to import the feedback workflow using n8n's API

set -e

N8N_URL="http://localhost:5678"
WORKFLOW_FILE="automation/n8n-feedback-handler.json"
N8N_USER=$(grep N8N_BASIC_AUTH_USER n8n.env | cut -d'=' -f2)
N8N_PASS=$(grep N8N_BASIC_AUTH_PASSWORD n8n.env | cut -d'=' -f2)

echo "🚀 Importing Feedback Workflow to n8n"
echo "======================================"
echo ""

# Check if workflow file exists
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo "❌ Workflow file not found: $WORKFLOW_FILE"
    exit 1
fi

echo "✅ Found workflow file: $WORKFLOW_FILE"
echo ""

# Try to get API key from n8n (if available)
echo "Attempting to import via API..."
echo ""

# Method 1: Try with API key (if exists in env)
if [ -n "$N8N_API_KEY" ]; then
    echo "Using API key from environment..."
    RESPONSE=$(curl -s -X POST "$N8N_URL/api/v1/workflows" \
        -H "X-N8N-API-KEY: $N8N_API_KEY" \
        -H "Content-Type: application/json" \
        -d @"$WORKFLOW_FILE")
    
    if echo "$RESPONSE" | grep -q "id"; then
        echo "✅ Workflow imported successfully!"
        echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
        exit 0
    fi
fi

# Method 2: Try with basic auth (may work for some endpoints)
echo "Trying basic authentication..."
RESPONSE=$(curl -s -X POST "$N8N_URL/api/v1/workflows" \
    -u "$N8N_USER:$N8N_PASS" \
    -H "Content-Type: application/json" \
    -d @"$WORKFLOW_FILE")

if echo "$RESPONSE" | grep -q "id"; then
    echo "✅ Workflow imported successfully!"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    exit 0
elif echo "$RESPONSE" | grep -q "API-KEY"; then
    echo "⚠️  API key required. Please import manually or set N8N_API_KEY environment variable."
    echo ""
    echo "To get an API key:"
    echo "1. Open n8n: $N8N_URL"
    echo "2. Go to Settings → API"
    echo "3. Create a new API key"
    echo "4. Export it: export N8N_API_KEY='your-key-here'"
    echo "5. Run this script again"
    echo ""
    echo "Or import manually:"
    echo "1. Open n8n: $N8N_URL"
    echo "2. Click 'Workflows' → 'Import from File'"
    echo "3. Select: $(pwd)/$WORKFLOW_FILE"
    exit 1
else
    echo "Response: $RESPONSE"
    echo ""
    echo "⚠️  Could not import via API. Please import manually:"
    echo "1. Open n8n: $N8N_URL"
    echo "2. Click 'Workflows' → 'Import from File'"
    echo "3. Select: $(pwd)/$WORKFLOW_FILE"
    exit 1
fi

