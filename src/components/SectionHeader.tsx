import React from 'react';

interface SectionHeaderProps {
  title: string;
  align?: 'left' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, align = 'left' }) => {
  if (align === 'right') {
    return (
      <div className="flex items-center gap-4 mb-12">
        <div className="h-[1px] flex-grow bg-gradient-to-l from-cyan-500/50 to-transparent"></div>
        <h2 className="text-4xl font-bold text-white tracking-tight">{title}</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-4xl font-bold text-white tracking-tight">{title}</h2>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
    </div>
  );
};

export default SectionHeader;
