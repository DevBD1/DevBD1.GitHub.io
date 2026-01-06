import React from 'react';
import { motion } from 'framer-motion';

const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-40 overflow-hidden flex items-center justify-center">
      {/* Smoother gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-slate-950/30 to-black pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="border-l-2 border-myth-gold/30 pl-8"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-8 drop-shadow-md">
            Built for <br />
            <span className="text-myth-gold">Eternity</span>
          </h2>
          <div className="space-y-6 text-slate-300 text-lg">
            <p>
              We believe a server should be a home, not a marketplace. Hymyth is founded on the principles of fair play and deep immersion.
            </p>
            <p>
              <strong className="text-white font-cinzel">No Pay-to-Win.</strong> Ever. Support keeps the lights on, but it does not buy power.
            </p>
            <p>
              <strong className="text-white font-cinzel">Community First.</strong> The world evolves based on the collective actions of its inhabitants.
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-slate-950/60 backdrop-blur-md p-10 border border-slate-800/50 shadow-2xl rounded-sm"
        >
           <blockquote className="font-cinzel text-2xl text-slate-200 italic text-center mb-6 leading-relaxed">
             "A story that is bought is cheap. A story that is earned is priceless."
           </blockquote>
           <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-slate-600"></div>
             <span className="text-slate-500 uppercase tracking-widest text-sm font-bold">The Founder</span>
             <div className="h-[1px] w-12 bg-slate-600"></div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PhilosophySection;