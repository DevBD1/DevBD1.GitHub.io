import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import PhilosophySection from './components/PhilosophySection';
import JoinSection from './components/JoinSection';
import VoidBackground from './components/VoidBackground';
import { MousePointer2 } from 'lucide-react';

const HymythLayout: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [data, setData] = useState<any>({
    profile: null,
    experiences: [],
    projects: []
  });

  // Global scroll tracker for ambient effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, projRes] = await Promise.all([
          fetch('/data/profile.json'),
          fetch('/data/experience.json'),
          fetch('/data/projects.json')
        ]);
        
        const profile = await profileRes.json();
        const experiences = await expRes.json();
        const projects = await projRes.json();

        setData({ profile, experiences, projects });
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data.profile) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-myth-gold font-vt323 text-2xl">Summoning Realm...</div>;

  return (
    <div className="relative min-h-screen selection:bg-myth-gold selection:text-white text-slate-200 font-crimson">
      <VoidBackground />
      
      {/* Ambient Grain Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-grain"></div>
      
      {/* Ambient Fog/Light Layers (Optional tint) */}
      <div 
        className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-hytale-blue/10 to-transparent pointer-events-none z-40 transition-opacity duration-1000"
        style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
      />

      <Navbar />

      <main className="relative z-10 flex flex-col">
        <HeroSection profile={data.profile} />
        <ExperienceSection experiences={data.experiences} />
        <ProjectsSection projects={data.projects} />
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

export default HymythLayout;