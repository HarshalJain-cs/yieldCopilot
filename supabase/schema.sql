-- ============================================
-- YieldCopilot Supabase Schema
-- ============================================
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROJECTS TABLE
-- Stores DeFi protocols (Aave V3, Compound, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  chain_id INTEGER NOT NULL,
  chain_name TEXT NOT NULL,
  pool_address TEXT NOT NULL,
  data_provider_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Aave V3 Ethereum
INSERT INTO projects (name, slug, chain_id, chain_name, pool_address, data_provider_address)
VALUES (
  'Aave V3',
  'aave-v3-ethereum',
  1,
  'Ethereum',
  '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
  '0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3'
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ASSETS TABLE
-- Stores tokens tracked in each project
-- ============================================
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  address TEXT NOT NULL,
  category TEXT NOT NULL,
  decimals INTEGER DEFAULT 18,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, address)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_assets_symbol ON assets(symbol);
CREATE INDEX IF NOT EXISTS idx_assets_project ON assets(project_id);

-- ============================================
-- DAILY_SNAPSHOTS TABLE
-- Stores end-of-day APY snapshots for historical data
-- One row per asset per day
-- ============================================
CREATE TABLE IF NOT EXISTS daily_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  supply_apy NUMERIC(10, 4) NOT NULL,
  borrow_apy NUMERIC(10, 4),
  utilization_rate NUMERIC(6, 2),
  total_supply_raw TEXT,
  total_borrow_raw TEXT,
  tvl_usd NUMERIC(20, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(asset_id, snapshot_date)
);

-- Create index for faster historical queries
CREATE INDEX IF NOT EXISTS idx_snapshots_date ON daily_snapshots(snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_snapshots_asset_date ON daily_snapshots(asset_id, snapshot_date DESC);

-- ============================================
-- VIEWS
-- ============================================

-- View: Latest snapshot for each asset
CREATE OR REPLACE VIEW latest_snapshots AS
SELECT DISTINCT ON (ds.asset_id)
  ds.*,
  a.symbol,
  a.address,
  a.category,
  p.name as project_name,
  p.chain_name
FROM daily_snapshots ds
JOIN assets a ON ds.asset_id = a.id
JOIN projects p ON a.project_id = p.id
ORDER BY ds.asset_id, ds.snapshot_date DESC;

-- View: 30-day average APY
CREATE OR REPLACE VIEW avg_30d_apy AS
SELECT 
  a.id as asset_id,
  a.symbol,
  a.category,
  p.name as project_name,
  p.chain_name,
  AVG(ds.supply_apy) as avg_supply_apy,
  AVG(ds.borrow_apy) as avg_borrow_apy,
  AVG(ds.utilization_rate) as avg_utilization,
  COUNT(*) as days_of_data
FROM daily_snapshots ds
JOIN assets a ON ds.asset_id = a.id
JOIN projects p ON a.project_id = p.id
WHERE ds.snapshot_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY a.id, a.symbol, a.category, p.name, p.chain_name;

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_snapshots ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for API)
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read assets" ON assets FOR SELECT USING (true);
CREATE POLICY "Public read snapshots" ON daily_snapshots FOR SELECT USING (true);

-- Allow service role to insert/update
CREATE POLICY "Service insert projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert assets" ON assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert snapshots" ON daily_snapshots FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update projects" ON projects FOR UPDATE USING (true);
CREATE POLICY "Service update assets" ON assets FOR UPDATE USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function: Get 30-day average for an asset
CREATE OR REPLACE FUNCTION get_asset_30d_avg(asset_symbol TEXT)
RETURNS TABLE (
  symbol TEXT,
  avg_supply_apy NUMERIC,
  avg_borrow_apy NUMERIC,
  avg_utilization NUMERIC,
  days_of_data BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.symbol,
    AVG(ds.supply_apy)::NUMERIC as avg_supply_apy,
    AVG(ds.borrow_apy)::NUMERIC as avg_borrow_apy,
    AVG(ds.utilization_rate)::NUMERIC as avg_utilization,
    COUNT(*) as days_of_data
  FROM daily_snapshots ds
  JOIN assets a ON ds.asset_id = a.id
  WHERE a.symbol = asset_symbol
    AND ds.snapshot_date >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY a.symbol;
END;
$$ LANGUAGE plpgsql;
