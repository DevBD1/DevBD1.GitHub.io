// src/components/SkillTicker.tsx
import React from 'react';
import { useMarketData } from '../stores/marketStore';
import { skills } from '../data/skills';

// Tech Stack from data/skills.ts
const SKILLS = skills;

export default function SkillTicker() {
  const { sentiment } = useMarketData();
  
  // Decide colors based on sentiment (Bull = Green, Bear = Red, Crab = Grey)
  const isBull = sentiment === 'BULL';
  const isBear = sentiment === 'BEAR';
  
  const textColor = isBull 
    ? 'text-emerald-400' 
    : isBear 
      ? 'text-red-400' 
      : 'text-slate-400';

  const icon = isBull ? '▲' : isBear ? '▼' : '▬';

  // Create a reusable item list to ensure perfect duplication
  const TickerContent = () => (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {SKILLS.map((skill, index) => {
        // Calculate dynamic change based on market sentiment
        // If Bearish, we flip the plus to a minus
        const displayChange = isBear ? skill.change.replace('+', '-') : skill.change;
        
        return (
          <div 
            key={`${skill.symbol}-${index}`} 
            className={`inline-flex items-center font-mono text-sm ${textColor}`}
          >
            <span className="font-bold mr-2 text-white">{skill.symbol}</span>
            <span className="mr-1">{icon}</span>
            <span>{displayChange}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-slate-900 border-b border-slate-800 py-2 relative z-50">
      {/* 
        Double Container Strategy:
        We render the content twice side-by-side in a flex container.
        We animate the container to move left by 50% (the width of one set).
        When it hits -50%, it snaps back to 0% instantly.
        Since the second set is identical to the first, the snap is invisible.
      */}
      <div className="flex whitespace-nowrap animate-marquee w-fit">
        <TickerContent />
        <TickerContent />
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
