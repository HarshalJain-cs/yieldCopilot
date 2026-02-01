"use client";

import { GlassCard } from "./glass-card";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

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
    bg: "bg-[var(--accent-mint)]",
    text: "text-green-700",
    dot: "bg-[var(--risk-low)]",
  },
  medium: {
    label: "Medium",
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-[var(--risk-medium)]",
  },
  high: {
    label: "High Risk",
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-[var(--risk-high)]",
  },
};

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
    <GlassCard onClick={onClick} className="p-5">
      <div className="flex items-start justify-between mb-4">
        {/* Asset icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{ backgroundColor: color }}
        >
          {symbol.charAt(0)}
        </div>

        {/* Risk indicator */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${risk.bg} ${risk.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
          {risk.label}
        </div>
      </div>

      {/* Asset info */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">{symbol}</h3>
        <p className="text-sm text-muted-foreground">{name}</p>
      </div>

      {/* APY display */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Supply APY</p>
          <p className="text-2xl font-bold text-data" style={{ color }}>
            {supplyAPY.toFixed(2)}%
          </p>
        </div>

        {/* 24h change */}
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositiveChange ? "text-green-600" : "text-red-500"
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

// Skeleton loading state
export function AssetCardSkeleton() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-muted" />
        <div className="w-20 h-6 rounded-full bg-muted" />
      </div>
      <div className="mb-4">
        <div className="w-16 h-5 bg-muted rounded mb-2" />
        <div className="w-24 h-4 bg-muted rounded" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="w-16 h-3 bg-muted rounded mb-2" />
          <div className="w-20 h-8 bg-muted rounded" />
        </div>
        <div className="w-16 h-5 bg-muted rounded" />
      </div>
    </div>
  );
}
