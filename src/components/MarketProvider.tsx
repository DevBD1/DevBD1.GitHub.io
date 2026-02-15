// src/components/MarketProvider.tsx
import React, { useEffect } from 'react';
import type { MarketData } from '../types/theme';
import { marketStore } from '../stores/marketStore';

// This component initializes the store with SSR data
// and can handle client-side refreshes if needed.
// It does NOT wrap children; it just sits in the layout to provide the data.

interface MarketProviderProps {
  initialData: MarketData;
}

export const MarketProvider: React.FC<MarketProviderProps> = ({ initialData }) => {
  // Sync initial data to store on mount
  if (typeof window !== 'undefined') {
    // We update immediately so other components can read it
    marketStore.set(initialData);
  }

  useEffect(() => {
    // Optionally refetch here periodically
    console.log('MarketProvider initialized with:', initialData.sentiment);
  }, [initialData]);

  return null; // Invisible component
};
