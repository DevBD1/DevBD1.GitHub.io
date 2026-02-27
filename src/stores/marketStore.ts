// src/stores/marketStore.ts
import { useState, useEffect } from 'react';
import type { MarketData, MarketSentiment } from '../types/theme';

// Simple Vanilla JS Store (Pub/Sub)
// This works across Astro Islands because it's a singleton module in the client bundle.

type Listener = (data: MarketData | null) => void;

let marketDataState: MarketData | null = null;
let overriddenSentiment: MarketSentiment | null = null;
const listeners = new Set<Listener>();

export const marketStore = {
  get: () => marketDataState,
  
  getEffectiveSentiment: (): MarketSentiment => {
    return overriddenSentiment || marketDataState?.sentiment || 'CRAB';
  },
  
  isOverridden: (): boolean => {
    return overriddenSentiment !== null;
  },
  
  set: (data: MarketData) => {
    marketDataState = data;
    
    // Only update DOM if not overridden
    if (overriddenSentiment === null && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', data.sentiment.toLowerCase());
    }
    
    listeners.forEach(listener => listener(data));
  },
  
  overrideSentiment: (sentiment: MarketSentiment) => {
    overriddenSentiment = sentiment;
    
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', sentiment.toLowerCase());
    }
    
    // Notify listeners
    listeners.forEach(listener => listener(marketDataState));
  },
  
  resetToMarket: () => {
    overriddenSentiment = null;
    
    if (typeof document !== 'undefined' && marketDataState) {
      document.documentElement.setAttribute('data-theme', marketDataState.sentiment.toLowerCase());
    }
    
    listeners.forEach(listener => listener(marketDataState));
  },
  
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

// React Hook to consume the store
export function useMarketData() {
  const [data, setData] = useState<MarketData | null>(marketStore.get());
  const [isOverridden, setIsOverridden] = useState(marketStore.isOverridden());

  useEffect(() => {
    return marketStore.subscribe((newData) => {
      setData(newData);
      setIsOverridden(marketStore.isOverridden());
    });
  }, []);

  return {
    sentiment: marketStore.getEffectiveSentiment(),
    marketData: data,
    isOverridden,
    setSentiment: (sentiment: MarketSentiment) => marketStore.overrideSentiment(sentiment),
    resetToMarket: () => marketStore.resetToMarket()
  };
}

// Re-export type for convenience
export type { MarketSentiment };
