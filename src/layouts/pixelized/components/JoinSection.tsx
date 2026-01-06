import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Scroll, Map as MapIcon, MessageCircle } from 'lucide-react';

const JoinSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const serverIP = "PLAY.HYMYTH.COM";
  const runes = "ᛈᛚᚪᛠ ᛫ ᚻᚣᛗᚣᛏᚻ ᛫ ᚳᚩᛗ"; // Runic approximation: P L A Y . H Y M Y T H . C O M

  const handleCopy = () => {
    if (!isHovered) return; // Only allow copy if revealed
    navigator.clipboard.writeText(serverIP.toLowerCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="join" className="relative min-h-[85vh] flex flex-col justify-center items-center bg-black overflow-hidden border-t border-slate-900/30">
      
      {/* 1. Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-100" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
      
      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-between h-full py-24 gap-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-slate-300 tracking-[0.3em]">
            THE PORTAL IS OPEN
          </h2>
          <p className="font-crimson italic text-slate-600 text-lg md:text-xl tracking-wide">
            Only those who seek the path shall find it.
          </p>
        </motion.div>

        {/* 3. The Living Threshold (Interactive Rune Area) */}
        <motion.div
           className="relative group cursor-pointer py-20 px-4 md:px-20"
           onHoverStart={() => setIsHovered(true)}
           onHoverEnd={() => setIsHovered(false)}
           onClick={handleCopy}
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ margin: "-50px" }}
           transition={{ duration: 1.5 }}
        >
          {/* Portal Energy: Swirling Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* Outer slow ring */}
             <motion.div 
               animate={{ 
                 rotate: 360, 
                 scale: isHovered ? 0.8 : 1,
                 opacity: isHovered ? 0.6 : 0.2
               }}
               transition={{ 
                 rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                 scale: { duration: 1.5, ease: "easeInOut" },
                 opacity: { duration: 1 }
               }}
               className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-slate-800/30 bg-gradient-to-b from-slate-900/0 via-slate-800/5 to-slate-900/0"
             />
             
             {/* Inner tightening ring */}
             <motion.div 
               animate={{ 
                 rotate: -360, 
                 scale: isHovered ? 0.6 : 0.9,
                 borderWidth: isHovered ? "2px" : "1px",
                 borderColor: isHovered ? "rgba(217, 119, 6, 0.2)" : "rgba(68, 64, 60, 0.1)"
               }}
               transition={{ 
                 rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                 scale: { duration: 1.2, ease: "easeInOut" },
                 borderWidth: { duration: 0.5 }
               }}
               className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-slate-800/50"
             />

             {/* Particles converging */}
             <AnimatePresence>
               {isHovered && [...Array(8)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 300 }}
                   animate={{ opacity: [0, 1, 0], x: 0, y: 0 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeIn" }}
                   className="absolute w-1 h-1 bg-myth-gold/40 rounded-full blur-[1px]"
                 />
               ))}
             </AnimatePresence>
          </div>

          {/* Text Layer */}
          <div className="relative z-10 h-20 flex items-center justify-center min-w-[300px] md:min-w-[500px]">
            {/* Runes (Default State) */}
            <motion.span
              animate={{ 
                opacity: isHovered ? 0 : 1, 
                filter: isHovered ? "blur(8px)" : "blur(0px)",
                scale: isHovered ? 0.9 : 1
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute font-cinzel text-3xl md:text-5xl tracking-[0.4em] text-slate-700 select-none"
            >
              {runes}
            </motion.span>

            {/* English (Revealed State) */}
            <motion.div
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                filter: isHovered ? "blur(0px)" : "blur(10px)",
                scale: isHovered ? 1 : 1.1
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute flex flex-col items-center gap-2"
            >
              <span className={`font-cinzel text-3xl md:text-5xl tracking-[0.15em] transition-all duration-300 ${copied ? 'text-white' : 'text-myth-gold text-glow'}`}>
                 {serverIP}
              </span>
              <span className={`text-xs font-cinzel tracking-[0.3em] uppercase transition-opacity duration-500 ${copied ? 'text-green-500' : 'text-slate-500'}`}>
                 {copied ? "Inscribed to Clipboard" : "Click to Inscribe"}
              </span>
            </motion.div>
          </div>

        </motion.div>

        {/* 4. Footer Links & Ritual Action */}
        <div className="w-full flex flex-col items-center gap-16">
            {/* Sigils */}
            <div className="flex justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-700">
                <SigilLink 
                  href="#" 
                  icon={<MessageCircle size={18} />} 
                  label="Discord" 
                  lore="Whispers" 
                />
                <SigilLink 
                  href="#" 
                  icon={<Scroll size={18} />} 
                  label="Wiki" 
                  lore="History" 
                />
                <SigilLink 
                  href="#" 
                  icon={<MapIcon size={18} />} 
                  label="Map" 
                  lore="Lands" 
                />
            </div>

            {/* Ritual Return */}
            <button 
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-4 text-slate-800 hover:text-slate-500 transition-colors duration-1000 pb-8"
            >
              <div className="h-[40px] w-[1px] bg-gradient-to-b from-slate-900 to-transparent group-hover:from-myth-gold/50 transition-all duration-700" />
              <span className="text-[10px] font-cinzel tracking-[0.4em] uppercase">Return</span>
            </button>
        </div>

      </div>
    </footer>
  );
};

const SigilLink = ({ href, icon, label, lore }: { href: string, icon: React.ReactNode, label: string, lore: string }) => (
  <a href={href} className="group flex flex-col items-center gap-3">
    <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute inset-0 border border-slate-800 rotate-45 group-hover:rotate-90 group-hover:border-slate-600 transition-all duration-700 ease-out" />
        <div className="relative z-10 text-slate-600 group-hover:text-slate-300 transition-colors duration-500">
            {icon}
        </div>
    </div>
    <div className="flex flex-col items-center">
       <span className="text-[10px] font-bold font-cinzel tracking-widest uppercase text-slate-500 group-hover:text-slate-400 transition-colors">{label}</span>
       <span className="text-[9px] font-crimson italic text-slate-700 group-hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-500">{lore}</span>
    </div>
  </a>
);

export default JoinSection;