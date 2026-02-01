"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletState | null>(null);

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

// Demo wallet address for display
const DEMO_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73";

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Demo connect - simulates wallet connection
  const connect = async () => {
    setIsConnecting(true);

    // Simulate connection delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    setAddress(DEMO_WALLET_ADDRESS);
    setIsConnecting(false);
  };

  const disconnect = () => {
    setAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

// Simple wallet connect button
export function WalletConnectButton() {
  const { address, isConnected, isConnecting, connect, disconnect } =
    useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnecting) {
    return (
      <button
        type="button"
        disabled
        className="flex items-center gap-2 bg-[var(--brand-lavender-deep)] text-white rounded-full px-5 py-2.5 font-medium opacity-70 text-sm cursor-wait"
      >
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={disconnect}
        className="flex items-center gap-2 bg-[var(--glass-bg)] backdrop-blur-lg border border-[var(--glass-border)] text-foreground rounded-full px-4 py-2 font-medium hover:bg-[var(--glass-bg-hover)] transition-all text-sm"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        {formatAddress(address)}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={connect}
      className="flex items-center gap-2 bg-[var(--brand-lavender-deep)] text-white rounded-full px-5 py-2.5 font-medium hover:bg-[var(--brand-lavender)] transition-all text-sm shadow-lg hover:shadow-[var(--glow-lavender)]"
    >
      Connect Wallet
    </button>
  );
}
