/**
 * Yields API Endpoint
 * 
 * GET /api/yields
 * 
 * Returns current APY data for all tracked assets from Aave V3.
 */

import { NextResponse } from 'next/server';
import { fetchAllAssetsYieldData } from '@/lib/dynamic-fetcher';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const assets = await fetchAllAssetsYieldData();

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            count: assets.length,
            assets: assets.map((asset) => ({
                symbol: asset.symbol,
                address: asset.address,
                category: asset.category,
                supplyAPY: asset.supplyAPY,
                borrowAPY: asset.borrowAPY,
                utilizationRate: asset.utilizationRate,
                totalSupply: asset.totalSupply,
                totalBorrow: asset.totalBorrow,
                isActive: asset.isActive,
            })),
        });
    } catch (error) {
        console.error('Failed to fetch yields:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch yield data',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
