import React from 'react';
import type { Profile, Skill } from '../types/portfolio';
import SectionHeader from './SectionHeader';
import GlassPanel from './GlassPanel';
import SkillChart from './SkillChart';

interface AboutSectionProps {
  profile: Profile;
  skills: Record<string, Skill[]>;
  projectCount: number;
}

const AboutSection: React.FC<AboutSectionProps> = ({ profile, skills, projectCount }) => {
  const skillCount = Object.values(skills).flat().length;

  const stats = [
    { label: 'Years Exp', val: '3+' },
    { label: 'Projects', val: String(projectCount) },
    { label: 'Skills', val: String(skillCount) },
    { label: 'Coffee', val: '∞' },
  ];

  return (
    <section id="about" className="py-32">
      <SectionHeader title="System Specs" align="right" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <GlassPanel padding="lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Operator Profile</h3>
            {profile.about.map((paragraph, i) => (
              <p key={i} className="text-slate-400 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </GlassPanel>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <GlassPanel
                key={i}
                padding="sm"
                rounded="md"
                className="text-center hover:border-cyan-500/30 transition-colors"
              >
                <div className="text-3xl font-mono font-bold text-white mb-1">{stat.val}</div>
                <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <SkillChart key={category} category={`${category} Systems`} skills={categorySkills} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
