# How to Update SPF Record in Namecheap

## Important: Where Records Go

**All DNS records go in the "HOST RECORDS" section**, NOT in "MAIL SETTINGS" or "EMAIL FORWARDING".

## Steps to Update SPF Record

1. **Log into Namecheap**: https://www.namecheap.com/myaccount/login/
2. **Go to Domain List**: Click "Domain List" in the left sidebar
3. **Select Domain**: Click on `feelingsunplugged.com`
4. **Open Advanced DNS**: Click "Advanced DNS" tab
5. **Go to HOST RECORDS section** (where your CNAME records are, NOT email forwarding)
6. **Find SPF Record**: Look for the TXT record with:
   - **Host**: `@` (or blank, which means root domain)
   - **Type**: TXT
   - **Value**: `v=spf1 include:spf.efwd.registrar-servers.com ~all`
7. **Edit the Record**:
   - Click the edit/pencil icon next to the SPF record
   - **Keep Host as**: `@` (don't change this)
   - **Keep Type as**: TXT (SPF records ARE TXT records - there's no separate "SPF" type)
   - **Change Value to**: `v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all`
   - Click "Save" or "✓" to save changes
8. **Wait for Propagation**: DNS changes take 5-30 minutes to propagate

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

## Common Questions

**Q: It says "SPF" but I only see "TXT" type?**
A: SPF records ARE TXT records. There's no separate "SPF" record type. Just edit the TXT record that has `v=spf1` in it.

**Q: Should Host be `@` or blank?**
A: Either works - `@` and blank both mean "root domain" (feelingsunplugged.com). If you see blank, that's fine. If you see `@`, that's also fine. Don't change it.

**Q: Do I add this in HOST RECORDS or EMAIL FORWARDING?**
A: **HOST RECORDS** section - the same section where your SendGrid CNAME records are. Email forwarding is a different section for receiving email, not sending.

**Q: What if I don't see an SPF record?**
A: Create a new TXT record:
   - Host: `@`
   - Type: TXT
   - Value: `v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all`
   - TTL: Automatic
