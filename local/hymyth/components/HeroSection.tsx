import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sword, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* VoidBackground shows through */}
      
      {/* Subtler Dimmer Gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none z-0" />

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-30 text-center px-4 max-w-6xl mx-auto flex flex-col items-center"
      >
        {/* Server Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950/50 border-2 border-slate-800/50 rounded-sm shadow-panel backdrop-blur-sm">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            <span className="font-vt323 text-xl text-slate-300 tracking-wider uppercase">
              Realm Status: <span className="text-green-400">Stable</span>
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="font-cinzel font-black text-7xl md:text-[9rem] text-white mb-4 leading-[0.9] drop-shadow-[6px_6px_0_rgba(0,0,0,1)] tracking-tight relative"
        >
          <span className="relative z-10">HYMYTH</span>
          {/* Decorative duplicate for deeper shadow/glitch effect */}
          <span className="absolute inset-0 text-slate-900 -z-10 translate-y-2 translate-x-2 blur-[1px]">HYMYTH</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-slate-300 text-2xl md:text-4xl font-vt323 max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-12 bg-black/20 px-6 py-2 rounded-lg border border-white/5 backdrop-blur-sm"
        >
          <span className="text-myth-gold">Forged in Pixels.</span> Bound by Legend.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-6 items-center"
        >
             {/* Primary Button */}
             <a 
                href="#join"
                className="group relative inline-flex items-center gap-4 px-12 py-5 bg-green-800/80 text-white font-vt323 text-3xl uppercase tracking-wider transition-all shadow-voxel-btn hover:shadow-voxel-btn-hover active:shadow-voxel-btn-active active:translate-y-1 hover:bg-green-700 border-b-4 border-r-4 border-black/40 border-t border-l border-white/10 rounded-sm backdrop-blur-sm"
             >
                <Sword className="w-8 h-8 group-hover:-rotate-45 transition-transform text-green-200" />
                <span className="drop-shadow-md">Enter World</span>
             </a>

             {/* Secondary Button */}
             <a 
                href="#lore"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-800/80 text-slate-200 font-vt323 text-3xl uppercase tracking-wider transition-all shadow-voxel-btn hover:shadow-voxel-btn-hover active:shadow-voxel-btn-active active:translate-y-1 hover:bg-slate-700 border-b-4 border-r-4 border-black/40 border-t border-l border-white/10 rounded-sm backdrop-blur-sm"
             >
                <Shield className="w-8 h-8 group-hover:scale-110 transition-transform text-slate-400" />
                <span className="drop-shadow-md">Read Lore</span>
             </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="font-vt323 text-slate-500 text-xl tracking-widest animate-pulse uppercase">Scroll Down</span>
        <ChevronDown size={40} className="text-myth-gold/80 animate-bounce drop-shadow-[0_2px_0_#000]" />
      </motion.div>
    </div>
  );
};

export default HeroSection;