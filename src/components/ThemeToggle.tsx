// src/components/ThemeToggle.tsx
import React from 'react';
import { useMarketData, type MarketSentiment } from '../stores/marketStore';

const THEMES: { mode: MarketSentiment; label: string; emoji: string; color: string }[] = [
  { mode: 'CRAB', label: 'Neutral', emoji: '🦀', color: '#64748b' },
  { mode: 'BULL', label: 'Bull', emoji: '🚀', color: '#10b981' },
  { mode: 'BEAR', label: 'Bear', emoji: '🐻', color: '#ef4444' },
];

export default function ThemeToggle() {
  const { sentiment, setSentiment, isOverridden, resetToMarket } = useMarketData();

  const handleThemeChange = (mode: MarketSentiment) => {
    setSentiment(mode);
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-lg border backdrop-blur-sm"
      style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.8)', 
        borderColor: 'var(--color-accent)' 
      }}
    >
      <div className="flex items-center gap-2 text-sm font-mono" style={{ color: 'var(--color-secondary)' }}>
        <span>Theme:</span>
        {isOverridden && (
          <span className="px-2 py-0.5 text-xs rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Manual
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {THEMES.map(({ mode, label, emoji, color }) => (
          <button
            key={mode}
            onClick={() => handleThemeChange(mode)}
            className={`
              relative px-3 py-2 rounded-lg font-mono text-sm font-medium
              transition-all duration-200 flex items-center gap-2
              ${sentiment === mode 
                ? 'ring-2 ring-offset-2 ring-offset-slate-900' 
                : 'opacity-60 hover:opacity-100'
              }
            `}
            style={{
              backgroundColor: sentiment === mode ? `${color}20` : 'rgba(100, 116, 139, 0.1)',
              border: `1px solid ${sentiment === mode ? color : 'rgba(100, 116, 139, 0.3)'}`,
              color: sentiment === mode ? color : 'var(--color-secondary)',
              ringColor: color,
            }}
            title={`Switch to ${label} theme`}
          >
            <span>{emoji}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {isOverridden && (
        <button
          onClick={resetToMarket}
          className="text-xs font-mono transition-colors hover:underline"
          style={{ color: 'var(--color-secondary)' }}
        >
          ↺ Reset to market
        </button>
      )}
    </div>
  );
}
