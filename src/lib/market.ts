// src/lib/market.ts
import type { MarketData, MarketSentiment } from '../types/theme';

export async function fetchBitcoinSentiment(): Promise<MarketData> {
  try {
    // CoinGecko Simple Price (includes 24h change)
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PortfolioWeb/1.0'
        },
        next: { revalidate: 60 } // Revalidate every minute
      }
    );
    
    if (!response.ok) throw new Error('API Failed');

    const data = await response.json();
    const currentPrice = data.bitcoin.usd;
    const dailyChange = data.bitcoin.usd_24h_change; // This is the % change
    
    // Determine Sentiment based on 24h Change
    // Thresholds: > +1.5% (Bull), < -1.5% (Bear), else Crab
    let sentiment: MarketSentiment = 'CRAB';
    if (dailyChange >= 1.5) sentiment = 'BULL';
    else if (dailyChange <= -1.5) sentiment = 'BEAR';

    return {
      btc_price: currentPrice,
      ytd_change: parseFloat(dailyChange.toFixed(2)), // Storing daily change in the 'ytd_change' field for now (rename pending)
      sentiment,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Market fetch failed:', error);
    // Fallback
    return {
      btc_price: 0,
      ytd_change: 0,
      sentiment: 'CRAB',
      timestamp: new Date().toISOString()
    };
  }
}
