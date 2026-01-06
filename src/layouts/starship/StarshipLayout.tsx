import React, { useState, useMemo } from 'react';
import './starship.css';
import SpaceBackground from './components/SpaceBackground';
import FloatingHeader from './components/FloatingHeader';
import HudFrame from './components/HudFrame';
import HeroSection from './components/HeroSection';
import ProjectCard from './components/ProjectCard';
import TimelineSection from './components/TimelineSection';
import SkillChart from './components/SkillChart';
import { usePortfolioData } from '../../services/portfolioData';
import type { Project as PortfolioProject, Skill } from '../../types/portfolio';
import { Mail, Github, Linkedin, Twitter, MessageSquare, Filter, Check, Loader2 } from 'lucide-react';

// Starship-specific project interface with required status
interface StarshipProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'Deployed' | 'In Orbit' | 'Classified';
}

// Transform portfolio projects to Starship format
function toStarshipProject(project: PortfolioProject, index: number): StarshipProject {
  return {
    id: project.id || `PRJ-${String(index + 1).padStart(2, '0')}`,
    title: project.title,
    description: project.description,
    tech: project.technologies,
    status: (project.status as StarshipProject['status']) || 'Active',
  };
}

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-xs font-mono rounded border transition-all duration-300 ${
      isActive 
        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
        : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
    }`}
  >
    {label}
  </button>
);

const StarshipLayout: React.FC = () => {
  const { data, isLoading, error } = usePortfolioData();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  // Transform and memoize data
  const projects = useMemo(() => 
    data?.projects.map((p, i) => toStarshipProject(p, i)) || [], 
    [data?.projects]
  );

  const skills = useMemo(() => data?.skills || {}, [data?.skills]);

  // Filter Logic
  const allTechs = useMemo(() => Array.from(new Set(projects.flatMap(p => p.tech))), [projects]);
  const allStatuses = useMemo(() => Array.from(new Set(projects.map(p => p.status))), [projects]);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (project.status === activeFilter) return true;
    return project.tech.includes(activeFilter);
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="starship-layout relative min-h-screen text-slate-200 flex items-center justify-center">
        <SpaceBackground />
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
        <SpaceBackground />
        <div className="text-center text-red-400 font-mono">
          <p>SYSTEM ERROR: Failed to load data</p>
          <p className="text-sm mt-2 text-slate-500">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="starship-layout relative min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100">
      <SpaceBackground />
      <div className="scanline-overlay"></div>
      <HudFrame />
      <FloatingHeader />

      <main className="relative z-10 container mx-auto px-6 pb-20">
        
        <HeroSection profile={data.profile} />

        {/* Projects Section */}
        <section id="projects" className="py-32">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-4xl font-bold text-white tracking-tight">Mission Log</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          
          {/* Filter Bar */}
          <div className="mb-10 p-4 glass-panel rounded-lg border border-slate-800/50 flex flex-wrap items-center gap-3">
             <div className="flex items-center gap-2 text-cyan-500 mr-2">
                <Filter size={16} />
                <span className="font-mono text-xs tracking-widest uppercase hidden sm:block">Filter Protocols:</span>
             </div>
             
             <FilterButton label="All Systems" isActive={activeFilter === 'All'} onClick={() => setActiveFilter('All')} />
             
             <div className="w-[1px] h-4 bg-slate-700 mx-1 hidden sm:block"></div>
             
             {allStatuses.map(status => (
                <FilterButton key={status} label={status} isActive={activeFilter === status} onClick={() => setActiveFilter(status)} />
             ))}

             <div className="w-[1px] h-4 bg-slate-700 mx-1 hidden sm:block"></div>

             {allTechs.map(tech => (
                <FilterButton key={tech} label={tech} isActive={activeFilter === tech} onClick={() => setActiveFilter(tech)} />
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-dashed border-slate-800 rounded-xl">
                 <p className="text-slate-500 font-mono">NO MODULES FOUND MATCHING FILTER PARAMETERS.</p>
                 <button 
                   onClick={() => setActiveFilter('All')}
                   className="mt-4 text-cyan-500 hover:text-cyan-400 text-sm font-mono underline underline-offset-4"
                 >
                   RESET FILTERS
                 </button>
              </div>
            )}
          </div>
        </section>

        {/* Career Section */}
        <TimelineSection experiences={data.experiences} />

        {/* About / Skills Section */}
        <section id="about" className="py-32">
          <div className="flex items-center gap-4 mb-12">
             <div className="h-[1px] flex-grow bg-gradient-to-l from-cyan-500/50 to-transparent"></div>
             <h2 className="text-4xl font-bold text-white tracking-tight">System Specs</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div className="glass-panel p-8 rounded-xl border border-slate-800">
                 <h3 className="text-2xl font-bold text-cyan-400 mb-4">Operator Profile</h3>
                 {data.profile.about.map((paragraph, i) => (
                   <p key={i} className="text-slate-400 leading-relaxed mb-4 last:mb-0">
                     {paragraph}
                   </p>
                 ))}
               </div>
               
               {/* Stats Grid */}
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Years Exp', val: '3+' },
                    { label: 'Projects', val: String(data.projects.length) },
                    { label: 'Skills', val: String(Object.values(skills).flat().length) },
                    { label: 'Coffee', val: '∞' }
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel p-4 rounded text-center border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <div className="text-3xl font-mono font-bold text-white mb-1">{stat.val}</div>
                      <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               {Object.entries(skills).map(([category, categorySkills]) => (
                 <SkillChart key={category} category={`${category} Systems`} skills={categorySkills as Skill[]} />
               ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 mb-20">
          <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-1 border border-cyan-500/20">
            <div className="bg-slate-950/80 rounded-xl p-8 md:p-12 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                   <h2 className="text-3xl font-bold text-white mb-2">Establish Uplink</h2>
                   <p className="text-slate-400 mb-8">Ready to collaborate on the next interstellar project? Send a transmission.</p>
                   
                   <div className="space-y-4">
                      {[
                        { icon: Github, text: data.profile.socials.github.replace('https://', ''), href: data.profile.socials.github },
                        { icon: Linkedin, text: data.profile.socials.linkedin.replace('https://www.', ''), href: data.profile.socials.linkedin },
                        ...(data.profile.socials.twitter ? [{ icon: Twitter, text: data.profile.socials.twitter.replace('https://', ''), href: data.profile.socials.twitter }] : []),
                        { icon: Mail, text: data.profile.email, href: `mailto:${data.profile.email}` }
                      ].map((link, i) => (
                        <a key={i} href={link.href} className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded hover:bg-white/5">
                           <link.icon size={20} />
                           <span className="font-mono text-sm">{link.text}</span>
                        </a>
                      ))}
                   </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-cyan-500 mb-1 uppercase">Identity</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Commander Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-cyan-500 mb-1 uppercase">Frequency</label>
                    <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="email@sector7.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-cyan-500 mb-1 uppercase">Transmission</label>
                    <textarea rows={4} className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Message content..."></textarea>
                  </div>
                  <button 
                    disabled={formStatus !== 'idle'}
                    className={`w-full py-4 font-bold rounded shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed relative overflow-hidden group
                      ${formStatus === 'idle' 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1' 
                        : ''}
                      ${formStatus === 'sending' 
                        ? 'bg-slate-900 border border-cyan-500/30 text-cyan-400 cursor-wait' 
                        : ''}
                      ${formStatus === 'sent' 
                        ? 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 cursor-default shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                        : ''}
                    `}
                  >
                    {formStatus === 'idle' && (
                      <>
                        <MessageSquare size={18} />
                        <span className="tracking-widest">TRANSMIT DATA</span>
                      </>
                    )}
                    
                    {formStatus === 'sending' && (
                       <>
                         <Loader2 size={18} className="animate-spin" />
                         <span className="font-mono text-sm tracking-widest animate-pulse">UPLINKING...</span>
                       </>
                    )}

                    {formStatus === 'sent' && (
                       <div className="flex items-center gap-2 animate-[pop-in_0.5s_ease-out_forwards]">
                         <Check size={18} />
                         <span className="font-mono text-sm tracking-widest">TRANSMISSION RECEIVED</span>
                       </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-600 text-xs font-mono pb-8">
           <p>SYSTEM VERSION 2.4.0 // UI BY {data.profile.name.split(' ').pop()?.toUpperCase()}</p>
           <p className="mt-2">ALL RIGHTS RESERVED © {new Date().getFullYear()}</p>
        </footer>

      </main>
    </div>
  );
};

export default StarshipLayout;