# YieldCopilot AI Agent

An intelligent AI assistant powered by **thirdweb AI** and Vercel AI SDK that helps users understand DeFi yields, analyze risks, and make informed investment decisions.

> **No OpenAI API key required!** Uses thirdweb's built-in AI models.

## Features

### 🤖 AI Capabilities

The YieldCopilot AI agent can:

1. **Get Current Yield Data** - Fetch real-time APY rates for all supported assets
2. **Analyze Risk** - Calculate risk scores (0-100) with detailed factor breakdowns
3. **Compare Assets** - Side-by-side comparison of multiple pools
4. **Recommend Pools** - Personalized recommendations based on risk tolerance

### 💬 Example Conversations

**Getting APY Data:**
```
User: "What are the current APY rates?"
AI: [Uses getYieldData tool] "Here are the current APY rates: USDC: 3.2%, DAI: 2.8%, WETH: 1.5%..."
```

**Risk Analysis:**
```
User: "How risky is USDC?"
AI: [Uses analyzeRisk tool] "USDC has a low risk score of 15/100. It's a stablecoin with..."
```

**Pool Recommendation:**
```
User: "I'm risk-averse, what should I deposit to?"
AI: [Uses recommendPool tool with 'low' tolerance] "I recommend USDC with 3.2% APY and risk score 15/100..."
```

**Comparison:**
```
User: "Compare USDC and DAI"
AI: [Uses compareAssets tool] "USDC: 3.2% APY, risk 15. DAI: 2.8% APY, risk 18..."
```

## Architecture

### API Route: `/api/ai/chat`

- **Framework**: Vercel AI SDK + thirdweb AI
- **Model**: thirdweb AI chat model (blockchain-optimized)
- **Authentication**: thirdweb Secret Key
- **Streaming**: Real-time responses
- **Tools**: 4 custom tools integrated with YieldCopilot backend

### Tools

#### 1. `getYieldData`
Fetches current APY data from all supported assets.

**Returns:**
```typescript
{
  assets: [{
    symbol: "USDC",
    supplyAPY: 3.2,
    borrowAPY: 4.5,
    category: "Stablecoin",
    totalSupply: 1200000000,
    utilizationRate: 0.75
  }, ...]
}
```

#### 2. `analyzeRisk`
Analyzes risk score for a specific asset.

**Parameters:**
- `symbol: string` - Asset symbol (USDC, DAI, WETH, etc.)

**Returns:**
```typescript
{
  symbol: "USDC",
  riskScore: 15,
  riskLevel: "low",
  supplyAPY: 3.2,
  factors: {
    utilizationRisk: 30,
    assetRisk: 5,
    volatilityRisk: 10,
    liquidityRisk: 15
  },
  recommendation: "Low risk, suitable for conservative investors..."
}
```

#### 3. `compareAssets`
Compares multiple assets side by side.

**Parameters:**
- `symbols: string[]` - Array of asset symbols to compare

**Returns:**
```typescript
{
  comparisons: [{
    symbol: "USDC",
    supplyAPY: 3.2,
    riskScore: 15,
    riskLevel: "low",
    category: "Stablecoin"
  }, ...]
}
```

#### 4. `recommendPool`
Recommends best pool based on risk tolerance.

**Parameters:**
- `riskTolerance: "low" | "medium" | "high"`

**Returns:**
```typescript
{
  recommendation: {
    symbol: "USDC",
    supplyAPY: 3.2,
    riskScore: 15,
    riskLevel: "low",
    category: "Stablecoin",
    reason: "USDC offers stable returns with minimal volatility..."
  }
}
```

## Frontend Component

### `<AIChat />`

A floating chat widget with:
- Minimized button in bottom-right corner
- Expandable chat window (400x600px)
- Real-time streaming responses
- Message history
- Loading states with animated dots
- Mobile-responsive design

**Usage:**
```tsx
import { AIChat } from '@/components/ai-chat';

export default function Page() {
  return (
    <div>
      {/* Your page content */}
      <AIChat />
    </div>
  );
}
```

## Setup

### 1. Install Dependencies

Already installed:
```bash
pnpm add ai @ai-sdk/openai @thirdweb-dev/ai-sdk-provider
```

### 2. Add thirdweb Secret Key

Add to `.env.local`:
```bash
THIRDWEB_SECRET_KEY=your-secret-key-here
```

**Get your secret key:**
1. Go to https://thirdweb.com/dashboard/settings/api-keys
2. Create a new secret key
3. Copy and paste into `.env.local`

**Important:** Secret keys should only be used in backend/server code, never in client-side code!

### 3. Deploy

The AI agent works in:
- ✅ Development (`pnpm dev`)
- ✅ Production (`pnpm build && pnpm start`)
- ✅ Vercel deployment

## System Prompt

The AI is instructed to:
- Act as a DeFi yield advisor
- Explain concepts simply for beginners
- Provide depth when asked
- Focus on Aave V3 protocol
- Support 4 networks: Ethereum Mainnet, Base Mainnet, Base Sepolia, Sepolia
- Understand risk factors: utilization rate, volatility, smart contract risk, liquidity
- Recommend Base Mainnet for low gas fees (~$0.10)

## Cost Optimization

**Model Choice: thirdweb AI**
- **Included with thirdweb account** - no separate AI API costs!
- Optimized for blockchain and Web3 use cases
- Fast response times
- No need to manage separate OpenAI billing

**Pricing:**
- Covered under thirdweb Growth plan
- No per-token charges
- Unlimited AI agent conversations

## Future Enhancements

### Phase 1: Transaction Execution
- Add tool to execute deposits directly from chat
- Use thirdweb SDK to sign transactions
- "Deposit 100 USDC to the safest pool" → AI executes

### Phase 2: Portfolio Management
- Track user's existing positions
- Suggest rebalancing strategies
- Alert on yield changes

### Phase 3: Advanced Analytics
- Historical yield analysis
- Predictive APY trends
- Gas fee optimization

### Phase 4: Multi-Protocol
- Expand beyond Aave
- Compound, Yearn, Convex support
- Cross-protocol yield comparison

## Integration with Problem Statement

✅ **Addresses Key Requirements:**

1. **Real-time Data** - AI has access to live yield data via tools
2. **WebSocket Support** - Can notify AI of yield changes
3. **Public API** - AI tools use same API as developers
4. **Dashboard Alternative** - Chat interface as alternative to visual dashboard
5. **USP** - AI-powered investment advisor (unique differentiator)
6. **Scalability** - Stateless API route, scales horizontally

## References

- [Vercel AI SDK](https://ai-sdk.dev/docs/introduction)
- [thirdweb AI Integration](https://portal.thirdweb.com/ai/chat/ai-sdk)
- [thirdweb AI SDK Provider](https://blog.thirdweb.com/changelog/use-thirdweb-ai-with-the-vercel-ai-sdk/)
- [thirdweb API Keys](https://portal.thirdweb.com/account/api-keys)
- [Aave V3 Documentation](https://docs.aave.com/)

## Testing

### Try These Prompts:

1. "What's the safest pool right now?"
2. "Compare USDC and WETH"
3. "I want high returns, what do you recommend?"
4. "Explain how Aave deposits work"
5. "What are the risks with DAI?"
6. "Show me all APY rates"
7. "Which network has the cheapest gas?"
8. "I have $1000, where should I put it?"

---

**Built with:**
- [Vercel AI SDK](https://ai-sdk.dev/) - AI framework
- [thirdweb AI](https://thirdweb.com/ai) - Blockchain-optimized AI models (no OpenAI needed!)
- [thirdweb SDK](https://thirdweb.com/) - Web3 infrastructure
- [YieldCopilot Backend](../src/lib/yield-service.ts) - Yield data source

**Key Advantage:** Uses thirdweb's built-in AI - no separate OpenAI account or API costs required!
