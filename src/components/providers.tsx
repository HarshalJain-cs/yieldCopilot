"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { AaveProvider, AaveClient, production } from "@aave/react";
import type { ReactNode } from "react";

// Create the Aave client for production (mainnet)
const aaveClient = AaveClient.create({
  environment: production,
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThirdwebProvider>
      <AaveProvider client={aaveClient}>{children}</AaveProvider>
    </ThirdwebProvider>
  );
}
