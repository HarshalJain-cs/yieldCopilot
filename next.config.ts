import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Transpile thirdweb packages
  transpilePackages: ['thirdweb'],

  // Webpack config to handle WASM files
  webpack: (config, { isServer }) => {
    // Enable WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Handle .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // Solana modules to exclude (not used in this project)
    const solanaModules = {
      '@solana-program/token-2022': false,
      '@solana-program/token': false,
      '@solana/rpc-api': false,
      '@solana/rpc-types': false,
      '@solana/web3.js': false,
      '@solana/spl-token': false,
    };

    // Exclude problematic modules on client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // Alias brotli-wasm and Solana modules to exclude from bundle
      config.resolve.alias = {
        ...config.resolve.alias,
        'brotli-wasm': false,
        ...solanaModules,
      };
    }

    // Also exclude Solana modules on server
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...solanaModules,
      };
    }

    return config;
  },

  // CORS headers for public API
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With, X-RateLimit-*",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
