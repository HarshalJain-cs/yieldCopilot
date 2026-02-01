"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomCursor } from "@/components/core/custom-cursor";
import { LiquidBackground } from "@/components/core/liquid-background";
import {
  AssetCard,
  AssetCardSkeleton,
} from "@/components/dashboard/asset-card";
import { GlassCard } from "@/components/dashboard/glass-card";
import { LiveChainStats } from "@/components/dashboard/live-chain-stats";
import { MarketOverview } from "@/components/dashboard/market-overview";
import {
  PortfolioCard,
  PortfolioCardSkeleton,
} from "@/components/dashboard/portfolio-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface AssetYieldData {
  symbol: string;
  name: string;
  address: string;
  category: string;
  supplyAPY: number;
  borrowAPY: number;
  utilizationRate: number;
  totalSupplied?: number;
  totalBorrowed?: number;
}

// Featured assets with their colors and risk levels
const featuredAssets = [
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "#2775CA",
    riskLevel: "low" as const,
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "#26A17B",
    riskLevel: "low" as const,
  },
  {
    symbol: "USDe",
    name: "Ethena USDe",
    color: "#00D4AA",
    riskLevel: "medium" as const,
  },
  {
    symbol: "crvUSD",
    name: "Curve USD",
    color: "#FF6B9D",
    riskLevel: "medium" as const,
  },
];

export default function DashboardPage() {
  const [yields, setYields] = useState<AssetYieldData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYields() {
      try {
        const response = await fetch("/api/yields");
        if (!response.ok) throw new Error("Failed to fetch yields");
        const data = await response.json();
        setYields(data.assets || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchYields();
    // Refresh every 30 seconds
    const interval = setInterval(fetchYields, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get featured asset data
  const getFeaturedAssetData = (symbol: string) => {
    return yields.find((y) => y.symbol.toUpperCase() === symbol.toUpperCase());
  };

  // Calculate portfolio stats (demo values for now)
  const portfolioStats = {
    totalValue: 124532.0,
    totalEarnings: 3247.82,
    percentChange: 2.34,
    assetCount: yields.length,
  };

  // Get market assets for overview
  const marketAssets = yields.slice(0, 10).map((asset) => ({
    symbol: asset.symbol,
    supplyAPY: asset.supplyAPY,
    borrowAPY: asset.borrowAPY,
    change: (Math.random() - 0.5) * 2, // Demo random change
  }));

  return (
    <div className="min-h-screen relative">
      <LiquidBackground preset="Plasma" />
      <CustomCursor />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-display-md mb-2">Dashboard</h1>
          <p className="text-white/70">
            Track your yields and discover new opportunities
          </p>
        </div>

        {/* Live On-Chain Stats */}
        <div className="mb-12 glass-card rounded-2xl p-8">
          <LiveChainStats refreshInterval={5000} />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-100 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Portfolio Overview - Large Card */}
          {loading ? (
            <PortfolioCardSkeleton />
          ) : (
            <PortfolioCard {...portfolioStats} />
          )}

          {/* Featured Asset Cards */}
          {loading
            ? [...Array(4)].map((_, i) => <AssetCardSkeleton key={i} />)
            : featuredAssets.map((asset) => {
                const data = getFeaturedAssetData(asset.symbol);
                return (
                  <AssetCard
                    key={asset.symbol}
                    symbol={asset.symbol}
                    name={asset.name}
                    supplyAPY={data?.supplyAPY ?? 0}
                    change24h={(Math.random() - 0.3) * 1}
                    riskLevel={asset.riskLevel}
                    color={asset.color}
                  />
                );
              })}

          {/* Quick Actions */}
          <QuickActions />

          {/* Market Overview */}
          <MarketOverview assets={marketAssets} loading={loading} />

          {/* Education Peek */}
          <GlassCard className="col-span-2 lg:col-span-1 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-lavender)] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-[var(--brand-lavender-deep)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">New to DeFi?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn about yields, risks, and strategies with our interactive
                  guides.
                </p>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-lavender-deep)] hover:text-[var(--brand-lavender)] transition-colors"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* All Assets Table */}
        <div className="mt-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">All Aave Markets</h2>
              <span className="text-sm text-muted-foreground">
                {yields.length} assets tracked
              </span>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-muted rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-[var(--glass-border)]">
                      <th className="pb-3 font-medium">Asset</th>
                      <th className="pb-3 font-medium text-right">
                        Supply APY
                      </th>
                      <th className="pb-3 font-medium text-right">
                        Borrow APY
                      </th>
                      <th className="pb-3 font-medium text-right">
                        Utilization
                      </th>
                      <th className="pb-3 font-medium text-right">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yields.slice(0, 15).map((asset) => (
                      <tr
                        key={asset.symbol}
                        className="border-b border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-colors cursor-pointer"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent-lavender)] flex items-center justify-center text-sm font-bold">
                              {asset.symbol.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{asset.symbol}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                                {asset.name || asset.symbol}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <span className="text-data text-green-600 font-medium">
                            {asset.supplyAPY.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className="text-data text-red-500 font-medium">
                            {asset.borrowAPY.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[var(--brand-lavender)] rounded-full"
                                style={{ width: `${asset.utilizationRate}%` }}
                              />
                            </div>
                            <span className="text-data text-sm">
                              {asset.utilizationRate.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--accent-lavender)] text-[var(--brand-lavender-deep)]">
                            {asset.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
