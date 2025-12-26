import React, { useEffect, useState } from 'react';
import { Activity, Wifi, Battery } from 'lucide-react';

const HudFrame: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none hidden md:block">
      {/* Top Left Corner */}
      <div className="absolute top-8 left-8 flex flex-col items-start gap-1">
        <div className="flex items-center gap-2 text-cyan-500/80 font-mono text-xs">
          <Activity size={14} className="animate-pulse" />
          <span>SYS.ONLINE</span>
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
        <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent absolute top-0 left-0"></div>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-8 right-8 flex flex-col items-end gap-1 text-right">
        <div className="flex items-center gap-2 text-cyan-500/80 font-mono text-xs">
          <span>{time.toLocaleTimeString()}</span>
          <Wifi size={14} />
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent"></div>
        <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent absolute top-0 right-0"></div>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-8 left-8 flex flex-col-reverse items-start gap-1">
        <div className="text-cyan-900/50 font-mono text-[10px] tracking-widest">
           COORD: 34.0522° N, 118.2437° W
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
        <div className="h-16 w-[1px] bg-gradient-to-t from-cyan-500 to-transparent absolute bottom-0 left-0"></div>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 flex flex-col-reverse items-end gap-1">
        <div className="flex items-center gap-2 text-cyan-500/80 font-mono text-xs">
          <span>PWR: 98%</span>
          <Battery size={14} />
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent"></div>
        <div className="h-16 w-[1px] bg-gradient-to-t from-cyan-500 to-transparent absolute bottom-0 right-0"></div>
      </div>
      
      {/* Decorative borders */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
    </div>
  );
};

export default HudFrame;
