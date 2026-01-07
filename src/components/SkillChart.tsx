import React from 'react';
import type { Skill } from '../types/portfolio';

interface SkillChartProps {
  category: string;
  skills: Skill[];
}

const SkillChart: React.FC<SkillChartProps> = ({ category, skills }) => {
  return (
    <div className="glass-panel p-6 rounded-xl border border-slate-800">
      <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-cyan-500 block"></span>
        {category.toUpperCase()} MODULES
      </h3>
      
      <div className="space-y-5">
        {skills.map((skill, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-mono text-slate-300">{skill.name}</span>
              <span className="text-xs font-mono text-cyan-500">{skill.level}% EFFICIENCY</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-900 to-cyan-400 relative"
                style={{ width: `${skill.level}%` }}
              >
                 <div className="absolute top-0 right-0 h-full w-[2px] bg-white opacity-50 shadow-[0_0_10px_white]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillChart;
