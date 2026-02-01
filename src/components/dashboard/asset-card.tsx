"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { GlassCard } from "./glass-card";

interface AssetCardProps {
  symbol: string;
  name: string;
  supplyAPY: number;
  change24h?: number;
  riskLevel: "low" | "medium" | "high";
  color: string;
  onClick?: () => void;
}

const riskConfig = {
  low: {
    label: "Low Risk",
    bg: "bg-green-500/20",
    text: "text-green-300",
    dot: "bg-green-400",
  },
  medium: {
    label: "Medium",
    bg: "bg-amber-500/20",
    text: "text-amber-300",
    dot: "bg-amber-400",
  },
  high: {
    label: "High Risk",
    bg: "bg-red-500/20",
    text: "text-red-300",
    dot: "bg-red-400",
  },
};

// Animated APY counter
function AnimatedAPY({ value, color }: { value: number; color: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span
      className="text-2xl font-bold text-data"
      style={{ color }}
    >
      {displayValue.toFixed(2)}%
    </span>
  );
}

export function AssetCard({
  symbol,
  name,
  supplyAPY,
  change24h = 0,
  riskLevel,
  color,
  onClick,
}: AssetCardProps) {
  const risk = riskConfig[riskLevel];
  const isPositiveChange = change24h >= 0;

  return (
    <GlassCard onClick={onClick} className="p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        {/* Asset icon with glow */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}40`
          }}
        >
          {symbol.charAt(0)}
        </div>

        {/* Risk indicator with pulse */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${risk.bg} ${risk.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot} animate-pulse`} />
          {risk.label}
        </div>
      </div>

      {/* Asset info */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-white">{symbol}</h3>
        <p className="text-sm text-white/60">{name}</p>
      </div>

      {/* APY display with animation */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-white/60 mb-1">Supply APY</p>
          <AnimatedAPY value={supplyAPY} color={color} />
        </div>

        {/* 24h change */}
        <div
          className={`flex items-center gap-1 text-sm font-medium ${isPositiveChange ? "text-green-400" : "text-red-400"
            }`}
        >
          {isPositiveChange ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>
            {isPositiveChange ? "+" : ""}
            {change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </GlassCard>
  );
}

// Skeleton loading state with shimmer
export function AssetCardSkeleton() {
  return (
    <div className="glass-card p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
        <div className="w-20 h-6 rounded-full skeleton-shimmer" />
      </div>
      <div className="mb-4">
        <div className="w-16 h-5 skeleton-shimmer rounded mb-2" />
        <div className="w-24 h-4 skeleton-shimmer rounded" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="w-16 h-3 skeleton-shimmer rounded mb-2" />
          <div className="w-20 h-8 skeleton-shimmer rounded" />
        </div>
        <div className="w-16 h-5 skeleton-shimmer rounded" />
      </div>
    </div>
  );
}
