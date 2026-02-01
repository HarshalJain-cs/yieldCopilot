"use client";

import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  DollarSign,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CustomCursor } from "@/components/core/custom-cursor";
import { LiquidBackground } from "@/components/core/liquid-background";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface EducationCard {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  icon: React.ElementType;
  color: string;
  content: {
    mainPoint: string;
    explanation: string;
    example?: {
      scenario: string;
      result: string;
    };
    tips?: string[];
  };
}

const educationCards: EducationCard[] = [
  {
    id: 1,
    title: "What is APY?",
    subtitle: "Understanding compound interest",
    category: "basics",
    duration: "1 min",
    icon: TrendingUp,
    color: "var(--brand-lavender)",
    content: {
      mainPoint:
        "APY (Annual Percentage Yield) tells you how much you'll earn in a year, including compound interest.",
      explanation:
        "When you earn interest on your interest, your money grows faster. That's compounding. APY accounts for this, giving you the true picture of your earnings.",
      example: {
        scenario: "$1,000 at 5% APY for 1 year",
        result: "$1,051.16 (vs $1,050 with simple interest)",
      },
      tips: ["Always compare APY, not APR", "Higher APY = more earnings"],
    },
  },
  {
    id: 2,
    title: "USDC vs USDT",
    subtitle: "Choosing the right stablecoin",
    category: "stablecoins",
    duration: "2 min",
    icon: DollarSign,
    color: "var(--asset-usdc)",
    content: {
      mainPoint:
        "Both are fiat-backed stablecoins, but they differ in transparency and backing.",
      explanation:
        "USDC is issued by Circle with monthly attestations and 100% USD reserves. USDT is larger but has mixed reserves and less frequent reporting.",
      tips: [
        "USDC: More transparent",
        "USDT: More liquidity",
        "Both are generally safe",
      ],
    },
  },
  {
    id: 3,
    title: "How USDe Works",
    subtitle: "Delta-neutral synthetic dollars",
    category: "advanced",
    duration: "3 min",
    icon: Zap,
    color: "var(--asset-usde)",
    content: {
      mainPoint:
        "USDe maintains its $1 value through a 'delta-neutral' strategy—holding ETH while simultaneously shorting it.",
      explanation:
        "Ethena stakes ETH (earning ~4%) and shorts ETH perpetuals (earning funding). The short cancels price exposure while capturing both yields.",
      tips: [
        "Higher yield, higher complexity",
        "Funding rates can go negative",
        "Suitable for informed users",
      ],
    },
  },
  {
    id: 4,
    title: "Soft Liquidation",
    subtitle: "How crvUSD protects you",
    category: "advanced",
    duration: "2 min",
    icon: Shield,
    color: "var(--asset-crvusd)",
    content: {
      mainPoint:
        "crvUSD uses LLAMMA to gradually convert your collateral instead of sudden liquidation.",
      explanation:
        "Traditional DeFi liquidates your entire position instantly. crvUSD's mechanism gradually converts collateral to stablecoin as prices fall, and back as they rise.",
      tips: [
        "No sudden liquidation cliff",
        "Better protection during volatility",
        "Innovative but complex",
      ],
    },
  },
  {
    id: 5,
    title: "Supply vs Borrow APY",
    subtitle: "The lending spread explained",
    category: "yields",
    duration: "1 min",
    icon: TrendingUp,
    color: "var(--brand-lavender-deep)",
    content: {
      mainPoint:
        "Supply APY is what you earn; Borrow APY is what borrowers pay. The difference is the protocol's spread.",
      explanation:
        "Lending protocols connect lenders with borrowers. Lenders earn less than borrowers pay—the difference funds the protocol.",
      example: {
        scenario: "USDC on Aave",
        result: "Supply: 4% | Borrow: 5% | Spread: 1%",
      },
    },
  },
  {
    id: 6,
    title: "Risk Levels Explained",
    subtitle: "Green, yellow, and red",
    category: "risk",
    duration: "2 min",
    icon: AlertTriangle,
    color: "var(--warning)",
    content: {
      mainPoint:
        "We rate every asset's risk level so you know what you're getting into.",
      explanation:
        "Low (Green): Battle-tested, fiat-backed, audited. Medium (Yellow): Newer mechanisms, more complexity. High (Red): Experimental, unaudited.",
      tips: [
        "Diversify across risk levels",
        "Higher yield often = higher risk",
        "Start with low-risk assets",
      ],
    },
  },
  {
    id: 7,
    title: "What is Aave?",
    subtitle: "The lending giant",
    category: "protocols",
    duration: "2 min",
    icon: BookOpen,
    color: "var(--asset-aave)",
    content: {
      mainPoint:
        "Aave is like a decentralized bank—deposit to earn interest, or borrow against collateral.",
      explanation:
        "The largest lending protocol with $10B+ deposited. No credit checks, no paperwork—just smart contracts. You can withdraw anytime.",
      tips: [
        "Battle-tested since 2020",
        "No lockup periods",
        "Variable interest rates",
      ],
    },
  },
  {
    id: 8,
    title: "Gas Fees & Why You Pay $0",
    subtitle: "YieldX magic explained",
    category: "basics",
    duration: "1 min",
    icon: Zap,
    color: "var(--success)",
    content: {
      mainPoint:
        "We use ERC-4337 (Account Abstraction) to sponsor your gas fees.",
      explanation:
        "Every blockchain transaction costs gas. YieldX uses smart accounts with a Paymaster that covers these costs, so you pay nothing.",
      tips: ["Gas-free deposits", "Gas-free withdrawals", "We cover the cost"],
    },
  },
];

export default function LearnPage() {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const cardHeight = window.innerHeight;
      const newActiveCard = Math.round(scrollPosition / cardHeight);
      setActiveCard(Math.min(newActiveCard, educationCards.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <LiquidBackground preset="Plasma" speed={20} />
      <CustomCursor />
      <Navbar />

      {/* Progress Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {educationCards.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => {
              containerRef.current?.scrollTo({
                top: index * window.innerHeight,
                behavior: "smooth",
              });
            }}
            aria-label={`Go to lesson ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeCard === index
                ? "bg-[var(--brand-lavender)] scale-125"
                : "bg-[var(--glass-border)] hover:bg-[var(--brand-lavender)]/50"
            }`}
          />
        ))}
      </div>

      {/* Content Container - Normal scrolling */}
      <div ref={containerRef} className="overflow-y-auto relative z-10">
        {/* Header Card */}
        <div className="pt-28 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-display-lg mb-6">Learn DeFi</h1>
            <p className="text-xl text-white/80 mb-8">
              Master the fundamentals of decentralized finance with bite-sized
              lessons
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/70 mb-12">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {educationCards.length} lessons
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                ~15 min total
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/70 animate-bounce">
              <span>Scroll to start</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Education Cards */}
        {educationCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <GlassCard className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: card.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-lavender)] text-[var(--brand-lavender-deep)]">
                          {card.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {card.duration}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-1">
                        {card.title}
                      </h2>
                      <p className="text-muted-foreground">{card.subtitle}</p>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-[var(--accent-lavender)]/30">
                      <p className="text-lg font-medium">
                        {card.content.mainPoint}
                      </p>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {card.content.explanation}
                    </p>

                    {/* Example */}
                    {card.content.example && (
                      <div className="p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                        <p className="text-sm text-muted-foreground mb-2">
                          Example
                        </p>
                        <p className="font-medium mb-1">
                          {card.content.example.scenario}
                        </p>
                        <p
                          className="text-lg font-bold"
                          style={{ color: card.color }}
                        >
                          {card.content.example.result}
                        </p>
                      </div>
                    )}

                    {/* Tips */}
                    {card.content.tips && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">
                          Key Takeaways
                        </p>
                        {card.content.tips.map((tip, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Lesson {index + 1} of {educationCards.length}
                      </span>
                      <div className="flex items-center gap-1">
                        {educationCards.map((_, i) => (
                          <div
                            key={i}
                            className={`w-8 h-1 rounded-full ${
                              i <= index
                                ? "bg-[var(--brand-lavender)]"
                                : "bg-[var(--glass-border)]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          );
        })}

        {/* Completion Card */}
        <div className="px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--success)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-display-md mb-4">You're Ready!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              You've completed the basics. Time to put your knowledge into
              action.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/dashboard"
                className="px-8 py-4 rounded-full bg-[var(--brand-lavender-deep)] text-white font-semibold hover:bg-[var(--brand-lavender)] transition-colors"
              >
                Go to Dashboard
              </a>
              <a
                href="/glossary"
                className="px-8 py-4 rounded-full glass-button font-semibold"
              >
                Explore Glossary
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
