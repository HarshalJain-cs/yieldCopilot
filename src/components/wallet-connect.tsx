"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChainConfig, type SupportedChainId } from "@/lib/chains-config";
import { thirdwebClient } from "@/lib/thirdweb";

interface WalletConnectProps {
  chainId?: SupportedChainId;
  variant?: "default" | "compact";
}

export function WalletConnect({
  chainId = "sepolia",
  variant = "compact",
}: WalletConnectProps) {
  const account = useActiveAccount();
  const config = getChainConfig(chainId);

  // Compact variant for navbar
  if (variant === "compact") {
    return (
      <ConnectButton
        client={thirdwebClient}
        chain={config.chain}
        chains={[config.chain]}
        connectButton={{
          label: "Connect",
          className:
            "!bg-[var(--brand-lavender-deep)] !text-white !rounded-full !px-5 !py-2.5 !font-medium hover:!bg-[var(--brand-lavender)] !transition-all !text-sm !shadow-lg hover:!shadow-[var(--glow-lavender)]",
        }}
        detailsButton={{
          className:
            "!bg-[var(--glass-bg)] !backdrop-blur-lg !border !border-[var(--glass-border)] !text-foreground !rounded-full !px-4 !py-2 !font-medium hover:!bg-[var(--glass-bg-hover)] !transition-all !text-sm",
        }}
        switchButton={{
          label: "Switch",
          className:
            "!bg-amber-500 !text-white !rounded-full !px-4 !py-2 !font-medium hover:!bg-amber-600 !transition-colors !text-sm",
        }}
      />
    );
  }

  // Default card variant
  return (
    <Card className="w-full glass-card border-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <ConnectButton
            client={thirdwebClient}
            chain={config.chain}
            chains={[config.chain]}
            switchButton={{
              label: "Switch Network",
              className:
                "!bg-amber-500 !text-white !rounded-xl !px-4 !py-3 !font-medium hover:!bg-amber-600 transition-colors !w-full",
            }}
            connectButton={{
              label: "Connect Wallet",
              className:
                "!bg-[var(--brand-lavender-deep)] !text-white !rounded-xl !px-4 !py-3 !font-medium hover:!bg-[var(--brand-lavender)] transition-colors !w-full",
            }}
            detailsButton={{
              className:
                "!bg-[var(--glass-bg)] !text-foreground !rounded-xl !px-4 !py-3 !border !border-[var(--glass-border)] !w-full",
            }}
          />
          {account && (
            <div className="p-3 rounded-xl bg-[var(--accent-mint)]/30 border border-[var(--success)]/20">
              <p className="text-sm text-muted-foreground">Connected</p>
              <p className="font-mono text-sm font-medium">
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
