#!/bin/bash
echo "=== Feelings Unplugged Setup Verification ==="
echo ""
echo "1. SPF Record:"
SPF=$(dig TXT feelingsunplugged.com +short | grep -i spf)
if echo "$SPF" | grep -q "sendgrid.net"; then
    echo "   ✅ SPF includes SendGrid"
    echo "   Value: $SPF"
else
    echo "   ❌ SPF missing SendGrid"
    echo "   Current: $SPF"
fi
echo ""
echo "2. DMARC Record:"
DMARC=$(dig TXT _dmarc.feelingsunplugged.com +short)
if echo "$DMARC" | grep -q "DMARC1"; then
    echo "   ✅ DMARC configured"
    echo "   Value: $DMARC"
else
    echo "   ⚠️  DMARC not found"
fi
echo ""
echo "3. SendGrid DKIM Records:"
DKIM1=$(dig CNAME s1._domainkey.feelingsunplugged.com +short)
DKIM2=$(dig CNAME s2._domainkey.feelingsunplugged.com +short)
if echo "$DKIM1" | grep -q "sendgrid" && echo "$DKIM2" | grep -q "sendgrid"; then
    echo "   ✅ DKIM records configured"
    echo "   s1._domainkey: $DKIM1"
    echo "   s2._domainkey: $DKIM2"
else
    echo "   ❌ DKIM records missing or incomplete"
fi
echo ""
echo "4. Next Steps:"
echo "   → Check SendGrid: https://app.sendgrid.com → Settings → Sender Authentication"
echo "   → Verify feelingsunplugged.com shows 'Verified'"
echo "   → Test email sending with a Stripe purchase"
