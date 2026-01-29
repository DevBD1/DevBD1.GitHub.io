import React from 'react';
import './starship.css';
import SpaceBackground from './SpaceBackground';
import FloatingHeader from './FloatingHeader';
import HudFrame from './HudFrame';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import TimelineSection from './TimelineSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { usePortfolioData } from '../services/portfolioData';
import { Loader2 } from 'lucide-react';

const StarshipLayout: React.FC = () => {
  const { data, isLoading, error } = usePortfolioData();
  const [showBackground, setShowBackground] = React.useState(true);

  // Loading State
  if (isLoading) {
    return (
      <div className="starship-layout relative min-h-screen text-slate-200 flex items-center justify-center">
        {showBackground && <SpaceBackground />}
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="font-mono text-cyan-400 animate-pulse">INITIALIZING SYSTEMS...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="starship-layout relative min-h-screen text-slate-200 flex items-center justify-center">
        {showBackground && <SpaceBackground />}
        <div className="text-center text-red-400 font-mono">
          <p>SYSTEM ERROR: Failed to load data</p>
          <p className="text-sm mt-2 text-slate-500">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="starship-layout relative min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100">
      {showBackground && <SpaceBackground />}
      <div className="scanline-overlay"></div>
      <HudFrame />
      <FloatingHeader
        showBackground={showBackground}
        onToggleBackground={() => setShowBackground(!showBackground)}
      />

      <main className="relative z-10 container mx-auto px-6 pb-20">
        <HeroSection profile={data.profile} />
        <ProjectsSection projects={data.projects} />
        <TimelineSection experiences={data.experiences} />
        <AboutSection
          profile={data.profile}
          skills={data.skills}
          projectCount={data.projects.length}
        />
        {/* <ContactSection profile={data.profile} /> */}
        <Footer name={data.profile.name} />
      </main>
    </div>
  );
};

export default StarshipLayout;