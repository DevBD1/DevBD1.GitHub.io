import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  padding = 'md',
  border = true,
  rounded = 'xl',
}) => {
  return (
    <div
      className={`
        glass-panel
        ${paddingClasses[padding]}
        ${roundedClasses[rounded]}
        ${border ? 'border border-slate-800' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
