# Complete Verification Checklist

## ✅ What You've Done

- [x] Toggled "No Email Service" in Namecheap (✅ Correct - you're using SendGrid)
- [x] Updated SPF record to include SendGrid
- [x] SendGrid DKIM records configured
- [x] DMARC record configured

## 🔍 Verification Steps

### 1. Verify DNS Records

Run these commands to check your DNS:

```bash
# Check SPF record
dig TXT feelingsunplugged.com +short

# Should show: "v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all"

# Check DMARC record
dig TXT _dmarc.feelingsunplugged.com +short

# Should show: "v=DMARC1; p=none; ..."

# Check SendGrid DKIM records
dig CNAME s1._domainkey.feelingsunplugged.com +short
dig CNAME s2._domainkey.feelingsunplugged.com +short

# Should show: s1.domainkey.u57247859.wl110.sendgrid.net. and s2.domainkey.u57247859.wl110.sendgrid.net.
```

### 2. Verify SendGrid Domain Authentication

1. **Log into SendGrid**: https://app.sendgrid.com
2. **Go to**: Settings → Sender Authentication → Domain Authentication
3. **Check status** for `feelingsunplugged.com`:
   - ✅ **Verified** = Perfect! You're done.
   - ⏳ **Pending** = Wait 5-10 minutes, then click "Verify" again
   - ❌ **Not Verified** = Check DNS records match what SendGrid shows

### 3. Test Email Sending

**Option A: Test via n8n workflow**
1. Make a test purchase in Stripe (test mode)
2. Check if fulfillment email arrives
3. Verify email is from `fulfillment@feelingsunplugged.com`

**Option B: Test via SendGrid API**
```bash
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{
      "to": [{"email": "your-test-email@example.com"}]
    }],
    "from": {"email": "fulfillment@feelingsunplugged.com"},
    "subject": "Test Email",
    "content": [{"type": "text/plain", "value": "This is a test"}]
  }'
```

### 4. Verify Stripe Integration

1. **Check Stripe webhook**:
   - Stripe Dashboard → Developers → Webhooks
   - Find webhook for `checkout.session.completed`
   - Status should be "Enabled"
   - URL should point to your n8n webhook

2. **Test purchase flow**:
   - Make a test purchase
   - Check n8n workflow executed
   - Verify email sent with passwords

### 5. Verify Password-Protected Downloads

1. **Check download pages exist**:
   - https://feelingsunplugged.space/marketing/download-teen-journal.html
   - https://feelingsunplugged.space/marketing/download-parent-guide.html
   - https://feelingsunplugged.space/marketing/download-educator-toolkit.html

2. **Test password entry**:
   - Try accessing a download page
   - Enter a test password
   - Verify it shows error for wrong password

### 6. Verify n8n Configuration

1. **Check n8n.env** has all credentials:
   ```bash
   # Should have:
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   FULFILLMENT_FROM_EMAIL=fulfillment@feelingsunplugged.com
   N8N_SMTP_HOST=smtp.sendgrid.net
   N8N_SMTP_PORT=587
   N8N_SMTP_USER=apikey
   N8N_SMTP_PASS=SG....
   ```

2. **Restart n8n** to load new env vars:
   ```bash
   docker restart n8n
   ```

3. **Import workflow**:
   - n8n Dashboard → Workflows → Import
   - Import `automation/n8n-stripe-fulfillment.json`
   - Activate the workflow

## 🎯 Quick Verification Script

Run this to check everything at once:

```bash
#!/bin/bash
echo "=== Feelings Unplugged Setup Verification ==="
echo ""
echo "1. SPF Record:"
dig TXT feelingsunplugged.com +short | grep -q "sendgrid.net" && echo "   ✅ SPF includes SendGrid" || echo "   ❌ SPF missing SendGrid"
echo ""
echo "2. DMARC Record:"
dig TXT _dmarc.feelingsunplugged.com +short | grep -q "DMARC1" && echo "   ✅ DMARC configured" || echo "   ⚠️  DMARC not found"
echo ""
echo "3. SendGrid DKIM:"
dig CNAME s1._domainkey.feelingsunplugged.com +short | grep -q "sendgrid" && echo "   ✅ DKIM records configured" || echo "   ❌ DKIM records missing"
echo ""
echo "4. Check SendGrid status:"
echo "   → Go to: https://app.sendgrid.com → Settings → Sender Authentication"
echo "   → Verify feelingsunplugged.com shows 'Verified'"
echo ""
echo "5. Test email sending:"
echo "   → Make a test purchase in Stripe"
echo "   → Check email arrives from fulfillment@feelingsunplugged.com"
```

## ✅ Success Criteria

You're all set when:
- ✅ SPF record includes `include:sendgrid.net`
- ✅ SendGrid shows domain as "Verified"
- ✅ Test email sends successfully
- ✅ Stripe webhook triggers n8n workflow
- ✅ Fulfillment emails arrive with passwords
- ✅ Download pages work with passwords

## 🚨 Common Issues

**Email not sending?**
- Check SendGrid domain is verified
- Verify SPF record includes SendGrid
- Check n8n SMTP credentials are correct
- Restart n8n after updating env vars

**Passwords not working?**
- Check Stripe product names match keywords
- Verify n8n workflow is active
- Check workflow logs in n8n

**Downloads not tracking?**
- Cloudflare KV may not be configured (optional)
- Check browser console for errors
- Verify API endpoints are accessible

