// src/types/theme.ts
export type MarketSentiment = 'BULL' | 'BEAR' | 'CRAB';

export interface MarketData {
  btc_price: number;
  ytd_change: number;
  sentiment: MarketSentiment;
  timestamp: string;
}

export const THEME_COLORS = {
  BULL: {
    primary: '#10B981', // emerald-500
    secondary: '#34D399', // emerald-400
    bg: '#0F172A', // slate-900 (deep blue-black)
    accent: 'rgba(16, 185, 129, 0.2)'
  },
  BEAR: {
    primary: '#EF4444', // red-500
    secondary: '#F87171', // red-400
    bg: '#18181B', // zinc-900 (neutral black)
    accent: 'rgba(239, 68, 68, 0.2)'
  },
  CRAB: {
    primary: '#64748B', // slate-500
    secondary: '#94A3B8', // slate-400
    bg: '#1E293B', // slate-800
    accent: 'rgba(100, 116, 139, 0.2)'
  }
};
