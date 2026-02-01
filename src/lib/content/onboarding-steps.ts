export interface OnboardingStep {
  step: number;
  title: string;
  subtitle: string;
  content: {
    headline: string;
    description?: string;
    bullets?: string[];
    sections?: Array<{
      name: string;
      description: string;
      location?: string;
    }>;
    terms?: Array<{
      term: string;
      definition: string;
      example?: string;
      note?: string;
      levels?: Array<{
        level: string;
        meaning: string;
      }>;
    }>;
    howItWorks?: Array<{
      step: string;
      detail: string;
    }>;
    faq?: Array<{
      q: string;
      a: string;
    }>;
    nextSteps?: Array<{
      action: string;
      description: string;
      link: string;
    }>;
    tip?: string;
    support?: {
      text: string;
      links: Array<{
        label: string;
        url: string;
      }>;
    };
  };
  cta: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    title: "Welcome to YieldX",
    subtitle: "Let's get you set up in under 2 minutes",
    content: {
      headline: "What is YieldX?",
      description: "YieldX is your personal DeFi yield tracker. We help you find the best returns on your stablecoins across multiple protocols—without the complexity.",
      bullets: [
        "Compare yields across Aave, Ethena, and Curve",
        "See real-time APY updated every block",
        "Understand risks with clear indicators",
        "Learn as you go with built-in education"
      ]
    },
    cta: "Let's Go"
  },
  {
    step: 2,
    title: "Connect Your Account",
    subtitle: "No seed phrases. No extensions. Just Google.",
    content: {
      headline: "One-Click Login",
      description: "We use Thirdweb's secure wallet infrastructure to create a wallet for you automatically. Your Google account becomes your key.",
      howItWorks: [
        {
          step: "Click 'Continue with Google'",
          detail: "Standard OAuth flow you're familiar with"
        },
        {
          step: "Wallet Created Instantly",
          detail: "A non-custodial smart wallet is generated"
        },
        {
          step: "Gas Fees Sponsored",
          detail: "We pay for your transaction fees"
        }
      ],
      faq: [
        {
          q: "Is this safe?",
          a: "Yes. Your wallet is non-custodial—only you control it. We can't access your funds."
        },
        {
          q: "What if I lose access to Google?",
          a: "You can recover your wallet through Google's account recovery. We also support exporting your wallet."
        }
      ]
    },
    cta: "Continue with Google"
  },
  {
    step: 3,
    title: "Understand the Dashboard",
    subtitle: "Everything you need, nothing you don't",
    content: {
      headline: "Your Yield Command Center",
      sections: [
        {
          name: "Portfolio Overview",
          description: "Your total balance and earnings at a glance",
          location: "Top left, large card"
        },
        {
          name: "Asset Cards",
          description: "Current APY for each stablecoin",
          location: "Grid of smaller cards"
        },
        {
          name: "Quick Actions",
          description: "Deposit, withdraw, or swap with one click",
          location: "Action bar below portfolio"
        },
        {
          name: "Risk Indicators",
          description: "Green = low risk, Yellow = medium, Red = high",
          location: "On each asset card"
        }
      ],
      tip: "Click any asset card to see detailed information, historical charts, and educational content."
    },
    cta: "Got It"
  },
  {
    step: 4,
    title: "Understanding Yields",
    subtitle: "What the numbers actually mean",
    content: {
      headline: "APY Explained Simply",
      terms: [
        {
          term: "APY (Annual Percentage Yield)",
          definition: "How much you'll earn in a year if rates stay constant",
          example: "$1,000 at 5% APY = $1,051.16 after 1 year",
          note: "Includes compound interest—earning interest on interest"
        },
        {
          term: "24h Change",
          definition: "How the rate changed in the last 24 hours",
          example: "+0.3% means the APY went up by 0.3 percentage points",
          note: "Rates fluctuate based on supply and demand"
        },
        {
          term: "Risk Level",
          definition: "Our assessment of the asset's safety",
          levels: [
            { level: "Low (Green)", meaning: "Established, audited, fiat-backed" },
            { level: "Medium (Yellow)", meaning: "Newer mechanisms, higher complexity" },
            { level: "High (Red)", meaning: "Experimental, unaudited, volatile" }
          ]
        }
      ]
    },
    cta: "Makes Sense"
  },
  {
    step: 5,
    title: "You're Ready!",
    subtitle: "Start exploring and earning",
    content: {
      headline: "Welcome to DeFi",
      nextSteps: [
        {
          action: "Explore the Dashboard",
          description: "Browse yields and compare assets",
          link: "/dashboard"
        },
        {
          action: "Learn More",
          description: "Watch explainer videos for each asset",
          link: "/learn"
        },
        {
          action: "Read the Glossary",
          description: "Look up any term you don't understand",
          link: "/glossary"
        },
        {
          action: "Make Your First Deposit",
          description: "Start earning yield today",
          link: "/dashboard?action=deposit"
        }
      ],
      support: {
        text: "Questions? We're here to help.",
        links: [
          { label: "FAQ", url: "/faq" },
          { label: "Discord", url: "https://discord.gg/yieldx" },
          { label: "Twitter", url: "https://twitter.com/yieldx" }
        ]
      }
    },
    cta: "Go to Dashboard"
  }
];
