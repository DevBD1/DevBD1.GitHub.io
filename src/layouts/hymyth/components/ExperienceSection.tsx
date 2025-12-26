import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scroll, Bookmark, Calendar, Building } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: any[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  if (!experiences) return null;

  return (
    <section id="experience" ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y }}
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-myth-moss/10 to-transparent pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
             <div className="h-px w-12 bg-myth-gold/50"></div>
             <Scroll className="text-myth-gold w-8 h-8" />
             <div className="h-px w-12 bg-myth-gold/50"></div>
          </div>
          <h2 className="font-cinzel font-bold text-5xl md:text-6xl text-white mb-6 drop-shadow-md">
            Chronicles
          </h2>
          <p className="font-crimson text-2xl text-myth-mist italic max-w-2xl mx-auto">
            "The path travelled is paved with knowledge."
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="relative bg-stone-900/80 border-2 border-slate-700 p-8 rounded-lg shadow-xl backdrop-blur-sm overflow-hidden group-hover:border-myth-gold/50 transition-colors duration-500">
                
                {/* Decorative Corner Borders */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-500 group-hover:border-myth-gold transition-colors"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-500 group-hover:border-myth-gold transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-500 group-hover:border-myth-gold transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-500 group-hover:border-myth-gold transition-colors"></div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon/Quest Giver */}
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 group-hover:border-myth-gold/50 group-hover:bg-slate-800/50 transition-all shadow-inner">
                            <Bookmark className="text-slate-400 group-hover:text-myth-gold transition-colors" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h3 className="font-cinzel text-2xl text-white font-bold group-hover:text-myth-gold transition-colors">
                            {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-slate-400 mb-4 font-mono text-sm mt-1">
                            <span className="flex items-center gap-1">
                                <Building size={14} /> {exp.company}
                            </span>
                            <span className="flex items-center gap-1 text-myth-gold/80">
                                <Calendar size={14} /> {exp.period}
                            </span>
                        </div>
                        
                        <p className="font-crimson text-xl text-slate-300 leading-relaxed mb-6">
                            {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-black/40 border border-slate-700 rounded text-xs font-mono text-slate-400 uppercase tracking-wider hover:border-slate-500 hover:text-slate-200 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;