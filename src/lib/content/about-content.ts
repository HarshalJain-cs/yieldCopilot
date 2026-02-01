export const heroContent = {
  tagline: "THE FUTURE OF DEFI IS BEAUTIFUL",
  subtitle:
    "Your intelligent companion for navigating decentralized finance with confidence.",
  description:
    "YieldX transforms complex DeFi yield tracking into an elegant, educational experience. Compare rates, understand risks, and grow your portfolio—all in one beautiful interface.",
  cta: {
    primary: "Get Started",
    secondary: "Learn More",
  },
};

export const problemContent = {
  headline: "DeFi is powerful. But it's also overwhelming.",
  subheadline: "The average user faces these challenges:",
  problems: [
    {
      icon: "Brain",
      title: "Complex Jargon",
      description:
        "APY, TVL, impermanent loss, liquidation ratios... DeFi speaks a language most people don't understand.",
    },
    {
      icon: "AlertTriangle",
      title: "Hidden Risks",
      description:
        "Not all yields are created equal. High APY often means high risk, but this isn't always clear.",
    },
    {
      icon: "Shuffle",
      title: "Scattered Data",
      description:
        "Yields are spread across dozens of protocols. Comparing them requires opening 10+ tabs.",
    },
    {
      icon: "Frown",
      title: "Intimidating UX",
      description:
        "Seed phrases, gas fees, network switching... The onboarding process scares away 90% of users.",
    },
    {
      icon: "HelpCircle",
      title: "No Guidance",
      description:
        "Where do I start? Which protocol is safe? How much should I invest? No one tells you.",
    },
    {
      icon: "Clock",
      title: "Constant Monitoring",
      description:
        "Rates change every block. Missing a rate drop could cost you thousands.",
    },
  ],
};

export const solutionContent = {
  headline: "YieldX: DeFi Made Simple",
  subheadline: "We solve these problems with three core principles:",
  solutions: [
    {
      icon: "LayoutGrid",
      title: "One Dashboard",
      description:
        "All your yields in one place. Compare USDC, USDT, USDe, crvUSD, and AAVE rates side-by-side. No more tab switching.",
    },
    {
      icon: "Zap",
      title: "Real-Time Data",
      description:
        "Live APY pulled directly from smart contracts. We don't scrape—we listen to blockchain events. Every number is accurate to the second.",
    },
    {
      icon: "GraduationCap",
      title: "Education Built-In",
      description:
        "Don't know what USDe is? Hover over it. Want to understand liquidation? Watch a 30-second explainer. Learn as you earn.",
    },
    {
      icon: "Shield",
      title: "Risk Transparency",
      description:
        "Every asset shows its risk level clearly. Green = safe, Yellow = moderate, Red = high. No hidden surprises.",
    },
    {
      icon: "Lock",
      title: "Frictionless Onboarding",
      description:
        "Sign in with Google. That's it. No seed phrases, no browser extensions, no gas fees. Your wallet is created automatically.",
    },
    {
      icon: "Bell",
      title: "Smart Alerts",
      description:
        "Set your target APY. We'll notify you when rates hit your threshold. Never miss an opportunity.",
    },
  ],
};

export const howItWorksContent = {
  headline: "Start Earning in 3 Simple Steps",
  steps: [
    {
      number: 1,
      title: "Connect",
      description:
        "Sign in with your Google account. No seed phrases, no downloads. We create a secure smart wallet for you instantly.",
      details: [
        "One-click Google authentication",
        "Non-custodial wallet generated",
        "ERC-4337 smart account enabled",
        "Gas fees sponsored (you pay nothing)",
      ],
      icon: "Wallet",
    },
    {
      number: 2,
      title: "Explore",
      description:
        "Browse real-time yields across all supported protocols. Compare rates, understand risks, and learn about each asset.",
      details: [
        "Live APY from Aave, Ethena, Curve",
        "Risk indicators for each asset",
        "Historical performance charts",
        "One-click asset comparison",
      ],
      icon: "Search",
    },
    {
      number: 3,
      title: "Deposit",
      description:
        "Choose your asset and amount. Confirm the transaction. Start earning immediately—no lockups, withdraw anytime.",
      details: [
        "Support for USDC, USDT, USDe, crvUSD",
        "Gasless transactions (we sponsor)",
        "No minimum deposit",
        "Instant yield accrual",
      ],
      icon: "ArrowDownToLine",
    },
    {
      number: 4,
      title: "Monitor",
      description:
        "Track your portfolio growth in real-time. See exactly how much you've earned and when. Set alerts for rate changes.",
      details: [
        "Live portfolio value",
        "Earnings breakdown by asset",
        "APY change notifications",
        "Withdrawal anytime",
      ],
      icon: "BarChart3",
    },
  ],
};

export const featuresContent = {
  headline: "Built for the Future",
  features: [
    {
      title: "Glassmorphism UI",
      description:
        "Premium frosted-glass design that's beautiful and functional",
      icon: "Sparkles",
    },
    {
      title: "Event-Driven Updates",
      description: "WebSocket connection to Aave Pool events for instant data",
      icon: "Zap",
    },
    {
      title: "Smart Account",
      description: "ERC-4337 account abstraction for gasless transactions",
      icon: "Lock",
    },
    {
      title: "Social Login",
      description: "Thirdweb SDK v5 for one-click Google authentication",
      icon: "Globe",
    },
    {
      title: "Risk Scoring",
      description: "Clear risk indicators for every tracked asset",
      icon: "Shield",
    },
    {
      title: "Mobile Ready",
      description: "Responsive design that works on any device",
      icon: "Smartphone",
    },
    {
      title: "Dark Mode",
      description: "Eye-friendly dark theme for night owls",
      icon: "Moon",
    },
    {
      title: "Open Source",
      description: "Transparent codebase you can verify yourself",
      icon: "Code",
    },
  ],
};

export const trackedAssetsContent = {
  headline: "Assets We Track",
  subheadline: "Curated selection of the best stablecoin yields",
  assets: [
    {
      symbol: "USDC",
      name: "USD Coin",
      type: "Fiat-Backed Stablecoin",
      issuer: "Circle",
      riskLevel: "low" as const,
      description:
        "The most trusted stablecoin in DeFi. Backed 1:1 by US dollars held in regulated financial institutions.",
      keyPoints: [
        "100% backed by USD reserves",
        "Monthly third-party audits",
        "Regulated by US authorities",
        "Instant redemption to fiat",
      ],
      color: "#2775CA",
    },
    {
      symbol: "USDT",
      name: "Tether",
      type: "Fiat-Backed Stablecoin",
      issuer: "Tether Limited",
      riskLevel: "low" as const,
      description:
        "The largest stablecoin by market cap. Backed by a mix of cash, cash equivalents, and other assets.",
      keyPoints: [
        "Largest stablecoin ($80B+)",
        "Multi-asset reserves",
        "Quarterly attestations",
        "Widest exchange support",
      ],
      color: "#26A17B",
    },
    {
      symbol: "USDe",
      name: "Ethena USDe",
      type: "Synthetic Stablecoin",
      issuer: "Ethena Labs",
      riskLevel: "medium" as const,
      description:
        "A synthetic dollar that generates yield from ETH staking and perpetual futures funding rates.",
      keyPoints: [
        "Delta-neutral strategy",
        "ETH staking yield",
        "Perp funding income",
        "Internet bond (sUSDe)",
      ],
      color: "#00D4AA",
    },
    {
      symbol: "crvUSD",
      name: "Curve USD",
      type: "DeFi-Native Stablecoin",
      issuer: "Curve Finance",
      riskLevel: "medium" as const,
      description:
        "Curve's native stablecoin using LLAMMA for soft liquidations. Innovative but complex.",
      keyPoints: [
        "Soft liquidation mechanism",
        "No sudden liquidation",
        "Overcollateralized",
        "DeFi-native design",
      ],
      color: "#FF6B9D",
    },
  ],
};

export const securityContent = {
  headline: "Security First",
  subheadline: "Your funds, your control",
  points: [
    {
      title: "Non-Custodial",
      description:
        "We never hold your funds. Your assets stay in your wallet, controlled only by you.",
      icon: "Lock",
    },
    {
      title: "Smart Contract Audits",
      description:
        "All protocols we integrate with have undergone multiple security audits by top firms.",
      icon: "CheckCircle",
    },
    {
      title: "Open Source",
      description:
        "Our entire codebase is open source. You can verify every line of code.",
      icon: "Code",
    },
    {
      title: "No Seed Phrases",
      description:
        "We use Thirdweb's in-app wallet with social login. Your wallet is secured by your Google account.",
      icon: "Shield",
    },
  ],
  disclaimer:
    "YieldX is an interface, not a protocol. We do not custody funds or execute transactions on your behalf. All interactions are directly between your wallet and the underlying smart contracts. DeFi carries inherent risks including smart contract vulnerabilities, market volatility, and potential loss of funds. Never invest more than you can afford to lose.",
};

export const ctaContent = {
  headline: "Ready to Earn?",
  subheadline: "Join thousands of users already earning yield with YieldX",
  stats: [
    { value: "$12M+", label: "Total Value Tracked" },
    { value: "5,000+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
  ],
  buttons: {
    primary: "Launch App",
    secondary: "Read Docs",
  },
};
