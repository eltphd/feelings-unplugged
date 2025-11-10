# ALTERED.EARTH JOURNIZINE VOL. 1 - INDESIGN MCP AGENT PROMPT
## Complete Implementation Guide for InDesign Automation

**Project:** Altered.Earth Journizine Vol. 1  
**Designer:** [Name]  
**Format:** 120-page journal + magazine hybrid  
**Target:** Teens (ages 13-18), especially BIPOC, LGBTQ+, neurodivergent youth  
**Purpose:** Emotional regulation journaling with research-backed educational content

---

## EXECUTIVE SUMMARY FOR AGENT

You are tasked with implementing a complete 120-page InDesign document for a teen journizine called "Altered.Earth Vol. 1". This is a hybrid journal + magazine that alternates between educational articles (written at 4th grade reading level) and interactive journaling prompts designed to reduce cognitive load while supporting adolescent mental health.

**Your primary goals:**
1. Set up the complete InDesign file structure with master pages, paragraph styles, character styles, and color swatches
2. Implement the strategic content flow designed to minimize cognitive overload
3. Create reusable templates for daily journal entries, playlists, and archetype deep dives
4. Maintain visual hierarchy and accessibility throughout
5. Ensure 30% minimum white space per page
6. Apply the Terracotta Forest color palette consistently
7. Generate a print-ready PDF at the end

---

## PART 1: DOCUMENT SETUP

### Physical Specifications

```
Document Size: 8.5" × 11" (US Letter)
Page Count: 120 pages
Orientation: Portrait
Facing Pages: Yes (for spreads)
Primary Text Frame: Yes
Columns: 1 (articles may use 2)
Margins: 0.75" all sides
Binding Offset: 0.5" (inside margin for spiral binding)
Bleed: 0.125" all sides
```

### Color Swatches (CMYK for Print)

Create these named swatches in this exact order:

1. **Terracotta**
   - Name: "Terracotta"
   - Mode: CMYK
   - C: 0%, M: 54%, Y: 55%, K: 12%
   - Hex: #E07A5F (for reference)

2. **Forest Green**
   - Name: "Forest Green"
   - Mode: CMYK
   - C: 70%, M: 35%, Y: 65%, K: 50%
   - Hex: #3A5A40

3. **Amber**
   - Name: "Amber"
   - Mode: CMYK
   - C: 10%, M: 25%, Y: 45%, K: 15%
   - Hex: #D4A574

4. **Sage**
   - Name: "Sage"
   - Mode: CMYK
   - C: 45%, M: 10%, Y: 35%, K: 20%
   - Hex: #81B29A

5. **Cream**
   - Name: "Cream"
   - Mode: CMYK
   - C: 3%, M: 3%, Y: 10%, K: 5%
   - Hex: #F4F1DE

6. **Off-White**
   - Name: "Off-White"
   - Mode: CMYK
   - C: 2%, M: 2%, Y: 4%, K: 2%
   - Hex: #FDFBF7

7. **Pure Black**
   - Name: "Black"
   - Mode: CMYK
   - C: 0%, M: 0%, Y: 0%, K: 100%

---

## PART 2: TYPOGRAPHY SYSTEM

### Font Requirements

**Primary Font Family:** Crimson Text (Google Fonts - free to use)
- Download from: https://fonts.google.com/specimen/Crimson+Text
- Install all weights: Regular, Italic, Semibold, Bold

**Alternative if Crimson Text unavailable:** Charter, Baskerville, or Georgia

### Paragraph Styles

Create these paragraph styles IN THIS ORDER:

#### 1. **Heading-Chapter**
```
Font: Crimson Text Bold
Size: 36pt
Leading: 42pt
Color: Terracotta
Alignment: Left
Space Before: 0"
Space After: 0.5"
Hyphenation: Off
Keep Options: Keep with next 2 lines
```

#### 2. **Heading-Section**
```
Font: Crimson Text Bold
Size: 24pt
Leading: 28pt
Color: Forest Green
Alignment: Left
Space Before: 0.3"
Space After: 0.2"
Hyphenation: Off
Keep Options: Keep with next 2 lines
```

#### 3. **Heading-Subsection**
```
Font: Crimson Text Semibold
Size: 18pt
Leading: 22pt
Color: Amber
Alignment: Left
Space Before: 0.2"
Space After: 0.15"
Hyphenation: Off
```

#### 4. **Body-Article**
```
Font: Crimson Text Regular
Size: 14pt
Leading: 25.2pt (1.8× line spacing)
Color: Black
Alignment: Left (NOT justified)
Space Before: 0"
Space After: 0.5em
Hyphenation: On
First Line Indent: 0" (no indent)
```

#### 5. **Body-List**
```
Based on: Body-Article
Bullets: Custom (use • or colored circles)
Bullet Color: Forest Green
Left Indent: 0.25"
First Line Indent: -0.25" (hanging)
Space Between Items: 0.5em
```

#### 6. **Pull-Quote**
```
Font: Crimson Text Italic
Size: 20pt
Leading: 28pt
Color: Amber
Alignment: Center
Space Before: 0.3"
Space After: 0.3"
Hyphenation: Off
```

#### 7. **Prompt-Question**
```
Font: Crimson Text Bold
Size: 12pt
Leading: 18pt
Color: Terracotta
Alignment: Left
Space Before: 0.15"
Space After: 0.1"
Keep Options: Keep with next 1 line
```

#### 8. **Prompt-Line**
```
Font: Crimson Text Regular
Size: 12pt
Leading: 24pt
Color: Terracotta
Paragraph Rules: 
  - Rule Below: On
  - Weight: 1pt
  - Type: Dashed (2pt dash, 2pt gap)
  - Color: Terracotta
  - Offset: -6pt
  - Width: Text
```

#### 9. **Validation-Text**
```
Font: Crimson Text Italic
Size: 10pt
Leading: 14pt
Color: Sage
Alignment: Left
Space Before: 0"
Space After: 0.15"
Paragraph Shading: Off (or light Cream background)
```

#### 10. **Caption-Text**
```
Font: Crimson Text Regular
Size: 10pt
Leading: 13pt
Color: Sage
Alignment: Center
Space Before: 0.1"
Space After: 0"
```

#### 11. **Header-Footer**
```
Font: Crimson Text Regular
Size: 10pt
Leading: 12pt
Color: Sage
Alignment: Center
```

---

## PART 3: CHARACTER STYLES

Create these character styles for inline formatting:

#### 1. **Bold-Emphasis**
```
Font Style: Bold
Color: [None] (inherits from paragraph)
```

#### 2. **Italic-Emphasis**
```
Font Style: Italic
Color: [None]
```

#### 3. **Color-Terracotta**
```
Font Style: [None]
Color: Terracotta
```

#### 4. **Color-Amber**
```
Font Style: [None]
Color: Amber
```

#### 5. **Color-Sage**
```
Font Style: [None]
Color: Sage
```

---

## PART 4: OBJECT STYLES

Create these object styles for repeated elements:

#### 1. **Fact-Box**
```
Basic Attributes:
  - Fill: Cream
  - Stroke: 2pt, Terracotta
  - Corner Options: Rounded, 3mm radius

Text Frame Options:
  - Inset Spacing: 0.2" all sides
  - Vertical Justification: Top
  - Columns: 1

Drop Shadow: Off
```

#### 2. **Doodle-Box**
```
Basic Attributes:
  - Fill: Cream
  - Stroke: 3pt, Terracotta
  - Corner Options: Rounded, 3mm radius

Size:
  - Width: 6"
  - Height: 3"

Text Frame Options:
  - Inset Spacing: 0.2" all sides
  - Vertical Justification: Center
  - Columns: 1
```

#### 3. **Pull-Quote-Frame**
```
Basic Attributes:
  - Fill: None
  - Stroke: None

Text Frame Options:
  - Inset Spacing: 0.5" left/right, 0.3" top/bottom
  - Vertical Justification: Center
  - Columns: 1
```

#### 4. **Playlist-Line-Frame**
```
Basic Attributes:
  - Fill: None
  - Stroke: None

Text Frame Options:
  - Inset Spacing: 0.1" all sides
```

---

## PART 5: MASTER PAGES

Create 5 master pages with specific purposes:

### A-Master: Base Master (All Pages Inherit From This)

**Elements:**
- Page numbers in footer (centered, Sage color, 10pt)
- Margins: 0.75" all sides, 0.5" binding offset
- No header

**Footer Setup:**
```
Text Frame: 
  - Position: Bottom center, 0.5" from bottom edge
  - Size: 1" × 0.3"
  - Content: Auto Page Number
  - Style: Header-Footer
  - Color: Sage
```

### B-Master: Article Page (Based on A-Master)

**Layout:**
```
Columns: 2 (for article text)
Column Gutter: 0.25"
Text Frame: Full width minus margins
```

**Guidelines:**
- Vertical guides at 33% and 66% for image placement
- Horizontal guide at 2" from top for section headers

### C-Master: Daily Journal Spread (Based on A-Master)

**Left Page (Morning/Midday):**
```
Header Frame:
  - Position: Top left, within margins
  - Size: 3" × 0.5"
  - Content: "Day ___" with fill-in line
  - Style: Heading-Section

Three Section Frames:
  1. Morning Ritual (icon placeholder + prompts)
  2. Midday Check-In (emoji row + body outline)
  3. [Space for expansion]
```

**Right Page (Evening/Doodle):**
```
Header Frame:
  - Position: Top left
  - Content: "Evening Reflection"
  
Rose/Thorn/Bud Section:
  - Three subsections with icon placeholders
  
Doodle Box:
  - Position: Bottom half of page
  - Object Style: Doodle-Box
```

### D-Master: Playlist Template (Based on A-Master)

**Layout:**
```
Header Frame:
  - Playlist name + mood description
  - Style: Heading-Section
  
Icon Placeholder:
  - Position: Top right
  - Size: 2" × 2"
  - Fill: Cream
  
10 Numbered Lines:
  - "Song 1: ___________" format
  - Style: Prompt-Line
  - Equal spacing: 0.4" between each line
```

### E-Master: Archetype Deep Dive (Based on A-Master)

**Layout:**
```
Left 60%: Image Placeholder
  - Full bleed to edge
  - Fill: Cream (for placeholder)
  
Right 40%: Text Frame
  - Archetype name (36pt, color-coded)
  - Core energy description
  - 3 reflection questions
  - Affirmation box at bottom
```

---

## PART 6: STRATEGIC CONTENT FLOW (120 Pages)

### CRITICAL SEQUENCING LOGIC

**The journizine follows a 12-page cognitive load cycle:**

1. **LEARN (4 pages):** Educational article with visuals
2. **PRACTICE (6 pages):** Interactive prompts/templates  
3. **REST (2 pages):** Visual/creative space

**This pattern repeats throughout to prevent decision fatigue and maintain engagement.**

### Page-by-Page Content Map

#### FRONT MATTER (Pages i-vi)

| Page | Master | Content | Notes |
|------|--------|---------|-------|
| i | Custom | Cover | Full-bleed forest green background, firefly glow illustration, title "ALTERED.EARTH" |
| ii | Custom | Title Page | Cream background, "Feelings Unplugged" subtitle |
| iii-vi | A-Master | Table of Contents | Auto-generated, 2 columns |

#### SECTION A: FOUNDATION (Pages 1-30)

| Page Range | Master | Content Type | Template | Key Elements |
|------------|--------|--------------|----------|--------------|
| 1-2 | A-Master | Welcome Letter | Article | Dr. Tartt intro, warm photo, pull quote |
| 3-4 | A-Master | How to Use | Article | Clear instructions, crisis resources box |
| 5-10 | B-Master | Brain Article | Article | Diagrams every 2 pages, fact boxes, pull quotes |
| 11-12 | A-Master | Body Check-In | Interactive | Large body outline illustration, emotion wheel |
| 13-20 | B-Master | Academy Archetypes | Article | 1 page per archetype + 2-page quiz |
| 21-24 | C-Master | Days 1-2 Journal | Daily Journal | Morning/Midday left, Evening/Doodle right |
| 25-28 | B-Master | Shadow Work Intro | Article | Silhouette illustrations, examples |
| 29-30 | A-Master | Shadow Creative | Creative | Blank space with light prompts |

#### SECTION B: DAILY PRACTICE (Pages 31-90)

**Days 3-30 = 28 days × 2 pages = 56 pages**

| Page Range | Master | Content | Template | Pattern |
|------------|--------|---------|----------|---------|
| 31-90 | C-Master | Days 3-30 | Daily Journal | Same template repeated, only date changes |

**Weekly Archetype Inserts (Every 7th Day):**

| Day | Pages | Archetype | Master | Color Accent |
|-----|-------|-----------|--------|--------------|
| 7 | 37-38 | Catalyst | E-Master | Terracotta |
| 14 | 51-52 | Luminary | E-Master | Amber |
| 21 | 65-66 | Guardian | E-Master | Forest Green |
| 28 | 79-80 | Maverick | E-Master | Sage |
| (Week 5) | 93-94 | Weaver | E-Master | Amber |

#### SECTION C: TOOLS + RESOURCES (Pages 91-120)

| Page Range | Master | Content Type | Template | Key Elements |
|------------|--------|--------------|----------|--------------|
| 91-96 | B-Master | Playlist Article | Article | Use provided "Playlist as Medicine" content |
| 97-102 | D-Master | Playlist Templates | Playlist Builder | Mad, Sad, Happy, Calm, Hyped + 1 bonus |
| 103-106 | B-Master | Crisis Article | Article | Large icons, warm colors, resource list |
| 107-108 | A-Master | Resource Guide | Reference | QR codes, hotline numbers, website links |
| 109-110 | A-Master | Emotion Tracker | Template | Monthly calendar grid |
| 111-112 | A-Master | Pattern Spotter | Template | Reflection questions |
| 113-114 | A-Master | Letter to Future Self | Template | Letter format with prompts |
| 115-116 | A-Master | Letter to Shadow | Template | Letter format with validation |
| 117-118 | A-Master | Celebration | Closing | "You Did It!" affirmation |
| 119 | A-Master | Resources | Reference | QR codes, social media, website |
| 120 | Custom | Back Cover | Cover | Forest green, tagline, firefly icon |

---

## PART 7: CONTENT IMPLEMENTATION INSTRUCTIONS

### Phase 1: Document Structure Setup

**Step 1.1: Create New Document**
```
File → New → Document
Intent: Print
Number of Pages: 120
Facing Pages: ✓ Checked
Primary Text Frame: ✓ Checked
Page Size: Letter (8.5 × 11 in)
Orientation: Portrait
Columns: 1
Margins: Top 0.75", Bottom 0.75", Inside 1.25" (0.75" + 0.5" binding), Outside 0.75"
Bleed: 0.125" all sides
```

**Step 1.2: Create Color Swatches**
```
Window → Color → Swatches
New Color Swatch → Process → CMYK
[Create all 7 colors from Part 2 specifications]
```

**Step 1.3: Create Paragraph Styles**
```
Window → Styles → Paragraph Styles
New Paragraph Style → [Create all 11 styles from Part 3]
```

**Step 1.4: Create Character Styles**
```
Window → Styles → Character Styles  
New Character Style → [Create all 5 styles from Part 3]
```

**Step 1.5: Create Object Styles**
```
Window → Styles → Object Styles
New Object Style → [Create all 4 styles from Part 4]
```

**Step 1.6: Create Master Pages**
```
Window → Pages
New Master → [Create all 5 master pages from Part 5]
```

### Phase 2: Front Matter Implementation

**Step 2.1: Cover (Page i)**
```
Master: None (override)
Background:
  - Rectangle frame, full bleed
  - Fill: Forest Green
  - Opacity: 100%

Title Text:
  - Font: Crimson Text Bold, 72pt
  - Color: Cream
  - Content: "ALTERED.EARTH"
  - Position: Vertical center, slightly above center

Subtitle:
  - Font: Crimson Text Regular, 36pt
  - Color: Off-White
  - Content: "JOURNIZINE VOL. 1"
  - Position: Below title, 1" spacing

Tagline:
  - Font: Crimson Text Italic, 18pt
  - Color: Sage
  - Content: "Where Your Shadow Meets the Light"
  - Position: Below subtitle, 0.5" spacing

Firefly Illustration Placeholder:
  - Position: Center top, 2" from top edge
  - Size: 3" × 3"
  - Fill: Amber (for placement, will be replaced with actual illustration)

Footer:
  - Font: Crimson Text Regular, 14pt
  - Color: Amber
  - Content: "BASEops | Dr. Erica L. Tartt"
  - Position: Bottom center, 1" from bottom
```

**Step 2.2: Title Page (Page ii)**
```
Master: None (override)
Background: Off-White

Title:
  - Font: Crimson Text Bold, 60pt
  - Color: Terracotta
  - Content: "Feelings Unplugged"
  - Position: 3" from top, centered

Subtitle:
  - Font: Crimson Text Italic, 24pt
  - Color: Forest Green
  - Content: "A journal + magazine for teens who feel everything"
  - Position: Below title, 0.5" spacing

Firefly Icons:
  - Three small amber circles (0.3" diameter each)
  - Positioned in a row, 0.5" spacing between
  - Position: Center, 1.5" below subtitle
```

**Step 2.3: Table of Contents (Pages iii-vi)**
```
Master: A-Master
Layout → Table of Contents
Include Paragraph Styles:
  - Heading-Chapter
  - Heading-Section
Style: TOC-Entry (create new style)
  - Font: Crimson Text Regular, 11pt
  - Leading: 16pt
  - Tab Leaders: Dotted line to page number
Between Entry and Number: ^t (tab)
Columns: 2
```

### Phase 3: Content Import Strategy

**For Articles (Educational Content):**

```markdown
1. Place all article text in sequence
2. Apply "Body-Article" paragraph style as base
3. Override specific lines with "Heading-Section" or "Heading-Subsection" as needed
4. Insert fact boxes using Object Style "Fact-Box"
5. Add pull quotes using "Pull-Quote" paragraph style
6. Place images/diagrams with 0.2" text wrap
7. Verify 30% white space minimum on each page
```

**For Daily Journal Pages (Days 1-30):**

```markdown
1. Apply C-Master to all daily journal spreads
2. Copy and paste content from Day 1 template
3. Change only the day number for each subsequent day
4. Maintain exact same layout for predictability
5. Insert emoji characters where specified
6. Use "Prompt-Question" style for all questions
7. Use "Prompt-Line" style for all fill-in-the-blanks
8. Insert body outline graphic on midday section
9. Apply "Doodle-Box" object style to doodle space
```

**For Playlist Templates:**

```markdown
1. Apply D-Master to all playlist pages (97-102)
2. Insert playlist-specific header (Mad, Sad, etc.)
3. Color-code header based on emotion:
   - Mad: Terracotta
   - Sad: Sage
   - Happy: Amber
   - Calm: Forest Green
   - Hyped: Terracotta
4. Number all 10 lines
5. Apply "Prompt-Line" style to create dashed lines
6. Insert cassette tape or vinyl record icon (2" × 2")
7. Add mood-appropriate emoji in header
```

**For Archetype Deep Dives:**

```markdown
1. Apply E-Master to archetype pages
2. Insert full-page archetype illustration (placeholder for now)
3. Apply color coding to archetype name:
   - Catalyst: Terracotta
   - Luminary: Amber
   - Guardian: Forest Green
   - Maverick: Sage
   - Weaver: Amber
4. Use "Body-Article" for descriptions
5. Use "Prompt-Question" for reflection questions
6. Create affirmation box with Object Style "Fact-Box" but colored with archetype color
```

### Phase 4: Visual Hierarchy & Accessibility

**Critical Design Principles to Apply Throughout:**

1. **White Space Management**
   - Measure each page: (Empty space ÷ Total space) ≥ 30%
   - If below 30%, remove content or increase spacing
   - Never sacrifice white space for more content

2. **Visual Breaks**
   - Insert image, diagram, or fact box every 2 pages minimum
   - Use pull quotes to break up long text blocks
   - Alternate text density: dense page → light page → dense page

3. **Typography Hierarchy**
   - Maximum 3 font sizes per page
   - Headings always in color (Terracotta, Forest Green, or Amber)
   - Body text always in Black (never gray)
   - Questions always in Terracotta

4. **Color Usage**
   - Use color for wayfinding (emotions, archetypes, prompts)
   - Never use color on color (e.g., terracotta text on amber background)
   - Validation text always in Sage
   - Pull quotes always in Amber

5. **Consistency**
   - Daily journal pages: EXACT same layout all 30 days
   - Playlist templates: EXACT same structure all 5
   - Only change: content and color coding

### Phase 5: Quality Control Checklist

Before exporting to PDF, verify:

**Document-Wide Checks:**
- [ ] All 120 pages are present
- [ ] Page numbers are consecutive (except front matter)
- [ ] All master pages applied correctly
- [ ] No overset text (red + symbols)
- [ ] All images are linked (not embedded) and at 300 dpi minimum
- [ ] Fonts are embedded correctly (check File → Package)

**Style Consistency:**
- [ ] All headings use paragraph styles (no local overrides)
- [ ] All body text uses "Body-Article" or "Body-List"
- [ ] All prompts use "Prompt-Question"
- [ ] All fill-in-the-blanks use "Prompt-Line"
- [ ] All validation text uses "Validation-Text"

**Color Accuracy:**
- [ ] All colors are CMYK (not RGB)
- [ ] Named swatches used (not unnamed colors)
- [ ] Terracotta used for: prompts, Catalyst archetype, chapter headings
- [ ] Forest Green used for: section headings, Guardian archetype
- [ ] Amber used for: pull quotes, Luminary archetype, Weaver archetype
- [ ] Sage used for: validation text, Maverick archetype, footers

**Layout Quality:**
- [ ] Minimum 30% white space on every page
- [ ] No widows (single lines at top of column)
- [ ] No orphans (single lines at bottom of column)
- [ ] Margins respected on all pages
- [ ] Binding offset applied correctly (extra space on inside margin)

**Content Accuracy:**
- [ ] Articles match provided content exactly
- [ ] Daily journal pages numbered correctly (Days 1-30)
- [ ] Playlist templates in correct order (Mad, Sad, Happy, Calm, Hyped)
- [ ] Crisis resources accurate and complete
- [ ] No placeholder text remaining

### Phase 6: Export to PDF

**Export Settings:**

```
File → Export → Adobe PDF (Print)

General:
  - Pages: All
  - Spreads: ✓ Checked (to see how pages look together)
  - View PDF after Exporting: ✓ Checked

Compression:
  - Color Images: 
    - Downsample: Bicubic Downsampling to 300 ppi
    - Compression: Automatic (JPEG), Quality: High
  - Grayscale Images: Same as above
  - Monochrome Images: 
    - Downsample: Bicubic Downsampling to 1200 ppi
    - Compression: CCITT Group 4

Marks and Bleeds:
  - All Printer's Marks: ✓ Checked (for printer reference)
  - Use Document Bleed Settings: ✓ Checked
  - Bleed: 0.125" all sides

Output:
  - Color Conversion: Convert to Destination (CMYK)
  - Destination: U.S. Web Coated (SWOP) v2 OR custom printer profile
  - Profile Inclusion Policy: Include All RGB and Tagged Source CMYK Profiles

Advanced:
  - Fonts: Subset fonts when percent of characters used is less than: 100%
  - Transparency Flattener Preset: [High Resolution]
```

**Final PDF Deliverables:**

Generate TWO PDF versions:

1. **altered-earth-vol1-PRINT.pdf**
   - Spreads: ON
   - Bleeds: ON
   - Printer's marks: ON
   - For: Printer submission

2. **altered-earth-vol1-DIGITAL.pdf**
   - Spreads: OFF (single pages)
   - Bleeds: OFF
   - Printer's marks: OFF
   - For: Digital distribution, review, approval

---

## PART 8: CONTENT SOURCES & IMPORT INSTRUCTIONS

### Available Content Files

**From Client:**

1. **Teen-Journal-Feelings-Unplugged.pdf**
   - Source: Existing 30-page journal
   - Extract: Prompts, archetype descriptions, shadow work questions
   - Do NOT copy layout exactly (reading level too high)
   - Simplify all language to 4th grade level

2. **article-playlist-as-medicine.md**
   - Source: Complete 6-page article
   - Use: Pages 91-96 exactly as provided
   - Already at 4th grade reading level
   - Already formatted with sections

3. **FEELINGS-UNPLUGGED-CONTENT-PLAN.md**
   - Source: Complete strategic plan
   - Use: Reference for structure, flow, and article topics
   - Contains: Simplified language examples, design notes, full page map

### Content That Needs Writing

The following articles need to be created at 4th grade reading level:

1. **Welcome Letter (2 pages)**
   - Voice: Dr. Erica L. Tartt, warm and affirming
   - Tone: "You belong here, your feelings matter"
   - Key message: What this journal is/isn't, how to use it

2. **Your Brain Is Changing (6 pages)**
   - Topic: Adolescent brain development simplified
   - Include: Brain diagram, emotion vs. logic centers
   - Key message: "Big feelings are normal, you're not broken"

3. **Meet the Academy (8 pages)**
   - Topic: 5 archetypes + quiz
   - Format: 1 page per archetype + 2-page quiz + 1 intro page
   - Include: Icons, color coding, personality descriptions

4. **Shadow Work for Beginners (6 pages)**
   - Topic: What shadows are, why we have them, how to work with them
   - Include: Examples for each archetype
   - Key message: "Your shadow helped you survive"

5. **When Journaling Isn't Enough (4 pages)**
   - Topic: When to seek professional help
   - Include: Warning signs, therapy explanation, resources
   - Key message: "You deserve help, asking is strength"

**4th Grade Writing Guidelines:**

- Sentence length: 10-15 words maximum
- Vocabulary: Common 4,000 English words only
- Active voice: "You feel" not "Emotions are felt"
- Concrete examples: "Like when your friend ignores you"
- Visual supports: Emoji, icons, diagrams on every page

**Reading Level Check:**
- Use Hemingway Editor (aim for Grade 4-6)
- Or Flesch-Kincaid Grade Level: 4.0-5.0 target

### Text Import Workflow

**For Markdown Files:**

```
File → Place (Cmd/Ctrl + D)
Select: article-playlist-as-medicine.md
Show Import Options: ✓ Checked

Import Options:
  - Remove Formatting: Unchecked
  - Convert Quotes: "Typographer's Quotes"
  - Import Inline Graphics: Checked

After Import:
  1. Apply "Body-Article" to all paragraphs
  2. Find headings (look for # or ##)
  3. Apply "Heading-Section" or "Heading-Subsection"
  4. Find bullet lists, apply "Body-List"
  5. Find emphasis (*text*), apply "Italic-Emphasis"
  6. Find strong (**text**), apply "Bold-Emphasis"
```

**For PDF Files (Existing Journal Content):**

```
DO NOT Place PDF directly (layout is wrong)
INSTEAD:
  1. Copy text sections manually
  2. Paste into InDesign text frames
  3. Simplify language to 4th grade reading level
  4. Reformat using paragraph styles
  5. Extract only prompts, not full pages
```

---

## PART 9: AUTOMATION OPPORTUNITIES

### Using InDesign MCP for Efficiency

**Suggested Automation Scripts:**

1. **Apply Master Pages to Page Ranges**
```javascript
// Apply C-Master (Daily Journal) to pages 21-90
var doc = app.activeDocument;
var dailyJournalMaster = doc.masterSpreads.item("C-Master");

for (var i = 20; i < 90; i++) {
  doc.pages.item(i).appliedMaster = dailyJournalMaster;
}
```

2. **Batch Apply Paragraph Styles**
```javascript
// Find all lines starting with "•" and apply Body-List
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "^• .+";
app.changeGrepPreferences.appliedParagraphStyle = "Body-List";

app.activeDocument.changeGrep();
```

3. **Create Dashed Lines for Prompts**
```javascript
// Add dashed underline to any line ending with "___"
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "___+$";
app.changeGrepPreferences.underline = true;
app.changeGrepPreferences.underlineColor = "Terracotta";

app.activeDocument.changeGrep();
```

4. **Generate Sequential Day Numbers**
```javascript
// Update "Day ___" to "Day 1", "Day 2", etc. on pages 21-90
var doc = app.activeDocument;
var dayCounter = 1;

for (var i = 20; i < 90; i += 2) { // Every 2 pages = 1 day
  var textFrames = doc.pages.item(i).textFrames;
  for (var j = 0; j < textFrames.length; j++) {
    if (textFrames[j].contents.match(/Day ___/)) {
      textFrames[j].contents = textFrames[j].contents.replace("Day ___", "Day " + dayCounter);
    }
  }
  dayCounter++;
}
```

5. **Color-Code Archetype Pages**
```javascript
// Apply archetype-specific colors to header text
var archetypeColors = {
  "Catalyst": "Terracotta",
  "Luminary": "Amber",
  "Guardian": "Forest Green",
  "Maverick": "Sage",
  "Weaver": "Amber"
};

var archetypePages = [37, 51, 65, 79, 93];
var archetypeNames = ["Catalyst", "Luminary", "Guardian", "Maverick", "Weaver"];

for (var i = 0; i < archetypePages.length; i++) {
  var page = app.activeDocument.pages.item(archetypePages[i] - 1); // 0-indexed
  var archetype = archetypeNames[i];
  var color = archetypeColors[archetype];
  
  // Find text frame with archetype name and color it
  for (var j = 0; j < page.textFrames.length; j++) {
    if (page.textFrames[j].contents.indexOf(archetype) !== -1) {
      page.textFrames[j].texts.item(0).fillColor = app.activeDocument.colors.item(color);
    }
  }
}
```

---

## PART 10: DESIGNER NOTES & BEST PRACTICES

### Cognitive Load Reduction Strategies (Critical!)

**Why This Matters:**
The entire design strategy is built around reducing cognitive load for adolescents who may be experiencing executive dysfunction, ADHD, anxiety, or emotional overwhelm.

**How to Implement:**

1. **Predictable Structure**
   - Daily journal pages: SAME layout every single day
   - Change: Only the date number
   - Why: Reduces decision-making, creates safety

2. **Visual Hierarchy**
   - One clear entry point per page (where eyes land first)
   - Maximum 3 font sizes per page
   - Color = category (terracotta = prompts, sage = validation, etc.)

3. **Decision Reduction**
   - Fill-in-the-blank > Open-ended writing
   - Multiple choice > "Describe how you feel"
   - Emoji check-ins > "Rate your mood 1-10 and explain why"

4. **Rhythm = Regulation**
   - Read (learn) → Write (practice) → Create (rest)
   - Never more than 6 pages of reading without interaction
   - Visual breaks every 2-3 pages

5. **Validation Language**
   - After every hard question: "This is normal"
   - Always in Sage color (soft, supportive)
   - Never preachy, always affirming

### Cultural Competency in Design

**Design Choices That Matter:**

1. **Color Palette**
   - Terracotta, Forest Green, Amber: Warm, earthy, grounded
   - NOT: Bright blues, clinical whites, cold grays
   - Why: Culturally associated with healing, nature, safety

2. **Imagery** (When Sourcing)
   - Diverse representation (BIPOC, LGBTQ+, various body types)
   - Authentic, unposed photography (not stock photo smiles)
   - Nature imagery: Forests, fireflies, earth tones

3. **Language Tone**
   - Never: "Fix yourself," "Just be positive," "You should..."
   - Always: "You're allowed to feel this," "It's okay," "You're not broken"

4. **Crisis Resources**
   - Culturally specific hotlines (BlackLine, Trevor Project)
   - NOT hidden in back (integrated throughout)
   - Large, clear, accessible

### Common Mistakes to Avoid

❌ **Don't:**
- Justify text (creates uneven spacing, harder to read)
- Use light gray text (always black for body copy)
- Cram content to "fit everything in" (white space is content)
- Make daily journal pages look different (consistency = safety)
- Use clinical or academic language (4th grade level required)
- Hide crisis resources (make them easy to find)
- Use bright, saturated colors (too stimulating for regulation)

✅ **Do:**
- Left-align all body text
- Use pure black (K100) for body text
- Embrace white space (30% minimum per page)
- Repeat daily journal template exactly
- Simplify, simplify, simplify language
- Integrate crisis info throughout document
- Use warm, earthy, muted color palette

---

## PART 11: MILESTONE DELIVERABLES

### Checkpoint Reviews (Submit to Client)

**Milestone 1: Structure Setup (Week 1)**
Deliverable: InDesign file with:
- All color swatches created
- All paragraph/character/object styles defined
- All 5 master pages created
- First 10 pages laid out (cover through brain article)
- PDF proof for review

**Milestone 2: Content Import (Week 2)**
Deliverable: InDesign file with:
- All articles placed and formatted
- Daily journal template finalized (Days 1-3)
- Playlist template finalized (1 example)
- Archetype template finalized (1 example)
- PDF proof for review (selected spreads)

**Milestone 3: Complete Layout (Week 3)**
Deliverable: InDesign file with:
- All 120 pages complete
- All content placed
- All images placed (or placeholders)
- Quality control checklist completed
- Full PDF proof for review

**Milestone 4: Final Production (Week 4)**
Deliverable:
- Packaged InDesign file (with fonts, links, images)
- altered-earth-vol1-PRINT.pdf (with bleeds, marks)
- altered-earth-vol1-DIGITAL.pdf (no bleeds, single pages)
- README.txt with printing specifications

---

## PART 12: PRINTING SPECIFICATIONS

### For Print Vendor

**Trim Size:** 8.5" × 11"  
**Page Count:** 120 pages  
**Binding:** Spiral bound (wire-o or coil)  
**Paper Stock:**  
- Interior: 70lb uncoated text, warm cream color (NOT bright white)
- Cover: 100lb cover stock, matte laminate finish

**Color:**  
- Interior: Full color (CMYK) throughout  
- Cover: Full color (CMYK), spot UV on title/firefly elements

**Finishing:**
- Spiral binding to lay flat for journaling
- Rounded corners (optional, 3mm radius)
- Spot UV on cover title and firefly illustration

**Bleed:** 0.125" all sides  
**Print-Ready File:** altered-earth-vol1-PRINT.pdf  
**Color Profile:** U.S. Web Coated (SWOP) v2 or printer's custom profile

---

## SUMMARY: AGENT EXECUTION CHECKLIST

When implementing this project, follow this sequence:

### Pre-Flight (Before Starting)
- [ ] Review complete 120-page content map (Part 6)
- [ ] Confirm all source files available
- [ ] Install Crimson Text font family
- [ ] Set up InDesign workspace for long documents

### Phase 1: Foundation (Days 1-2)
- [ ] Create new 120-page InDesign document
- [ ] Set up all color swatches (7 colors)
- [ ] Create all paragraph styles (11 styles)
- [ ] Create all character styles (5 styles)
- [ ] Create all object styles (4 styles)
- [ ] Create all master pages (5 masters)

### Phase 2: Front Matter (Day 3)
- [ ] Design cover page (page i)
- [ ] Design title page (page ii)
- [ ] Generate table of contents (pages iii-vi)

### Phase 3: Foundation Content (Days 4-5)
- [ ] Create Welcome Letter (pages 1-2)
- [ ] Create How to Use (pages 3-4)
- [ ] Import/create Brain Article (pages 5-10)
- [ ] Create Body Check-In (pages 11-12)
- [ ] Import/create Academy Article (pages 13-20)

### Phase 4: Templates (Days 6-7)
- [ ] Finalize Daily Journal template (apply to pages 21-24)
- [ ] Finalize Playlist template (apply to pages 97-102)
- [ ] Finalize Archetype Deep Dive template (apply to archetype pages)

### Phase 5: Bulk Content (Days 8-10)
- [ ] Apply Daily Journal template to pages 31-90
- [ ] Update day numbers sequentially (Days 3-30)
- [ ] Import Playlist Article (pages 91-96)
- [ ] Import/create Shadow Work Article (pages 25-28)
- [ ] Import/create Crisis Article (pages 103-106)

### Phase 6: Final Pages (Day 11)
- [ ] Create Resource Guide (pages 107-108)
- [ ] Create Weekly Reflection templates (pages 109-116)
- [ ] Create Celebration closing (pages 117-118)
- [ ] Create final resources page (page 119)
- [ ] Design back cover (page 120)

### Phase 7: Quality Control (Day 12)
- [ ] Run complete QC checklist (Part 5, Phase 5)
- [ ] Fix any overset text
- [ ] Verify all styles applied correctly
- [ ] Check white space on every page (30% minimum)
- [ ] Preflight document for errors

### Phase 8: Export & Package (Day 13)
- [ ] Export altered-earth-vol1-PRINT.pdf
- [ ] Export altered-earth-vol1-DIGITAL.pdf
- [ ] Package InDesign file
- [ ] Create README with specs
- [ ] Deliver to client

---

## FINAL NOTES FOR AGENT

**This is a mental health tool for teens.**  
Every design choice matters for accessibility and emotional safety.

**Priorities (in order):**
1. Reduce cognitive load (white space, predictability, simple language)
2. Cultural competency (warm colors, affirming language, diverse representation)
3. Visual hierarchy (clear entry points, wayfinding, color coding)
4. Print quality (300 dpi images, CMYK colors, proper bleeds)

**When in doubt:**
- More white space > more content
- Simpler language > precise terminology
- Warmer tone > professional detachment
- Accessibility > aesthetic perfection

**You are not just designing a journal. You are creating a safe space for adolescents to process big emotions. Honor that responsibility.**

---

END OF INDESIGN MCP AGENT PROMPT

**Document Version:** 1.0  
**Last Updated:** November 8, 2025  
**Created by:** Dr. Erica L. Tartt / Claude (Anthropic)  
**For:** Altered.Earth Journizine Vol. 1 Implementation
