# YieldCopilot API Documentation

> **Real-time DeFi yield data for Aave V3 on Ethereum**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-repo/yieldcopilot)
[![Status](https://img.shields.io/badge/status-production-success.svg)](https://yieldcopilot.vercel.app/api/health)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [REST API Endpoints](#rest-api-endpoints)
- [WebSocket API](#websocket-api)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [SDKs & Libraries](#sdks--libraries)
- [Code Examples](#code-examples)
- [Support](#support)

---

## 🚀 Getting Started

**Base URL:** `https://yieldcopilot.vercel.app`

**Quick test:**
```bash
curl https://yieldcopilot.vercel.app/api/health
```

### Data Sources

| Source | Latency | Freshness | Use Case |
|--------|---------|-----------|----------|
| **Redis Cache** | ~5-10ms | <500ms | Default - instant responses |
| **RPC (Direct)** | ~2-5s | Real-time | Fallback if cache unavailable |
| **WebSocket** | Push | Real-time | Live updates on blockchain events |

---

## 🔐 Authentication

**Public API:** No authentication required for free tier (100 req/min).

**Future Premium Tier:** API keys for higher limits (1000 req/min).

### Rate Limit Headers

Every response includes rate limit information:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2026-01-31T12:01:00Z
```

---

## 📡 REST API Endpoints

### 1. Health Check

**`GET /api/health`**

Check system status and uptime.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-31T12:00:00Z",
  "components": {
    "worker": {
      "status": "up",
      "uptime": 3600000,
      "totalUpdates": 120,
      "lastUpdate": "2026-01-31T11:59:30Z"
    },
    "redis": { "status": "up" },
    "websocket": { "status": "up" }
  },
  "version": "1.0.0",
  "protocol": "Aave V3",
  "chain": "ethereum"
}
```

**Status Codes:**
- `200` - System healthy
- `503` - System degraded

---

### 2. List All Assets

**`GET /api/assets`**

Get metadata for all tracked assets (no yield data).

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category (e.g., "Stablecoin") |

**Example Request:**
```bash
curl "https://yieldcopilot.vercel.app/api/assets?category=Stablecoin"
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-01-31T12:00:00Z",
  "count": 8,
  "categories": ["Stablecoin", "ETH & LST", "BTC", "Governance"],
  "assets": [
    {
      "symbol": "USDC",
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "category": "Stablecoin",
      "decimals": 6,
      "icon": "💵",
      "name": "USD Coin"
    }
  ]
}
```

---

### 3. Get All Yields

**`GET /api/yields`**

Get real-time APY data for all Aave V3 assets.

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-01-31T12:00:00Z",
  "dataSource": "cache",
  "protocol": "Aave V3",
  "chain": "ethereum",
  "chainId": 1,
  "poolAddress": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  "assetCount": 60,
  "latencyMs": 8,
  "assets": [
    {
      "symbol": "USDC",
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "category": "Stablecoin",
      "supplyAPY": 3.8838,
      "borrowAPY": 4.8428,
      "utilizationRate": 89.12,
      "totalSupplyRaw": "1234567890000000",
      "totalBorrowRaw": "1100000000000000",
      "isActive": true,
      "borrowingEnabled": true,
      "lastOnChainUpdate": "2026-01-31T11:59:45Z"
    }
  ]
}
```

**Code Examples:**

<details>
<summary><strong>cURL</strong></summary>

```bash
curl https://yieldcopilot.vercel.app/api/yields
```
</details>

<details>
<summary><strong>JavaScript (fetch)</strong></summary>

```javascript
const response = await fetch('https://yieldcopilot.vercel.app/api/yields');
const data = await response.json();

console.log(`Found ${data.assetCount} assets`);
data.assets.forEach(asset => {
  console.log(`${asset.symbol}: ${asset.supplyAPY}% APY`);
});
```
</details>

<details>
<summary><strong>Python (requests)</strong></summary>

```python
import requests

response = requests.get('https://yieldcopilot.vercel.app/api/yields')
data = response.json()

for asset in data['assets']:
    print(f"{asset['symbol']}: {asset['supplyAPY']}% APY")
```
</details>

<details>
<summary><strong>Go</strong></summary>

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    resp, _ := http.Get("https://yieldcopilot.vercel.app/api/yields")
    defer resp.Body.Close()

    var data map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&data)

    fmt.Printf("Found %v assets\n", data["assetCount"])
}
```
</details>

---

### 4. Get Best Yield

**`GET /api/yields/best`**

Find the highest-yielding asset.

**Query Parameters:**
| Parameter | Type | Values | Default | Description |
|-----------|------|--------|---------|-------------|
| `category` | string | `Stablecoin`, `ETH & LST`, `BTC`, `Governance`, `all` | `all` | Filter by category |
| `type` | string | `supply`, `borrow` | `supply` | Supply or borrow yield |

**Example:**
```bash
curl "https://yieldcopilot.vercel.app/api/yields/best?category=Stablecoin&type=supply"
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-01-31T12:00:00Z",
  "protocol": "Aave V3",
  "chain": "ethereum",
  "latencyMs": 6,
  "query": {
    "category": "Stablecoin",
    "type": "supply"
  },
  "bestAsset": {
    "symbol": "FRAX",
    "address": "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    "category": "Stablecoin",
    "supplyAPY": 3.94,
    "borrowAPY": 4.92,
    "utilizationRate": 82.5,
    "isActive": true,
    "borrowingEnabled": true
  },
  "recommendation": "Deposit FRAX to earn 3.94% APY"
}
```

---

### 5. Compare Yields

**`GET /api/yields/compare`**

Compare yields across multiple assets side-by-side.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbols` | string | ✅ Yes | Comma-separated symbols (e.g., "USDC,USDT,DAI") |

**Example:**
```bash
curl "https://yieldcopilot.vercel.app/api/yields/compare?symbols=USDC,USDT,DAI"
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-01-31T12:00:00Z",
  "comparison": [
    {
      "symbol": "USDC",
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "category": "Stablecoin",
      "supplyAPY": 3.88,
      "borrowAPY": 4.84,
      "utilizationRate": 89.12,
      "supplyAPYDelta": 0.0,
      "borrowAPYDelta": 0.0
    },
    {
      "symbol": "USDT",
      "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "category": "Stablecoin",
      "supplyAPY": 3.65,
      "borrowAPY": 4.72,
      "utilizationRate": 85.3,
      "supplyAPYDelta": -0.23,
      "borrowAPYDelta": -0.12
    }
  ],
  "summary": {
    "bestSupply": "USDC",
    "bestSupplyAPY": 3.88,
    "bestBorrow": "USDC",
    "bestBorrowAPY": 4.84
  }
}
```

---

### 6. Platform Statistics

**`GET /api/stats`**

Get platform-wide statistics and analytics.

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-01-31T12:00:00Z",
  "platform": {
    "protocol": "Aave V3",
    "chain": "ethereum",
    "chainId": 1
  },
  "overview": {
    "totalAssets": 60,
    "activeAssets": 58,
    "averageSupplyAPY": 3.85,
    "averageBorrowAPY": 4.92,
    "highestSupplyAPY": 8.45,
    "lowestSupplyAPY": 0.12
  },
  "categories": [
    {
      "category": "Stablecoin",
      "assetCount": 8,
      "averageSupplyAPY": 3.75,
      "averageBorrowAPY": 4.65
    }
  ],
  "worker": {
    "status": "running",
    "uptime": 3600000,
    "totalUpdates": 120,
    "failedUpdates": 0,
    "lastUpdate": "2026-01-31T11:59:30Z"
  }
}
```

---

### 7. Get Specific Asset

**`GET /api/yields/:symbol`**

Get yield data for a specific asset.

**Example:**
```bash
curl https://yieldcopilot.vercel.app/api/yields/USDC
```

---

### 8. Historical Data

**`GET /api/yields/history/:symbol`**

Get 30-day historical APY data for charts.

**Example:**
```bash
curl https://yieldcopilot.vercel.app/api/yields/history/USDC
```

**Response:**
```json
{
  "success": true,
  "asset": { "symbol": "USDC", "address": "0xA0b..." },
  "period": { "days": 30, "dataPoints": 30 },
  "averages": {
    "supplyAPY": 3.75,
    "borrowAPY": 4.65
  },
  "history": [
    { "date": "2026-01-01", "supplyAPY": 3.5, "borrowAPY": 4.3 }
  ]
}
```

---

## 🔌 WebSocket API

Real-time updates via Supabase Realtime channels.

**Channel:** `yields`

**Events:** `update`, `asset_update`, `best_yield_changed`, `market_snapshot`, `connection_status`, `heartbeat`

**Full documentation:** [WebSocket Guide](./websocket/README.md)

**Quick Example:**
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

supabase.channel('yields')
  .on('broadcast', { event: 'update' }, (payload) => {
    console.log('Yields updated:', payload.payload.assetCount);
  })
  .subscribe();
```

---

## ⚡ Rate Limiting

### Limits

| Tier | Requests/Minute | WebSocket Connections |
|------|----------------|----------------------|
| **Free** | 100 | 5 per IP |
| **Premium** (future) | 1000 | 50 per API key |

### Rate Limit Response

**Status Code:** `429 Too Many Requests`

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "retryAfter": "2026-01-31T12:01:00Z"
}
```

### Best Practices

1. **Cache responses** - Store data locally and refresh periodically
2. **Use WebSocket** - Subscribe once instead of polling
3. **Batch requests** - Use `/api/yields` instead of multiple `/api/yields/:symbol` calls
4. **Check headers** - Monitor `X-RateLimit-Remaining`

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error category",
  "message": "Human-readable error description",
  "timestamp": "2026-01-31T12:00:00Z"
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Request completed successfully |
| `400` | Bad Request | Missing required parameter |
| `404` | Not Found | Asset symbol not found |
| `429` | Rate Limited | Too many requests |
| `500` | Server Error | Internal processing error |
| `503` | Service Unavailable | System degraded |

### Common Errors

**Asset Not Found (404):**
```json
{
  "success": false,
  "error": "Asset not found",
  "message": "Asset 'XYZ' is not available on Aave V3 Ethereum"
}
```

**Missing Parameter (400):**
```json
{
  "success": false,
  "error": "Missing required parameter",
  "message": "Please provide symbols parameter (e.g., ?symbols=USDC,USDT)"
}
```

---

## 📦 SDKs & Libraries

### Official SDKs (Coming Soon)

- **JavaScript/TypeScript:** `@yieldcopilot/js`
- **Python:** `yieldcopilot-python`
- **Go:** `yieldcopilot-go`

### Community Libraries

- **Rust:** Coming soon
- **Ruby:** Coming soon

---

## 💻 Code Examples

### React Hook Example

```typescript
import { useEffect, useState } from 'react';

function useYields() {
  const [yields, setYields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://yieldcopilot.vercel.app/api/yields')
      .then(res => res.json())
      .then(data => {
        setYields(data.assets);
        setLoading(false);
      });
  }, []);

  return { yields, loading };
}

// Usage
function Dashboard() {
  const { yields, loading } = useYields();

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {yields.map(asset => (
        <li key={asset.symbol}>
          {asset.symbol}: {asset.supplyAPY}% APY
        </li>
      ))}
    </ul>
  );
}
```

### Python Analytics Script

```python
import requests
import pandas as pd

# Fetch all yields
response = requests.get('https://yieldcopilot.vercel.app/api/yields')
data = response.json()

# Convert to DataFrame
df = pd.DataFrame(data['assets'])

# Analyze stablecoins
stablecoins = df[df['category'] == 'Stablecoin']
print(f"Average stablecoin APY: {stablecoins['supplyAPY'].mean():.2f}%")
print(f"Best stablecoin: {stablecoins.loc[stablecoins['supplyAPY'].idxmax(), 'symbol']}")

# Find opportunities
high_yield = df[df['supplyAPY'] > 5.0]
print(f"\nHigh yield opportunities (>5% APY):")
print(high_yield[['symbol', 'supplyAPY', 'category']])
```

---

## 🆘 Support

- **Documentation:** [yieldcopilot.vercel.app/docs](https://yieldcopilot.vercel.app/docs)
- **GitHub Issues:** [github.com/your-repo/yieldcopilot/issues](https://github.com)
- **Discord:** [discord.gg/yieldcopilot](https://discord.gg)
- **Email:** support@yieldcopilot.com

---

## 📊 Asset Categories

| Category | Description | Example Assets |
|----------|-------------|----------------|
| **Stablecoin** | USD-pegged stable value | USDC, USDT, DAI, FRAX, GHO, USDe, crvUSD |
| **ETH & LST** | Ethereum and liquid staking | WETH, wstETH, rETH, cbETH, sETH2 |
| **BTC** | Bitcoin wrapped tokens | WBTC, tBTC, cbBTC |
| **Governance** | Protocol governance tokens | LINK, AAVE, MKR, UNI, CRV, BAL |

---

## 🔄 Changelog

### v1.0.0 (2026-01-31)
- ✅ Initial release
- ✅ All Aave V3 Ethereum assets supported
- ✅ Real-time WebSocket updates
- ✅ Historical data endpoints
- ✅ Rate limiting implemented
- ✅ Production-ready infrastructure

---

**Built with ❤️ for the DeFi community**
