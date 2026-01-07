import React, { useState, useEffect } from 'react';
import { Rocket, Monitor, User, Send, Radio, Briefcase } from 'lucide-react';

const FloatingHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple spy logic
      const sections = ['home', 'projects', 'career', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 400) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'home', icon: Rocket, label: 'CMD' },
    { id: 'projects', icon: Monitor, label: 'LOGS' },
    { id: 'career', icon: Briefcase, label: 'PATH' },
    { id: 'about', icon: User, label: 'BIO' },
    { id: 'contact', icon: Send, label: 'COMMS' },
  ];

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
      <nav
        className={`
          flex items-center justify-between px-2 py-2 rounded-full transition-all duration-500
          ${isScrolled 
            ? 'bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
            : 'bg-transparent border border-transparent'}
        `}
      >
        <ul className="flex w-full justify-between items-center relative gap-1">
          {/* Background slider could go here if we wanted complex FLIP animations */}
          
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative z-10">
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                      : 'text-slate-400 hover:text-cyan-200 hover:bg-white/5'}
                  `}
                >
                  <item.icon size={18} className={isActive ? "animate-pulse" : ""} />
                  <span className={`text-sm font-bold tracking-wider hidden sm:block ${isActive ? 'hologram-text' : ''}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Decorative HUD Element below header */}
      <div className={`
        absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-opacity duration-500
        ${isScrolled ? 'opacity-100' : 'opacity-0'}
      `}>
         <div className="h-[2px] w-8 bg-cyan-500/50"></div>
         <Radio size={12} className="text-cyan-500 animate-ping" />
         <div className="h-[2px] w-8 bg-cyan-500/50"></div>
      </div>
    </div>
  );
};

export default FloatingHeader;