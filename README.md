# Feelings Unplugged

> Evidence-based emotional regulation tools for teens, parents, and educators.

**Live Site:** [Deploy to Cloudflare Pages](./DEPLOYMENT.md)

---

## 🎯 What This Is

A comprehensive content ecosystem featuring:

1. **Teen Journal** (120 pages) - Depth-work journal combining Jungian archetypes, shadow integration, and neuroscience-backed prompts
2. **Parent Guide** (60 pages) - Compassionate roadmap for supporting adolescent mental health
3. **Educator Toolkit** (40 pages) - Practical classroom emotion regulation strategies

---

## 🎨 Design Philosophy

**Dark Academia + Soft Glow Aesthetic**

- Deep, rich backgrounds (charcoal, navy, black)
- Serif typography (Crimson Text, Libre Baskerville)
- Gold/amber accents with subtle glow effects
- Minimal, elegant, content-focused
- Fully responsive (mobile-first)

---

## 📁 Project Structure

```
feelings-unplugged/
├── index.html              # Landing page / Master hub
├── teen-journal.html       # Teen Journal product page
├── parent-guide.html       # Parent Guide product page
├── educator-toolkit.html   # Educator Toolkit product page
├── style.css               # Global styles (dark academia theme)
├── _headers                # Cloudflare Pages security headers
├── .gitignore              # Git ignore patterns
├── README.md               # This file
└── DEPLOYMENT.md           # Complete deployment guide
```

---

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open in browser:**
   ```bash
   cd feelings-unplugged
   open index.html
   # Or use a local server:
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

### Deploy to Cloudflare Pages

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for three deployment methods:**
- Direct upload (fastest)
- Git + GitHub (recommended)
- Wrangler CLI (for developers)

---

## 💡 Features

### Technical
- ✅ Pure HTML/CSS (no build step required)
- ✅ Cloudflare Pages optimized
- ✅ Security headers configured
- ✅ SEO-friendly semantic HTML
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Fast loading (minimal dependencies)
- ✅ Mobile-responsive

### Content
- ✅ 4 complete pages (landing + 3 products)
- ✅ Professional copywriting
- ✅ Clear calls-to-action
- ✅ Pricing structure ($14.99-$34.99)
- ✅ FAQ sections
- ✅ Cultural competence framing
- ✅ Trauma-informed language

---

## 🎨 Customization

### Update Content

Edit HTML files directly. Key sections:
- **Prices:** Search for class="price" in HTML files
- **Product descriptions:** Update `<p class="description">` content
- **Features lists:** Modify `<ul class="features">` items
- **CTAs:** Update button text and links

### Modify Styling

Edit `style.css`:
- **Colors:** Update CSS variables in `:root`
- **Fonts:** Change Google Fonts link + `--font-serif` variable
- **Glow effects:** Adjust `--glow-sm/md/lg` variables
- **Spacing:** Modify `--space-*` variables

### Add Pages

1. Create new HTML file (copy structure from existing pages)
2. Link from navigation/CTAs
3. Follow existing naming conventions
4. Maintain consistent styling

---

## 💰 E-Commerce Integration

### Stripe (Recommended)

**Option 1: Payment Links (Simplest)**
1. Create products in Stripe Dashboard
2. Generate payment links
3. Replace `href="#"` with Stripe links

**Option 2: Stripe Checkout (Advanced)**
- Requires Cloudflare Workers for backend
- Can build custom checkout flow
- Contact for implementation

### Gumroad / Lemon Squeezy
- Alternative platforms
- Similar integration process
- Update button links

---

## 📊 Analytics Setup

### Cloudflare Web Analytics (Recommended)
- Privacy-friendly
- Free
- No performance impact
- See DEPLOYMENT.md for setup

### Google Analytics
- Add tracking script to all HTML files
- Place before `</head>` tag

---

## 🔧 Advanced Features (Optional)

### Add Contact Form
- Use Cloudflare Pages Functions
- Or integrate Formspree/Tally

### Add Blog
- Use Hugo/Astro static generator
- Or add simple HTML pages

### Add Search
- Use Algolia DocSearch
- Or Pagefind for static search

### Add Newsletter Signup
- Integrate ConvertKit/Mailchimp
- Use embedded forms

---

## 📱 Social Media Assets

Recommended for launch:

1. **Open Graph Tags** (add to `<head>` of each page):
   ```html
   <meta property="og:title" content="Feelings Unplugged">
   <meta property="og:description" content="Evidence-based emotional regulation for teens, parents, educators">
   <meta property="og:image" content="https://your-domain.com/og-image.png">
   <meta property="og:url" content="https://your-domain.com">
   <meta name="twitter:card" content="summary_large_image">
   ```

2. **Create og-image.png:**
   - 1200x630px
   - Dark academia aesthetic
   - Site title + tagline
   - Can use Canva or Figma

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3
- **Fonts:** Google Fonts (Crimson Text, Libre Baskerville)
- **Hosting:** Cloudflare Pages
- **Version Control:** Git + GitHub (optional)
- **Payment:** Stripe (when integrated)
- **Analytics:** Cloudflare Web Analytics (when added)

---

## 📄 License & Usage

**Content:** © 2025 Dr. Erica L. Tartt. All rights reserved.

**Code:** Feel free to reuse the HTML/CSS structure for your own projects.

---

## 🤝 Contributing

This is a personal project for Dr. Erica L. Tartt's ventures. If you find issues:

1. Note the problem
2. Suggest a fix
3. Submit feedback

---

## 📞 Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md)

For content updates, edit HTML files directly.

For design changes, modify `style.css`.

---

## 🎯 Roadmap

### Phase 1: Launch (Current)
- [x] Build static site
- [x] Deploy to Cloudflare Pages
- [ ] Set up custom domain
- [ ] Integrate Stripe payments
- [ ] Add analytics

### Phase 2: Enhance
- [ ] Add blog for SEO
- [ ] Create email capture form
- [ ] Build social proof section
- [ ] Add testimonials

### Phase 3: Scale
- [ ] Create affiliate program
- [ ] Build educator dashboard
- [ ] Develop companion workbooks
- [ ] Launch community forum

---

## 🌟 Credits

**Created by:** Dr. Erica L. Tartt
**Built with:** [Claude Code](https://claude.com/claude-code)
**Hosted on:** Cloudflare Pages
**Design Inspiration:** Dark academia aesthetic, depth psychology, cultural humility

---

**Ready to deploy?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

**Questions?** Review the deployment guide or consult Cloudflare Pages documentation.

---

*Built with intention. Deployed with purpose. 🔥*
