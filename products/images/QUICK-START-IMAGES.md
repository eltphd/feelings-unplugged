# QUICK START: Image Generation Workflow

## ⚡ 3-Step Process

### STEP 1: Generate Images
1. Open **FEELINGS-UNPLUGGED-IMAGE-PROMPTS.md**
2. Choose your style (A, B, C, or D) for each placeholder
3. Copy prompts into NiteCreator
4. Generate at **300 DPI** / Print quality

### STEP 2: Save to Git Repository
Save generated images to:
```
/Users/tarttphd/Documents/GitHub/feelings-unplugged/products/images/
├── teen-journal/
│   ├── teen-journal-cover.png
│   ├── teen-journal-midday-spark.png
│   └── teen-journal-archetypes.png
├── parent-guide/
│   ├── parent-guide-cover.png
│   └── parent-guide-identity-support.png
└── educator-toolkit/
    ├── educator-toolkit-cover.png
    └── educator-toolkit-check-in.png
```

### STEP 3: Commit to Git
```bash
cd /Users/tarttphd/Documents/GitHub/feelings-unplugged
git add products/images/
git commit -m "Add visual assets for Feelings Unplugged print guides"
git push
```

---

## 📊 Image Inventory Checklist

### Teen Journal (3 images)
- [ ] **Cover** - Bold inner brilliance illustration (portrait)
- [ ] **Midday Spark** - Calming meditation visual (landscape)  
- [ ] **Archetypes** - 5 symbolic identity icons (landscape)

### Parent Guide (2 images)
- [ ] **Cover** - Multi-generational family warmth (portrait)
- [ ] **Identity Support** - Cultural affirmation imagery (landscape)

### Educator Toolkit (2 images)
- [ ] **Cover** - Collaborative classroom scene (portrait)
- [ ] **Check-In** - Mood meter / regulation tools (landscape)

---

## 🎨 Style Quick Reference

| Style | Best For | Complexity |
|-------|----------|------------|
| **A** | Conceptual/abstract | ⭐ Easiest |
| **B** | Mixed media/collage | ⭐⭐ Medium |
| **C** | Minimalist/modern | ⭐⭐ Medium |
| **D** | Realistic/painterly | ⭐⭐⭐ Advanced |

---

## 🔧 Helper Script

Run for inventory check:
```bash
chmod +x integrate-images.sh
./integrate-images.sh
```

---

## 📐 Technical Specs

**Portrait (covers):**
- Dimensions: 2550 × 3300 px
- Size: 8.5" × 11" 
- Resolution: 300 DPI

**Landscape (interior spreads):**
- Dimensions: 2550 × 1650 px  
- Size: 8.5" × 11" rotated
- Resolution: 300 DPI

**Format:** PNG or JPG  
**Color:** RGB (convert to CMYK for professional print)

---

## 🎯 Brand Colors Reference

```
Primary:   #B7664F (terracotta)
Secondary: #465B73 (slate blue)  
Accent:    #6D8B8A (sage green)
Neutral:   #2E2A29 (charcoal)
Metallics: Gold (#d4af37), Bronze (#cd7f32), Copper
```

---

## 💡 Pro Tips

1. **Start with Style A** for fastest results
2. **Generate multiple variations** before committing  
3. **Test at print size** before finalizing
4. **Keep source files** in case you need to regenerate
5. **Use consistent style** within each guide (mix across guides is fine)

---

## 📧 Need Help?

**Prompt Guide:** FEELINGS-UNPLUGGED-IMAGE-PROMPTS.md  
**Integration Script:** integrate-images.sh  
**Contact:** atlas@feelingsunplugged.space

---

**Quick Start Guide** · Dr. Erica L. Tartt · November 2025
