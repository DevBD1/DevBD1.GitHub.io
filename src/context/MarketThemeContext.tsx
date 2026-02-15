// src/context/MarketThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MarketSentiment, MarketData } from '../types/theme';

interface MarketThemeContextType {
  sentiment: MarketSentiment;
  marketData: MarketData | null;
  toggleTheme: (sentiment: MarketSentiment) => void;
  isLoading: boolean;
}

const MarketThemeContext = createContext<MarketThemeContextType | undefined>(undefined);

export const MarketThemeProvider: React.FC<{ children: React.ReactNode; initialData?: MarketData }> = ({ 
  children, 
  initialData 
}) => {
  const [sentiment, setSentiment] = useState<MarketSentiment>(initialData?.sentiment || 'CRAB');
  const [marketData, setMarketData] = useState<MarketData | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    // Client-side refresher if needed, or rely on SSR initialData
    if (!initialData) {
      fetch('/api/market-sentiment')
        .then(res => res.json())
        .then((data: MarketData) => {
          setMarketData(data);
          setSentiment(data.sentiment);
        })
        .catch(() => setSentiment('CRAB'))
        .finally(() => setIsLoading(false));
    }
  }, [initialData]);

  // Update CSS Variables on Sentiment Change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', sentiment.toLowerCase());
    
    // Optional: Set specific RGB values if Tailwind uses CSS vars directly
    // This allows seamless transitions
  }, [sentiment]);

  const toggleTheme = (newSentiment: MarketSentiment) => {
    setSentiment(newSentiment);
    // In a real app, we might disable this or make it a "Developer Override"
  };

  return (
    <MarketThemeContext.Provider value={{ sentiment, marketData, toggleTheme, isLoading }}>
      {children}
    </MarketThemeContext.Provider>
  );
};

export const useMarketTheme = () => {
  const context = useContext(MarketThemeContext);
  if (!context) throw new Error('useMarketTheme must be used within a MarketThemeProvider');
  return context;
};
