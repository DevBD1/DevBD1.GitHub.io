import React from 'react';
import { motion } from 'framer-motion';

const LoreSection: React.FC = () => {
  const paragraphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="lore" className="relative py-32 px-6 overflow-hidden">
      {/* Decorative background elements - Very subtle now */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-myth-moss/5 rounded-full blur-[120px] pointer-events-none opacity-30" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-myth-gold/5 rounded-full blur-[100px] pointer-events-none opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.3 }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={paragraphVariants} className="text-center mb-24">
             <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-myth-gold/50 to-transparent mx-auto mb-6" />
             <h2 className="font-cinzel text-4xl md:text-5xl text-slate-200 drop-shadow-md">The Forgotten Age</h2>
             <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-myth-gold/50 to-transparent mx-auto mt-6" />
          </motion.div>

          {/* Lore Blocks */}
          <motion.div variants={paragraphVariants} className="flex flex-col md:flex-row gap-8 items-center bg-slate-950/30 p-8 rounded-sm border border-slate-800/30 backdrop-blur-sm">
            <div className="flex-1 text-lg md:text-xl text-slate-300 leading-loose">
              <p>
                <span className="text-4xl float-left mr-2 mt-[-6px] font-cinzel text-myth-gold">L</span>
                ong have the archives been silent. The Third Age of Hymyth is not written in ink, but etched in the bedrock of a world reclaiming itself. 
                Here, the ruins of ancestors are not merely scenery—they are puzzles, warnings, and foundations.
              </p>
            </div>
             <div className="flex-1">
                 <img src="https://picsum.photos/seed/ruins/600/400" alt="Ancient Ruins" className="rounded-sm opacity-80 border border-slate-800/50 shadow-lg hover:opacity-100 transition-opacity duration-500" />
             </div>
          </motion.div>

          <motion.div variants={paragraphVariants} className="flex flex-col md:flex-row-reverse gap-8 items-center bg-slate-950/30 p-8 rounded-sm border border-slate-800/30 backdrop-blur-sm">
            <div className="flex-1 text-lg md:text-xl text-slate-300 leading-loose text-right">
              <p>
                There are no chosen ones here. No prophecies waiting for a hero. 
                Only travelers, merchants, and warriors forging their own tales amidst the whispering winds of the <span className="text-myth-gold/80 italic">Iron Mountains</span>.
              </p>
            </div>
            <div className="flex-1">
                <img src="https://picsum.photos/seed/mountains/600/400" alt="Iron Mountains" className="rounded-sm opacity-80 border border-slate-800/50 shadow-lg hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          <motion.div variants={paragraphVariants} className="text-center pt-12">
            <p className="font-cinzel text-2xl text-slate-500 italic drop-shadow-sm">
              "The history of this land is yours to write."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoreSection;