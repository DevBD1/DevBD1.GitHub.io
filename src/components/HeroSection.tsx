import React from 'react';
import { ArrowDown, Cpu, Globe, Zap } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface HeroSectionProps {
  profile: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Get display name - use username style for Starship theme
  //const displayName = profile.name.split(' ').pop()?.toUpperCase() || profile.name.toUpperCase();
  const displayName = "M. Burak Dorman";

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative pt-20">

      {/* Central Hologram Container */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="inline-block mb-4 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-sm">
          <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] animate-pulse">
            TRANSMISSION INCOMING...
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 hologram-text">
            {displayName}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {profile.about[0]?.split('.')[0]}.
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: Cpu, label: profile.title },
            { icon: Globe, label: 'Full Stack' },
            { icon: Zap, label: 'System Architect' }
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 glass-panel rounded border border-slate-700/50 hover:border-cyan-500/50 transition-colors group">
              <badge.icon size={16} className="text-cyan-500 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-mono text-slate-300">{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {/* <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded clip-path-polygon transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(8,145,178,0.5)]"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            INITIALIZE MISSION
          </button> */}

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-transparent border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30 font-bold rounded transition-all hover:border-cyan-400"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            READ DATA LOGS
          </button>
        </div>
      </div>

      {/* Decorative Circles behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cyan-900/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-dashed border-cyan-900/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

      {/* Grand Circle / Planet Background */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-full blur-3xl -z-10 animate-[float-diagonal_15s_ease-in-out_infinite_alternate] pointer-events-none"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-cyan-500/50">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default HeroSection;