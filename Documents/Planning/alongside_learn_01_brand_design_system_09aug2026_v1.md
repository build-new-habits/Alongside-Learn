# Alongside: Learn — Brand & Design System
## 09 Aug 2026 v1

Build New Habits Ltd | Confirmed spec — inherited from the shared Alongside family design system, with Learn's own colour palette layered on top. Source: `09-design-system.docx` (family system) and `alongside_learn_doc1_vision_07jun2026_v2.docx` Section 8 (Learn-specific).

---

## 1. Philosophy — applies to every Alongside product, including Learn

- **Quiet over loud.** The interface must not compete with the user's internal state. No gradients, glassmorphism, or decorative elements serving only aesthetics. Solid colours, clear hierarchy, generous whitespace.
- **Accessible by default.** WCAG 2.2 AA is the floor, not the ceiling. Every component designed first for users with motor difficulties, cognitive load sensitivities, and visual processing differences.
- **Mobile-first, always.** All layouts begin at 320px viewport width. Desktop is an addition to a working mobile experience, never the starting point.

---

## 2. Colour — shared family tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | #1B6B6B | Brand teal — headings, primary CTAs, active states, key accents |
| `--color-dark` | #0D1F1F | Primary body text, high-contrast elements |
| `--color-mid` | #2C3E3E | Secondary text, subheadings, secondary interactive elements |
| `--color-muted` | #6B8585 | Tertiary text, placeholder text |

Text on `--color-primary` backgrounds is always `#FFFFFF` — the primary teal meets AA contrast against white text. `--color-muted` is never used alone for body copy. Colour must never be the sole means of communicating information — every colour indicator must also communicate through text, shape, or icon.

**Gold accent — universal personal-tier signal:** `#B8970A` marks the paid tier across the whole product family. Used only in upgrade moments and paid onboarding — never as a general decorative colour. This gold does **not** pass AA contrast for text on a white background; for any gold text on light backgrounds, use the darker variant below instead.

---

## 3. Colour — Learn-specific palette (Athena tier)

| Token | Value and contrast | Usage |
|---|---|---|
| `--learn-primary` | #3D3D8F (deep indigo) — 7.2:1 on white, passes AA and AAA | Learn's primary brand colour, replaces `--color-primary` in Learn contexts |
| `--learn-primary-light` | #EEEEF7 | Background tint, decorative use only |
| `--learn-teal` | #0A7C8C | Shared family teal, used sparingly to keep the family connection visible |
| `--learn-gold-dark` | #8A6E07 — 4.6:1 on white | Use for **all** gold text on light backgrounds — the universal `#B8970A` fails contrast for text use |
| `--text-dark` | #1A1A2E — 17.5:1 on white | |
| `--text-mid` | #555555 — 7.0:1 on white | |
| `--text-light` | #767676 — 4.54:1 on white (AA minimum) | |
| `--surface-pale` | #F8F9FC | Card backgrounds |
| `--error` | #C0392B — 5.1:1 on white | |
| `--success` | #1E7E34 — 5.5:1 on white | |

All colour decisions must be verified against the WebAIM contrast checker before use, not assumed from the table above.

---

## 4. Typography

Font stack: Calibri (documents) / Inter (web), `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`. Minimum body text size: 16px, never smaller in the main content flow.

| Role | Size | Weight | Colour |
|---|---|---|---|
| Display / Hero | 36px | 700 | `--color-primary` (or `--learn-primary` in Learn) |
| H1 | 28px | 700 | `--color-dark` |
| H2 | 22px | 700 | `--color-dark` |
| H3 | 18px | 600 | `--color-mid` |
| Body — large | 18px | 400 | `--color-dark` |
| Body — default | 16px | 400 | `--color-dark` |
| Body — small | 14px | 400 | `--color-mid` |
| Caption / metadata | 12px | 400 | `--color-muted` |

Caption text (12px) is only for non-essential metadata — timestamps, version numbers. Never for instructions, rationale text, or anything the user needs to act on.

**Reading level:** all coach messages, instructional text, and rationale text must be written at CEFR B1 level or below — the level at which reading comprehension stays reliable when a person is stressed, fatigued, or under pressure. This is directly relevant to Learn: students under exam stress and parents under caregiving stress are exactly the "stressed, fatigued" condition this rule exists for.

---

## 5. Spacing (all values multiples of 4px)

| Token | Value | Common usage |
|---|---|---|
| `--space-1` | 4px | Tight inline spacing, icon-to-label gaps |
| `--space-2` | 8px | Default inline spacing, compact element gaps |
| `--space-3` | 12px | Compact component internal padding |
| `--space-4` | 16px | Default component padding, between-card gaps |
| `--space-5` | 24px | Section spacing, card internal padding |
| `--space-6` | 32px | Large section spacing, screen-level gaps |
| `--space-7` | 48px | Major section separators |
| `--space-8` | 64px | Screen-level padding, hero areas |

## 6. Border radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Badges, chips, small elements |
| `--radius-md` | 10px | Input fields, small buttons |
| `--radius-lg` | 12px | Cards, large buttons |
| `--radius-xl` | 16px | Modal sheets, full-width card variants |
| `--radius-full` | 9999px | Pill buttons, avatars, progress indicators |

---

## 7. Component specifications

**Buttons — Primary:** Background `--color-primary` (or `--learn-primary`). Text `#FFFFFF`, weight 600, 16px. Padding 16px 32px. Border radius 12px. Min height 52px. Full width on mobile. Hover lightens 10%; active darkens 10%; focus shows 3px primary outline at 2px offset; disabled: `#D0D0D0` background.

**Buttons — Secondary:** Transparent background. Border 2px solid `--color-primary`. Text `--color-primary`, weight 500, 16px. Padding 14px 30px (accounts for border). Border radius 12px.

**Buttons — Text / Skip:** No background, no border. Text `--color-muted`, 14px. Padding 8px 16px (maintains minimum tap target). Used for skip options — visible but not prominent.

**Cards:** Background `--color-white`. Border 1px solid `--color-border`. Border radius 12px. Padding 20px. Shadow `--shadow-sm`. The entire card area is the tap target — never just a button within it.

**Sliders:** Track height 8px. Thumb size 32×32px minimum. Thumb and filled track use the primary colour. Current value always displayed as text below the slider — colour-only encoding is never sufficient.

---

## 8. Animation and motion

| Context | Duration | Property |
|---|---|---|
| View transitions | 200ms | opacity, transform |
| Button states | 100ms | background-color |
| Card selection | 150ms | border, background |
| Slider | 0ms | Immediate — never animate value changes |
| Celebration moments | 400ms | transform, opacity |

`prefers-reduced-motion` must be respected throughout — a hard requirement, not optional. When enabled: all transitions become instant and any celebration animation is suppressed entirely.

---

## 9. Accessibility commitments — non-negotiable

- WCAG 2.2 AA is the minimum standard, not an aspirational target.
- All text: minimum 4.5:1 contrast (3:1 for large text 18pt+ or bold 14pt+).
- All interactive elements: minimum 44×44px touch target.
- Focus indicators: visible, high contrast, never removed.
- All images and icons: alt text or `aria-label` required.
- All form inputs: visible labels — no placeholder-only labelling.
- Colour is never the sole means of conveying information.
- Text can scale to 200% without loss of content or functionality.
- No content flashes more than 3 times per second.
- All functions available via keyboard; logical tab order; no keyboard traps; skip links available.
- Screen reader: correct heading hierarchy, error messages announced, dynamic content changes announced, custom components carry correct ARIA roles.

---

## 10. Theming architecture

The entire design system is expressed as CSS custom properties in a single `variables.css`. This is the technical foundation that makes Learn's separate colour identity possible without duplicating component code — Learn overrides the token *values*, not the components themselves. The same mechanism supports any future institutional white-label licensing.

---

*Build New Habits Ltd · Alongside: Learn · Brand & Design System · 09 Aug 2026 v1*
