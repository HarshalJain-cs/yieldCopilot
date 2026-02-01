"use client";

import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface ChainStats {
  blockNumber: number;
  gasPrice: string;
  transactions: number;
  smartContracts: number;
  wallets: number;
  subBlockLatency: string;
}

interface LiveStatsProps {
  className?: string;
  refreshInterval?: number;
}

// Animated counting digit
function CountingLastDigit() {
  const [digit, setDigit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDigit((prev) => (prev + 1) % 10);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return <span className="inline-block">{digit}</span>;
}

// Animated stat value
function AnimatedStat({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.floor(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
        <span className="text-white/60 text-xs">
          {label}
        </span>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-white font-mono drop-shadow-lg">
        {displayValue.toLocaleString()}
      </p>
    </div>
  );
}

export function LiveChainStats({
  className = "",
  refreshInterval = 5000,
}: LiveStatsProps) {
  const [stats, setStats] = useState<ChainStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/chain-stats");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        if (isMounted && data.success) {
          setStats(data.stats);
          setIsLive(true);
        }
      } catch (err) {
        if (isMounted) {
          setIsLive(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, refreshInterval);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [refreshInterval]);

  if (loading) {
    return (
      <div className={`${className} py-6`}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-64 skeleton-shimmer rounded" />
          <div className="h-6 w-32 skeleton-shimmer rounded" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={`${className} text-center py-6`}>
        <p className="text-white/60">Loading demo data...</p>
      </div>
    );
  }

  // Format transaction number without last digit (we'll animate that separately)
  const transactionBase = Math.floor(stats.transactions / 10);

  return (
    <div className={`${className} text-center py-4`}>
      {/* Header with gradient text */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
          Built for{" "}
        </span>
        <span className="text-green-400 drop-shadow-lg shadow-green-400/50">
          onchain{" "}
        </span>
        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
          markets.
        </span>
      </h2>

      {/* Block Number with live indicator */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span
          className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 animate-pulse shadow-lg shadow-green-400/50" : "bg-red-400"}`}
        />
        <span className="text-white font-mono text-base">
          {stats.blockNumber.toLocaleString()}
        </span>
      </div>

      {/* Sub-block info */}
      <p className="text-white/50 text-xs mb-6">
        {stats.subBlockLatency} sub-blocks
        <br />
        Made transparent in a TEE
      </p>

      {/* Main Stats with animations */}
      <div className="flex flex-wrap items-start justify-center gap-12 md:gap-16 mb-4">
        {/* Transactions - with counting last digit */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
            <span className="text-white/60 text-xs">
              Transactions
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white font-mono drop-shadow-lg">
            {transactionBase.toLocaleString()}
            <CountingLastDigit />
          </p>
        </div>

        {/* Smart Contracts */}
        <AnimatedStat value={stats.smartContracts} label="Smart Contracts" />

        {/* Wallets */}
        <AnimatedStat value={stats.wallets} label="Wallets" />
      </div>

      {/* Gas Price */}
      <div className="flex items-center justify-center gap-1.5 text-white/50 text-xs">
        <Activity className="w-3 h-3" />
        <span>Gas: {stats.gasPrice} Gwei</span>
      </div>
    </div>
  );
}

export default LiveChainStats;
