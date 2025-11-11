# Namecheap DNS Setup Guide - SPF and DMARC Records

## Where to Add Records

**All DNS records go in the "HOST RECORDS" section**, NOT in "MAIL SETTINGS" or "EMAIL FORWARDING".

## Current Status

- ✅ SPF record exists: `v=spf1 include:spf.efwd.registrar-servers.com ~all`
- ✅ DMARC record exists: `_dmarc.feelingsunplugged.com` with `v=DMARC1; p=none;`
- ✅ SendGrid DKIM records are set up (CNAME records)

## What You Need to Do

### 1. Update SPF Record (EDIT Existing, Don't Create New)

**Location**: HOST RECORDS section

1. Find the **TXT record** with Host = `@` (or blank/root)
2. Current Value: `v=spf1 include:spf.efwd.registrar-servers.com ~all`
3. **Edit it** (click pencil icon) and change to:
   ```
   v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all
   ```
4. Save

**Important**: 
- Host should be `@` (represents root domain)
- Type: TXT
- There should be ONLY ONE SPF record (don't create duplicates)

### 2. Verify DMARC Record

**Location**: HOST RECORDS section

1. Look for a TXT record with Host = `_dmarc`
2. Value should be: `v=DMARC1; p=none;`
3. If it's missing or different, update it:
   - Host: `_dmarc`
   - Type: TXT
   - Value: `v=DMARC1; p=none; rua=mailto:dmarc@feelingsunplugged.com`
   - TTL: Automatic

### 3. Summary of All Records Needed

In **HOST RECORDS** section, you should have:

| Type | Host | Value | Purpose |
|------|------|-------|---------|
| TXT | `@` | `v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all` | SPF (email authorization) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@feelingsunplugged.com` | DMARC (email security) |
| CNAME | `s1._domainkey` | `s1.domainkey.u57247859.wl110.sendgrid.net.` | SendGrid DKIM |
| CNAME | `s2._domainkey` | `s2.domainkey.u57247859.wl110.sendgrid.net.` | SendGrid DKIM |
| CNAME | `em369` | `u57247859.wl110.sendgrid.net.` | SendGrid domain verification |

## Common Issues

### "It won't let me change it to SPF"
- SPF records ARE TXT records - there's no separate "SPF" type
- Just edit the existing TXT record with `v=spf1` in it
- The record type stays as "TXT"

### "Where do I add it?"
- **HOST RECORDS** section (where your CNAME records are)
- NOT in MAIL SETTINGS or EMAIL FORWARDING sections
- Those sections are for receiving email, not sending

### "Should there be an @ root?"
- Yes! The SPF record should have Host = `@` (or blank, which means root domain)
- This means it applies to `feelingsunplugged.com` (the root domain)
- `@` = root domain in DNS

## Step-by-Step Visual Guide

1. **Go to**: Namecheap → Domain List → feelingsunplugged.com → Advanced DNS
2. **Scroll to**: "HOST RECORDS" section (where you see your CNAME records)
3. **Find**: TXT record with Host = `@` and Value starting with `v=spf1`
4. **Click**: Pencil/edit icon
5. **Change Value** to: `v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all`
6. **Save**
7. **Wait**: 5-30 minutes for DNS propagation

## Verify After Changes

Run these commands to verify:

```bash
# Check SPF
dig TXT feelingsunplugged.com +short

# Check DMARC  
dig TXT _dmarc.feelingsunplugged.com +short

# Check SendGrid DKIM
dig CNAME s1._domainkey.feelingsunplugged.com +short
```

You should see:
- SPF: `"v=spf1 include:spf.efwd.registrar-servers.com include:sendgrid.net ~all"`
- DMARC: `"v=DMARC1; p=none; ..."`
- DKIM: `s1.domainkey.u57247859.wl110.sendgrid.net.`

