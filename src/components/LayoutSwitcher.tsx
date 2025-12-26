import React, { useState } from 'react';
import { Monitor, Rocket, Sword } from 'lucide-react';

interface LayoutSwitcherProps {
  currentLayout: 'default' | 'starship' | 'hymyth';
  onSwitch: (layout: 'default' | 'starship' | 'hymyth') => void;
}

const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({ currentLayout, onSwitch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  const getNextLayout = () => {
    switch (currentLayout) {
      case 'default': return 'starship';
      case 'starship': return 'hymyth';
      case 'hymyth': return 'default';
      default: return 'default';
    }
  };

  const getLayoutName = () => {
    switch (currentLayout) {
      case 'default': return 'Portfolio V1';
      case 'starship': return 'System Online';
      case 'hymyth': return 'Realm Connected';
    }
  };

  const getActionName = () => {
    switch (currentLayout) {
      case 'default': return 'Launch Starship';
      case 'starship': return 'Enter Realm';
      case 'hymyth': return 'Return Home';
    }
  };

  const getThemeStyles = () => {
    switch (currentLayout) {
      case 'starship': return 'bg-slate-950/90 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] text-cyan-400';
      case 'hymyth': return 'bg-stone-900/90 border-amber-600/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] text-amber-400';
      default: return 'bg-white/90 border-slate-200 shadow-xl hover:shadow-2xl text-slate-700';
    }
  };

  const getIconStyles = () => {
    switch (currentLayout) {
      case 'starship': return 'bg-cyan-500/10 text-cyan-400';
      case 'hymyth': return 'bg-amber-500/10 text-amber-400';
      default: return 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white';
    }
  };

  // Trigger warp effect on switch
  const handleSwitch = () => {
    setIsWarping(true);
    setTimeout(() => {
      onSwitch(getNextLayout());
      setTimeout(() => setIsWarping(false), 300);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] group perspective-1000">
      <button
        onClick={handleSwitch}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-between p-1.5 rounded-full transition-all duration-500 ease-out overflow-hidden border
          ${isWarping ? 'scale-[0.1] rotate-180 opacity-0 blur-xl' : 'scale-100 rotate-0 opacity-100 blur-0'}
          w-14 hover:w-48
          ${getThemeStyles()}
        `}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${currentLayout === 'default' ? 'opacity-100 bg-gradient-to-br from-white to-slate-50' : 'opacity-0'}`} />
        
        {/* Label Container */}
        <div className={`
          absolute left-4 flex flex-col justify-center
          ${isHovered 
            ? 'opacity-100 translate-x-0 transition-all duration-500 delay-100 ease-out' 
            : 'opacity-0 -translate-x-4 transition-all duration-150 ease-in pointer-events-none'}
        `}>
           <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-80">
             {getLayoutName()}
           </span>
           <span className="text-xs font-mono font-bold whitespace-nowrap">
             {getActionName()}
           </span>
        </div>

        {/* Icons / Toggle Handle */}
        <div className={`
          relative z-10 flex items-center justify-center w-11 h-11 rounded-full shadow-sm transition-all duration-500 ml-auto
          ${getIconStyles()}
        `}>
           <div className="absolute inset-0 flex items-center justify-center">
             {/* Default Icon */}
             <Monitor 
                size={20} 
                className={`absolute transition-all duration-500 ${currentLayout === 'default' ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45'}`} 
             />
             {/* Starship Icon */}
             <Rocket 
                size={20} 
                className={`absolute transition-all duration-500 ${currentLayout === 'starship' ? 'scale-100 opacity-100' : 'scale-0 opacity-0 -rotate-45'}`} 
             />
             {/* Hymyth Icon */}
             <Sword 
                size={20} 
                className={`absolute transition-all duration-500 ${currentLayout === 'hymyth' ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45'}`} 
             />
           </div>
        </div>
      </button>
    </div>
  );
};

export default LayoutSwitcher;
