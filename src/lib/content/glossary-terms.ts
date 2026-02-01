export interface GlossaryTerm {
  term: string;
  fullName?: string;
  category:
    | "basics"
    | "stablecoins"
    | "protocols"
    | "yields"
    | "risk"
    | "advanced";
  definition: string;
  example?: string;
  keyPoints?: string[];
  relatedTerms?: string[];
  riskLevel?: "low" | "medium" | "high";
}

export const glossaryTerms: GlossaryTerm[] = [
  // === BASICS ===
  {
    term: "APY",
    fullName: "Annual Percentage Yield",
    category: "basics",
    definition:
      "The real rate of return on your investment over one year, accounting for compound interest. Unlike APR (Annual Percentage Rate), APY includes the effect of interest earning interest.",
    example:
      "If you deposit $1,000 at 5% APY, you'll have approximately $1,051.16 after one year (not just $1,050) because interest compounds.",
    relatedTerms: ["APR", "Compound Interest", "Yield"],
  },
  {
    term: "APR",
    fullName: "Annual Percentage Rate",
    category: "basics",
    definition:
      "The simple interest rate for a year, without accounting for compounding. APR is always lower than or equal to APY for the same rate.",
    example:
      "A 5% APR on $1,000 gives you exactly $50 after one year. No compounding.",
    relatedTerms: ["APY", "Simple Interest"],
  },
  {
    term: "DeFi",
    fullName: "Decentralized Finance",
    category: "basics",
    definition:
      "Financial services built on blockchain technology that operate without traditional intermediaries like banks. Smart contracts replace middlemen.",
    example:
      "Instead of a bank paying you 0.5% interest, you can deposit in Aave and earn 4%+ directly from other borrowers.",
    relatedTerms: ["Smart Contract", "Protocol", "Yield Farming"],
  },
  {
    term: "Yield",
    category: "basics",
    definition:
      "The earnings generated from an investment, usually expressed as a percentage (APY). In DeFi, yield comes from lending, liquidity provision, or staking.",
    example:
      "Your USDC deposit in Aave generates yield from borrowers who pay interest.",
    relatedTerms: ["APY", "Yield Farming", "Staking"],
  },
  {
    term: "Wallet",
    category: "basics",
    definition:
      "A digital container for your cryptocurrency. It doesn't actually hold coins—it holds the private keys that prove you own them on the blockchain.",
    keyPoints: [
      "Hot Wallet: Connected to internet (MetaMask, Coinbase Wallet)",
      "Cold Wallet: Offline storage (Ledger, Trezor)",
      "Smart Wallet: Account abstraction wallet (what YieldX uses)",
    ],
    relatedTerms: ["Private Key", "Seed Phrase", "Smart Account"],
  },
  {
    term: "Smart Contract",
    category: "basics",
    definition:
      "Self-executing code on a blockchain that automatically enforces agreement terms. Think of it as a vending machine—put in money, get guaranteed output.",
    example:
      "Aave's smart contracts automatically calculate and distribute interest without any human intervention.",
    relatedTerms: ["Blockchain", "Protocol", "DeFi"],
  },
  {
    term: "Gas Fee",
    category: "basics",
    definition:
      "The cost paid to execute a transaction on a blockchain. It compensates network validators for processing your transaction.",
    example:
      "Sending USDC on Ethereum might cost $2-20 in gas fees depending on network congestion.",
    keyPoints: ["YieldX sponsors gas fees so you pay $0."],
    relatedTerms: ["Transaction", "Ethereum", "Layer 2"],
  },

  // === STABLECOINS ===
  {
    term: "Stablecoin",
    category: "stablecoins",
    definition:
      "A cryptocurrency designed to maintain a stable value, usually pegged to $1 USD. Unlike Bitcoin or Ethereum, stablecoins don't have price volatility.",
    keyPoints: [
      "Fiat-Backed (USDC, USDT): Backed by real dollars in a bank",
      "Crypto-Backed (DAI): Backed by other crypto, over-collateralized",
      "Algorithmic (FRAX): Maintained by algorithms and incentives",
      "Synthetic (USDe): Created through derivatives positions",
    ],
    relatedTerms: ["USDC", "USDT", "Peg"],
  },
  {
    term: "USDC",
    fullName: "USD Coin",
    category: "stablecoins",
    definition:
      "A fiat-backed stablecoin issued by Circle. Each USDC is backed 1:1 by US dollars held in regulated financial institutions. Monthly attestations prove reserves.",
    keyPoints: [
      "Issued by Circle, a US-regulated company",
      "100% backed by cash and short-term US Treasuries",
      "Monthly attestations by Grant Thornton",
      "Can be redeemed 1:1 for USD",
    ],
    riskLevel: "low",
    relatedTerms: ["Stablecoin", "Fiat-Backed", "Circle"],
  },
  {
    term: "USDT",
    fullName: "Tether",
    category: "stablecoins",
    definition:
      "The largest stablecoin by market cap, issued by Tether Limited. Backed by a mix of cash, cash equivalents, secured loans, and other assets.",
    keyPoints: [
      "Largest stablecoin ($80B+ market cap)",
      "Backed by diverse reserve assets",
      "Quarterly reserve reports",
      "Registered in British Virgin Islands",
    ],
    riskLevel: "low",
    relatedTerms: ["Stablecoin", "Fiat-Backed", "Tether"],
  },
  {
    term: "USDe",
    fullName: "Ethena USDe",
    category: "stablecoins",
    definition:
      "A synthetic stablecoin that maintains its peg through a delta-neutral position combining ETH staking and perpetual futures shorts.",
    keyPoints: [
      "Delta-neutral: immune to ETH price moves",
      "Yield from staking ETH",
      "Additional yield from perp funding rates",
      "Can be staked as sUSDe for higher yield",
    ],
    riskLevel: "medium",
    relatedTerms: [
      "Synthetic",
      "Delta-Neutral",
      "Perpetual Futures",
      "Staking",
    ],
  },
  {
    term: "crvUSD",
    fullName: "Curve USD",
    category: "stablecoins",
    definition:
      "Curve Finance's native stablecoin using LLAMMA (Lending-Liquidating AMM Algorithm) for innovative 'soft liquidations' instead of sudden position closures.",
    keyPoints: [
      "Overcollateralized design",
      "Soft liquidation mechanism",
      "No sudden liquidation cliff",
      "Collateral converts gradually",
    ],
    riskLevel: "medium",
    relatedTerms: ["LLAMMA", "Soft Liquidation", "Curve Finance"],
  },

  // === PROTOCOLS ===
  {
    term: "Aave",
    category: "protocols",
    definition:
      "The largest decentralized lending protocol where users can supply assets to earn interest or borrow against their collateral. Battle-tested since 2020 with $10B+ in deposits.",
    keyPoints: [
      "Non-custodial lending/borrowing",
      "Variable and stable interest rates",
      "Over-collateralized loans",
      "Governance token: AAVE",
    ],
    relatedTerms: [
      "Lending Protocol",
      "Supply APY",
      "Borrow APY",
      "Collateral",
    ],
  },
  {
    term: "Protocol",
    category: "protocols",
    definition:
      "A set of smart contracts that work together to provide a specific DeFi service. Protocols are like apps built on blockchain—they have rules, but no central operator.",
    keyPoints: [
      "Aave: Lending/Borrowing",
      "Uniswap: Token Swapping",
      "Curve: Stablecoin Swapping",
    ],
    relatedTerms: ["Smart Contract", "DeFi", "DAO"],
  },

  // === YIELDS ===
  {
    term: "Supply APY",
    category: "yields",
    definition:
      "The interest rate you earn by depositing (supplying) assets to a lending protocol. This is what you get paid for letting others borrow your money.",
    example:
      "If USDC Supply APY is 4%, you earn approximately 4% annually on your deposited USDC.",
    relatedTerms: ["Borrow APY", "Lending", "Aave"],
  },
  {
    term: "Borrow APY",
    category: "yields",
    definition:
      "The interest rate you pay when borrowing assets from a lending protocol. Always higher than Supply APY—the difference is the protocol's spread.",
    example:
      "If USDC Borrow APY is 5%, you pay 5% annually on your borrowed USDC.",
    relatedTerms: ["Supply APY", "Collateral", "Loan"],
  },
  {
    term: "Yield Farming",
    category: "yields",
    definition:
      "The practice of moving assets between protocols to maximize returns. Often involves providing liquidity or staking in multiple places.",
    keyPoints: [
      "Smart contract risk (more protocols = more risk)",
      "Gas fees eating into profits",
      "Impermanent loss in liquidity pools",
    ],
    relatedTerms: ["APY", "Liquidity Mining", "Staking"],
  },
  {
    term: "TVL",
    fullName: "Total Value Locked",
    category: "yields",
    definition:
      "The total amount of assets deposited in a protocol. A key metric for measuring protocol adoption and trust. Higher TVL generally indicates more confidence.",
    example:
      "Aave has $10B+ TVL, meaning users have deposited over $10 billion in assets.",
    relatedTerms: ["Protocol", "Liquidity", "Market Cap"],
  },

  // === RISK ===
  {
    term: "Smart Contract Risk",
    category: "risk",
    definition:
      "The risk that a bug or vulnerability in smart contract code could lead to loss of funds. Even audited contracts can have undiscovered issues.",
    keyPoints: [
      "Use battle-tested protocols",
      "Check for multiple audits",
      "Diversify across protocols",
      "Don't invest more than you can lose",
    ],
    relatedTerms: ["Audit", "Protocol", "Security"],
  },
  {
    term: "Liquidation",
    category: "risk",
    definition:
      "When a borrower's collateral value drops too low relative to their loan, the protocol automatically sells (liquidates) their collateral to repay the loan.",
    example:
      "If you borrow $1,000 with $1,500 ETH collateral and ETH drops 40%, your position may be liquidated to protect lenders.",
    keyPoints: [
      "Keep health factor above 1.5",
      "Monitor collateral prices",
      "Add collateral when prices drop",
    ],
    relatedTerms: ["Collateral", "Health Factor", "Soft Liquidation"],
  },
  {
    term: "Health Factor",
    category: "risk",
    definition:
      "A number representing how safe your borrowed position is. Above 1 = safe, below 1 = liquidation. The higher the number, the safer your position.",
    example:
      "Health Factor of 1.5 means you can lose 33% of collateral value before liquidation.",
    relatedTerms: ["Liquidation", "Collateral", "Borrow"],
  },
  {
    term: "Impermanent Loss",
    category: "risk",
    definition:
      "The temporary loss that occurs when providing liquidity to a trading pair if the prices of the tokens change relative to each other. Called 'impermanent' because it's only realized when you withdraw.",
    keyPoints: [
      "This doesn't apply to single-asset lending on Aave—only to liquidity pools.",
    ],
    relatedTerms: ["Liquidity Pool", "AMM", "Yield Farming"],
  },

  // === ADVANCED ===
  {
    term: "Delta-Neutral",
    category: "advanced",
    definition:
      "A position designed to have no exposure to price movements. If the asset goes up or down, the position value stays the same. USDe uses this strategy.",
    example:
      "Hold an asset long AND short it equally. Price goes up? Long gains, short loses—net zero. Price goes down? Long loses, short gains—still net zero.",
    relatedTerms: ["USDe", "Hedging", "Perpetual Futures"],
  },
  {
    term: "Perpetual Futures",
    fullName: "Perpetual Swap Contracts",
    category: "advanced",
    definition:
      "Derivatives that let you bet on an asset's price without expiration. Unlike traditional futures, perps never settle—they use 'funding rates' to stay close to spot price.",
    keyPoints: [
      "When more people are long than short, longs pay shorts a 'funding fee' (and vice versa). This is how USDe generates extra yield.",
    ],
    relatedTerms: ["Funding Rate", "Derivatives", "USDe"],
  },
  {
    term: "Funding Rate",
    category: "advanced",
    definition:
      "Periodic payments between long and short perpetual futures traders that keep perp prices aligned with spot prices. Positive = longs pay shorts. Negative = shorts pay longs.",
    example:
      "If funding is +0.01% every 8 hours, shorts earn 0.03% daily from longs.",
    keyPoints: ["USDe captures this funding by being short ETH perps."],
    relatedTerms: ["Perpetual Futures", "USDe", "Delta-Neutral"],
  },
  {
    term: "LLAMMA",
    fullName: "Lending-Liquidating AMM Algorithm",
    category: "advanced",
    definition:
      "Curve's innovative liquidation mechanism for crvUSD. Instead of sudden liquidation, it gradually converts collateral to stablecoin and back as prices move.",
    keyPoints: [
      "Protects users from flash crashes that would cause full liquidation in other protocols.",
    ],
    relatedTerms: ["crvUSD", "Soft Liquidation", "AMM"],
  },
  {
    term: "ERC-4337",
    fullName: "Account Abstraction Standard",
    category: "advanced",
    definition:
      "An Ethereum standard that allows smart contract wallets with features like gasless transactions, social recovery, and batch transactions. This is what powers YieldX's smooth experience.",
    keyPoints: [
      "No gas fees (sponsored)",
      "Social login (Google)",
      "Account recovery options",
      "Batch multiple actions",
    ],
    relatedTerms: ["Smart Account", "Gas Fee", "Wallet"],
  },
];

export const glossaryCategories = [
  { id: "all", label: "All" },
  { id: "basics", label: "Basics" },
  { id: "stablecoins", label: "Stablecoins" },
  { id: "yields", label: "Yields" },
  { id: "risk", label: "Risk" },
  { id: "advanced", label: "Advanced" },
] as const;
