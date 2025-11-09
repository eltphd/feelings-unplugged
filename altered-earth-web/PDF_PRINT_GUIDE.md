# 📖 PDF EXPORT & PRINT-ON-DEMAND GUIDE

## 🎯 Goal
Turn your web journizine into a physical book you can sell on Amazon KDP.

---

## 🤔 TWO APPROACHES

### Option A: Export from Web (Quick & Simple)
**Best for:** Getting a printable PDF quickly
**Time:** 30 minutes
**Quality:** Good for home printing, okay for KDP

### Option B: InDesign (Professional Print Quality)
**Best for:** Professional bookstore-quality printing
**Time:** 2-4 hours
**Quality:** Excellent for Amazon KDP, bookstores

---

## 📱 OPTION A: Export from Web (Quick)

### Step 1: Generate PDF from Browser (15 min)

1. **Open your site:** http://localhost:3000
2. **For each page/section:**
   - Open in Chrome/Safari
   - Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
   - Select "Save as PDF"
   - Settings:
     - Paper size: Letter (8.5" × 11")
     - Margins: None
     - Background graphics: ON
     - Headers/Footers: OFF
   - Save as: `01-homepage.pdf`, `02-articles.pdf`, etc.

3. **Repeat for:**
   - Homepage
   - Each article (8 files)
   - Journal page example (Day 1)
   - Playlist builders
   - Resources

### Step 2: Combine PDFs (5 min)

**Mac:**
1. Open Preview
2. File → Open all PDFs
3. View → Thumbnails (sidebar appears)
4. Drag thumbnails to reorder
5. File → Export as PDF
6. Save as: `altered-earth-complete.pdf`

**Windows:**
1. Use Adobe Acrobat (free trial)
2. Tools → Combine Files
3. Add all PDFs
4. Arrange order
5. Combine
6. Save

### Step 3: Clean Up PDF (10 min)

Using Adobe Acrobat:
1. Remove navigation buttons (won't work in print)
2. Add page numbers
3. Check margins (0.25" inside for binding)
4. Verify all pages print correctly
5. Test print 1 page to check

**Result:** Printable PDF suitable for home printing or basic KDP upload

---

## 🖨️ OPTION B: InDesign Export (Professional)

You already have InDesign files! Let's use them.

### Step 1: Use Your Existing InDesign File

You have: `/Users/tarttphd/Downloads/feelings-unplugged/alteredearth/AlteredEarthJ1.indd`

This file already has 139 pages set up!

### Step 2: Update Content from Web

Two approaches:

**Approach 1: Copy/Paste from Web**
1. Open InDesign file
2. Copy content from web version
3. Paste into InDesign text frames
4. Reformat using your existing styles

**Approach 2: Run Your Automation Script**
You already have this script:
`/Users/tarttphd/Downloads/feelings-unplugged/indesign-scripts/CREATE-COMPLETE-JOURNIZINE.jsx`

This will create all 120 pages with content!

### Step 3: Export Print-Ready PDF

In InDesign:
1. File → Export → Adobe PDF (Print)
2. Settings:
   - **Preset:** [PDF/X-4:2010] (for KDP)
   - **Pages:** All
   - **Spreads:** OFF (KDP wants single pages)
   - **Marks & Bleeds:**
     - Crop Marks: ON
     - Bleed: 0.125" all sides
   - **Output:**
     - Color Conversion: Convert to Destination (CMYK)
     - Destination: U.S. Web Coated (SWOP) v2
   - **Compression:**
     - Color Images: 300 ppi, High Quality
3. Export as: `altered-earth-vol1-PRINT.pdf`

**Result:** Professional print-ready PDF for Amazon KDP

---

## 📚 AMAZON KDP SETUP (Print-on-Demand)

### Step 1: Create KDP Account (5 min)
1. Go to https://kdp.amazon.com
2. Sign up (free)
3. Complete tax info (required for payments)

### Step 2: Create New Paperback (10 min)

**Paperback Details:**
- **Title:** ALTERED.EARTH Journizine Vol. 1
- **Subtitle:** A Journal + Magazine for Teens Who Feel Everything
- **Author:** Dr. Erica L. Tartt
- **Description:** (See template below)
- **Keywords:** teen journal, mental health, shadow work, emotional regulation, LGBTQ youth, BIPOC teens
- **Categories:**
  - Self-Help > Journaling
  - Young Adult > Social Topics > Mental Health
  - Education > Counseling

**Paperback Content:**
- **ISBN:** Request free KDP ISBN
- **Publication Date:** [Today's date]
- **Print Options:**
  - Black & white OR Color (color costs more)
  - Paper: White or Cream
  - Size: 8.5" × 11"
  - Bleed: Yes (0.125")
  - Binding: Perfect Bound OR Spiral (spiral requires special setup)

**Paperback Rights & Pricing:**
- **Territories:** Worldwide
- **List Price:** $19.99 (recommended)
  - Your royalty: ~$5-7 per book
  - KDP printing cost: ~$8-10 (varies by page count)
  - Amazon cut: ~$2-3

### Step 3: Upload Your PDF

1. **Manuscript:** Upload your print-ready PDF
2. **Cover:**
   - Option A: Use KDP Cover Creator (free, simple)
   - Option B: Design custom cover in Canva
   - Option C: Hire designer on Fiverr ($20-50)

**KDP Cover Requirements:**
- Trim size: 8.5" × 11"
- Page count: [Your final page count]
- Spine width: Auto-calculated by KDP
- Full bleed cover dimensions: KDP provides template

### Step 4: Preview & Publish

1. Use KDP Previewer to check your book
2. Order 1 proof copy ($5-10) to check quality
3. Once approved, click "Publish"
4. Book goes live on Amazon in 24-72 hours

---

## 💰 PRICING STRATEGY

### Recommended Pricing:

| Format | Price | Your Profit | Notes |
|--------|-------|-------------|-------|
| **Web Version** | FREE | $0 | Maximum reach |
| **Digital PDF** | $4.99 | $4.50 | Gumroad/Gumtree |
| **Paperback (B&W)** | $16.99 | $4-6 | Amazon KDP |
| **Paperback (Color)** | $24.99 | $5-7 | Premium option |

### Why This Works:
- **Free web version** drives awareness
- **$4.99 PDF** for those who want to print at home
- **$16.99 paperback** for those who want physical book
- **$24.99 color** for premium collectors

---

## 📊 BOOK DESCRIPTION TEMPLATE (For Amazon)

```
ALTERED.EARTH Journizine Vol. 1
Where Your Shadow Meets the Light

A journal + magazine for teens who feel BIG feelings.

This isn't your typical journal. It's a 120-page journizine (journal + magazine) designed specifically for teens experiencing anxiety, big emotions, or feeling "too much."

What's inside:
• 30 days of guided journal prompts (morning, midday, evening)
• 8 research-backed articles written at 4th grade reading level
• Playlist builders for emotional regulation
• Academy archetypes quiz (discover your unique strengths)
• Shadow work exercises for beginners
• Crisis resources and mental health tools

Perfect for:
✓ Teens who feel everything deeply
✓ LGBTQ+ youth navigating identity
✓ BIPOC teens seeking culturally affirming tools
✓ Neurodivergent minds needing structured reflection
✓ Anyone told they're "too sensitive"

Designed by Dr. Erica L. Tartt (BASEops), this journizine combines:
• Adolescent brain science
• Trauma-informed shadow work
• Cultural competency
• Cognitive load reduction

No academic jargon. No toxic positivity. Just real tools for real teens.

Your feelings are not too much. Your brilliance is not conditional.
```

---

## 🎨 COVER DESIGN OPTIONS

### DIY in Canva (Free)
1. Go to Canva.com
2. Search "Book Cover" template
3. Use KDP dimensions (they provide template)
4. Colors: Terracotta, Forest Green, Amber
5. Font: Crimson Text or similar serif
6. Add firefly illustration (find on Unsplash)
7. Export as PDF (high quality)

### Hire Designer (Fiverr)
1. Go to Fiverr.com
2. Search "book cover design"
3. Filter: $20-50 range
4. Provide: Your color palette, sample pages, vibe
5. Turnaround: 3-5 days

### Use KDP Cover Creator (Easiest)
1. Built into KDP during upload
2. Choose template
3. Upload front/back images
4. Add text
5. Auto-generates spine
6. Done in 10 minutes

---

## ✅ QUALITY CHECKLIST (Before Publishing)

Before you publish on KDP:

- [ ] All pages numbered correctly
- [ ] No blank pages (unless intentional)
- [ ] All images at 300 dpi minimum
- [ ] Text is CMYK (not RGB)
- [ ] Bleeds set correctly (0.125")
- [ ] Crisis hotlines accurate (988, Trevor Project, etc.)
- [ ] Your name spelled correctly
- [ ] Copyright page included
- [ ] ISBN assigned
- [ ] Cover matches trim size exactly
- [ ] Test printed 1 proof copy
- [ ] Reviewed proof for errors
- [ ] Price set correctly

---

## 📈 MARKETING YOUR BOOK

Once published:

### Free Marketing
- Share on social media (Instagram, TikTok, Twitter)
- Post in mental health groups (Reddit, Facebook)
- Email therapists/school counselors
- Create TikToks showing sample pages
- Ask teens to review on Amazon

### Paid Marketing (Optional)
- Amazon Ads ($5/day minimum)
- Instagram Ads targeting teen mental health
- BookTok influencers (send free copies)

### SEO Keywords (Amazon)
- teen anxiety journal
- shadow work for beginners
- LGBTQ youth mental health
- BIPOC teen journal
- emotional regulation workbook
- neurodivergent journal
- feelings journal for teens

---

## 💡 PRO TIPS

1. **Start with web, add print later**
   - Launch web version first (free, fast)
   - Gauge interest before investing in print setup
   - Add KDP only if there's demand

2. **Order proof copy before going live**
   - Costs $5-10 but worth it
   - Check print quality, color accuracy
   - Fix errors before public launch

3. **Use KDP Select for free promo**
   - Make book exclusive to Amazon for 90 days
   - Run free promo days (5 per 90 days)
   - Builds reviews and rankings

4. **Bundle with web version**
   - "Buy the book, get lifetime web access"
   - Add QR code in book linking to web version
   - Best of both worlds

---

## 🚀 RECOMMENDED PATH

### Phase 1: NOW (This Week)
✅ Deploy web version (free, immediate impact)
✅ Share with 10-20 teens for feedback
✅ Iterate based on feedback

### Phase 2: MONTH 1 (If there's demand)
- Export PDF from web
- Clean up formatting
- Upload to Amazon KDP
- Order 1 proof copy
- Launch on Amazon

### Phase 3: MONTH 2+ (Scale)
- Add remaining articles to web
- Create InDesign print version (professional quality)
- Run Amazon Ads
- Partner with therapists/schools
- Consider custom domain (alteredearth.com)

---

## 📞 RESOURCES

- **Amazon KDP Help:** https://kdp.amazon.com/help
- **Cover Templates:** kdp.amazon.com/cover-templates
- **ISBN Info:** https://kdp.amazon.com/help?topicId=A2RHBMFCB7BTGQ
- **Pricing Calculator:** kdp.amazon.com/royalty-calculator
- **Canva:** canva.com
- **Fiverr Designers:** fiverr.com

---

**You now have everything you need to create a print version!**

Start with the web. Add print when there's demand. Scale from there. 🚀
