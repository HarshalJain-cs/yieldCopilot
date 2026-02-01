/**
 * Live On-Chain Stats API - DEMO MODE
 *
 * Returns simulated Ethereum blockchain statistics
 * with dynamic values for a realistic feel.
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ChainStats {
  blockNumber: number;
  gasPrice: string;
  transactions: number;
  smartContracts: number;
  wallets: number;
  subBlockLatency: string;
}

// Generate realistic demo stats that update dynamically
const getDemoStats = (): ChainStats => {
  // Use current timestamp to create dynamic-looking numbers
  const now = Date.now();
  const baseTime = 1706400000000; // Fixed reference point

  // Simulate block progression (~12 seconds per block)
  const baseBlock = 21750000;
  const elapsedBlocks = Math.floor((now - baseTime) / 12000);

  // Add micro-variations for realism
  const gasVariation = 18 + Math.random() * 15; // 18-33 Gwei typical range

  return {
    blockNumber: baseBlock + elapsedBlocks,
    gasPrice: gasVariation.toFixed(2),
    transactions: 2678945820 + Math.floor((now - baseTime) / 1000) + Math.floor(Math.random() * 10),
    smartContracts: 67845231 + Math.floor((now - baseTime) / 50000),
    wallets: 312458976 + Math.floor((now - baseTime) / 10000),
    subBlockLatency: "200ms",
  };
};

export async function GET() {
  const startTime = Date.now();
  const stats = getDemoStats();
  const latencyMs = Date.now() - startTime + Math.floor(Math.random() * 50); // Simulate network latency

  return NextResponse.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
      chain: "ethereum",
      chainId: 1,
      latencyMs,
      dataSource: "demo",
      stats,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Latency-Ms": latencyMs.toString(),
      },
    },
  );
}
