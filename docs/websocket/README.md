# WebSocket API Documentation

YieldCopilot provides real-time yield updates via WebSocket using Supabase Realtime channels.

## Quick Start

```javascript
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Subscribe to yield updates
const channel = supabase.channel('yields');

channel
  .on('broadcast', { event: 'update' }, (payload) => {
    console.log('Yield update received:', payload);
  })
  .subscribe();
```

---

## Event Types

### 1. `update` - Full Market Update

Triggered when yields are refreshed (every 500ms debounced).

**Payload:**
```json
{
  "type": "full_update",
  "timestamp": "2026-01-31T12:00:00Z",
  "assetCount": 30,
  "trigger": "ReserveDataUpdated",
  "assets": [
    {
      "symbol": "USDC",
      "category": "Stablecoin",
      "supplyAPY": 4.25,
      "borrowAPY": 5.10,
      "utilizationRate": 75.5
    }
  ]
}
```

---

### 2. `asset_update` - Single Asset Update

Triggered when a specific asset's yield changes significantly.

**Payload:**
```json
{
  "type": "single_update",
  "timestamp": "2026-01-31T12:00:00Z",
  "trigger": "ReserveDataUpdated: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "asset": {
    "symbol": "USDC",
    "category": "Stablecoin",
    "supplyAPY": 4.25,
    "borrowAPY": 5.10,
    "utilizationRate": 75.5
  }
}
```

---

### 3. `best_yield_changed` - Best Yield Alert

Triggered when the highest-yield asset in a category changes.

**Payload:**
```json
{
  "timestamp": "2026-01-31T12:00:00Z",
  "category": "Stablecoin",
  "oldBest": {
    "symbol": "USDT",
    "apy": 4.20
  },
  "newBest": {
    "symbol": "USDC",
    "apy": 4.25
  },
  "change": 1.19
}
```

---

### 4. `market_snapshot` - Market Statistics

Broadcasted periodically with aggregated market data.

**Payload:**
```json
{
  "timestamp": "2026-01-31T12:00:00Z",
  "totalAssets": 30,
  "avgSupplyAPY": 3.85,
  "avgBorrowAPY": 4.92,
  "highestAPY": {
    "symbol": "USDC",
    "apy": 4.25
  }
}
```

---

### 5. `connection_status` - Connection State

Indicates WebSocket connection health.

**Payload:**
```json
{
  "status": "connected",
  "timestamp": "2026-01-31T12:00:00Z",
  "reconnectAttempts": 0
}
```

**Status values:** `connected`, `disconnected`, `reconnecting`

---

### 6. `heartbeat` - Keep-Alive Ping

Sent every 30 seconds to maintain connection.

**Payload:**
```json
{
  "timestamp": "2026-01-31T12:00:00Z",
  "serverTime": 1738329600000
}
```

---

## Full JavaScript SDK Example

```javascript
class YieldCopilotWebSocket {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.channel = null;
    this.listeners = new Map();
  }

  // Connect to WebSocket
  connect() {
    this.channel = this.supabase.channel('yields');

    // Subscribe to all event types
    this.channel
      .on('broadcast', { event: 'update' }, (payload) => {
        this.emit('update', payload.payload);
      })
      .on('broadcast', { event: 'asset_update' }, (payload) => {
        this.emit('asset_update', payload.payload);
      })
      .on('broadcast', { event: 'best_yield_changed' }, (payload) => {
        this.emit('best_yield_changed', payload.payload);
      })
      .on('broadcast', { event: 'market_snapshot' }, (payload) => {
        this.emit('market_snapshot', payload.payload);
      })
      .on('broadcast', { event: 'connection_status' }, (payload) => {
        this.emit('connection_status', payload.payload);
      })
      .on('broadcast', { event: 'heartbeat' }, (payload) => {
        this.emit('heartbeat', payload.payload);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Connected to YieldCopilot WebSocket');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ WebSocket connection error');
        }
      });

    return this;
  }

  // Event listener registration
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return this;
  }

  // Emit events to listeners
  emit(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach((callback) => callback(data));
  }

  // Disconnect
  disconnect() {
    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = null;
    }
  }
}

// Usage
const ws = new YieldCopilotWebSocket(
  'https://your-project.supabase.co',
  'your-anon-key'
);

ws.on('update', (data) => {
  console.log(`Received ${data.assetCount} assets`);
  data.assets.forEach((asset) => {
    console.log(`${asset.symbol}: ${asset.supplyAPY}% APY`);
  });
});

ws.on('best_yield_changed', (data) => {
  console.log(`🚨 Best ${data.category} yield changed to ${data.newBest.symbol}!`);
});

ws.connect();
```

---

## Python SDK Example

```python
import asyncio
from supabase import create_client, Client

class YieldCopilotWebSocket:
    def __init__(self, supabase_url: str, supabase_key: str):
        self.supabase: Client = create_client(supabase_url, supabase_key)
        self.channel = None
        self.callbacks = {}

    def on(self, event: str, callback):
        """Register event listener"""
        if event not in self.callbacks:
            self.callbacks[event] = []
        self.callbacks[event].append(callback)
        return self

    def connect(self):
        """Connect to WebSocket"""
        self.channel = self.supabase.channel('yields')

        # Subscribe to events
        self.channel.on_broadcast('update', lambda payload: self._emit('update', payload))
        self.channel.on_broadcast('asset_update', lambda payload: self._emit('asset_update', payload))
        self.channel.on_broadcast('best_yield_changed', lambda payload: self._emit('best_yield_changed', payload))

        self.channel.subscribe()
        print("✅ Connected to YieldCopilot WebSocket")
        return self

    def _emit(self, event: str, data):
        """Emit event to all listeners"""
        for callback in self.callbacks.get(event, []):
            callback(data)

    def disconnect(self):
        """Disconnect from WebSocket"""
        if self.channel:
            self.channel.unsubscribe()

# Usage
ws = YieldCopilotWebSocket(
    'https://your-project.supabase.co',
    'your-anon-key'
)

def handle_update(data):
    print(f"Received {data['assetCount']} assets")
    for asset in data['assets']:
        print(f"{asset['symbol']}: {asset['supplyAPY']}% APY")

ws.on('update', handle_update)
ws.connect()
```

---

## Rate Limiting

WebSocket connections are **not rate limited**, but you should:
- Reconnect with exponential backoff if disconnected
- Don't open more than 5 concurrent connections per IP
- Use heartbeat to detect stale connections

---

## Error Handling

```javascript
ws.on('connection_status', (data) => {
  if (data.status === 'disconnected') {
    console.error('Connection lost. Reconnecting...');
    setTimeout(() => ws.connect(), 5000);
  }
});
```

---

## Best Practices

1. **Use heartbeat for monitoring**: Track `heartbeat` events to detect connection issues
2. **Handle reconnection gracefully**: Implement exponential backoff
3. **Debounce UI updates**: Don't update UI on every event - batch updates
4. **Cache last update**: Store the latest data for immediate display
5. **Subscribe to specific events**: Only listen to events you need

---

## Support

- **GitHub**: [github.com/your-repo/yieldcopilot](https://github.com)
- **Documentation**: [yieldcopilot.vercel.app/docs](https://yieldcopilot.vercel.app/docs)
- **Discord**: [discord.gg/yieldcopilot](https://discord.gg)
