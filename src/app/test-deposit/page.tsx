"use client";

import { useEffect, useState } from "react";
import { WalletConnect } from "@/components/wallet-connect";
import { PoolCardSimple } from "@/components/pool-card-simple";
import { ChainSelector } from "@/components/chain-selector";
import { AIChat } from "@/components/ai-chat";
import { useActiveAccount } from "thirdweb/react";
import { type SupportedChainId, CHAIN_NAMES } from "@/lib/chains-config";

interface Asset {
  symbol: string;
  category: string;
  supplyAPY: number;
}

export default function TestDepositPage() {
  const account = useActiveAccount();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChain, setSelectedChain] = useState<SupportedChainId>('baseSepolia');

  useEffect(() => {
    fetch("/api/yields")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const supported = data.assets.filter((a: Asset) =>
            ["USDC", "USDT", "DAI", "WETH"].includes(a.symbol)
          );
          setAssets(supported.slice(0, 4));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch yields:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">YieldCopilot - Test Deposits</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Deposit to Aave V3 on {CHAIN_NAMES[selectedChain]}
            </p>
          </div>
          <WalletConnect chainId={selectedChain} />
        </div>

        {/* Chain Selector */}
        <div className="mb-6">
          <ChainSelector selectedChain={selectedChain} onChainChange={setSelectedChain} />
        </div>

        {account && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200">
              ✅ Wallet: {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </p>
          </div>
        )}

        {!account && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">⚠️ Connect wallet to test</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          ) : assets.length > 0 ? (
            assets.map((asset) => (
              <PoolCardSimple
                key={asset.symbol}
                symbol={asset.symbol}
                category={asset.category}
                supplyAPY={asset.supplyAPY}
                chainId={selectedChain}
                riskScore={asset.symbol === "USDC" ? 15 : 30}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No pools</p>
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-200">How to Test:</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-300">
            <li>Select network (Base Sepolia recommended = free + available, Base = cheap gas ~$0.10)</li>
            <li>Connect wallet</li>
            <li>Switch to correct network in your wallet</li>
            <li>For testnets: Get free tokens from faucet links above</li>
            <li>Choose a pool (USDC, USDT, or WETH)</li>
            <li>Enter amount (start with 1-10)</li>
            <li>Click Deposit - sign 2 transactions (Approve + Supply)</li>
            <li>Check wallet for aTokens (aUSDC, aWETH, etc)!</li>
          </ol>
          <p className="mt-4 text-sm text-blue-700 dark:text-blue-300">
            💡 Tip: Base Mainnet has very low gas fees (~$0.10 vs ~$5 on Ethereum), great for testing with small real amounts!
          </p>
        </div>

        {/* AI Chat Assistant */}
        <AIChat />
      </div>
    </div>
  );
}
