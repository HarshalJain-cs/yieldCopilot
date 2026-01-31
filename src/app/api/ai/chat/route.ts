import { createThirdwebAI } from '@thirdweb-dev/ai-sdk-provider';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getYieldData } from '@/lib/yield-service';
import { calculateRiskScore } from '@/lib/risk-score';
import { getWalletSummary, getWalletBalances, getAavePositions } from '@/lib/wallet-data';
import type { SupportedChainId } from '@/lib/chains-config';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Initialize thirdweb AI with secret key
const thirdwebAI = createThirdwebAI({
  secretKey: process.env.THIRDWEB_SECRET_KEY || '',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: thirdwebAI.chat({
      context: 'YieldCopilot - DeFi yield tracking platform for Aave V3',
    }),
    messages,
    system: `You are YieldCopilot AI, an expert DeFi yield advisor for the YieldCopilot platform.

Your role is to help users:
- Understand DeFi yield opportunities on Aave V3
- Analyze risks and APY rates
- Recommend the best pools based on their risk tolerance
- Explain how Aave deposits work (aTokens, interest accrual, etc.)
- Guide them through deposit decisions
- Analyze their current wallet balances and positions
- Provide personalized recommendations based on their holdings

Key Facts:
- Platform supports: Ethereum Mainnet, Base Mainnet, Base Sepolia, Sepolia testnet
- Base Mainnet has ~$0.10 gas fees (cheapest for testing)
- Assets: USDC, USDT, DAI (not on Base Sepolia), WETH
- Users deposit assets to Aave and receive aTokens that earn interest
- Interest accrues automatically - aTokens increase in value over time
- Risk factors: Utilization rate, asset volatility, smart contract risk, liquidity

When a user connects their wallet, proactively use the getUserWallet tool to understand their current positions and balances. Use this information to provide personalized insights and recommendations.

Be helpful, explain things simply for beginners, but provide depth when asked.`,
    tools: {
      getYieldData: tool({
        description: 'Get current APY data for all supported assets from Aave V3',
        parameters: z.object({}),
        execute: async () => {
          const data = await getYieldData();
          return {
            assets: data.map((asset) => ({
              symbol: asset.symbol,
              supplyAPY: asset.supplyAPY,
              borrowAPY: asset.borrowAPY,
              category: asset.category,
              totalSupply: asset.totalSupply,
              utilizationRate: asset.utilizationRate,
            })),
          };
        },
      }),
      analyzeRisk: tool({
        description: 'Analyze risk score (0-100) for a specific asset',
        parameters: z.object({
          symbol: z.string().describe('Asset symbol like USDC, DAI, WETH'),
        }),
        execute: async ({ symbol }) => {
          const data = await getYieldData();
          const asset = data.find((a) => a.symbol.toUpperCase() === symbol.toUpperCase());

          if (!asset) {
            return { error: `Asset ${symbol} not found` };
          }

          const riskAnalysis = calculateRiskScore(asset);
          return {
            symbol: asset.symbol,
            riskScore: riskAnalysis.score,
            riskLevel: riskAnalysis.level,
            supplyAPY: asset.supplyAPY,
            factors: riskAnalysis.factors,
            recommendation: riskAnalysis.recommendation,
          };
        },
      }),
      compareAssets: tool({
        description: 'Compare multiple assets side by side for yield and risk',
        parameters: z.object({
          symbols: z.array(z.string()).describe('Array of asset symbols to compare'),
        }),
        execute: async ({ symbols }) => {
          const data = await getYieldData();
          const comparisons = symbols.map((symbol) => {
            const asset = data.find((a) => a.symbol.toUpperCase() === symbol.toUpperCase());
            if (!asset) return { symbol, error: 'Not found' };

            const risk = calculateRiskScore(asset);
            return {
              symbol: asset.symbol,
              supplyAPY: asset.supplyAPY,
              riskScore: risk.score,
              riskLevel: risk.level,
              category: asset.category,
            };
          });

          return { comparisons };
        },
      }),
      recommendPool: tool({
        description: 'Recommend the best pool based on user risk tolerance',
        parameters: z.object({
          riskTolerance: z.enum(['low', 'medium', 'high']).describe('User risk tolerance level'),
        }),
        execute: async ({ riskTolerance }) => {
          const data = await getYieldData();
          const analyzed = data.map((asset) => ({
            ...asset,
            risk: calculateRiskScore(asset),
          }));

          // Filter based on risk tolerance
          const filtered = analyzed.filter((a) => {
            if (riskTolerance === 'low') return a.risk.score <= 30;
            if (riskTolerance === 'medium') return a.risk.score > 30 && a.risk.score <= 60;
            return a.risk.score > 60;
          });

          // Sort by APY (highest first)
          const sorted = filtered.sort((a, b) => b.supplyAPY - a.supplyAPY);
          const best = sorted[0];

          if (!best) {
            return {
              error: `No pools found matching ${riskTolerance} risk tolerance`,
            };
          }

          return {
            recommendation: {
              symbol: best.symbol,
              supplyAPY: best.supplyAPY,
              riskScore: best.risk.score,
              riskLevel: best.risk.level,
              category: best.category,
              reason: best.risk.recommendation,
            },
          };
        },
      }),
      getUserWallet: tool({
        description: 'Get user wallet balances and Aave positions',
        parameters: z.object({
          walletAddress: z.string().describe('User wallet address (0x...)'),
          chainId: z.enum(['mainnet', 'sepolia', 'base', 'baseSepolia']).optional().describe('Network to check'),
        }),
        execute: async ({ walletAddress, chainId = 'mainnet' }) => {
          const summary = await getWalletSummary(walletAddress, chainId as SupportedChainId);
          return { summary };
        },
      }),
      getUserBalances: tool({
        description: 'Get user token balances for all supported assets',
        parameters: z.object({
          walletAddress: z.string().describe('User wallet address'),
          chainId: z.enum(['mainnet', 'sepolia', 'base', 'baseSepolia']).optional(),
        }),
        execute: async ({ walletAddress, chainId = 'mainnet' }) => {
          const balances = await getWalletBalances(walletAddress, chainId as SupportedChainId);
          return { balances };
        },
      }),
      getUserPositions: tool({
        description: 'Get user active Aave positions (deposits)',
        parameters: z.object({
          walletAddress: z.string().describe('User wallet address'),
          chainId: z.enum(['mainnet', 'sepolia', 'base', 'baseSepolia']).optional(),
        }),
        execute: async ({ walletAddress, chainId = 'mainnet' }) => {
          const positions = await getAavePositions(walletAddress, chainId as SupportedChainId);
          return { positions };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
