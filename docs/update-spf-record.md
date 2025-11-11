# How to Update SPF Record in Namecheap

## Steps to Update SPF Record

1. **Log into Namecheap**: https://www.namecheap.com/myaccount/login/
2. **Go to Domain List**: Click "Domain List" in the left sidebar
3. **Select Domain**: Click on `feelingsunplugged.com`
4. **Open Advanced DNS**: Click "Advanced DNS" tab
5. **Find SPF Record**: Look for the TXT record with `v=spf1` in the "HOST RECORDS" section
6. **Edit the Record**:
   - Click the edit/pencil icon next to the SPF record
   - Current value: `v=spf1 include:spf.efwd.registrar-servers.com ~all`
   - **Change to**: `v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all`
   - Click "Save" or "✓" to save changes
7. **Wait for Propagation**: DNS changes take 5-30 minutes to propagate

## What This Does

- Allows SendGrid to send emails on behalf of `feelingsunplugged.com`
- Keeps your existing email forwarding working
- Improves email deliverability and reduces spam filtering

## Verify It Worked

After updating, wait 10 minutes, then run:
```bash
dig TXT feelingsunplugged.com +short
```

You should see: `"v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all"`

