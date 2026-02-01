"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
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

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_accounts",
          })) as string[];
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
        }
      }
    };
    checkConnection();

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
        }
      });
    }
  }, []);

  const connect = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet to connect!");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
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
      Connect
    </button>
  );
}

// TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (
        event: string,
        callback: (...args: unknown[]) => void,
      ) => void;
    };
  }
}
