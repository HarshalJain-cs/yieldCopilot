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

// Slow counting last digit animation - 0,1,2,3,4,5,6,7,8,9
function CountingLastDigit() {
  const [digit, setDigit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDigit((prev) => (prev + 1) % 10);
    }, 800); // Slow counting - 0.8 seconds per digit

    return () => clearInterval(interval);
  }, []);

  return <span>{digit}</span>;
}

export function LiveChainStats({
  className = "",
  refreshInterval = 5000,
}: LiveStatsProps) {
  const [stats, setStats] = useState<ChainStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          setError(null);
          setIsLive(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error");
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
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-64 bg-[var(--foreground)]/10 rounded" />
          <div className="h-6 w-32 bg-[var(--foreground)]/10 rounded" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={`${className} text-center text-red-500 py-6`}>
        <p>Unable to fetch live data</p>
      </div>
    );
  }

  // Format transaction number without last digit (we'll animate that separately)
  const transactionBase = Math.floor(stats.transactions / 10);

  return (
    <div className={`${className} text-center py-4`}>
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        <span className="text-[#ff00ff]">Built for </span>
        <span className="text-[#00ff00]">onchain </span>
        <span className="text-[#ff00ff]">markets.</span>
      </h2>

      {/* Block Number */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span
          className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
        />
        <span className="text-[var(--foreground)] font-mono text-base">
          {stats.blockNumber.toLocaleString()}
        </span>
      </div>

      {/* Sub-block info */}
      <p className="text-[var(--muted-foreground)] text-xs mb-6">
        {stats.subBlockLatency} sub-blocks
        <br />
        Made transparent in a TEE
      </p>

      {/* Main Stats */}
      <div className="flex flex-wrap items-start justify-center gap-12 md:gap-16 mb-4">
        {/* Transactions - with counting last digit */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[var(--muted-foreground)] text-xs">
              Transactions
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[var(--foreground)] font-mono">
            {transactionBase.toLocaleString()}
            <CountingLastDigit />
          </p>
        </div>

        {/* Smart Contracts */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[var(--muted-foreground)] text-xs">
              Smart Contracts
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[var(--foreground)] font-mono">
            {stats.smartContracts.toLocaleString()}
          </p>
        </div>

        {/* Wallets */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[var(--muted-foreground)] text-xs">
              Wallets
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[var(--foreground)] font-mono">
            {stats.wallets.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Gas Price */}
      <div className="flex items-center justify-center gap-1.5 text-[var(--muted-foreground)] text-xs">
        <Activity className="w-3 h-3" />
        <span>Gas: {stats.gasPrice} Gwei</span>
      </div>
    </div>
  );
}

export default LiveChainStats;
