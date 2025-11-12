# n8n Workflows Overview

## Current Workflows

### 1. Feelings Unplugged Stripe Fulfillment
- **File**: `automation/n8n-stripe-fulfillment.json`
- **Purpose**: Handles Stripe checkout completion, generates passwords, sends download emails
- **Trigger**: Stripe webhook (`checkout.session.completed`)
- **Status**: ✅ Active

### 2. Deploy QA (Cloudflare Pipeline)
- **File**: `automation/n8n-cloudflare-pipeline.json`
- **Purpose**: Triggers Cloudflare Pages deployments and runs QA checks (Lighthouse)
- **Trigger**: Manual or deploy hook
- **Status**: ✅ Active

### 3. Feelings Unplugged Feedback Handler (NEW)
- **File**: `automation/n8n-feedback-handler.json`
- **Purpose**: Receives feedback form submissions, formats and emails feedback
- **Trigger**: Webhook (`/webhook/feedback`)
- **Status**: ⏳ Ready to import

## Workflow Relationships

All three workflows are **independent** and can run simultaneously:

- **Stripe Fulfillment**: Handles product purchases
- **Deploy QA**: Handles deployment automation
- **Feedback Handler**: Handles user feedback submissions

No conflicts or dependencies between them.

## Importing the Feedback Workflow

1. Open n8n: http://localhost:5678
2. Click **"Workflows"** → **"Import from File"**
3. Select: `automation/n8n-feedback-handler.json`
4. Click **"Import"**
5. Activate the workflow (toggle "Active")
6. Get webhook URL from "Feedback Webhook" node
7. Add webhook URL to Cloudflare Pages env vars

## Webhook URLs

Each workflow uses a different webhook path:

- Stripe: `/webhook/stripe/checkout` (configured in Stripe dashboard)
- Deploy QA: Manual trigger or deploy hook
- Feedback: `/webhook/feedback` (configured in Cloudflare Pages)

## Environment Variables

All workflows share the same `n8n.env` file with:
- SMTP credentials (SendGrid)
- Stripe keys
- Cloudflare API tokens
- Email settings

The feedback workflow uses:
- `FULFILLMENT_FROM_EMAIL`
- `FULFILLMENT_FROM_NAME`
- SMTP settings (`N8N_SMTP_*`)

