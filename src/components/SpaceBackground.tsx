import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef<number>(2); // Base speed
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const numStars = 800;

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          pz: Math.random() * width,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    window.addEventListener('resize', resize);
    resize();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = width / 2;
      const centerY = height / 2;
      mouseRef.current = {
        x: (e.clientX - centerX) * 0.05, // Reduced sensitivity (was 0.5)
        y: (e.clientY - centerY) * 0.05,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.4)'; // Slate-950 with opacity for trails
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      starsRef.current.forEach((star) => {
        // Update star position based on speed
        star.z -= speedRef.current;

        // Reset if passed viewer
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.pz = star.z;
        }

        // Project 3D to 2D
        const x = (star.x - mouseRef.current.x) * (width / star.z);
        const y = (star.y - mouseRef.current.y) * (width / star.z);
        
        // Calculate size based on depth
        const size = (1 - star.z / width) * 4;
        
        // Draw star
        const sx = cx + x;
        const sy = cy + y;

        // Only draw if within bounds
        if (sx > 0 && sx < width && sy > 0 && sy < height) {
           const opacity = (1 - star.z / width);
           ctx.fillStyle = `rgba(224, 242, 254, ${opacity})`; // Sky-100
           ctx.beginPath();
           ctx.arc(sx, sy, size > 0 ? size : 0, 0, Math.PI * 2);
           ctx.fill();

           // Optional: Draw speed lines (warp effect) if speed is high
           // For now, simple dots
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default SpaceBackground;