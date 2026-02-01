"use client";

import { GlassCard } from "./glass-card";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Bell } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: ArrowDownToLine,
      label: "Deposit",
      description: "Add funds to earn yield",
      color: "var(--brand-lavender)",
    },
    {
      icon: ArrowUpFromLine,
      label: "Withdraw",
      description: "Withdraw your earnings",
      color: "var(--asset-usdc)",
    },
    {
      icon: ArrowLeftRight,
      label: "Swap",
      description: "Exchange stablecoins",
      color: "var(--asset-usde)",
    },
    {
      icon: Bell,
      label: "Set Alert",
      description: "Get notified on rate changes",
      color: "var(--warning)",
    },
  ];

  return (
    <GlassCard className="col-span-2 p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] transition-all duration-200 hover:scale-[1.02] group"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${action.color}20` }}
            >
              <action.icon
                className="w-5 h-5"
                style={{ color: action.color }}
              />
            </div>
            <span className="font-medium text-sm">{action.label}</span>
            <span className="text-xs text-muted-foreground text-center hidden md:block">
              {action.description}
            </span>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
