# Lab Steps Timeline Animation Design

**Date:** 2026-04-14
**Status:** Draft
**Author:** cscheer

## Overview

Replace the static image in the Lab Steps section (feature.html) with a CSS-animated horizontal timeline that visualizes the 4-step working process: Listen → Research → Experiment → Deliver.

## Design Decisions

### Layout
- Left side (50% width): Animated timeline illustration
- Right side (50% width): Unchanged — existing content with text + icons for each step

### Animation Approach
- **CSS Keyframe Animation** — pure CSS, no JavaScript required
- Time-based progression through 4 stop points
- Total animation duration: 10 seconds, looping infinitely
- Each stop is active for ~2.5 seconds before transitioning to the next

### Timeline Structure

```
[●]──────────[●]──────────[●]──────────[●]
Listen       Research     Experiment   Deliver
```

### Visual Design

| Element | Style |
|---------|-------|
| Track line | 3px solid #e0e0e0 (inactive), orange gradient when active |
| Stop markers | 56px circles, white fill, 3px black border, 4px brutal shadow |
| Active marker | Orange fill (#e87a00), elevated shadow |
| Labels | Space Grotesk font, 700 weight, positioned below each marker |
| Active label | Full opacity + slight scale |
| Inactive labels | 30% opacity |

### Animation Sequence

1. **0s-2.5s:** Stop 1 (Listen) active — marker fills orange, label appears
2. **2.5s-5s:** Stop 2 (Research) active — progress line extends, label appears
3. **5s-7.5s:** Stop 3 (Experiment) active — progress line extends, label appears
4. **7.5s-10s:** Stop 4 (Deliver) active — progress line extends, label appears
5. **Loop:** Animation restarts from beginning

### Icon Mapping

| Step | Icon Class | Description |
|------|------------|-------------|
| Listen | `ti-headphone` | Headphones/ear |
| Research | `ti-search` | Magnifying glass |
| Experiment | `ti-settings` | Gear/settings |
| Deliver | `ti-package` | Package/box |

### Responsive Behavior

- **Desktop (>992px):** Horizontal timeline, full layout
- **Tablet/Mobile (<992px):** Vertical timeline (stacked), left side takes full width

## Files to Modify

1. `themes/meghna/layouts/partials/feature.html` — Replace image div with timeline container
2. `themes/meghna/assets/css/custom.css` — Add timeline animation styles

## Implementation Notes

- Use existing Themify icons already loaded on the site
- Match site's CSS custom properties (--color-accent-primary, --border-brutal, etc.)
- The timeline should be self-contained and not affect the right-side content
- No JavaScript required — pure CSS animation
