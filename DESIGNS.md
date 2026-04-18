# A1 Lab Design System

Reference for all visual decisions, tokens, and patterns used across the site.
Style: **Neo-brutalism** — bold borders, hard shadows, flat backgrounds, no border-radius.

---

## Color Palette

### Backgrounds
| Token | Value | Usage |
|---|---|---|
| `--color-bg-base` | `#fffdf9` | Page background, warm off-white |
| `--color-bg-strong` | `#ffffff` | Cards, form shells, elevated surfaces |
| `--color-bg-surface` | `#f5f0eb` | Alternate sections, badges, proof panels |
| `--color-bg-surface-alt` | `#f0eae3` | Subtle surface variant |
| `--color-bg-preloader` | `#fffdf9` | Preloader screen |
| `--color-bg-nav` | `#fffdf9` | Navigation bar |

### Text
| Token | Value | Usage |
|---|---|---|
| `--color-text-body` | `#3d3d3d` | Body copy, paragraphs |
| `--color-text-heading` | `#1a1a1a` | Headings, nav links, strong labels |
| `--color-text-strong` | `#000000` | Buttons, hero text, maximum contrast |
| `--color-text-inverse` | `#ffffff` | Text on dark/accent backgrounds |
| `--color-text-subtle` | `#737373` | Placeholders |
| `--color-text-muted` | `#595959` | Secondary info, captions, metadata |

### Accents
| Token | Value | Usage |
|---|---|---|
| `--color-accent-primary` | `#e87a00` | Orange — CTAs, highlights, icons, selection |
| `--color-accent-primary-hover` | `#c66800` | Darker orange on hover |
| `--color-accent-secondary` | `#001f3d` | Dark navy — success messages, `.color` class |
| `--color-focus-ring` | `#e87a00` | Focus outlines (matches primary) |
| `--color-error` | `#d8000c` | Error text |
| `--color-error-bg` | `#ffbaba` | Error background |

### Borders
| Token | Value | Usage |
|---|---|---|
| `--color-border-subtle` | `#e0e0e0` | Dividers, HR, capability lists |
| `--color-border-medium` | `#1a1a1a` | Primary borders (cards, nav, buttons) |
| `--color-border-soft` | `#d0d0d0` | Lighter structural borders |

### Overlays
| Token | Value | Usage |
|---|---|---|
| `--color-overlay-soft` | `rgba(0,0,0,0.04)` | `.overly` sections |
| `--color-overlay-hero` | `rgba(0,0,0,0.03)` | Hero area overlay |
| `--color-overlay-dark` | `rgba(0,0,0,0.05)` | Darker overlay variant |

---

## Typography

### Fonts
| Token | Value | Usage |
|---|---|---|
| `--font-display` | `"Space Grotesk", sans-serif` | Body default (`body` element) |
| `--font-body` | `"Inter", sans-serif` | Headings (h1-h6), paragraphs, form labels |

Loaded from Google Fonts: `Space+Grotesk:wght@400;500;600;700` and `Inter:wght@400;500;600;700`.

### Heading Sizes
| Element | Size | Weight | Extra |
|---|---|---|---|
| Hero `h1` | `clamp(1.75rem, 4.5vw, 2.75rem)` | 800 | `line-height: 1.2` |
| Section title `h2` | `38px` | 800 | `letter-spacing: -0.04em`, `text-transform: capitalize` |
| CTA `h2` | `clamp(2.4rem, 5vw, 4.5rem)` | 800 | `line-height: 0.96`, `letter-spacing: -0.05em` |
| Contact `h2` | `clamp(2.2rem, 4.2vw, 3.5rem)` | — | `line-height: 0.98`, `letter-spacing: -0.05em` |
| Projects page `h1` | `clamp(3rem, 7vw, 5.6rem)` | — | `line-height: 0.92`, `letter-spacing: -0.06em` |

### Body Sizes
| Context | Size | Weight | Line Height |
|---|---|---|---|
| Hero description | `clamp(1rem, 1.5vw, 1.15rem)` | — | `1.6` |
| Service card body | inherits `--font-body` | — | — |
| FAQ answer | inherits | — | `1.7` |
| Blog excerpt blockquote | `16px` | — | `22px` |
| Eyebrow labels | `0.73rem – 0.76rem` | 700 | — |
| Capability list items | `0.93rem` | — | `1.55` |
| Deliverable list items | `0.85rem` | — | `1.5` |

### Text Selection
Orange background (`--color-accent-primary`) with white text (`--color-text-inverse`).

---

## Borders

**Core rule:** All borders are `3px solid #1a1a1a` (via `--border-brutal`). No rounded corners anywhere — `border-radius: 0` is used universally.

| Token | Value | Usage |
|---|---|---|
| `--border-brutal` | `3px solid #1a1a1a` | Cards, buttons, inputs, nav, footer, images |

### Special Border Patterns
- **Nav bottom:** `border-bottom: 3px solid var(--color-border-medium)`
- **Hero bottom:** `border-bottom: 3px solid var(--color-border-medium)`
- **Project card left accent:** `border-left: 6px solid var(--color-accent-primary)`
- **Proof panel left accent:** `border-left: 4px solid var(--color-accent-primary)`
- **Contact response note:** `border-left: 3px solid var(--color-accent-primary)`
- **Section divider (`.border-meghna`):** `border-top: 3px solid` with a `50px` orange accent bar centered
- **Sub-title:** `border-left: 3px solid` + `border-right: 3px solid` on inline block
- **Capability/deliverable list tops:** `border-top: 2px solid var(--color-border-subtle)`
- **Duration/label badges:** `border: 2px solid var(--color-border-medium)`
- **HR:** `border-top: 2px solid var(--color-border-subtle)`

---

## Shadows

Three-tier shadow system for the neo-brutalism offset effect:

| Token | Value | State |
|---|---|---|
| `--shadow-brutal` | `4px 4px 0 #1a1a1a` | Default / resting |
| `--shadow-brutal-hover` | `6px 6px 0 #1a1a1a` | Hover (element lifts) |
| `--shadow-brutal-active` | `2px 2px 0 #1a1a1a` | Active / pressed (element sinks) |

### Interaction Pattern
```
Resting:   transform: none;           box-shadow: 4px 4px 0
Hover:     transform: translate(-2px, -2px);  box-shadow: 6px 6px 0
Active:    transform: translate(2px, 2px);    box-shadow: 2px 2px 0
```

Applied to: buttons, cards (`.service-block`, `.about .block`, `.post-block`), social icons, form shells, hero eyebrow, proof list items, counter items, contact info cards.

---

## Spacing

### Section Padding
| Token | Value | Usage |
|---|---|---|
| `--space-section-lg` | `100px` | Default `.section` padding (top & bottom) |
| `--space-section-md` | `80px` | Tablet (`max-width: 768px`) |
| `--space-section-sm` | `50px` | Mobile (`max-width: 480px`) |

### Other Spacing
| Class / Context | Value |
|---|---|
| `.section-sm` | `padding: 70px 0` |
| `.section-xs` | `padding: 50px 0` |
| `.title` (section headers) | `padding-bottom: 60px` |
| `.sub-title` | `padding: 0 0 50px` |
| `.mb-50` | `margin-bottom: 50px` |
| `.mt-20` | `margin-top: 20px` |
| Hero padding | `clamp(100px, 14vh, 180px) 24px clamp(48px, 8vh, 108px)` |
| CTA panel padding | `clamp(32px, 5vw, 54px)` |
| Contact form shell | `clamp(24px, 4vw, 38px)` |
| Card padding (`.service-block`) | `40px 30px` (custom.css) or `60px 20px` (style.css base) |
| About block padding | `30px` |
| FAQ question padding | `20px 24px` |
| FAQ answer padding | `16px 24px 20px` |
| Scroll margin (all sections) | `clamp(72px, 9vh, 94px)` |
| Footer shell padding | `46px 0 28px` |

### Gaps
| Context | Value |
|---|---|
| Hero CTAs | `16px` |
| Hero proof list items | `0.85rem` |
| Credibility badges | `12px` |
| CTA panel grid | `clamp(28px, 5vw, 64px)` |
| Projects page list | `28px` |
| Projects page item columns | `24px` |
| Footer nav columns | `48px` |
| Footer social icons | `10px` |
| Contact details grid | `14px` |

---

## Radius

```
--radius-sm: 0px
```

**Everything is square.** `border-radius: 0` is enforced across all components — buttons, inputs, cards, images, badges, avatars, progress bars, pagination dots, icons, portfolio blocks.

---

## Buttons

### Primary (`.btn-main`)
- Background: `--color-accent-primary` (orange `#e87a00`)
- Text: `--color-text-strong` (black `#000000`)
- Border: `--border-brutal` (3px solid black)
- Shadow: `--shadow-brutal`
- Font: `14px`, weight `700`, `letter-spacing: 1px`, `text-transform: uppercase`
- Padding: `10px 35px` (default), `18px 46px` (hero), `16px 45px` (CTA), `8px 22px` (service card)

### Ghost (`.btn-ghost`, `.btn-transparent`)
- Background: `--color-bg-strong` (white)
- Text: `--color-text-strong` (black)
- Border: `--border-brutal`
- Shadow: `--shadow-brutal`
- Same hover/active interaction as primary

### Key Decision
**Button text is always black**, never white — even on the orange background. This was an explicit design choice.

---

## Cards

All cards share: `border: var(--border-brutal)`, `background: var(--color-bg-strong)`, `box-shadow: var(--shadow-brutal)`, hover lift effect.

| Card Type | Extra Traits |
|---|---|
| `.service-block` | Centered icon, `40px 30px` padding, corner triangle (orange 22% opacity) on `.service-card` variant |
| `.about .block` | Hexagonal icon box with borders, `30px` padding |
| `.project-card` | Left accent border (6px orange), label badge, left-aligned |
| `.expertise-card` | Standard brutal border, no accent |
| `.post-block` | Image top, `20px` content padding, post-meta bar below |
| `.note` | Same as post-block, image has bottom border separator |
| `.contact-details .con-info` | Flex row, icon + text, `18px 20px` padding |

---

## Decorative Patterns

### Section Watermarks
Large ghost text behind sections — `rgba(0,0,0,0.04)`, weight `900`, `clamp(3.5rem, 14vw, 9rem)`:
- `#about` → "FOCUS"
- `#services` → "PROCESS"
- `#projects` → "CASES"
- `#team` → "STACK"
- `#faq` → "FAQ"

Hidden on mobile (`max-width: 575px`).

### Hero Dot Grid
```css
background: radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px);
background-size: 20px 20px;
```

### CTA Grid Pattern
Repeating vertical and horizontal lines at `rgba(0,0,0,0.03)`, 28px spacing.

### Corner Triangles
Service cards and CTA panels use `linear-gradient(135deg, transparent 50%, rgba(232,122,0,0.22) 50%)` — 74px or 120px.

### Section Title Underline
`h2 span::after` — 0.28em height bar of `rgba(232,122,0,0.22)` under the accent word.

### List Markers
- Capability lists: `"—"` prefix in orange
- Deliverable lists: `">"` prefix in orange
- Proof lists: `">"` prefix in orange, weight 900
- Hero proof: `">"` prefix in orange

---

## Forms

- Background: `--color-bg-strong` (white)
- Border: `--border-brutal` (3px solid black)
- Border-radius: `0`
- Focus: `border-color: --color-accent-primary`, `box-shadow: --shadow-brutal`
- Hover: `border-color: --color-accent-primary`
- Placeholder: `--color-text-subtle` (#737373)
- Labels: `14px`, weight `600`, `--color-text-heading`
- Submit button: Full-width, orange background, black text, brutal border + shadow
- Select dropdown: Custom caret SVG, no native appearance

---

## Navigation

- Background: `--color-bg-nav` (`#fffdf9`)
- Bottom border: `3px solid var(--color-border-medium)`
- Active link: `--color-accent-primary`
- Nav links: `--font-body` (Inter), weight 500, uppercase
- Logo: top margin `10px`

---

## Footer

Three-column grid: brand | nav | social icons.

- Bottom border: `3px solid var(--color-border-medium)`
- Social icons: `58px x 58px` squares, brutal border + shadow, orange bg on hover
- Nav links: `0.82rem`, weight 700, `letter-spacing: 0.14em`, uppercase
- Copyright: `0.85rem`, `--color-text-muted`

---

## Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| `max-width: 575px` | Mobile — hide watermarks, simplify grids, stack layouts |
| `max-width: 768px` | Tablet — reduce section padding to 80px, stack CTA panel, footer to single column |
| `max-width: 991px` | Small desktop — stack project intro grid |
| `min-width: 1440px` | Large screens — `zoom: 1.1` |
| `min-width: 1800px` | `zoom: 1.15` |
| `min-width: 2200px` | `zoom: 1.3` |
| `min-width: 2800px` | `zoom: 1.5` |
| `min-width: 3400px` | `zoom: 1.75` |

Also: `prefers-reduced-motion: reduce` disables all transitions and animations.

---

## Accessibility

- Focus rings: `2px solid var(--color-focus-ring)`, `outline-offset: 2px`
- Skip-to-content link: visible on focus, orange bg, brutal border
- `.sr-only`: standard screen-reader-only utility
- Reduced motion: all transitions set to `0s`, animations `none`
- Scroll behavior: `smooth` (opted out with reduced motion)
- Min touch target: `44px` on proof list items
