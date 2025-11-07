# Product Files for Feelings Unplugged

## Teen Journal PDF

**File:** `Teen-Journal-Feelings-Unplugged.pdf` (236 KB)

This is the downloadable digital product for the Teen Journal that customers receive after purchasing via Stripe.

## How to Upload to Stripe for Digital Delivery

### Option 1: Stripe Dashboard (Recommended)

1. **Log in to Stripe Dashboard**: https://dashboard.stripe.com
2. **Navigate to Products**:
   - Click "Products" in left sidebar
   - Find your existing "Teen Journal - Feelings Unplugged" product
   - OR create a new product if needed
3. **Add Digital Product File**:
   - Click on the product
   - Scroll to "Digital products and downloads" section
   - Click "Add file"
   - Upload `Teen-Journal-Feelings-Unplugged.pdf`
   - Set download limits (recommend: unlimited downloads, or 5 downloads within 30 days)
4. **Update Payment Link**:
   - Your existing payment link: https://buy.stripe.com/00wcN43Dm1gK78g6nX4Rq06
   - Should automatically include the uploaded file
   - Test by making a test purchase to verify file delivery

### Option 2: Host Externally

If you prefer to host the PDF elsewhere:

1. **Upload to secure file hosting:**
   - Google Drive (with link sharing)
   - Dropbox
   - Your own server with authentication
   - AWS S3 with signed URLs

2. **Configure Stripe Webhook:**
   - Set up webhook to send download link after successful payment
   - Requires backend development

### Testing Your Setup

1. **Make a test purchase** using Stripe test mode
2. **Verify email delivery** includes PDF download link
3. **Check download works** and file opens correctly
4. **Confirm file size** is appropriate for email delivery (236 KB is perfect)

## Important Notes

- **File Size**: 236 KB is well within email attachment limits
- **Format**: PDF is universally compatible
- **Copyright**: File includes copyright notice and terms
- **Updates**: If you update the journal, re-upload the new version to Stripe

## Product Details

- **Title**: Feelings Unplugged: Teen Journal
- **Subtitle**: Where Your Shadow Meets the Light
- **Author**: Dr. Erica L. Tartt
- **Price**: $19.99
- **Format**: PDF (letter size, 8.5" x 11")
- **Contents**:
  - Morning Glow prompts (10 daily check-ins)
  - Midday Spark prompts (10 emotional check-ins)
  - Evening Calm prompts (10 reflection exercises)
  - Academy Identity Archetypes (5 archetypes with reflections)
  - Shadow Work prompts (10 deep exploration exercises)
  - Weekly Reflection trackers
  - Playlist Therapy sections
  - Crisis resources and community links

## Marketing Copy for Stripe Product Description

```
Feelings Unplugged: Teen Journal - Where Your Shadow Meets the Light

A trauma-informed emotional regulation journal for teens navigating identity, mental health, and growth.

WHAT'S INCLUDED:
✨ 120+ pages of guided prompts and reflection space
✨ Morning, midday, and evening check-in exercises
✨ Academy Identity Archetypes system (5 unique types)
✨ Shadow Work prompts for deeper emotional exploration
✨ Weekly reflection trackers for pattern recognition
✨ Playlist Therapy sections for emotional regulation
✨ Crisis resources and culturally affirming support links

PERFECT FOR:
- Teens navigating anxiety, depression, or identity questions
- LGBTQ+ youth needing affirming space for self-exploration
- BIPOC teens processing racial trauma and code-switching
- Anyone who refuses to shrink and wants to honor their full emotional spectrum

INSTANT DOWNLOAD - PDF format, print or use digitally

© Dr. Erica L. Tartt | BASEops
```

## Next Steps

1. [ ] Upload PDF to Stripe product
2. [ ] Test purchase flow in test mode
3. [ ] Verify email delivery and download
4. [ ] Switch to live mode
5. [ ] Market the product!

---

**Questions?** contact@measurementally.com
