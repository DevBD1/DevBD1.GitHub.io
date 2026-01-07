import React from 'react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => (
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

export default FilterButton;
