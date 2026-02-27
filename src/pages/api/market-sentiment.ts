// src/pages/api/market-sentiment.ts
import type { APIRoute } from 'astro';
import { fetchBitcoinSentiment } from '../../lib/market';

export const GET: APIRoute = async () => {
  const data = await fetchBitcoinSentiment();
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      // 5 min caching: browser (max-age) + CDN (s-maxage) + background revalidation.
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=300'
    }
  });
};
