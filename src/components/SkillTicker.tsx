// src/components/SkillTicker.tsx
import React, { useRef, useEffect } from 'react';
import { useMarketTheme } from '../context/MarketThemeContext';

// Mock Skills Data (Tech Stack)
const SKILLS = [
  { symbol: '$REACT', name: 'React.js', change: '+2.5%' },
  { symbol: '$NEXT', name: 'Next.js', change: '+4.2%' },
  { symbol: '$NODE', name: 'Node.js', change: '+1.8%' },
  { symbol: '$TS', name: 'TypeScript', change: '+3.1%' },
  { symbol: '$SOL', name: 'Solidity', change: '+5.0%' },
  { symbol: '$PY', name: 'Python', change: '+1.2%' },
  { symbol: '$SQL', name: 'PostgreSQL', change: '+0.5%' },
  { symbol: '$ASTRO', name: 'Astro', change: '+6.8%' },
  { symbol: '$TAILWIND', name: 'Tailwind', change: '+2.1%' },
  { symbol: '$DOCKER', name: 'Docker', change: '+0.9%' },
];

export default function SkillTicker() {
  const { sentiment } = useMarketTheme();
  
  // Decide colors based on sentiment (Bull = Green, Bear = Red, Crab = Grey)
  const isBull = sentiment === 'BULL';
  const isBear = sentiment === 'BEAR';
  
  // Bull = Green text, Bear = Red text, Crab = Grey text
  const textColor = isBull 
    ? 'text-emerald-400' 
    : isBear 
      ? 'text-red-400' 
      : 'text-slate-400';

  const icon = isBull ? '▲' : isBear ? '▼' : '▬';

  return (
    <div className="w-full overflow-hidden bg-slate-900 border-b border-slate-800 py-2 relative z-50">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Render twice for seamless loop */}
        {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, index) => (
          <div 
            key={`${skill.symbol}-${index}`} 
            className={`inline-flex items-center mx-6 font-mono text-sm ${textColor}`}
          >
            <span className="font-bold mr-2 text-white">{skill.symbol}</span>
            <span className="mr-1">{icon}</span>
            <span>{isBear ? skill.change.replace('+', '-') : skill.change}</span>
          </div>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: flex;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Needs adjustment based on content width */
        }
      `}</style>
    </div>
  );
}
