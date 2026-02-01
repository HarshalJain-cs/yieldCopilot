"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { WalletProvider } from "@/components/wallet-provider";
import { CircleCursor } from "@/components/core/circle-cursor";
import { LiquidBackground } from "@/components/core/liquid-background";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Observer for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkDarkMode);
    };
  }, []);

  return (
    <WalletProvider>
      <CircleCursor />
      {isDarkMode && <LiquidBackground preset="Prism" speed={25} />}
      {children}
    </WalletProvider>
  );
}
