#!/bin/bash

# Script to help import and configure the feedback workflow in n8n

set -e

echo "🚀 n8n Feedback Workflow Import Helper"
echo "======================================="
echo ""

# Check if n8n container is running
if docker ps --format '{{.Names}}' | grep -q n8n; then
    N8N_CONTAINER=$(docker ps --format '{{.Names}}' | grep n8n | head -1)
    echo "✅ Found running n8n container: $N8N_CONTAINER"
    
    # Try to get the port
    N8N_PORT=$(docker port $N8N_CONTAINER 2>/dev/null | grep -E ':[0-9]+' | sed 's/.*:\([0-9]*\).*/\1/' | head -1 || echo "5678")
    echo "   Port: $N8N_PORT"
    echo ""
    
    # Try to determine URL
    if [ "$N8N_PORT" = "5678" ]; then
        N8N_URL="http://localhost:5678"
    else
        N8N_URL="http://localhost:$N8N_PORT"
    fi
    
    echo "📋 n8n should be accessible at: $N8N_URL"
    echo ""
else
    echo "⚠️  No running n8n container found"
    echo ""
    echo "Please start n8n first, then run this script again."
    echo ""
    exit 1
fi

WORKFLOW_FILE="automation/n8n-feedback-handler.json"

if [ ! -f "$WORKFLOW_FILE" ]; then
    echo "❌ Workflow file not found: $WORKFLOW_FILE"
    exit 1
fi

echo "✅ Found workflow file: $WORKFLOW_FILE"
echo ""

echo "📝 Import Instructions"
echo "======================"
echo ""
echo "1. Open n8n in your browser:"
echo "   $N8N_URL"
echo ""
echo "2. Login (credentials from n8n.env):"
echo "   Username: admin"
echo "   Password: (check n8n.env)"
echo ""
echo "3. Import the workflow:"
echo "   - Click 'Workflows' in the left sidebar"
echo "   - Click 'Import from File' button"
echo "   - Select: $(pwd)/$WORKFLOW_FILE"
echo "   - Click 'Import'"
echo ""
echo "4. Activate the workflow:"
echo "   - Click the 'Active' toggle (top right)"
echo "   - Workflow is now listening for feedback"
echo ""
echo "5. Get the webhook URL:"
echo "   - Click on the 'Feedback Webhook' node"
echo "   - Copy the 'Production URL'"
echo "   - It will look like: $N8N_URL/webhook/feedback"
echo ""
echo "6. Configure Cloudflare Pages:"
echo "   - Go to: https://dash.cloudflare.com/"
echo "   - Navigate to: Workers & Pages → feelings-unplugged → Settings → Environment Variables"
echo "   - Add variable: N8N_FEEDBACK_WEBHOOK = (your webhook URL from step 5)"
echo ""
echo "✅ Ready to import!"
echo ""
echo "Press ENTER to open n8n in your browser, or Ctrl+C to cancel..."
read

# Try to open browser
if command -v open &> /dev/null; then
    open "$N8N_URL"
elif command -v xdg-open &> /dev/null; then
    xdg-open "$N8N_URL"
else
    echo "Please open $N8N_URL in your browser"
fi

