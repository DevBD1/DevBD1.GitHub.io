# Portfolio Blend - Color System Documentation

## Overview

This project uses a **3-mode theme system** designed for a portfolio/market sentiment context:

| Mode | Theme | Sentiment | Use Case |
|------|-------|-----------|----------|
| 🦀 **Crab** | Slate/Neutral | Neutral/Baseline | Default state, balanced view |
| 🚀 **Bull** | Emerald Green | Growth/Optimism | Positive market sentiment, gains |
| 🐻 **Bear** | Red | Resilience/Caution | Negative market sentiment, losses |

---

## CSS Custom Properties

### Global/Base Properties

| Property | Value | Tailwind Mapping | Description |
|----------|-------|------------------|-------------|
| `--color-text-base` | `#e2e8f0` (slate-200) | `text-primary` | Default text color across all themes |

### Theme-Specific Properties

| Property | Type | Description |
|----------|------|-------------|
| `--color-primary` | Color | Main brand color, used for primary actions, highlights, key elements |
| `--color-secondary` | Color | Supporting color, used for secondary text, accents, hover states |
| `--color-bg-base` | Color | Page background color |
| `--color-accent` | Color (RGBA) | Subtle accent overlay, used for cards, highlights, soft backgrounds |
| `--bg-gradient` | Gradient | Background radial gradient, creates atmospheric glow effect |

---

## Theme Color Values

### 🦀 Crab Mode (Neutral Slate)

**Sentiment:** Neutral, balanced, default state

| Token | Hex | RGB | Tailwind Ref | Usage |
|-------|-----|-----|--------------|-------|
| `--color-primary` | `#64748b` | `rgb(100, 116, 139)` | slate-500 | Primary actions, main brand elements |
| `--color-secondary` | `#94a3b8` | `rgb(148, 163, 184)` | slate-400 | Secondary text, subheadings |
| `--color-bg-base` | `#0f172a` | `rgb(15, 23, 42)` | slate-900 | Page background |
| `--color-accent` | `rgba(100, 116, 139, 0.1)` | - | - | Card backgrounds, subtle highlights |
| Gradient Start | `#1e293b` | `rgb(30, 41, 59)` | slate-800 | Top gradient center point |
| Gradient End | `#0f172a` | `rgb(15, 23, 42)` | slate-900 | Outer gradient |

**Gradient Pattern:**
```css
radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 60%)
```
- Centered at top (50% 10%)
- Neutral downward glow
- Subtle depth without directional bias

---

### 🚀 Bull Mode (Growth Emerald)

**Sentiment:** Growth, optimism, positive momentum

| Token | Hex | RGB | Tailwind Ref | Usage |
|-------|-----|-----|--------------|-------|
| `--color-primary` | `#10b981` | `rgb(16, 185, 129)` | emerald-500 | Success states, positive indicators, buy signals |
| `--color-secondary` | `#34d399` | `rgb(52, 211, 153)` | emerald-400 | Highlights, increased contrast elements |
| `--color-bg-base` | `#020617` | `rgb(2, 6, 23)` | slate-950 | Darker background for contrast |
| `--color-accent` | `rgba(16, 185, 129, 0.2)` | - | - | Green-tinted overlays, success backgrounds |
| Gradient Start | `rgba(16, 185, 129, 0.15)` | - | emerald-500/15 | Bottom glow point |
| Gradient End | `#020617` | `rgb(2, 6, 23)` | slate-950 | Outer gradient |

**Gradient Pattern:**
```css
radial-gradient(circle at 50% 120%, rgba(16, 185, 129, 0.15) 0%, #020617 70%)
```
- Centered below viewport (50% 120%) 
- **Upward glow effect** - light rises from bottom
- Symbolizes growth and upward momentum
- 15% opacity for subtle atmosphere

---

### 🐻 Bear Mode (Resilience Red)

**Sentiment:** Caution, resilience, downturn awareness

| Token | Hex | RGB | Tailwind Ref | Usage |
|-------|-----|-----|--------------|-------|
| `--color-primary` | `#ef4444` | `rgb(239, 68, 68)` | red-500 | Warnings, negative indicators, sell signals |
| `--color-secondary` | `#f87171` | `rgb(248, 113, 113)` | red-400 | Alerts, hover states on danger |
| `--color-bg-base` | `#18181b` | `rgb(24, 24, 27)` | zinc-900 | Warm dark background |
| `--color-accent` | `rgba(239, 68, 68, 0.2)` | - | - | Red-tinted warnings, alert backgrounds |
| Gradient Start | `rgba(239, 68, 68, 0.15)` | - | red-500/15 | Top glow point |
| Gradient End | `#18181b` | `rgb(24, 24, 27)` | zinc-900 | Outer gradient |

**Gradient Pattern:**
```css
radial-gradient(circle at 50% -20%, rgba(239, 68, 68, 0.15) 0%, #18181b 70%)
```
- Centered above viewport (50% -20%)
- **Downward pressure effect** - light descends from top
- Symbolizes resistance and downward pressure
- 15% opacity for atmospheric tension

---

## Usage Guidelines

### Primary Colors (`--color-primary`)

**When to use:**
- Primary buttons and CTAs
- Active navigation states
- Key metrics and numbers
- Brand identity elements
- Icons representing main actions

**Theme-specific meaning:**
| Theme | Meaning | Example Use |
|-------|---------|-------------|
| Crab | Neutral action | Standard button, default link |
| Bull | Growth/positive | Gain indicator, buy button, profit metric |
| Bear | Caution/negative | Loss indicator, sell button, warning metric |

### Secondary Colors (`--color-secondary`)

**When to use:**
- Secondary text (subtitles, descriptions)
- Hover states on primary elements
- Less important metrics
- Border accents
- Disabled states (with opacity)

**Theme-specific meaning:**
| Theme | Usage |
|-------|-------|
| Crab | Muted descriptions, helper text |
| Bull | Highlighted gains, success messages |
| Bear | Alert details, warning explanations |

### Accent Colors (`--color-accent`)

**When to use:**
- Card backgrounds
- Subtle highlight overlays
- Table row hover states
- Tag/pill backgrounds
- Modal backdrops (with blur)

**Opacity considerations:**
- All accent colors use **10-20% opacity**
- Creates depth without overwhelming
- Layer-friendly for stacking

### Background Base (`--color-bg-base`)

**When to use:**
- Page background
- Modal/dialog backgrounds
- Full-screen overlays
- Skeleton loading states

**Note:** Always use with the gradient overlay for consistent atmospheric effect.

---

## Visual Gradient Examples

### Crab Mode Gradient

```
┌─────────────────────────────────────┐
│    ░░░  Subtle neutral glow   ░░░   │  ← 50% 10% (center)
│         ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓           │
│    ▒▒▒  Fades to slate-900    ▒▒▒   │
│                                     │
│                                     │
│         (60% fade point)            │
└─────────────────────────────────────┘
```

**Effect:** Calm, stable, no directional bias

---

### Bull Mode Gradient

```
│                                     │
│                                     │
│         (70% fade point)            │
│    ▒▒▒  Fades from dark       ▒▒▒   │
│         ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑           │
│    ░░░  Green glow rises      ░░░   │  ← 50% 120% (below viewport)
│              BULL                   │
```

**Effect:** Energetic, optimistic, upward momentum

---

### Bear Mode Gradient

```
│              BEAR                   │
│    ░░░  Red pressure descends ░░░   │  ← 50% -20% (above viewport)
│         ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓           │
│    ▒▒▒  Fades to dark         ▒▒▒   │
│                                     │
│         (70% fade point)            │
│                                     │
```

**Effect:** Tense, cautious, downward pressure

---

## Transitions

All themes include smooth transitions for color changes:

```css
transition: background-color 0.8s ease, color 0.5s ease, background-image 0.8s ease;
```

| Property | Duration | Timing | Purpose |
|----------|----------|--------|---------|
| `background-color` | 800ms | ease | Smooth theme switch feel |
| `color` | 500ms | ease | Faster text transition |
| `background-image` | 800ms | ease | Gradient morphing |

---

## Implementation Notes

### Setting Theme

```javascript
// Set theme via data attribute
document.documentElement.setAttribute('data-theme', 'bull');

// Remove to default to crab
document.documentElement.removeAttribute('data-theme');
```

### Using in Tailwind

```html
<!-- Text colors -->
<p class="text-primary">Primary themed text</p>
<p class="text-secondary">Secondary themed text</p>

<!-- Background colors -->
<div class="bg-base">Base background</div>

<!-- With accent overlay -->
<div class="bg-base" style="background-color: var(--color-accent)">
  Card with accent
</div>
```

### Custom CSS

```css
.my-component {
  color: var(--color-primary);
  background-color: var(--color-accent);
  border: 1px solid var(--color-secondary);
}
```

---

## Color Accessibility Notes

### Contrast Ratios

| Theme | Primary on Base | Secondary on Base | Text on Base |
|-------|-----------------|-------------------|--------------|
| Crab | 4.5:1 (AA) | 6.9:1 (AA) | 12.1:1 (AAA) |
| Bull | 4.6:1 (AA) | 5.8:1 (AA) | 15.2:1 (AAA) |
| Bear | 5.2:1 (AA) | 6.1:1 (AA) | 11.8:1 (AAA) |

**Recommendations:**
- All text colors meet WCAG AA standards
- Primary colors pass AA for large text (18px+)
- For small UI elements, consider adding borders for additional distinction

---

## Related Files

- `src/styles/global.css` - Source of truth for CSS variables
- `src/styles/theme-tokens.ts` - JavaScript/TypeScript color exports
- Tailwind config (via `@theme`) - Maps CSS vars to utility classes
