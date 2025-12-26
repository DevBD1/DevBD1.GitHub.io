import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Github, ExternalLink, Cpu } from 'lucide-react';

interface ProjectsSectionProps {
  projects: any[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (!projects) return null;

  return (
    <section id="projects" className="relative py-32 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-myth-gold rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)] mb-6 rotate-45"
          >
             <Hammer className="text-black w-8 h-8 -rotate-45" />
          </motion.div>
          <h2 className="font-cinzel font-black text-5xl md:text-6xl text-white mb-2 text-center">
            Forged Artifacts
          </h2>
          <p className="font-vt323 text-2xl text-slate-400">Engineering & Creations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-900 border-4 border-slate-700 rounded-sm hover:border-myth-gold transition-all duration-300 hover:-translate-y-2 shadow-xl"
            >
              {/* Card Image Area (Placeholder pattern) */}
              <div className="h-48 w-full bg-slate-800 relative overflow-hidden bg-pixel-pattern opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu size={48} className="text-slate-600 group-hover:text-myth-gold transition-colors duration-500" />
                </div>
                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 font-vt323 text-white border border-white/10 rounded">
                    {project.year}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="font-cinzel text-xl text-white font-bold mb-3 truncate group-hover:text-myth-gold transition-colors">
                    {project.title}
                </h3>
                <p className="font-crimson text-slate-400 text-lg leading-relaxed mb-6 h-20 overflow-hidden line-clamp-3">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6 h-16 content-start">
                    {project.technologies.slice(0, 4).map((tech: string, i: number) => (
                        <span key={i} className="text-xs font-mono text-cyan-200/70 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/10">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-xs font-mono text-slate-500 px-1 py-1">...</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                    <a href={project.githubUrl} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 text-slate-300 font-vt323 text-xl border-b-4 border-slate-950 hover:bg-slate-700 hover:text-white transition-colors active:border-b-0 active:translate-y-1 rounded-sm">
                        <Github size={16} /> Code
                    </a>
                    <a href={project.liveUrl} className="flex-1 flex items-center justify-center gap-2 py-2 bg-myth-gold text-black font-vt323 text-xl border-b-4 border-yellow-700 hover:bg-yellow-400 transition-colors active:border-b-0 active:translate-y-1 rounded-sm">
                         Demo <ExternalLink size={16} />
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;