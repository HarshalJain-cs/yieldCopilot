"use client";

import { ArrowUpRight, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { GlassCard } from "./glass-card";

interface PortfolioCardProps {
  totalValue: number;
  totalEarnings: number;
  percentChange: number;
  assetCount: number;
}

// Animated counter for large numbers
function AnimatedValue({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className="text-5xl font-bold text-data text-white drop-shadow-lg">
      {prefix}
      {displayValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </span>
  );
}

// Animated sparkline bars
function AnimatedSparkline() {
  const heights = [40, 55, 45, 65, 50, 70, 60, 80, 75, 90];

  return (
    <div className="flex items-end gap-1 h-12">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-2 rounded-full bg-gradient-to-t from-purple-400 to-pink-400"
          style={{
            height: `${height}%`,
            opacity: 0.5 + i * 0.05,
            animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`
          }}
        />
      ))}
    </div>
  );
}

export function PortfolioCard({
  totalValue,
  totalEarnings,
  percentChange,
  assetCount,
}: PortfolioCardProps) {
  const isPositive = percentChange >= 0;

  return (
    <GlassCard className="col-span-2 row-span-2 p-8">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Portfolio Overview</h2>
              <p className="text-sm text-white/60">
                {assetCount} assets tracked
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
          >
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Total Value with animation */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-white/60 mb-2">Total Value</p>
          <div className="flex items-baseline gap-4 flex-wrap">
            <AnimatedValue value={totalValue} />
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${isPositive
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
                }`}
            >
              <TrendingUp
                className={`w-4 h-4 ${!isPositive && "rotate-180"}`}
              />
              {isPositive ? "+" : ""}
              {percentChange.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Earnings & Chart */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Earnings</p>
              <p className="text-2xl font-semibold text-data text-green-400">
                +$
                {totalEarnings.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            {/* Animated sparkline */}
            <AnimatedSparkline />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function PortfolioCardSkeleton() {
  return (
    <div className="glass-card col-span-2 row-span-2 p-8">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
            <div>
              <div className="w-32 h-5 skeleton-shimmer rounded mb-2" />
              <div className="w-24 h-4 skeleton-shimmer rounded" />
            </div>
          </div>
          <div className="w-28 h-10 skeleton-shimmer rounded-full" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="w-24 h-4 skeleton-shimmer rounded mb-3" />
          <div className="w-64 h-12 skeleton-shimmer rounded" />
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="w-24 h-4 skeleton-shimmer rounded mb-2" />
              <div className="w-32 h-8 skeleton-shimmer rounded" />
            </div>
            <div className="flex items-end gap-1 h-12">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-2 h-8 skeleton-shimmer rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
