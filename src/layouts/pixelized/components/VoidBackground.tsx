import React, { useEffect, useRef } from 'react';

const VoidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      oscillateSpeed: number; // Speed of horizontal sway
      phase: number; // Current phase of sway
      baseAlpha: number; // Base opacity
      color: string; // RGB string
    }

    const particles: Particle[] = [];
    const particleCount = 140; // Dense enough for "atmosphere"

    const createParticle = (resetY?: boolean): Particle => {
      const isGold = Math.random() > 0.97; // Rare magic ember
      return {
        x: Math.random() * width,
        y: resetY ? height + 10 : Math.random() * height,
        size: Math.random() * 2 + 1, // 1px - 3px
        speedY: Math.random() * 0.15 + 0.05, // Slow upward drift
        oscillateSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.4 + 0.1,
        color: isGold ? '251, 191, 36' : '148, 163, 184', // amber-400 or slate-400
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Deep Void Gradient Background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#020617'); // slate-950
      gradient.addColorStop(0.6, '#080c18'); 
      gradient.addColorStop(1, '#0f172a'); // slate-900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Particles
      particles.forEach((p) => {
        // Update physics
        p.y -= p.speedY;
        p.phase += p.oscillateSpeed;
        p.x += Math.sin(p.phase) * 0.3; // Gentle sine wave sway

        // Reset if out of bounds
        if (p.y < -10) {
          Object.assign(p, createParticle(true));
        }

        // Calculate pulsating opacity
        const pulse = Math.sin(p.phase * 0.5); // Pulse slower than sway
        const currentAlpha = Math.max(0, Math.min(1, p.baseAlpha + pulse * 0.1));

        // Render Voxel Square
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default VoidBackground;