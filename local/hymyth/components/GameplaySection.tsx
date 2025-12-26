import React from 'react';
import { motion } from 'framer-motion';
import { Map, Sword, Hammer, Scroll } from 'lucide-react';

interface FeatureProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureProps> = ({ title, desc, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-myth-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
      <div className="relative h-full bg-slate-950/40 backdrop-blur-sm border border-slate-800/50 p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg">
        <div className="mb-6 text-myth-gold/80 p-4 bg-slate-950/80 rounded-full border border-slate-800 group-hover:text-myth-gold group-hover:border-myth-gold/20 transition-colors">
          {icon}
        </div>
        <h3 className="font-cinzel text-xl text-slate-200 mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm font-crimson">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const GameplaySection: React.FC = () => {
  return (
    <section id="gameplay" className="relative py-32">
      {/* Radial vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-slate-950/60 pointer-events-none" />
      
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-multiply pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-cinzel text-4xl md:text-5xl text-slate-200 mb-4 drop-shadow-md">The Path Before You</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">A soft-RPG sandbox experience grounded in immersion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Uncharted Wilds" 
            desc="A custom generated world teeming with biomes that defy explanation. Chart the map, name the peaks, and find what lies beyond the veil."
            icon={<Map size={32} />}
            delay={0.1}
          />
          <FeatureCard 
            title="Tactical Combat" 
            desc="Monsters here do not simply fall to frantic clicking. Study your enemy, prepare your steel, and fight with purpose."
            icon={<Sword size={32} />}
            delay={0.2}
          />
          <FeatureCard 
            title="Ancient Craft" 
            desc="No automated factories. Return to the anvil and the loom. Craft items that carry their maker's name into legend."
            icon={<Hammer size={32} />}
            delay={0.3}
          />
          <FeatureCard 
            title="Living Lore" 
            desc="Events are not scripted by admins, but sparked by players. Kingdoms rise and fall by your hand."
            icon={<Scroll size={32} />}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default GameplaySection;