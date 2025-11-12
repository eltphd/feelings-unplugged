#!/bin/bash

# Setup n8n API key and import feedback workflow
# This script helps automate the workflow import process

set -e

N8N_URL="http://localhost:5678"
WORKFLOW_FILE="automation/n8n-feedback-handler.json"

echo "🚀 n8n Workflow Import Setup"
echo "============================"
echo ""

echo "📝 To import the workflow programmatically, we need an API key."
echo ""
echo "Option 1: Create API Key via Web Interface (Recommended)"
echo "--------------------------------------------------------"
echo "1. Open n8n: $N8N_URL"
echo "2. Go to: Settings → API (or /settings/api)"
echo "3. Click 'Create API Key'"
echo "4. Copy the key"
echo "5. Run: export N8N_API_KEY='your-key-here'"
echo "6. Run this script again: ./scripts/import-workflow-api.sh"
echo ""

echo "Option 2: Manual Import (Fastest - 30 seconds)"
echo "----------------------------------------------"
echo "1. Open n8n: $N8N_URL"
echo "2. Click 'Workflows' → 'Import from File'"
echo "3. Select: $(pwd)/$WORKFLOW_FILE"
echo "4. Click 'Import'"
echo "5. Click 'Active' toggle to activate"
echo "6. Click 'Feedback Webhook' node → Copy Production URL"
echo ""

echo "✅ Workflow file ready: $WORKFLOW_FILE"
echo ""

# Check if API key is set
if [ -n "$N8N_API_KEY" ]; then
    echo "🔑 API key found! Attempting import..."
    echo ""
    cd "$(dirname "$0")/.."
    ./scripts/import-workflow-api.sh
else
    echo "💡 Tip: Once you have an API key, set it and run:"
    echo "   export N8N_API_KEY='your-key'"
    echo "   ./scripts/import-workflow-api.sh"
fi

