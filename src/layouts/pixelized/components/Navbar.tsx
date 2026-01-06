import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Lore', href: '#lore' },
    { name: 'Gameplay', href: '#gameplay' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Join', href: '#join' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-hytale-dark/95 border-b-4 border-hytale-border py-2 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 to-transparent py-6 border-b-4 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - Voxel Block Style */}
          <a href="#" className="group flex items-center gap-4">
             <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {/* 3D Cube CSS construction */}
                <div className="absolute inset-0 bg-stone-700 shadow-voxel-btn border-2 border-black">
                   {/* Grass Top */}
                   <div className="absolute top-0 left-0 right-0 h-1/3 bg-green-700 border-b-2 border-black/20"></div>
                   {/* Pixel Details */}
                   <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 opacity-50"></div>
                   <div className="absolute bottom-2 right-2 w-2 h-2 bg-stone-600 opacity-50"></div>
                </div>
             </div>
             <div className="flex flex-col">
               <span className="font-cinzel font-black text-2xl tracking-widest text-white voxel-text leading-none">
                 HYMYTH
               </span>
               <span className="font-vt323 text-myth-gold text-lg leading-none tracking-wide">
                 ONLINE
               </span>
             </div>
          </a>

          {/* Desktop Links - HUD Inventory Style */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-vt323 text-2xl tracking-wide text-slate-300 hover:text-white transition-all duration-150 uppercase px-4 py-2 group"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover Background: Looks like a selected inventory slot */}
                <span className="absolute inset-0 bg-slate-800/80 border-2 border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-inner rounded-sm"></span>
              </a>
            ))}
            
            {/* CTA Button in Nav */}
            <a 
                href="#join"
                className="hidden lg:flex items-center ml-4 font-vt323 text-2xl uppercase bg-green-700 hover:bg-green-600 text-white px-6 py-2 shadow-voxel-btn hover:shadow-voxel-btn-hover active:shadow-voxel-btn-active active:translate-y-1 transition-all border-2 border-black group"
            >
                <span className="drop-shadow-md">Play Now</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-myth-gold p-2 bg-black/50 rounded border-2 border-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-hytale-dark flex flex-col items-center justify-center gap-8 md:hidden border-l-8 border-slate-800"
          >
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-pixel-pattern opacity-10 pointer-events-none"></div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-vt323 text-5xl tracking-widest text-slate-300 hover:text-myth-gold hover:scale-105 transition-transform voxel-text"
              >
                {link.name.toUpperCase()}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;