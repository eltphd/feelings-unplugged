# Cloudflare Permissions Guide

**For:** Adding KV bindings to Cloudflare Pages  
**Last Updated:** November 12, 2025

---

## 🔐 Required Permissions

### For Cloudflare Dashboard (Manual Setup)

**Minimum Required:**
- **Account Role:** Owner, Admin, or Member with custom permissions
- **Workers & Pages:** Edit access
- **KV Storage:** Read & Write access

**How to Check:**
1. Go to: https://dash.cloudflare.com/
2. Click your profile (top right) → "My Profile"
3. Check "Roles & Permissions"
4. Verify you have "Workers & Pages: Edit" permission

**If You Don't Have Access:**
- Ask account owner to grant you "Workers & Pages: Edit" permission
- Or ask account owner to add the KV binding for you

---

### For API Access (wrangler/CLI)

**Required API Token Permissions:**

If using `wrangler` CLI or API directly, your API token needs:

```
Account:
  - Account:Read
  - Account:Write

Workers & Pages:
  - Workers Scripts:Edit
  - Workers KV Storage:Edit
  - Account Settings:Read

Zone (if managing DNS):
  - Zone:Read
  - DNS:Edit
```

**To Create API Token:**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click: "Create Token"
3. Use: "Edit Cloudflare Workers" template
4. Add custom permissions:
   - Account: Read & Write
   - Workers Scripts: Edit
   - Workers KV Storage: Edit
   - Account Settings: Read
5. Copy token and use with `wrangler` or API

---

## 🎯 Quick Answer

**For Dashboard (Manual):**
- You need **"Workers & Pages: Edit"** permission
- If you can see the Cloudflare Dashboard, you likely have this
- If you can't add bindings, ask account owner for permission

**For API:**
- Token needs **"Workers Scripts: Edit"** and **"Workers KV Storage: Edit"**
- Current `wrangler` login should have these if you've used it before

---

## ✅ What You Can Do

### If You Have Dashboard Access:
1. Go to: https://dash.cloudflare.com/
2. Navigate: Workers & Pages → feelings-unplugged → Settings → Functions
3. Add KV binding (if you see the option, you have permission)

### If You Don't Have Permission:
1. **Ask account owner** to add the binding
2. **Or ask for permission** to be granted:
   - Account owner goes to: Team → Members
   - Finds your email
   - Grants "Workers & Pages: Edit" permission

---

## 🔍 Troubleshooting

### "I can't see KV namespace bindings"
- **Check:** You're in the right project (feelings-unplugged)
- **Check:** You're in Settings → Functions (not Builds)
- **Check:** You have "Workers & Pages: Edit" permission

### "I can't add bindings"
- **Likely:** Missing "Workers & Pages: Edit" permission
- **Solution:** Ask account owner to grant permission
- **Or:** Ask account owner to add binding for you

### "API token doesn't work"
- **Check:** Token has "Workers Scripts: Edit" permission
- **Check:** Token has "Workers KV Storage: Edit" permission
- **Check:** Token is for correct account

---

## 📋 Permission Checklist

- [ ] Can access Cloudflare Dashboard
- [ ] Can see "Workers & Pages" section
- [ ] Can see "feelings-unplugged" project
- [ ] Can access "Settings" → "Functions"
- [ ] Can see "KV namespace bindings" section
- [ ] Can click "Add binding" button

**If all checked:** You have the right permissions! ✅

---

**Note:** KV bindings for Cloudflare Pages currently require dashboard access. API support may be added in the future, but for now, use the dashboard.

