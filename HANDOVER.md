# HANDOVER.md - Portfolio Blend Project

**Repository:** DevBD1/DevBD1.GitHub.io  
**Branch:** `feat/structured-market-theme`  
**Last Updated:** 2025-02-26  
**Status:** Active development, Vercel auto-deploy enabled

---

## Project Overview

A market-themed personal portfolio that blends:
- **live-resume** structure (typed data modules, clean organization)
- **feat/market-theme** aesthetic (crab/bull/bear color modes, dark gradients)
- **Custom CLI toolbar** (terminal-style command interface)

**Live URL:** Auto-deployed to Vercel on every push

---

## Architecture

### Tech Stack
- **Framework:** Astro 5.x (static site generation)
- **UI:** React 19 (islands for interactivity)
- **Styling:** Tailwind CSS 4 + CSS custom properties (theming)
- **Data:** TypeScript modules (typed, no LLM needed for CLI)

### Theme System (Dynamic)
| Mode | Trigger | Colors | Meaning |
|------|---------|--------|---------|
| 🦀 Crab | BTC -1% to +1% | Slate/gray | Neutral/sideways |
| 🚀 Bull | BTC ≥ +1% | Emerald/green | Growth/optimism |
| 🐻 Bear | BTC ≤ -1% | Red | Caution/resilience |

**Implementation:**
- Live BTC price fetch from CoinGecko API
- Server-side initial theme set in `Layout.astro`
- Client-side store for reactivity
- CSS custom properties drive all colors

---

## Directory Structure

```
src/
├── components/
│   ├── CommandToolbar.tsx    # CLI interface (? or / to open)
│   ├── MarketProvider.tsx    # Theme state hydration
│   ├── ProjectCard.tsx       # Project card with type badges
│   ├── SkillTicker.tsx       # Marquee banner at top
│   ├── ThemeToggle.tsx       # (DEPRECATED - use CLI: theme crab|bull|bear)
│   └── Typewriter.tsx        # Hero typewriter animation
├── config/
│   ├── site.config.ts        # Global config + feature toggles
│   └── index.ts
├── data/
│   ├── certificates.ts       # BTK Akademi cert
│   ├── education.ts          # School history
│   ├── experience.ts         # Work history
│   ├── index.ts              # Exports
│   ├── profile.ts            # Personal info
│   ├── projects.ts           # Projects with type + AI flags
│   └── skills.ts             # Tech stack with market symbols
├── layouts/
│   └── Layout.astro          # Root layout, header, footer, theme init
├── lib/
│   └── market.ts             # BTC price fetcher
├── pages/
│   ├── api/
│   │   └── market-sentiment.ts  # API endpoint for BTC data
│   └── index.astro           # Main page with all sections
├── stores/
│   └── marketStore.ts        # Vanilla JS store (supports manual override)
├── styles/
│   ├── colors.md             # Color documentation (9KB)
│   ├── global.css            # Theme CSS variables
│   └── theme-tokens.ts       # JS color tokens (10KB)
└── types/
    └── theme.ts              # TypeScript interfaces
```

---

## What's Implemented

### ✅ Core Features
- [x] Market-based dynamic theming (BTC 24h change)
- [x] Manual theme override via CLI
- [x] Project type badges (Production/Research/Experiment)
- [x] AI+ badge for AI-assisted projects
- [x] Command Toolbar CLI with autocomplete
- [x] Mobile-responsive CLI (bigger on desktop)
- [x] SkillTicker marquee
- [x] Typewriter animation
- [x] All sections: About, Experience, Projects, Skills, Workshops & Certificates, Education, Contact
- [x] "Workshops & Certificates" section (renamed from Certificates)

### ✅ CLI Commands
| Command | Description |
|---------|-------------|
| `help` / `?` | Show available commands |
| `about` | Profile summary |
| `projects` | List all projects |
| `projects <name>` | Project details (fuzzy match) |
| `nav <section>` | Navigate to section |
| `theme crab/bull/bear` | Switch theme |
| `experience` | Work history |
| `skills` / `skills <cat>` | Tech stack |
| `certs` | Certificates |
| `edu` | Education |
| `contact` | Contact info |
| `clear` | Clear terminal |

### ✅ Data Structure
- All content in `src/data/*.ts` (typed)
- Projects have `type` (production/research/experiment) and `aiAssisted` boolean
- CLI pulls live from these files

---

## Key Design Decisions

### 1. **Project Type System**
Production (green) = Live systems, commercial  
Research (purple) = Academic, thesis  
Experiment (amber) = Learning, rapid prototyping

**Rationale:** Shows full spectrum without diluting engineering credibility. AI+ badge adds transparency.

### 2. **CLI-First Theme Control**
Theme toggle removed from hero. Now: `?` → `theme bear` → Enter

**Rationale:** Cleaner UI, power-user feature, aligns with "terminal" aesthetic

### 3. **1% BTC Threshold** (was 1.5%)
More responsive to market moves

### 4. **No LLM for CLI**
Regex-based command parsing, static data lookup. Fast, predictable, no API costs.

---

## How to Resume Work

### Quick Start
```bash
cd /Users/burak/Documents/GitHub/portfolio-blend
git checkout feat/structured-market-theme
npm install
npm run dev      # Local dev
npm run build    # Production build
```

### Common Tasks

**Add a new project:**
1. Edit `src/data/projects.ts`
2. Add to `projects` array with type and aiAssisted flags
3. Build + push (Vercel auto-deploys)

**Add a certificate:**
1. Edit `src/data/certificates.ts`
2. Add to `certificates` array
3. Build + push

**Modify CLI commands:**
1. Edit `src/components/CommandToolbar.tsx`
2. Add to `createCommands()` array
3. Build + push

**Change theme colors:**
1. Edit `src/styles/global.css`
2. Update `:root[data-theme="xxx"]` blocks
3. Or edit `src/styles/theme-tokens.ts` for JS usage

**Change BTC threshold:**
1. Edit `src/lib/market.ts`
2. Modify `if (dailyChange >= X)` lines
3. Build + push

---

## Known Issues / TODOs

### None Critical
- [ ] Theme toggle was deprecated but component file still exists (can delete)
- [ ] Some projects have placeholder links (`#`)
- [ ] Resume download buttons are placeholders (no actual files)

### Potential Enhancements
- [ ] Add "Experiment" category projects (currently none)
- [ ] Add more certificates as earned
- [ ] Add blog/posts section
- [ ] Add testimonials
- [ ] i18n (Turkish/English toggle)

---

## Environment

**Node:** v25.6.1 (via Homebrew)  
**Package Manager:** npm (pnpm available)  
**Build Output:** `dist/` (static)

**Vercel:**
- Auto-deploys on push to `feat/structured-market-theme`
- Requires `vercel login` for manual CLI deployment

---

## Important Reminders

1. **Always run `npm run build` before pushing** — catches TypeScript errors
2. **CLI is data-driven** — adding projects to `src/data/projects.ts` automatically updates CLI
3. **Theme is live BTC** — check `src/lib/market.ts` for API status if theme seems stuck
4. **AI+ badge** — use sparingly, only when AI genuinely assisted architecture/design
5. **Git branch:** `feat/structured-market-theme` (not main)

---

## Last Commit Summary

```
feat(projects): add project type categorization + rename certificates

- Add ProjectType: 'production' | 'research' | 'experiment'
- Add type badges to ProjectCard (Production/Research/Experiment)
- Add AI+ badge for AI-assisted projects
- Add project type legend to Projects section
- Navigation: 'Certificates' → 'Workshops & Certificates'
```

---

## Contact for Questions

If this handover is unclear, check:
1. `src/data/*.ts` — content structure
2. `src/components/CommandToolbar.tsx` — CLI implementation
3. `src/styles/colors.md` — theme documentation
4. `git log --oneline -20` — recent changes

**End of Handover**
