# YIELDX Enhanced Implementation Plan

**Version:** 3.1 (Final)
**Created:** February 1, 2026
**Status:** Approved - Ready for Implementation
**Aesthetic References:** Unseen.co, ActiveTheory, Apple, Unichain, Sleep-Well-Creatives

---

## Configuration Decisions (Confirmed)

| Setting | Decision |
|---------|----------|
| Landing Background | Cream `#FDF8F3` |
| Landing Text | "WELCOME TO YIELDX" |
| Theme | Light primary + Dark toggle |
| Audio | Royalty-free ambient sounds |
| Animations | Custom SVG (designed by us) |
| Mobile | Desktop-first, responsive |
| Charts | Premium (real-time, interactive) |
| Visual Priority | Richness over performance |

---

## Table of Contents

1. [Executive Vision](#1-executive-vision)
2. [Technical Architecture](#2-technical-architecture)
3. [Design System](#3-design-system)
4. [Page Structure & Routes](#4-page-structure--routes)
5. [Component Library](#5-component-library)
6. [Animation System](#6-animation-system)
7. [Advanced Features](#7-advanced-features)
8. [Implementation Phases](#8-implementation-phases)
9. [Demo Data Structure](#9-demo-data-structure)
10. [Performance Strategy](#10-performance-strategy)
11. [About Page Content](#11-about-page-content)
12. [Onboarding Flow](#12-onboarding-flow)
13. [DeFi Glossary](#13-defi-glossary)
14. [Educational Content](#14-educational-content)
15. [Audio Assets](#15-audio-assets)

---

## 1. Executive Vision

### The Goal
Transform YieldX from a functional dashboard into an **award-worthy immersive experience** that makes users feel like they're entering a premium financial portal. Every interaction should feel intentional, every animation should serve a purpose, and the overall experience should evoke the sophistication of Apple with the creativity of Unseen.co.

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Purposeful Motion** | Every animation tells a story or provides feedback |
| **Spatial Hierarchy** | 3D depth creates natural focus areas |
| **Emotional Design** | The eye animation creates connection before data |
| **Progressive Disclosure** | Complexity reveals itself gracefully |
| **Sensory Richness** | Audio, visual, and haptic (vibration) feedback |

### The Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY MAP                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. ARRIVAL          2. AWAKENING         3. PORTAL           4. DASHBOARD │
│  ─────────          ────────────         ────────           ───────────── │
│                                                                             │
│  ┌─────────┐        ┌─────────┐         ┌─────────┐        ┌─────────────┐ │
│  │  Cream  │        │  Eyes   │         │ Zoom    │        │   Bento     │ │
│  │  Canvas │───────▶│  Open   │────────▶│ Through │───────▶│   Grid      │ │
│  │         │        │  +Heart │         │ Iris    │        │   Paradise  │ │
│  └─────────┘        └─────────┘         └─────────┘        └─────────────┘ │
│                                                                             │
│  • Custom cursor     • Proximity         • Morphing          • Glass cards │
│    appears            detection           transition         • Live data   │
│  • Ambient audio     • Eyelid lerp       • Particle burst   • Helix BG    │
│  • Particle field    • Heart pupils      • Audio swell      • Micro-anims │
│                                                                             │
│  Background: #FDF8F3 (Cream)                                               │
│  Text: "WELCOME TO YIELDX"                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technical Architecture

### 2.1 New Dependencies to Add

```json
{
  "dependencies": {
    "framer-motion": "^11.15.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.0",
    "three": "^0.170.0",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.117.0",
    "@react-three/postprocessing": "^2.16.0",
    "recharts": "^2.15.0",
    "@visx/visx": "^3.12.0",
    "d3-ease": "^3.0.1",
    "d3-interpolate": "^3.0.1",
    "howler": "^2.2.4",
    "lottie-react": "^2.4.0",
    "zustand": "^5.0.0",
    "usehooks-ts": "^3.1.0",
    "react-intersection-observer": "^9.13.0",
    "react-use-measure": "^2.1.1",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "canvas-confetti": "^1.9.0"
  }
}
```

### 2.2 Project Structure (Enhanced)

```
src/
├── app/
│   ├── (landing)/
│   │   ├── page.tsx              # Eye animation landing
│   │   └── layout.tsx            # Landing-specific layout (no nav)
│   │
│   ├── dashboard/
│   │   ├── page.tsx              # Main bento dashboard
│   │   └── layout.tsx            # Dashboard layout with nav
│   │
│   ├── about/
│   │   └── page.tsx              # Company story + How it works
│   │
│   ├── learn/
│   │   └── page.tsx              # Instagram-style education feed
│   │
│   ├── onboarding/
│   │   └── page.tsx              # Step-by-step getting started
│   │
│   ├── glossary/
│   │   └── page.tsx              # DeFi terms explained
│   │
│   ├── layout.tsx                # Root layout (providers)
│   └── globals.css               # Design tokens & base styles
│
├── components/
│   ├── core/                     # Foundational components
│   │   ├── custom-cursor.tsx     # Physics-based cursor
│   │   ├── page-transition.tsx   # Route transition wrapper
│   │   ├── smooth-scroll.tsx     # Lenis smooth scroll
│   │   └── audio-manager.tsx     # Ambient audio controller
│   │
│   ├── landing/                  # Landing page components
│   │   ├── eye-animation.tsx     # SVG eyes with tracking
│   │   ├── enter-button.tsx      # Magnetic hover button
│   │   ├── particle-field.tsx    # Background particles
│   │   └── portal-transition.tsx # Zoom-through effect
│   │
│   ├── dashboard/                # Dashboard components
│   │   ├── bento-grid.tsx        # Responsive grid layout
│   │   ├── portfolio-card.tsx    # Large 2x2 portfolio view
│   │   ├── asset-card.tsx        # Individual asset cards
│   │   ├── quick-actions.tsx     # Action button row
│   │   ├── yield-chart.tsx       # Interactive APY chart
│   │   └── stats-counter.tsx     # Animated number display
│   │
│   ├── cards/                    # Reusable card variants
│   │   ├── glass-card.tsx        # Base glassmorphism card
│   │   ├── tilt-card.tsx         # 3D perspective tilt
│   │   ├── glow-card.tsx         # Border beam effect
│   │   └── flip-card.tsx         # Front/back flip
│   │
│   ├── charts/                   # Data visualization
│   │   ├── area-chart.tsx        # Gradient area chart
│   │   ├── sparkline.tsx         # Mini inline chart
│   │   ├── donut-chart.tsx       # Portfolio allocation
│   │   ├── comparison-bar.tsx    # Side-by-side compare
│   │   └── real-time-line.tsx    # Live updating chart
│   │
│   ├── 3d/                       # Three.js components
│   │   ├── helix-background.tsx  # Rotating glass helix
│   │   ├── floating-coins.tsx    # 3D token models
│   │   ├── liquid-blob.tsx       # Morphing background blob
│   │   └── canvas-wrapper.tsx    # R3F canvas setup
│   │
│   ├── education/                # Learn page components
│   │   ├── video-feed.tsx        # Snap scroll container
│   │   ├── video-card.tsx        # Individual video item
│   │   ├── lottie-explainer.tsx  # Animated SVG explainer
│   │   └── progress-dots.tsx     # Scroll position indicator
│   │
│   ├── onboarding/               # Onboarding components
│   │   ├── step-indicator.tsx    # Progress through steps
│   │   ├── step-card.tsx         # Individual step content
│   │   ├── wallet-setup.tsx      # Wallet connection guide
│   │   └── first-deposit.tsx     # Deposit tutorial
│   │
│   ├── about/                    # About page components
│   │   ├── hero-section.tsx      # Main headline
│   │   ├── problem-section.tsx   # What problem we solve
│   │   ├── solution-section.tsx  # How we solve it
│   │   ├── features-grid.tsx     # Key features
│   │   ├── how-it-works.tsx      # Step by step
│   │   ├── team-section.tsx      # Team cards
│   │   └── cta-section.tsx       # Call to action
│   │
│   ├── ui/                       # Base UI components
│   │   ├── button.tsx            # Magnetic + ripple button
│   │   ├── badge.tsx             # Status badges
│   │   ├── tooltip.tsx           # Animated tooltips
│   │   ├── modal.tsx             # Glass modal overlay
│   │   ├── skeleton.tsx          # Shimmer loading
│   │   ├── toggle.tsx            # Theme toggle switch
│   │   ├── accordion.tsx         # Glossary accordion
│   │   └── search.tsx            # Search input
│   │
│   └── layout/                   # Layout components
│       ├── navbar.tsx            # Floating glass nav
│       ├── footer.tsx            # Minimal footer
│       └── sidebar.tsx           # Mobile slide-out
│
├── hooks/                        # Custom hooks
│   ├── use-mouse-position.ts     # Global mouse tracking
│   ├── use-smooth-scroll.ts      # Scroll position
│   ├── use-intersection.ts       # Viewport detection
│   ├── use-audio.ts              # Audio playback
│   ├── use-reduced-motion.ts     # A11y motion check
│   └── use-theme.ts              # Theme state
│
├── lib/                          # Utilities
│   ├── animations/
│   │   ├── variants.ts           # Framer motion presets
│   │   ├── easings.ts            # Custom easing curves
│   │   └── springs.ts            # Spring configurations
│   │
│   ├── shaders/
│   │   ├── liquid.glsl           # Liquid background
│   │   ├── noise.glsl            # Perlin noise
│   │   └── glass.glsl            # Glass refraction
│   │
│   ├── audio/
│   │   ├── ambient.mp3           # Background loop
│   │   ├── hover.mp3             # Button hover
│   │   ├── click.mp3             # Button click
│   │   └── success.mp3           # Transaction success
│   │
│   ├── content/
│   │   ├── about-content.ts      # About page text
│   │   ├── glossary-terms.ts     # DeFi glossary
│   │   ├── onboarding-steps.ts   # Onboarding content
│   │   └── education-cards.ts    # Learn page content
│   │
│   └── data/
│       ├── demo-yields.ts        # Mock yield data
│       ├── demo-portfolio.ts     # Mock portfolio
│       └── demo-history.ts       # Mock historical data
│
├── stores/                       # Zustand stores
│   ├── cursor-store.ts           # Cursor state
│   ├── audio-store.ts            # Audio preferences
│   ├── theme-store.ts            # Theme state
│   ├── onboarding-store.ts       # Onboarding progress
│   └── portfolio-store.ts        # Portfolio state
│
└── types/                        # TypeScript types
    ├── yield.ts
    ├── portfolio.ts
    ├── glossary.ts
    └── animation.ts
```

### 2.3 Provider Architecture

```tsx
// src/app/layout.tsx - Provider Hierarchy
<ThemeProvider>
  <AudioProvider>
    <CursorProvider>
      <SmoothScrollProvider>
        <ThirdwebProvider>
          <YieldDataProvider>
            <OnboardingProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </OnboardingProvider>
          </YieldDataProvider>
        </ThirdwebProvider>
      </SmoothScrollProvider>
    </CursorProvider>
  </AudioProvider>
</ThemeProvider>
```

---

## 3. Design System

### 3.1 Color Tokens (Light Theme - Primary)

```css
:root {
  /* ═══════════════════════════════════════════════════════════════
     BACKGROUNDS - Warm, inviting canvas colors
     ═══════════════════════════════════════════════════════════════ */
  --bg-cream: #FDF8F3;           /* Primary canvas - LANDING PAGE */
  --bg-cream-dark: #F5EDE5;      /* Slightly darker for depth */
  --bg-warm-white: #FFFCFA;      /* Cards, elevated surfaces */

  /* ═══════════════════════════════════════════════════════════════
     ACCENT COLORS - Soft pastels for visual interest
     ═══════════════════════════════════════════════════════════════ */
  --accent-blush: #F8D8D8;       /* Warm pink - Highlights */
  --accent-lavender: #E8E0F0;    /* Purple tint - Brand color */
  --accent-mint: #E0F5E8;        /* Green - Success/growth */
  --accent-sky: #E0F0F8;         /* Blue - Information */
  --accent-peach: #F8E8E0;       /* Orange - Attention */
  --accent-lilac: #F0E8F8;       /* Light purple - Secondary */

  /* ═══════════════════════════════════════════════════════════════
     BRAND COLORS - Key identity colors
     ═══════════════════════════════════════════════════════════════ */
  --brand-lavender: #B7B0F9;     /* Primary brand */
  --brand-lavender-deep: #8B7FE8;/* Hover state */
  --brand-coral: #FF6B6B;        /* CTA accent */
  --brand-heart: #FF4E1B;        /* Eye heart color */

  /* ═══════════════════════════════════════════════════════════════
     TEXT COLORS - High contrast for readability
     ═══════════════════════════════════════════════════════════════ */
  --text-primary: #2D2A32;       /* Headings, important text */
  --text-secondary: #5A4A42;     /* Body copy */
  --text-muted: #8A7A72;         /* Subtle, captions */
  --text-disabled: #B8A8A0;      /* Disabled states */

  /* ═══════════════════════════════════════════════════════════════
     SEMANTIC COLORS - Status indicators
     ═══════════════════════════════════════════════════════════════ */
  --success: #4ADE80;            /* Positive/growth */
  --success-bg: #E0F5E8;
  --warning: #FBBF24;            /* Attention needed */
  --warning-bg: #FEF3C7;
  --error: #F87171;              /* Negative/danger */
  --error-bg: #FEE2E2;
  --info: #60A5FA;               /* Informational */
  --info-bg: #DBEAFE;

  /* ═══════════════════════════════════════════════════════════════
     RISK LEVEL COLORS
     ═══════════════════════════════════════════════════════════════ */
  --risk-low: #4ADE80;           /* Green */
  --risk-medium: #FBBF24;        /* Yellow */
  --risk-high: #F87171;          /* Red */

  /* ═══════════════════════════════════════════════════════════════
     GLASS EFFECTS - Frosted glass styling
     ═══════════════════════════════════════════════════════════════ */
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-bg-hover: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.4);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  --glass-blur: 20px;

  /* ═══════════════════════════════════════════════════════════════
     GLOW EFFECTS - Subtle light emanation
     ═══════════════════════════════════════════════════════════════ */
  --glow-lavender: rgba(183, 176, 249, 0.4);
  --glow-mint: rgba(74, 222, 128, 0.3);
  --glow-coral: rgba(255, 107, 107, 0.3);

  /* ═══════════════════════════════════════════════════════════════
     ASSET-SPECIFIC COLORS
     ═══════════════════════════════════════════════════════════════ */
  --asset-usdc: #2775CA;         /* USDC Blue */
  --asset-usdt: #26A17B;         /* USDT Green */
  --asset-usde: #00D4AA;         /* USDe Cyan */
  --asset-crvusd: #FF6B9D;       /* crvUSD Magenta */
  --asset-aave: #B6509E;         /* AAVE Purple */
}
```

### 3.2 Dark Theme Tokens

```css
.dark {
  --bg-cream: #0A0A0F;
  --bg-cream-dark: #121218;
  --bg-warm-white: #1A1A24;

  --accent-blush: #2D1F2F;
  --accent-lavender: #1F1A2E;
  --accent-mint: #1A2E1F;
  --accent-sky: #1A242E;
  --accent-peach: #2E241A;
  --accent-lilac: #241A2E;

  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
  --text-muted: #6E6E73;

  --glass-bg: rgba(26, 26, 36, 0.8);
  --glass-bg-hover: rgba(36, 36, 48, 0.9);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### 3.3 Typography System

```css
:root {
  --font-display: 'DM Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

/* Type Scale */
.text-display-xl { font-size: clamp(3rem, 8vw, 6rem); font-weight: 700; }
.text-display-lg { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; }
.text-display-md { font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; }
.text-heading-lg { font-size: 1.5rem; font-weight: 600; }
.text-heading-md { font-size: 1.25rem; font-weight: 600; }
.text-heading-sm { font-size: 1rem; font-weight: 600; }
.text-body-lg { font-size: 1.125rem; font-weight: 400; }
.text-body-md { font-size: 1rem; font-weight: 400; }
.text-body-sm { font-size: 0.875rem; font-weight: 400; }
.text-caption { font-size: 0.75rem; font-weight: 500; text-transform: uppercase; }
.text-data { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
```

---

## 4. Page Structure & Routes

### 4.1 Landing Page (`/`)

```
┌────────────────────────────────────────────────────────────────────┐
│                        LANDING PAGE                                 │
│                   Background: #FDF8F3 (Cream)                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     ┌─────────────────────────────────────────────────────────┐    │
│     │                                                         │    │
│     │              ╭─────╮    ╭─────╮                        │    │
│     │              │ ◉   │    │   ◉ │   ← Eyes track cursor  │    │
│     │              │     │    │     │     Eyelids open on    │    │
│     │              ╰─────╯    ╰─────╯     proximity to btn   │    │
│     │                                                         │    │
│     │                    WELCOME TO                           │    │
│     │                      YIELDX                             │    │
│     │                                                         │    │
│     │                 ┌─────────────┐                        │    │
│     │                 │   Enter ↘   │  ← Magnetic hover      │    │
│     │                 └─────────────┘    Hearts in eyes      │    │
│     │                                                         │    │
│     │            [ Enter Without Audio ]                      │    │
│     │                                                         │    │
│     └─────────────────────────────────────────────────────────┘    │
│                                                                     │
│     Background: Particle field (subtle, floating)                   │
│     Audio: Ambient drone (optional)                                 │
│     Cursor: Custom glowing ring                                     │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 4.2 Dashboard Page (`/dashboard`)

```
┌────────────────────────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │  YIELDX     [Dashboard]  [Learn]  [About]       🔔  [Connect] │ │
│ └────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────┐  ┌──────────┐  ┌──────────┐     │
│  │                              │  │   USDC   │  │   USDT   │     │
│  │      PORTFOLIO OVERVIEW      │  │   4.2%   │  │   3.8%   │     │
│  │        $124,532.00           │  │  ↑ 0.3%  │  │  ↓ 0.1%  │     │
│  │   ┌────────────────────┐    │  │  🟢 Low  │  │  🟢 Low  │     │
│  │   │   Area Chart       │    │  └──────────┘  └──────────┘     │
│  │   │   with gradient    │    │                                  │
│  │   └────────────────────┘    │  ┌──────────┐  ┌──────────┐     │
│  │     1D  1W  1M  3M  1Y      │  │   USDe   │  │  crvUSD  │     │
│  └──────────────────────────────┘  │  12.4%   │  │   6.7%   │     │
│                                     │  ↑ 2.1%  │  │  ↑ 0.5%  │     │
│  ┌──────────────────────────────┐  │  🟡 Med  │  │  🟡 Med  │     │
│  │        QUICK ACTIONS         │  └──────────┘  └──────────┘     │
│  │  [Deposit]  [Withdraw] [Swap]│                                  │
│  └──────────────────────────────┘  ┌─────────────────────────┐    │
│                                     │    AAVE MARKETS         │    │
│  ┌──────────────────────────────┐  │  Asset   Supply  Borrow │    │
│  │     TOP OPPORTUNITIES        │  │  USDC    4.2%    5.1%   │    │
│  │  1. USDe   12.4%  [Deposit]  │  │  USDT    3.8%    4.8%   │    │
│  │  2. crvUSD  6.7%  [Deposit]  │  │  DAI     3.5%    4.5%   │    │
│  │  3. AAVE   5.2%   [Deposit]  │  │  ETH     2.1%    3.2%   │    │
│  └──────────────────────────────┘  └─────────────────────────┘    │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 4.3 About Page (`/about`) - NEW COMPREHENSIVE STRUCTURE

```
┌────────────────────────────────────────────────────────────────────┐
│                          ABOUT PAGE                                 │
│               Background: 3D Helix Glass Panels                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SECTION 1: HERO                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │           THE FUTURE OF DEFI                               │  │
│  │              IS BEAUTIFUL                                   │  │
│  │                                                             │  │
│  │   Your intelligent companion for navigating                 │  │
│  │   decentralized finance with confidence.                    │  │
│  │                                                             │  │
│  │              [Get Started] [Watch Demo]                     │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  SECTION 2: THE PROBLEM                                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │   DeFi is powerful. But it's also confusing.               │  │
│  │                                                             │  │
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │   │ Complex │ │ Risky   │ │ Scattered│ │ Confusing│        │  │
│  │   │ Jargon  │ │ Protocols│ │  Data   │ │   UX    │        │  │
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘        │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  SECTION 3: THE SOLUTION                                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │   YieldX makes DeFi simple, safe, and beautiful.           │  │
│  │                                                             │  │
│  │   ┌─────────────────────────────────────────────────────┐  │  │
│  │   │  One Dashboard    │  Real-Time Data  │  Education   │  │  │
│  │   │  All yields in    │  Live APY from   │  Learn as    │  │  │
│  │   │  one place        │  smart contracts │  you earn    │  │  │
│  │   └─────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  SECTION 4: HOW IT WORKS                                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │   Step 1: Connect      Step 2: Explore      Step 3: Earn   │  │
│  │   ────────────────     ────────────────     ─────────────  │  │
│  │   Sign in with         Compare yields       Deposit and    │  │
│  │   Google. No seed      across protocols     start earning  │  │
│  │   phrases needed.      in real-time.        immediately.   │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  SECTION 5: KEY FEATURES                                           │
│  SECTION 6: TRACKED ASSETS                                         │
│  SECTION 7: SECURITY & TRUST                                       │
│  SECTION 8: CTA                                                     │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 4.4 Learn Page (`/learn`)

```
┌────────────────────────────────────────────────────────────────────┐
│                          LEARN PAGE                                 │
│              Instagram-style snap scroll feed                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │     ┌─────────────────────────────────────────────────┐    │  │
│  │     │                                                 │    │  │
│  │     │           [Animated SVG Explainer]             │    │  │
│  │     │                                                 │    │  │
│  │     │          WHAT IS APY?                          │    │  │
│  │     │     Understanding compound interest            │    │  │
│  │     │                                                 │    │  │
│  │     │     ┌──────────────────────────────────┐       │    │  │
│  │     │     │  $1,000 at 5% APY                │       │    │  │
│  │     │     │  After 1 year: $1,051.16         │       │    │  │
│  │     │     │  (vs $1,050 simple interest)     │       │    │  │
│  │     │     └──────────────────────────────────┘       │    │  │
│  │     │                                                 │    │  │
│  │     └─────────────────────────────────────────────────┘    │  │
│  │                                                             │  │
│  │                        ● ○ ○ ○ ○ ○ ○                        │  │
│  │                                                             │  │
│  │                    [ Scroll for more ]                      │  │
│  │                           ↓                                 │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 4.5 Onboarding Page (`/onboarding`)

```
┌────────────────────────────────────────────────────────────────────┐
│                       ONBOARDING PAGE                               │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     Progress: ●───●───○───○───○  Step 2 of 5                       │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │                    STEP 2: CONNECT                          │  │
│  │                                                             │  │
│  │     ┌─────────────────────────────────────────────────┐    │  │
│  │     │                                                 │    │  │
│  │     │        [Google Logo]                           │    │  │
│  │     │                                                 │    │  │
│  │     │    Continue with Google                        │    │  │
│  │     │    No seed phrases. No extensions.             │    │  │
│  │     │    Your wallet is created automatically.       │    │  │
│  │     │                                                 │    │  │
│  │     └─────────────────────────────────────────────────┘    │  │
│  │                                                             │  │
│  │     Why is this safe?                                      │  │
│  │     • Non-custodial: Only you control your funds           │  │
│  │     • Smart Account: Gas fees are sponsored                │  │
│  │     • Recovery: Linked to your Google account              │  │
│  │                                                             │  │
│  │     [← Back]                              [Continue →]     │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 4.6 Glossary Page (`/glossary`)

```
┌────────────────────────────────────────────────────────────────────┐
│                        GLOSSARY PAGE                                │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     🔍 Search terms...                                             │
│                                                                     │
│     [All] [Basics] [Yields] [Stablecoins] [Risk]                  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  A                                                          │  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │  APY (Annual Percentage Yield)                 [+]  │   │  │
│  │  │  ─────────────────────────────────────────────────  │   │  │
│  │  │  The real rate of return on your investment,       │   │  │
│  │  │  including compound interest. Unlike APR, APY      │   │  │
│  │  │  accounts for interest earning interest.           │   │  │
│  │  │                                                     │   │  │
│  │  │  Example: $1,000 at 5% APY = $1,051.16 after 1 yr │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │  AAVE                                          [+]  │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  │                                                             │  │
│  │  D                                                          │  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │  DeFi (Decentralized Finance)                  [+]  │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 5. Component Library

[Previous component specs remain the same - Glass Card, Tilt Card, Glow Card, etc.]

---

## 6. Animation System

[Previous animation specs remain the same - Framer Motion variants, GSAP, etc.]

---

## 7. Advanced Features

[Previous advanced features remain the same - Command Palette, Toasts, etc.]

---

## 8. Implementation Phases

### Phase 1: Foundation (Day 1-2)
- [ ] Install all new dependencies
- [ ] Set up design tokens in globals.css (CREAM BACKGROUND)
- [ ] Configure fonts (DM Sans, Inter, JetBrains Mono)
- [ ] Create theme provider with light/dark support
- [ ] Implement custom cursor component
- [ ] Create glass card base component
- [ ] Set up Framer Motion page transitions
- [ ] Configure smooth scroll (Lenis)
- [ ] Create audio manager with Howler.js
- [ ] Set up Zustand stores

### Phase 2: Landing Experience (Day 2-3)
- [ ] Port eye animation from reference
- [ ] **Update background to CREAM (#FDF8F3)**
- [ ] **Update text to "WELCOME TO YIELDX"**
- [ ] Implement proximity-based eyelid animation
- [ ] Add heart transformation on hover
- [ ] Create particle field background
- [ ] Implement magnetic enter button
- [ ] Add ambient audio system (royalty-free)
- [ ] Create portal transition sequence
- [ ] Add "Enter Without Audio" option

### Phase 3: Dashboard Core (Day 3-4)
[Same as before]

### Phase 4: Data Visualization (Day 4-5)
[Same as before]

### Phase 5: 3D & Advanced Effects (Day 5-6)
[Same as before]

### Phase 6: Education Feed (Day 6-7)
- [ ] Create snap scroll container
- [ ] Build video card component
- [ ] **Create custom SVG animations (not LottieFiles)**
- [ ] Implement intersection observer for autoplay
- [ ] Build progress dots indicator
- [ ] Create content for all 10 topics

### Phase 7: Navigation & Layout (Day 7)
[Same as before]

### Phase 8: Modals & Interactions (Day 8)
[Same as before]

### Phase 9: About Page (Day 8-9)
- [ ] Build hero section with tagline
- [ ] **Create "The Problem" section**
- [ ] **Create "The Solution" section**
- [ ] **Build "How It Works" step-by-step**
- [ ] Add features grid
- [ ] Create tracked assets section
- [ ] Build security & trust section
- [ ] Create CTA section with swipe button
- [ ] Implement all scroll animations

### Phase 10: Onboarding & Glossary (Day 9)
- [ ] **Build 5-step onboarding flow**
- [ ] **Create interactive glossary with search**
- [ ] Add progress persistence
- [ ] Create first-time user detection

### Phase 11: Polish & Performance (Day 10)
[Same as before]

---

## 9. Demo Data Structure

[Same as before]

---

## 10. Performance Strategy

[Same as before]

---

## 11. About Page Content

### 11.1 Hero Section

```typescript
export const heroContent = {
  tagline: "THE FUTURE OF DEFI IS BEAUTIFUL",
  subtitle: "Your intelligent companion for navigating decentralized finance with confidence.",
  description: "YieldX transforms complex DeFi yield tracking into an elegant, educational experience. Compare rates, understand risks, and grow your portfolio—all in one beautiful interface.",
  cta: {
    primary: "Get Started",
    secondary: "Watch Demo"
  }
};
```

### 11.2 The Problem Section

```typescript
export const problemContent = {
  headline: "DeFi is powerful. But it's also overwhelming.",
  subheadline: "The average user faces these challenges:",
  problems: [
    {
      icon: "🤯",
      title: "Complex Jargon",
      description: "APY, TVL, impermanent loss, liquidation ratios... DeFi speaks a language most people don't understand."
    },
    {
      icon: "⚠️",
      title: "Hidden Risks",
      description: "Not all yields are created equal. High APY often means high risk, but this isn't always clear."
    },
    {
      icon: "🔀",
      title: "Scattered Data",
      description: "Yields are spread across dozens of protocols. Comparing them requires opening 10+ tabs."
    },
    {
      icon: "😵",
      title: "Intimidating UX",
      description: "Seed phrases, gas fees, network switching... The onboarding process scares away 90% of users."
    },
    {
      icon: "📉",
      title: "No Guidance",
      description: "Where do I start? Which protocol is safe? How much should I invest? No one tells you."
    },
    {
      icon: "⏰",
      title: "Constant Monitoring",
      description: "Rates change every block. Missing a rate drop could cost you thousands."
    }
  ]
};
```

### 11.3 The Solution Section

```typescript
export const solutionContent = {
  headline: "YieldX: DeFi Made Simple",
  subheadline: "We solve these problems with three core principles:",
  solutions: [
    {
      icon: "🎯",
      title: "One Dashboard",
      description: "All your yields in one place. Compare USDC, USDT, USDe, crvUSD, and AAVE rates side-by-side. No more tab switching.",
      visual: "bento-grid-preview"
    },
    {
      icon: "⚡",
      title: "Real-Time Data",
      description: "Live APY pulled directly from smart contracts. We don't scrape—we listen to blockchain events. Every number is accurate to the second.",
      visual: "realtime-indicator"
    },
    {
      icon: "📚",
      title: "Education Built-In",
      description: "Don't know what USDe is? Hover over it. Want to understand liquidation? Watch a 30-second explainer. Learn as you earn.",
      visual: "education-preview"
    },
    {
      icon: "🛡️",
      title: "Risk Transparency",
      description: "Every asset shows its risk level clearly. Green = safe, Yellow = moderate, Red = high. No hidden surprises.",
      visual: "risk-indicators"
    },
    {
      icon: "🔐",
      title: "Frictionless Onboarding",
      description: "Sign in with Google. That's it. No seed phrases, no browser extensions, no gas fees. Your wallet is created automatically.",
      visual: "social-login"
    },
    {
      icon: "🔔",
      title: "Smart Alerts",
      description: "Set your target APY. We'll notify you when rates hit your threshold. Never miss an opportunity.",
      visual: "alert-preview"
    }
  ]
};
```

### 11.4 How It Works Section

```typescript
export const howItWorksContent = {
  headline: "Start Earning in 3 Simple Steps",
  steps: [
    {
      number: 1,
      title: "Connect",
      description: "Sign in with your Google account. No seed phrases, no downloads. We create a secure smart wallet for you instantly.",
      details: [
        "One-click Google authentication",
        "Non-custodial wallet generated",
        "ERC-4337 smart account enabled",
        "Gas fees sponsored (you pay nothing)"
      ],
      duration: "30 seconds",
      icon: "wallet"
    },
    {
      number: 2,
      title: "Explore",
      description: "Browse real-time yields across all supported protocols. Compare rates, understand risks, and learn about each asset.",
      details: [
        "Live APY from Aave, Ethena, Curve",
        "Risk indicators for each asset",
        "Historical performance charts",
        "One-click asset comparison"
      ],
      duration: "2 minutes",
      icon: "search"
    },
    {
      number: 3,
      title: "Deposit",
      description: "Choose your asset and amount. Confirm the transaction. Start earning immediately—no lockups, withdraw anytime.",
      details: [
        "Support for USDC, USDT, USDe, crvUSD",
        "Gasless transactions (we sponsor)",
        "No minimum deposit",
        "Instant yield accrual"
      ],
      duration: "1 minute",
      icon: "deposit"
    },
    {
      number: 4,
      title: "Monitor",
      description: "Track your portfolio growth in real-time. See exactly how much you've earned and when. Set alerts for rate changes.",
      details: [
        "Live portfolio value",
        "Earnings breakdown by asset",
        "APY change notifications",
        "Withdrawal anytime"
      ],
      duration: "Ongoing",
      icon: "chart"
    }
  ]
};
```

### 11.5 Features Grid

```typescript
export const featuresContent = {
  headline: "Built for the Future",
  features: [
    {
      title: "Glassmorphism UI",
      description: "Premium frosted-glass design that's beautiful and functional",
      icon: "✨"
    },
    {
      title: "Event-Driven Updates",
      description: "WebSocket connection to Aave Pool events for instant data",
      icon: "⚡"
    },
    {
      title: "Smart Account",
      description: "ERC-4337 account abstraction for gasless transactions",
      icon: "🔐"
    },
    {
      title: "Social Login",
      description: "Thirdweb SDK v5 for one-click Google authentication",
      icon: "🌐"
    },
    {
      title: "Risk Scoring",
      description: "Clear risk indicators for every tracked asset",
      icon: "🛡️"
    },
    {
      title: "Mobile Ready",
      description: "Responsive design that works on any device",
      icon: "📱"
    },
    {
      title: "Dark Mode",
      description: "Eye-friendly dark theme for night owls",
      icon: "🌙"
    },
    {
      title: "Open Source",
      description: "Transparent codebase you can verify yourself",
      icon: "💻"
    }
  ]
};
```

### 11.6 Tracked Assets Section

```typescript
export const trackedAssetsContent = {
  headline: "Assets We Track",
  subheadline: "Curated selection of the best stablecoin yields",
  assets: [
    {
      symbol: "USDC",
      name: "USD Coin",
      type: "Fiat-Backed Stablecoin",
      issuer: "Circle",
      riskLevel: "low",
      description: "The most trusted stablecoin in DeFi. Backed 1:1 by US dollars held in regulated financial institutions. Monthly attestations by Grant Thornton.",
      keyPoints: [
        "100% backed by USD reserves",
        "Monthly third-party audits",
        "Regulated by US authorities",
        "Instant redemption to fiat"
      ],
      color: "#2775CA"
    },
    {
      symbol: "USDT",
      name: "Tether",
      type: "Fiat-Backed Stablecoin",
      issuer: "Tether Limited",
      riskLevel: "low",
      description: "The largest stablecoin by market cap. Backed by a mix of cash, cash equivalents, and other assets. Quarterly reserve reports.",
      keyPoints: [
        "Largest stablecoin ($80B+)",
        "Multi-asset reserves",
        "Quarterly attestations",
        "Widest exchange support"
      ],
      color: "#26A17B"
    },
    {
      symbol: "USDe",
      name: "Ethena USDe",
      type: "Synthetic Stablecoin",
      issuer: "Ethena Labs",
      riskLevel: "medium",
      description: "A synthetic dollar that generates yield from ETH staking and perpetual futures funding rates. Higher yield, higher complexity.",
      keyPoints: [
        "Delta-neutral strategy",
        "ETH staking yield",
        "Perp funding income",
        "Internet bond (sUSDe)"
      ],
      color: "#00D4AA"
    },
    {
      symbol: "crvUSD",
      name: "Curve USD",
      type: "DeFi-Native Stablecoin",
      issuer: "Curve Finance",
      riskLevel: "medium",
      description: "Curve's native stablecoin using LLAMMA (Lending-Liquidating AMM Algorithm) for soft liquidations. Innovative but complex.",
      keyPoints: [
        "Soft liquidation mechanism",
        "No sudden liquidation",
        "Overcollateralized",
        "DeFi-native design"
      ],
      color: "#FF6B9D"
    },
    {
      symbol: "AAVE",
      name: "Aave Supply",
      type: "Lending Protocol",
      issuer: "Aave DAO",
      riskLevel: "low",
      description: "The leading decentralized lending protocol. Supply assets to earn variable interest rates. Battle-tested since 2020.",
      keyPoints: [
        "$10B+ in deposits",
        "Variable interest rates",
        "Flash loan protection",
        "Governance token rewards"
      ],
      color: "#B6509E"
    }
  ]
};
```

### 11.7 Security Section

```typescript
export const securityContent = {
  headline: "Security First",
  subheadline: "Your funds, your control",
  points: [
    {
      title: "Non-Custodial",
      description: "We never hold your funds. Your assets stay in your wallet, controlled only by you. We can't move, freeze, or access your money.",
      icon: "🔒"
    },
    {
      title: "Smart Contract Audits",
      description: "All protocols we integrate with have undergone multiple security audits by top firms like OpenZeppelin, Trail of Bits, and Certik.",
      icon: "✅"
    },
    {
      title: "Open Source",
      description: "Our entire codebase is open source. You can verify every line of code that interacts with your wallet.",
      icon: "📖"
    },
    {
      title: "No Seed Phrases",
      description: "We use Thirdweb's in-app wallet with social login. Your wallet is secured by your Google account, not a phrase you might lose.",
      icon: "🛡️"
    }
  ],
  disclaimer: "YieldX is an interface, not a protocol. We do not custody funds or execute transactions on your behalf. All interactions are directly between your wallet and the underlying smart contracts. DeFi carries inherent risks including smart contract vulnerabilities, market volatility, and potential loss of funds. Never invest more than you can afford to lose."
};
```

### 11.8 CTA Section

```typescript
export const ctaContent = {
  headline: "Ready to Earn?",
  subheadline: "Join thousands of users already earning yield with YieldX",
  stats: [
    { value: "$12M+", label: "Total Value Tracked" },
    { value: "5,000+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" }
  ],
  buttons: {
    primary: "Launch App",
    secondary: "Read Docs"
  }
};
```

---

## 12. Onboarding Flow

### 12.1 Onboarding Steps

```typescript
export const onboardingSteps = [
  {
    step: 1,
    title: "Welcome to YieldX",
    subtitle: "Let's get you set up in under 2 minutes",
    content: {
      headline: "What is YieldX?",
      description: "YieldX is your personal DeFi yield tracker. We help you find the best returns on your stablecoins across multiple protocols—without the complexity.",
      bullets: [
        "Compare yields across Aave, Ethena, and Curve",
        "See real-time APY updated every block",
        "Understand risks with clear indicators",
        "Learn as you go with built-in education"
      ],
      visual: "dashboard-preview"
    },
    cta: "Let's Go"
  },
  {
    step: 2,
    title: "Connect Your Account",
    subtitle: "No seed phrases. No extensions. Just Google.",
    content: {
      headline: "One-Click Login",
      description: "We use Thirdweb's secure wallet infrastructure to create a wallet for you automatically. Your Google account becomes your key.",
      howItWorks: [
        {
          step: "Click 'Continue with Google'",
          detail: "Standard OAuth flow you're familiar with"
        },
        {
          step: "Wallet Created Instantly",
          detail: "A non-custodial smart wallet is generated"
        },
        {
          step: "Gas Fees Sponsored",
          detail: "We pay for your transaction fees"
        }
      ],
      faq: [
        {
          q: "Is this safe?",
          a: "Yes. Your wallet is non-custodial—only you control it. We can't access your funds."
        },
        {
          q: "What if I lose access to Google?",
          a: "You can recover your wallet through Google's account recovery. We also support exporting your wallet."
        }
      ]
    },
    cta: "Continue with Google"
  },
  {
    step: 3,
    title: "Understand the Dashboard",
    subtitle: "Everything you need, nothing you don't",
    content: {
      headline: "Your Yield Command Center",
      sections: [
        {
          name: "Portfolio Overview",
          description: "Your total balance and earnings at a glance",
          location: "Top left, large card"
        },
        {
          name: "Asset Cards",
          description: "Current APY for each stablecoin",
          location: "Grid of smaller cards"
        },
        {
          name: "Quick Actions",
          description: "Deposit, withdraw, or swap with one click",
          location: "Action bar below portfolio"
        },
        {
          name: "Risk Indicators",
          description: "Green = low risk, Yellow = medium, Red = high",
          location: "On each asset card"
        }
      ],
      tip: "Click any asset card to see detailed information, historical charts, and educational content."
    },
    cta: "Got It"
  },
  {
    step: 4,
    title: "Understanding Yields",
    subtitle: "What the numbers actually mean",
    content: {
      headline: "APY Explained Simply",
      terms: [
        {
          term: "APY (Annual Percentage Yield)",
          definition: "How much you'll earn in a year if rates stay constant",
          example: "$1,000 at 5% APY = $1,051.16 after 1 year",
          note: "Includes compound interest—earning interest on interest"
        },
        {
          term: "24h Change",
          definition: "How the rate changed in the last 24 hours",
          example: "+0.3% means the APY went up by 0.3 percentage points",
          note: "Rates fluctuate based on supply and demand"
        },
        {
          term: "Risk Level",
          definition: "Our assessment of the asset's safety",
          levels: [
            { level: "Low (Green)", meaning: "Established, audited, fiat-backed" },
            { level: "Medium (Yellow)", meaning: "Newer mechanisms, higher complexity" },
            { level: "High (Red)", meaning: "Experimental, unaudited, volatile" }
          ]
        }
      ]
    },
    cta: "Makes Sense"
  },
  {
    step: 5,
    title: "You're Ready!",
    subtitle: "Start exploring and earning",
    content: {
      headline: "Welcome to DeFi",
      nextSteps: [
        {
          action: "Explore the Dashboard",
          description: "Browse yields and compare assets",
          link: "/dashboard"
        },
        {
          action: "Learn More",
          description: "Watch explainer videos for each asset",
          link: "/learn"
        },
        {
          action: "Read the Glossary",
          description: "Look up any term you don't understand",
          link: "/glossary"
        },
        {
          action: "Make Your First Deposit",
          description: "Start earning yield today",
          link: "/dashboard?action=deposit"
        }
      ],
      support: {
        text: "Questions? We're here to help.",
        links: [
          { label: "FAQ", url: "/faq" },
          { label: "Discord", url: "https://discord.gg/yieldx" },
          { label: "Twitter", url: "https://twitter.com/yieldx" }
        ]
      }
    },
    cta: "Go to Dashboard"
  }
];
```

---

## 13. DeFi Glossary

### 13.1 Complete Term Definitions

```typescript
export const glossaryTerms = [
  // === BASICS ===
  {
    term: "APY",
    fullName: "Annual Percentage Yield",
    category: "basics",
    definition: "The real rate of return on your investment over one year, accounting for compound interest. Unlike APR (Annual Percentage Rate), APY includes the effect of interest earning interest.",
    example: "If you deposit $1,000 at 5% APY, you'll have approximately $1,051.16 after one year (not just $1,050) because interest compounds.",
    formula: "APY = (1 + r/n)^n - 1, where r = rate and n = compounding periods",
    relatedTerms: ["APR", "Compound Interest", "Yield"]
  },
  {
    term: "APR",
    fullName: "Annual Percentage Rate",
    category: "basics",
    definition: "The simple interest rate for a year, without accounting for compounding. APR is always lower than or equal to APY for the same rate.",
    example: "A 5% APR on $1,000 gives you exactly $50 after one year. No compounding.",
    relatedTerms: ["APY", "Simple Interest"]
  },
  {
    term: "DeFi",
    fullName: "Decentralized Finance",
    category: "basics",
    definition: "Financial services built on blockchain technology that operate without traditional intermediaries like banks. Smart contracts replace middlemen.",
    example: "Instead of a bank paying you 0.5% interest, you can deposit in Aave and earn 4%+ directly from other borrowers.",
    relatedTerms: ["Smart Contract", "Protocol", "Yield Farming"]
  },
  {
    term: "Yield",
    category: "basics",
    definition: "The earnings generated from an investment, usually expressed as a percentage (APY). In DeFi, yield comes from lending, liquidity provision, or staking.",
    example: "Your USDC deposit in Aave generates yield from borrowers who pay interest.",
    relatedTerms: ["APY", "Yield Farming", "Staking"]
  },
  {
    term: "Wallet",
    category: "basics",
    definition: "A digital container for your cryptocurrency. It doesn't actually hold coins—it holds the private keys that prove you own them on the blockchain.",
    types: [
      { type: "Hot Wallet", description: "Connected to internet (MetaMask, Coinbase Wallet)" },
      { type: "Cold Wallet", description: "Offline storage (Ledger, Trezor)" },
      { type: "Smart Wallet", description: "Account abstraction wallet (what YieldX uses)" }
    ],
    relatedTerms: ["Private Key", "Seed Phrase", "Smart Account"]
  },
  {
    term: "Smart Contract",
    category: "basics",
    definition: "Self-executing code on a blockchain that automatically enforces agreement terms. Think of it as a vending machine—put in money, get guaranteed output.",
    example: "Aave's smart contracts automatically calculate and distribute interest without any human intervention.",
    relatedTerms: ["Blockchain", "Protocol", "DeFi"]
  },
  {
    term: "Gas Fee",
    category: "basics",
    definition: "The cost paid to execute a transaction on a blockchain. It compensates network validators for processing your transaction.",
    example: "Sending USDC on Ethereum might cost $2-20 in gas fees depending on network congestion.",
    note: "YieldX sponsors gas fees so you pay $0.",
    relatedTerms: ["Transaction", "Ethereum", "Layer 2"]
  },

  // === STABLECOINS ===
  {
    term: "Stablecoin",
    category: "stablecoins",
    definition: "A cryptocurrency designed to maintain a stable value, usually pegged to $1 USD. Unlike Bitcoin or Ethereum, stablecoins don't have price volatility.",
    types: [
      { type: "Fiat-Backed", examples: "USDC, USDT", description: "Backed by real dollars in a bank" },
      { type: "Crypto-Backed", examples: "DAI", description: "Backed by other crypto, over-collateralized" },
      { type: "Algorithmic", examples: "FRAX", description: "Maintained by algorithms and incentives" },
      { type: "Synthetic", examples: "USDe", description: "Created through derivatives positions" }
    ],
    relatedTerms: ["USDC", "USDT", "Peg"]
  },
  {
    term: "USDC",
    fullName: "USD Coin",
    category: "stablecoins",
    definition: "A fiat-backed stablecoin issued by Circle. Each USDC is backed 1:1 by US dollars held in regulated financial institutions. Monthly attestations prove reserves.",
    keyPoints: [
      "Issued by Circle, a US-regulated company",
      "100% backed by cash and short-term US Treasuries",
      "Monthly attestations by Grant Thornton",
      "Can be redeemed 1:1 for USD"
    ],
    riskLevel: "low",
    relatedTerms: ["Stablecoin", "Fiat-Backed", "Circle"]
  },
  {
    term: "USDT",
    fullName: "Tether",
    category: "stablecoins",
    definition: "The largest stablecoin by market cap, issued by Tether Limited. Backed by a mix of cash, cash equivalents, secured loans, and other assets.",
    keyPoints: [
      "Largest stablecoin ($80B+ market cap)",
      "Backed by diverse reserve assets",
      "Quarterly reserve reports",
      "Registered in British Virgin Islands"
    ],
    riskLevel: "low",
    relatedTerms: ["Stablecoin", "Fiat-Backed", "Tether"]
  },
  {
    term: "USDe",
    fullName: "Ethena USDe",
    category: "stablecoins",
    definition: "A synthetic stablecoin that maintains its peg through a delta-neutral position combining ETH staking and perpetual futures shorts.",
    keyPoints: [
      "Delta-neutral: immune to ETH price moves",
      "Yield from staking ETH",
      "Additional yield from perp funding rates",
      "Can be staked as sUSDe for higher yield"
    ],
    howItWorks: "Ethena stakes ETH (earning ~4%) and simultaneously shorts ETH perps (earning funding ~8-15%). The short cancels price exposure while capturing both yields.",
    riskLevel: "medium",
    risks: [
      "Negative funding rates during bear markets",
      "Smart contract risk (newer protocol)",
      "Custodian risk for backing assets"
    ],
    relatedTerms: ["Synthetic", "Delta-Neutral", "Perpetual Futures", "Staking"]
  },
  {
    term: "crvUSD",
    fullName: "Curve USD",
    category: "stablecoins",
    definition: "Curve Finance's native stablecoin using LLAMMA (Lending-Liquidating AMM Algorithm) for innovative 'soft liquidations' instead of sudden position closures.",
    keyPoints: [
      "Overcollateralized design",
      "Soft liquidation mechanism",
      "No sudden liquidation cliff",
      "Collateral converts gradually"
    ],
    howItWorks: "Instead of liquidating your entire position when collateral drops, crvUSD gradually converts your collateral to crvUSD and back as prices move. This 'soft liquidation' protects users from flash crashes.",
    riskLevel: "medium",
    relatedTerms: ["LLAMMA", "Soft Liquidation", "Curve Finance"]
  },

  // === PROTOCOLS ===
  {
    term: "Aave",
    category: "protocols",
    definition: "The largest decentralized lending protocol where users can supply assets to earn interest or borrow against their collateral. Battle-tested since 2020 with $10B+ in deposits.",
    keyPoints: [
      "Non-custodial lending/borrowing",
      "Variable and stable interest rates",
      "Over-collateralized loans",
      "Governance token: AAVE"
    ],
    howItWorks: "Lenders deposit assets into liquidity pools and earn interest from borrowers. Borrowers must deposit collateral worth more than their loan (typically 150%+ of loan value).",
    relatedTerms: ["Lending Protocol", "Supply APY", "Borrow APY", "Collateral"]
  },
  {
    term: "Protocol",
    category: "protocols",
    definition: "A set of smart contracts that work together to provide a specific DeFi service. Protocols are like apps built on blockchain—they have rules, but no central operator.",
    examples: [
      { name: "Aave", service: "Lending/Borrowing" },
      { name: "Uniswap", service: "Token Swapping" },
      { name: "Curve", service: "Stablecoin Swapping" }
    ],
    relatedTerms: ["Smart Contract", "DeFi", "DAO"]
  },

  // === YIELDS ===
  {
    term: "Supply APY",
    category: "yields",
    definition: "The interest rate you earn by depositing (supplying) assets to a lending protocol. This is what you get paid for letting others borrow your money.",
    example: "If USDC Supply APY is 4%, you earn approximately 4% annually on your deposited USDC.",
    relatedTerms: ["Borrow APY", "Lending", "Aave"]
  },
  {
    term: "Borrow APY",
    category: "yields",
    definition: "The interest rate you pay when borrowing assets from a lending protocol. Always higher than Supply APY—the difference is the protocol's spread.",
    example: "If USDC Borrow APY is 5%, you pay 5% annually on your borrowed USDC.",
    relatedTerms: ["Supply APY", "Collateral", "Loan"]
  },
  {
    term: "Yield Farming",
    category: "yields",
    definition: "The practice of moving assets between protocols to maximize returns. Often involves providing liquidity or staking in multiple places.",
    risks: [
      "Smart contract risk (more protocols = more risk)",
      "Gas fees eating into profits",
      "Impermanent loss in liquidity pools"
    ],
    relatedTerms: ["APY", "Liquidity Mining", "Staking"]
  },
  {
    term: "TVL",
    fullName: "Total Value Locked",
    category: "yields",
    definition: "The total amount of assets deposited in a protocol. A key metric for measuring protocol adoption and trust. Higher TVL generally indicates more confidence.",
    example: "Aave has $10B+ TVL, meaning users have deposited over $10 billion in assets.",
    relatedTerms: ["Protocol", "Liquidity", "Market Cap"]
  },

  // === RISK ===
  {
    term: "Smart Contract Risk",
    category: "risk",
    definition: "The risk that a bug or vulnerability in smart contract code could lead to loss of funds. Even audited contracts can have undiscovered issues.",
    mitigation: [
      "Use battle-tested protocols",
      "Check for multiple audits",
      "Diversify across protocols",
      "Don't invest more than you can lose"
    ],
    relatedTerms: ["Audit", "Protocol", "Security"]
  },
  {
    term: "Liquidation",
    category: "risk",
    definition: "When a borrower's collateral value drops too low relative to their loan, the protocol automatically sells (liquidates) their collateral to repay the loan.",
    example: "If you borrow $1,000 with $1,500 ETH collateral and ETH drops 40%, your position may be liquidated to protect lenders.",
    prevention: [
      "Keep health factor above 1.5",
      "Monitor collateral prices",
      "Add collateral when prices drop"
    ],
    relatedTerms: ["Collateral", "Health Factor", "Soft Liquidation"]
  },
  {
    term: "Health Factor",
    category: "risk",
    definition: "A number representing how safe your borrowed position is. Above 1 = safe, below 1 = liquidation. The higher the number, the safer your position.",
    formula: "Health Factor = (Collateral Value × Liquidation Threshold) / Borrowed Value",
    example: "Health Factor of 1.5 means you can lose 33% of collateral value before liquidation.",
    relatedTerms: ["Liquidation", "Collateral", "Borrow"]
  },
  {
    term: "Impermanent Loss",
    category: "risk",
    definition: "The temporary loss that occurs when providing liquidity to a trading pair if the prices of the tokens change relative to each other. Called 'impermanent' because it's only realized when you withdraw.",
    note: "This doesn't apply to single-asset lending on Aave—only to liquidity pools.",
    relatedTerms: ["Liquidity Pool", "AMM", "Yield Farming"]
  },

  // === ADVANCED ===
  {
    term: "Delta-Neutral",
    category: "advanced",
    definition: "A position designed to have no exposure to price movements. If the asset goes up or down, the position value stays the same. USDe uses this strategy.",
    howItWorks: "Hold an asset long AND short it equally. Price goes up? Long gains, short loses—net zero. Price goes down? Long loses, short gains—still net zero.",
    relatedTerms: ["USDe", "Hedging", "Perpetual Futures"]
  },
  {
    term: "Perpetual Futures",
    fullName: "Perpetual Swap Contracts",
    category: "advanced",
    definition: "Derivatives that let you bet on an asset's price without expiration. Unlike traditional futures, perps never settle—they use 'funding rates' to stay close to spot price.",
    keyPoint: "When more people are long than short, longs pay shorts a 'funding fee' (and vice versa). This is how USDe generates extra yield.",
    relatedTerms: ["Funding Rate", "Derivatives", "USDe"]
  },
  {
    term: "Funding Rate",
    category: "advanced",
    definition: "Periodic payments between long and short perpetual futures traders that keep perp prices aligned with spot prices. Positive = longs pay shorts. Negative = shorts pay longs.",
    example: "If funding is +0.01% every 8 hours, shorts earn 0.03% daily from longs.",
    note: "USDe captures this funding by being short ETH perps.",
    relatedTerms: ["Perpetual Futures", "USDe", "Delta-Neutral"]
  },
  {
    term: "LLAMMA",
    fullName: "Lending-Liquidating AMM Algorithm",
    category: "advanced",
    definition: "Curve's innovative liquidation mechanism for crvUSD. Instead of sudden liquidation, it gradually converts collateral to stablecoin and back as prices move.",
    benefit: "Protects users from flash crashes that would cause full liquidation in other protocols.",
    relatedTerms: ["crvUSD", "Soft Liquidation", "AMM"]
  },
  {
    term: "ERC-4337",
    fullName: "Account Abstraction Standard",
    category: "advanced",
    definition: "An Ethereum standard that allows smart contract wallets with features like gasless transactions, social recovery, and batch transactions. This is what powers YieldX's smooth experience.",
    benefits: [
      "No gas fees (sponsored)",
      "Social login (Google)",
      "Account recovery options",
      "Batch multiple actions"
    ],
    relatedTerms: ["Smart Account", "Gas Fee", "Wallet"]
  }
];
```

---

## 14. Educational Content

### 14.1 Learn Page Cards

```typescript
export const educationCards = [
  {
    id: 1,
    title: "What is APY?",
    subtitle: "Understanding compound interest",
    category: "basics",
    duration: "1 min",
    animation: {
      type: "svg",
      description: "Animated graph showing $1000 growing with compound vs simple interest",
      keyframes: [
        { time: 0, value: 1000, label: "Start" },
        { time: 1, value: 1050, label: "Simple: $1,050" },
        { time: 1, value: 1051.16, label: "Compound: $1,051.16" }
      ]
    },
    content: {
      mainPoint: "APY (Annual Percentage Yield) tells you how much you'll earn in a year, including compound interest.",
      explanation: "When you earn interest on your interest, your money grows faster. That's compounding. APY accounts for this, giving you the true picture of your earnings.",
      example: {
        scenario: "$1,000 at 5% APY for 1 year",
        simple: "$1,050 (just principal + 5%)",
        compound: "$1,051.16 (interest earns interest)",
        difference: "$1.16 extra from compounding"
      },
      takeaway: "Always compare APY, not APR. APY shows your real return."
    }
  },
  {
    id: 2,
    title: "USDC vs USDT",
    subtitle: "Choosing the right stablecoin",
    category: "stablecoins",
    duration: "2 min",
    animation: {
      type: "svg",
      description: "Split-screen comparison with animated backing visualization"
    },
    content: {
      comparison: [
        {
          aspect: "Issuer",
          usdc: "Circle (US company)",
          usdt: "Tether (BVI registered)"
        },
        {
          aspect: "Backing",
          usdc: "100% cash + US Treasuries",
          usdt: "Mixed reserves"
        },
        {
          aspect: "Audits",
          usdc: "Monthly attestations",
          usdt: "Quarterly reports"
        },
        {
          aspect: "Market Cap",
          usdc: "~$25 billion",
          usdt: "~$80 billion"
        }
      ],
      verdict: "Both are generally considered safe. USDC is more transparent, USDT has more liquidity. Choose based on your preference for regulatory clarity vs trading flexibility."
    }
  },
  {
    id: 3,
    title: "How USDe Works",
    subtitle: "Delta-neutral synthetic dollars",
    category: "advanced",
    duration: "3 min",
    animation: {
      type: "svg",
      description: "Animated balance scale showing ETH long + short = neutral, with yield flowing in"
    },
    content: {
      concept: "USDe maintains its $1 value through a 'delta-neutral' strategy—holding ETH while simultaneously shorting it.",
      mechanism: [
        {
          step: 1,
          action: "User deposits collateral",
          detail: "ETH or stETH backing is acquired"
        },
        {
          step: 2,
          action: "Ethena stakes ETH",
          detail: "Earns ~4% staking yield"
        },
        {
          step: 3,
          action: "Short ETH perpetuals",
          detail: "Opens short position equal to ETH held"
        },
        {
          step: 4,
          action: "Collect funding",
          detail: "Shorts typically receive 8-15% APY from longs"
        }
      ],
      whyItWorks: "By being both long and short, price movements cancel out. You earn yield without price risk.",
      risks: [
        "Negative funding in bear markets",
        "Custodian risk",
        "Smart contract risk"
      ]
    }
  },
  {
    id: 4,
    title: "Soft Liquidation",
    subtitle: "How crvUSD protects you",
    category: "advanced",
    duration: "2 min",
    animation: {
      type: "svg",
      description: "Graph showing traditional liquidation cliff vs crvUSD's gradual conversion"
    },
    content: {
      problem: "Traditional DeFi: If your collateral drops below threshold, your entire position is liquidated instantly—often at the worst possible price.",
      solution: "crvUSD's LLAMMA: Your collateral gradually converts to crvUSD as prices fall, and converts back as prices rise. No sudden liquidation.",
      benefit: "Flash crashes that would wipe out other positions just cause temporary conversion in crvUSD. You stay in the game."
    }
  },
  {
    id: 5,
    title: "Supply vs Borrow APY",
    subtitle: "The lending spread explained",
    category: "yields",
    duration: "1 min",
    animation: {
      type: "svg",
      description: "Flow diagram: Lenders → Pool → Borrowers, with APY labels"
    },
    content: {
      explanation: "Lending protocols connect lenders (suppliers) with borrowers. The difference between what borrowers pay and lenders earn is the 'spread'—this funds the protocol.",
      example: {
        supplyAPY: "4% (what you earn)",
        borrowAPY: "5% (what borrowers pay)",
        spread: "1% (protocol revenue)"
      },
      tip: "Focus on Supply APY for passive earning. Borrow APY matters if you're taking loans."
    }
  },
  {
    id: 6,
    title: "Risk Levels Explained",
    subtitle: "Green, yellow, and red",
    category: "risk",
    duration: "2 min",
    animation: {
      type: "svg",
      description: "Three cards with risk indicators, each flipping to reveal factors"
    },
    content: {
      levels: [
        {
          level: "Low (Green)",
          meaning: "Battle-tested, fiat-backed, well-audited",
          examples: "USDC, USDT, Aave markets",
          suitable: "Conservative investors, large amounts"
        },
        {
          level: "Medium (Yellow)",
          meaning: "Newer mechanisms, more complexity, still reputable",
          examples: "USDe, crvUSD",
          suitable: "Informed investors comfortable with some risk"
        },
        {
          level: "High (Red)",
          meaning: "Experimental, unaudited, or highly volatile",
          examples: "New protocol launches, unaudited forks",
          suitable: "Small amounts, high risk tolerance only"
        }
      ],
      advice: "Diversify across risk levels. Don't put everything in high-yield options."
    }
  },
  {
    id: 7,
    title: "What is Aave?",
    subtitle: "The lending giant",
    category: "protocols",
    duration: "2 min",
    animation: {
      type: "svg",
      description: "Animated ghost mascot explaining lending/borrowing flow"
    },
    content: {
      overview: "Aave is like a decentralized bank. Deposit your assets to earn interest, or borrow against your collateral. No credit check, no paperwork—just smart contracts.",
      stats: {
        tvl: "$10+ billion deposited",
        launched: "2020",
        chains: "Ethereum, Polygon, Arbitrum, and more"
      },
      howToUse: [
        "Deposit USDC, USDT, or other assets",
        "Earn Supply APY automatically",
        "Withdraw anytime (no lockup)"
      ]
    }
  },
  {
    id: 8,
    title: "Gas Fees & Why You Pay $0",
    subtitle: "YieldX magic explained",
    category: "basics",
    duration: "1 min",
    animation: {
      type: "svg",
      description: "Traditional wallet paying gas vs YieldX sponsoring"
    },
    content: {
      problem: "Every blockchain transaction costs gas—$2 to $50+ on Ethereum. This makes small transactions impractical.",
      solution: "YieldX uses ERC-4337 (Account Abstraction) to sponsor your gas fees. We pay the network so you don't have to.",
      howItWorks: "Your smart wallet is funded by our paymaster. When you deposit or withdraw, we cover the transaction cost.",
      cost: "This costs us ~$0.10-$2.00 per transaction. We fund this through protocol partnerships."
    }
  },
  {
    id: 9,
    title: "Health Factor 101",
    subtitle: "Avoiding liquidation",
    category: "risk",
    duration: "2 min",
    animation: {
      type: "svg",
      description: "Gauge showing health factor moving from green to red"
    },
    content: {
      definition: "Health Factor = how safe your borrowed position is. Above 1 = safe. Below 1 = liquidation risk.",
      calculation: "(Collateral Value × Liquidation Threshold) ÷ Borrowed Value",
      example: {
        collateral: "$1,500 ETH",
        threshold: "80%",
        borrowed: "$800 USDC",
        healthFactor: "1.5 (safe)"
      },
      tips: [
        "Keep health factor above 1.5 for safety",
        "Add collateral if it drops below 1.25",
        "Set up alerts to monitor your position"
      ]
    }
  },
  {
    id: 10,
    title: "Your First Deposit",
    subtitle: "Step-by-step guide",
    category: "tutorial",
    duration: "2 min",
    animation: {
      type: "svg",
      description: "Walkthrough of deposit flow with highlighted UI elements"
    },
    content: {
      steps: [
        {
          step: 1,
          action: "Choose an asset",
          detail: "We recommend starting with USDC for lowest risk"
        },
        {
          step: 2,
          action: "Enter amount",
          detail: "Start small—even $10 works"
        },
        {
          step: 3,
          action: "Review details",
          detail: "Check APY, estimated earnings, and any fees"
        },
        {
          step: 4,
          action: "Confirm transaction",
          detail: "Sign with your wallet (gas-free!)"
        },
        {
          step: 5,
          action: "Start earning",
          detail: "Yield accrues every block (~12 seconds)"
        }
      ],
      tip: "You can withdraw anytime. There's no lockup period."
    }
  }
];
```

---

## 15. Audio Assets

### 15.1 Royalty-Free Audio Sources

```typescript
export const audioAssets = {
  ambient: {
    source: "Pixabay / Freesound (CC0)",
    description: "Soft, ethereal drone with subtle pads",
    duration: "Loop (60s)",
    volume: 0.15,
    fadeIn: 2000,
    suggestions: [
      "https://pixabay.com/music/ambient",
      "Search: 'ambient drone soft'",
      "Alternative: Generate with Suno AI (royalty-free plan)"
    ]
  },
  hover: {
    source: "Freesound (CC0)",
    description: "Subtle click/tick sound",
    duration: "50ms",
    volume: 0.3,
    suggestions: [
      "Search: 'soft ui click'",
      "Search: 'button hover subtle'"
    ]
  },
  click: {
    source: "Freesound (CC0)",
    description: "Satisfying pop/click",
    duration: "100ms",
    volume: 0.4,
    suggestions: [
      "Search: 'button click pop'",
      "Search: 'ui confirmation'"
    ]
  },
  success: {
    source: "Pixabay (CC0)",
    description: "Cheerful ascending chime",
    duration: "500ms",
    volume: 0.5,
    suggestions: [
      "Search: 'success chime'",
      "Search: 'achievement sound'"
    ]
  },
  error: {
    source: "Freesound (CC0)",
    description: "Soft warning tone",
    duration: "300ms",
    volume: 0.4,
    suggestions: [
      "Search: 'error soft'",
      "Search: 'notification warning'"
    ]
  },
  portal: {
    source: "Pixabay (CC0)",
    description: "Whoosh with reverb swell",
    duration: "1500ms",
    volume: 0.6,
    suggestions: [
      "Search: 'whoosh swell'",
      "Search: 'transition magic'"
    ]
  },
  notification: {
    source: "Freesound (CC0)",
    description: "Soft ding/bell",
    duration: "200ms",
    volume: 0.4,
    suggestions: [
      "Search: 'notification ding'",
      "Search: 'bell soft'"
    ]
  }
};

// Audio implementation with Howler.js
export const audioConfig = {
  masterVolume: 0.5,
  enabled: true,
  persistence: "localStorage",
  preload: ["hover", "click"],
  lazyLoad: ["ambient", "portal", "success"]
};
```

---

## Summary

This implementation plan is now **complete and approved** with:

### Confirmed Configuration
- **Background:** Cream (#FDF8F3)
- **Landing Text:** "WELCOME TO YIELDX"
- **Theme:** Light + Dark toggle
- **Audio:** Royalty-free sources
- **Animations:** Custom SVG designs
- **Charts:** Premium interactive

### New Sections Added
- **Complete About Page Content** - Problem, solution, how it works, features, security
- **5-Step Onboarding Flow** - From welcome to first deposit
- **Comprehensive DeFi Glossary** - 30+ terms with examples
- **10 Educational Cards** - For the Learn page
- **Audio Asset Guide** - Sources and implementation

### Total Implementation: 11 Phases over 10 Days

---

**Ready for implementation. Start with Phase 1: Foundation.**
