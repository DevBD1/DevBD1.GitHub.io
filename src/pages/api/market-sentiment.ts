// src/pages/api/market-sentiment.ts
import type { APIRoute } from 'astro';
import { fetchBitcoinSentiment } from '../../lib/market';

export const GET: APIRoute = async () => {
  const data = await fetchBitcoinSentiment();
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=60, stale-while-revalidate'
    }
  });
};
