// src/stores/marketStore.ts
import { useState, useEffect } from 'react';
import type { MarketData, MarketSentiment } from '../types/theme';

// Simple Vanilla JS Store (Pub/Sub)
// This works across Astro Islands because it's a singleton module in the client bundle.

type Listener = (data: MarketData | null) => void;

let marketDataState: MarketData | null = null;
const listeners = new Set<Listener>();

export const marketStore = {
  get: () => marketDataState,
  
  set: (data: MarketData) => {
    marketDataState = data;
    listeners.forEach(listener => listener(data));
    
    // Also update CSS variables immediately
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', data.sentiment.toLowerCase());
    }
  },
  
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

// React Hook to consume the store
export function useMarketData() {
  const [data, setData] = useState<MarketData | null>(marketStore.get());

  useEffect(() => {
    return marketStore.subscribe((newData) => {
      setData(newData);
    });
  }, []);

  return {
    sentiment: data?.sentiment || 'CRAB',
    marketData: data
  };
}
