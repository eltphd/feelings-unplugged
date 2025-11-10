# UI & UX Review — November 10, 2025

## Scope
- Marketing landing pages (`marketing/index.html`, `marketing/teen-journal.html`, `marketing/parent-guide.html`, `marketing/educator-toolkit.html`)
- Web app routes under `app.feelingsunplugged.space`
- Focus on mobile responsiveness, clarity, and friction points (not full accessibility audit)

## Marketing Site Findings

| Area | Current State | Recommendation |
| --- | --- | --- |
| Hero copy density | Rich narrative copy but heavy on mobile | Trim body paragraphs to ~2 sentences each; add collapsible sections for details. |
| CTA clarity | Buttons such as “Join Atlas Beta” lack context | Add subtext clarifying the outcome (e.g., “Sign up for email waitlist”). |
| Navigation | No persistent nav/header | Add top-level nav linking to app, teen/parent/educator pages, contact. |
| Analytics | Cloudflare Web Analytics snippet added; token placeholder | Replace `YOUR-CF-BEACON-TOKEN` with production token and configure Cloudflare dashboard. |
| Footer | Static attribution only | Extend with contact email, social links, privacy policy placeholder. |

## App Route Review

### `/` Home
- **Strengths:** Strong theming, clear segmentation of widgets, DaisyUI layout intact.
- **Issues:** On mobile, hero block pushes quick actions below the fold.  
- **Actions:** Introduce condensed intro on small screens; move primary action (“Check in now”) above fold.

### `/emotions`
- **Strengths:** Emotion cards accessible, slider persisted, no blocking modals.
- **Issues:** Lack of explicit confirmation when entry saved; slider optional but UI implies required.  
- **Actions:** Add toast confirmation and helper text (“Intensity optional”). Consider haptic feedback on mobile.

### `/timeline`
- **Strengths:** Visual timeline and stats provide quick insight.  
- **Issues:** Stats hidden below fold on mobile; chart tooltips depend on hover.  
- **Actions:** Surface streak/most felt stats above chart; add tap-friendly data labels.

### `/prompts-feelings`
- **Strengths:** Dynamic import with skeleton, consistent styling.  
- **Issues:** Carousel UX clunky on mobile (horizontal scroll, small controls); no overview of categories; long descriptive copy.  
- **Actions:** Provide alternative layout (grid/list toggle), add progress indicator (“Prompt X of Y”), simplify instructions, ensure back navigation returns to carousel state.

### `/settings`
- **Strengths:** Clear sections and callouts.  
- **Issues:** Export/delete actions need stronger affordances; limited explanation of local storage.  
- **Actions:** Add inline copy clarifying local storage vs future cloud backup; style destructive actions with danger theme; add confirmation dialog.

## Mobile Responsiveness Checklist
- [x] Layout scales to ≤320px width (checked via Lighthouse emulation).
- [ ] Interactive elements >48px (carousel buttons currently ~40px).  
- [ ] Avoid horizontal scroll without indicator (carousel relies on hidden scroll).  
- [ ] Provide skip links/landmarks (DaisyUI layout supports, but confirm with accessibility audit).

## Immediate UX Backlog
1. Redesign prompts carousel for mobile-first usability.  
2. Add success/failure feedback to emotion check-in and settings actions.  
3. Implement responsive copy tweaks (shorten hero, CTA descriptions on marketing pages).  
4. Provide high-level nav + contact info across marketing site.  
5. Schedule accessibility review (ARIA labels, keyboard navigation) before institutional pilots.

