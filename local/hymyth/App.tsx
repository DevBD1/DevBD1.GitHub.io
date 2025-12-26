import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoreSection from './components/LoreSection';
import GameplaySection from './components/GameplaySection';
import PhilosophySection from './components/PhilosophySection';
import JoinSection from './components/JoinSection';
import VoidBackground from './components/VoidBackground';
import { MousePointer2 } from 'lucide-react';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  // Global scroll tracker for ambient effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-myth-gold selection:text-white text-slate-200">
      <VoidBackground />
      
      {/* Ambient Grain Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Ambient Fog/Light Layers (Optional tint) */}
      <div 
        className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-hytale-blue/10 to-transparent pointer-events-none z-40 transition-opacity duration-1000"
        style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
      />

      <Navbar />

      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <LoreSection />
        <GameplaySection />
        <PhilosophySection />
        <JoinSection />
      </main>

      {/* Custom Cursor Hint (Desktop only) */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50 text-slate-400/30 animate-pulse mix-blend-difference">
         <MousePointer2 className="w-6 h-6 rotate-12" />
      </div>
    </div>
  );
};

export default App;