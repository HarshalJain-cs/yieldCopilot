/**
 * Multi-Chain Configuration
 *
 * Supports both Ethereum Mainnet (real money) and Sepolia Testnet (free testing)
 */

import { ethereum, sepolia } from 'thirdweb/chains';

export const SUPPORTED_CHAINS = {
  mainnet: ethereum,
  sepolia: sepolia,
} as const;

export type SupportedChainId = keyof typeof SUPPORTED_CHAINS;

/**
 * Aave V3 Pool Addresses
 */
export const AAVE_V3_POOL_ADDRESSES = {
  mainnet: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
  sepolia: '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951',
} as const;

/**
 * Token Addresses per Chain
 */
export const TOKEN_ADDRESSES = {
  mainnet: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  sepolia: {
    USDC: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8', // Aave Sepolia USDC
    USDT: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0', // Aave Sepolia USDT
    DAI: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',  // Aave Sepolia DAI
    WETH: '0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c', // Aave Sepolia WETH
  },
} as const;

/**
 * aToken Addresses (receipt tokens that earn interest)
 */
export const ATOKEN_ADDRESSES = {
  mainnet: {
    USDC: '0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c', // aEthUSDC
    USDT: '0x23878914EFE38d27C4D67Ab83ed1b93A74D4086a', // aEthUSDT
    DAI: '0x018008bfb33d285247A21d44E50697654f754e63',  // aEthDAI
    WETH: '0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8', // aEthWETH
  },
  sepolia: {
    USDC: '0x16dA4541aD1807f4443d92D26044C1147406EB80', // aSepoliaUSDC
    USDT: '0x978206fAe13faF5a8d293FB614326B237684B750', // aSepoliaUSDT
    DAI: '0x29598b72eb5CeBd806C5dCD549490FdA35B13cD8',  // aSepoliaDAI
    WETH: '0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830', // aSepoliaWETH
  },
} as const;

/**
 * Get chain-specific configuration
 */
export function getChainConfig(chainId: SupportedChainId) {
  return {
    chain: SUPPORTED_CHAINS[chainId],
    aavePool: AAVE_V3_POOL_ADDRESSES[chainId],
    tokens: TOKEN_ADDRESSES[chainId],
    aTokens: ATOKEN_ADDRESSES[chainId],
  };
}

/**
 * Chain display names
 */
export const CHAIN_NAMES = {
  mainnet: 'Ethereum Mainnet',
  sepolia: 'Sepolia Testnet',
} as const;

/**
 * Chain warnings
 */
export const CHAIN_WARNINGS = {
  mainnet: '⚠️ REAL MONEY - Use with caution!',
  sepolia: '✅ Test Network - Free tokens, no risk!',
} as const;

/**
 * Faucet links for test tokens
 */
export const FAUCET_LINKS = {
  sepolia: {
    eth: 'https://www.alchemy.com/faucets/ethereum-sepolia',
    aave: 'https://staging.aave.com/faucet/',
  },
} as const;
