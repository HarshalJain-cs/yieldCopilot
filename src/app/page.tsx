"use client";

import dynamic from "next/dynamic";

// Dynamic imports with SSR disabled to prevent prerendering issues
const WalletConnect = dynamic(
  () => import("@/components/wallet-connect").then((mod) => mod.WalletConnect),
  { ssr: false }
);

const TokenBalances = dynamic(
  () => import("@/components/token-balances").then((mod) => mod.TokenBalances),
  { ssr: false }
);

// All Assets Dashboard - fetches ALL Aave V3 assets dynamically from contract
const AllAssetsDashboard = dynamic(
  () => import("@/components/all-assets-dashboard").then((mod) => mod.AllAssetsDashboard),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  YieldCopilot
                </h1>
                <p className="text-xs text-muted-foreground">
                  Real-time DeFi Yield Tracker
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Tracking: Aave V3 · Ethereum
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Wallet & Balances */}
          <div className="lg:col-span-1 space-y-6">
            <WalletConnect />
            <TokenBalances />
          </div>

          {/* Right Column - All Assets Dashboard */}
          <div className="lg:col-span-2">
            <AllAssetsDashboard />
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <span>📊</span>
              <h3 className="font-medium">Real-time Data</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              APY data is fetched directly from Aave V3 smart contracts and
              updated every block (~12 seconds).
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <span>🔒</span>
              <h3 className="font-medium">Non-Custodial</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your wallet, your keys. We never have access to your funds. All
              transactions are executed directly on-chain.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <span>⚡</span>
              <h3 className="font-medium">Developer API</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Access indexed yield data through our public REST API. Perfect for
              building trading bots and dashboards.
            </p>
          </div>
        </div>

        {/* Tracked Assets Legend */}
        <div className="mt-8 p-4 border border-border rounded-lg bg-card">
          <h3 className="font-medium mb-3">Tracked Stablecoins</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💵</span>
              <div>
                <p className="text-sm font-medium">USDC</p>
                <p className="text-xs text-muted-foreground">Fiat-Backed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💲</span>
              <div>
                <p className="text-sm font-medium">USDT</p>
                <p className="text-xs text-muted-foreground">Fiat-Backed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔷</span>
              <div>
                <p className="text-sm font-medium">USDe</p>
                <p className="text-xs text-muted-foreground">Synthetic (Ethena)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🌀</span>
              <div>
                <p className="text-sm font-medium">crvUSD</p>
                <p className="text-xs text-muted-foreground">DeFi-Native (Curve)</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 YieldCopilot. Built for IIT Roorkee Hackathon.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Powered by Thirdweb · Aave · Alchemy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
