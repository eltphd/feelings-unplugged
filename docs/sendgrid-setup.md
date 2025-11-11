# SendGrid Setup for Feelings Unplugged

## Current Status
- Domain: `feelingsunplugged.com` (Marketing/Commerce)
- Web App Domain: `feelingsunplugged.space` (Separate, for app experience)
- DNS Managed: Cloudflare (Zone ID: 6ee658682911c67739c9e7a143402866)
- Current SPF: `v=spf1 include:spf.efwd.registrar-servers.com ~all`

## SendGrid DNS Records Needed

### 1. Domain Verification (TXT)
- **Name**: `@` (root domain)
- **Type**: TXT
- **Content**: `sgid=...` (from SendGrid dashboard)

### 2. SPF Record Update (TXT)
- **Name**: `@`
- **Type**: TXT  
- **Content**: `v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all`
- **Note**: Update existing SPF record to include SendGrid

### 3. DKIM Records (CNAME)
SendGrid will provide 2 CNAME records, typically:
- **Name**: `s1._domainkey.feelingsunplugged.space`
- **Type**: CNAME
- **Content**: `s1.domainkey.uXXXXXX.wl123.sendgrid.net`

- **Name**: `s2._domainkey.feelingsunplugged.space`
- **Type**: CNAME
- **Content**: `s2.domainkey.uXXXXXX.wl123.sendgrid.net`

### 4. DMARC Record (TXT) - Optional but Recommended
- **Name**: `_dmarc.feelingsunplugged.space`
- **Type**: TXT
- **Content**: `v=DMARC1; p=none; rua=mailto:dmarc@feelingsunplugged.space`

## Steps to Complete Setup

1. **Get DNS Records from SendGrid**:
   - Log into SendGrid: https://app.sendgrid.com
   - Go to: Settings → Sender Authentication → Domain Authentication
   - Click on `feelingsunplugged.space` (or "Authenticate Your Domain")
   - Copy all DNS records shown

2. **Add Records to Cloudflare**:
   - Option A: Share records here and I'll add via API
   - Option B: Add manually in Cloudflare Dashboard:
     - Go to: https://dash.cloudflare.com → feelingsunplugged.space → DNS
     - Add each record from SendGrid

3. **Verify in SendGrid**:
   - After adding records, click "Verify" in SendGrid dashboard
   - Wait 5-10 minutes for DNS propagation
   - Status should change to "Verified"

4. **Create API Key**:
   - Settings → API Keys → Create API Key
   - Name: "n8n-fulfillment"
   - Permissions: "Full Access" or "Mail Send" only
   - Copy the key (shown only once!)

5. **Update n8n.env**:
   ```
   FULFILLMENT_FROM_EMAIL=fulfillment@feelingsunplugged.com
   N8N_SMTP_HOST=smtp.sendgrid.net
   N8N_SMTP_PORT=587
   N8N_SMTP_USER=apikey
   N8N_SMTP_PASS=<your-sendgrid-api-key>
   ```

## Email Addresses
- `care@feelingsunplugged.com` - For customer support
- `fulfillment@feelingsunplugged.com` - For automated Stripe fulfillment emails

**Note**: These don't need to be created as separate mailboxes. Once domain is verified, you can send FROM any address @feelingsunplugged.com using SendGrid.

