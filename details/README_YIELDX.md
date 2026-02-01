# 🌸 YIELDX — Next-Generation DeFi Yield Interface

<div align="center">
  <img src="/public/images/yieldx-logo.svg" alt="YIELDX Logo" width="200" />
  
  **The Bloomberg Terminal for DeFi, designed for humans.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org/)
  [![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.170-black?logo=three.js)](https://threejs.org/)
  [![Thirdweb](https://img.shields.io/badge/Thirdweb-v5-purple)](https://thirdweb.com/)
  
  [Live Demo](#) • [Documentation](#features) • [Contributing](#contributing)
</div>

---

## ✨ Features

### 🎨 Premium Visual Experience
- **Light Pastel Glassmorphism** — Cream, lavender, mint color palette with frosted glass effects
- **Custom Animated Cursor** — Physics-based glowing ring that follows your movement
- **Three.js Helix Background** — Rotating glass panels on the About page
- **Micro-Interactions** — Tilt cards, glow borders, swipe buttons

### 👁️ Immersive Landing
- **Eye Animation** — Dual SVG eyes that follow your cursor
- **Proximity-Based Eyelids** — Eyes open as you approach the Enter button
- **Heart Transformation** — Pupils become hearts on hover

### 📊 Intelligent Dashboard
- **Bento Grid Layout** — Scannable, modular interface
- **Real-Time Data** — WebSocket-powered yield updates
- **Smart Asset Cards** — USDC, USDT, USDe, crvUSD, AAVE tracking
- **Risk Indicators** — Visual health bars and trust badges

### 📱 Educational Feed
- **Instagram-Style Scroll** — Vertical video snap navigation
- **Auto-Play Logic** — Videos play when scrolled into view
- **DeFi Explainers** — Beginner-friendly content for each asset

### 🔐 Frictionless Onboarding
- **Google Social Login** — No seed phrases, no extensions
- **Smart Account (ERC-4337)** — Gasless transactions
- **Non-Custodial** — You control your keys, always

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or later
- pnpm 9.x (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/HarshalJain-cs/yieldCopilot.git
cd yieldCopilot

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
# Thirdweb (Required)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id

# Supabase (Required for real-time)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Upstash Redis (Required for caching)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# RPC (Required for blockchain)
ALCHEMY_API_KEY=your_alchemy_key
```

### Development

```bash
# Start the development server
pnpm dev

# Open http://localhost:3000
```

### Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

---

## 🏗️ Project Structure

```
yieldCopilot/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (landing)/          # Eye animation entry
│   │   ├── dashboard/          # Bento grid dashboard
│   │   ├── about/              # Helix background + explainer
│   │   └── learn/              # Instagram-style feed
│   │
│   ├── components/
│   │   ├── animations/         # Eye, helix, liquid effects
│   │   ├── ui/                 # Cursor, cards, buttons
│   │   ├── layout/             # Navbar, grid, footer
│   │   ├── defi/               # Asset cards, yields
│   │   └── education/          # Video feed components
│   │
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, shaders, config
│   └── assets/                 # Videos, reference materials
│
├── public/                     # Static assets
└── docs/                       # API documentation
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Preview |
|-------|-----|---------|
| Cream | `#FDF8F3` | 🟡 Primary background |
| Blush | `#F8D8D8` | 🩷 Warm accent |
| Lavender | `#E8E0F0` | 💜 Brand color |
| Mint | `#E0F5E8` | 💚 Success/growth |
| Sky | `#E0F0F8` | 💙 Information |
| Peach | `#F8E8E0` | 🧡 Attention |

### Typography

- **Display:** DM Sans (Headings)
- **Body:** Inter (Text)
- **Mono:** JetBrains Mono (Data)

### Glass Effect

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
}
```

---

## 🧩 Key Components

### Custom Cursor

```tsx
import { CustomCursor } from '@/components/ui/custom-cursor';

// Wraps your app, tracks mouse globally
<CustomCursor easing={0.08} size={60} />
```

### Eye Animation

```tsx
import { EyeAnimation } from '@/components/animations/eye-animation';

// Proximity-based eyelid control
<EyeAnimation 
  proximityRadius={300}
  animationSpeed={0.02}
  targetRef={enterButtonRef}
/>
```

### Glow Card

```tsx
import { GlowCard } from '@/components/ui/glow-card';

// Border beam follows mouse
<GlowCard 
  glowColor="#B7B0F9"
  glowSize={300}
  hoverOnly
>
  <AssetDetails />
</GlowCard>
```

### Tilt Card

```tsx
import { TiltCard } from '@/components/ui/tilt-card';

// 3D perspective on hover
<TiltCard maxTiltX={14} maxTiltY={18}>
  <TokenInfo />
</TiltCard>
```

---

## 📊 Tracked Assets

| Asset | Type | Risk | Special Features |
|-------|------|------|------------------|
| **USDC** | Fiat-backed | 🟢 Low | Circle attestations |
| **USDT** | Fiat-backed | 🟢 Low | Tether reserves |
| **USDe** | Synthetic | 🟡 Medium | Delta-neutral yield |
| **crvUSD** | Overcollateralized | 🟡 Medium | LLAMMA soft liquidation |
| **AAVE** | Lending | 🟢 Low | Variable rates |

---

## 🔌 API Reference

### REST Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/yields` | GET | All assets with current APY |
| `/api/yields/{symbol}` | GET | Single asset details |
| `/api/yields/best` | GET | Highest yielding asset |
| `/api/yields/history/{symbol}` | GET | 30-day historical data |

### WebSocket

Connect to Supabase Realtime channel `yields` for live updates:

```typescript
const channel = supabase.channel('yields');
channel.on('broadcast', { event: 'update' }, ({ payload }) => {
  setYields(payload.data);
});
```

---

## 🎬 Animation References

The following Framer components inspired our animations:

| Component | Usage in YIELDX |
|-----------|-----------------|
| AnimatedLiquidBackground | Dashboard backdrop shader |
| Tilt_Card_Grid | About page asset cards |
| GlowCard | Border beam effect |
| SwipeLettersButton | "Get in Touch" CTA |
| Wavy Nav link | Navigation hover effect |
| Tsunami | Video thumbnail distortion |

---

## 🛠️ Development

### Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **3D:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Blockchain:** Thirdweb SDK v5
- **Database:** Supabase (PostgreSQL)
- **Cache:** Upstash Redis
- **Deployment:** Vercel

### Commands

```bash
# Development
pnpm dev          # Start dev server

# Quality
pnpm lint         # Run Biome linter
pnpm format       # Format code

# Build
pnpm build        # Production build
pnpm start        # Start production
```

---

## 📁 Assets

Located in `/assets/`:

| File | Description |
|------|-------------|
| `assets-main/` | GitHub assets repository |
| `Crypto_Coin_Animation_Generation.mp4` | 3D token animation |
| `Recording *.mp4` | UI/UX reference recordings |

### Eye Animation Source
```
assets/assets-main/assets-main/src/App.tsx
```

### Cursor Source  
```
assets/assets-main/assets-main/mouse/Kimi_Agent_Mouse Pointer Speed Tweaks/app/src/App.tsx
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Thirdweb** — Wallet infrastructure
- **Aave** — DeFi protocol data
- **Framer** — Animation inspiration
- **Three.js** — 3D graphics

---

<div align="center">
  <strong>Built with 💜 for IIT Roorkee Hackathon</strong>
  <br />
  <sub>© 2026 YIELDX. All rights reserved.</sub>
</div>
