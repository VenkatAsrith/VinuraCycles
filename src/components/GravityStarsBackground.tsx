import React, { useEffect, useRef } from 'react';

interface GravityStarsBackgroundProps {
  className?: string;
  color?: string; // Active accent color for gravity particles
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const GravityStarsBackground: React.FC<GravityStarsBackgroundProps> = ({
  className = '',
  color = '#D47844',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: Infinity, y: Infinity, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 65;

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Tracker events relative to canvas bounds
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: Infinity, y: Infinity, active: false };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetColor = color;
      
      particles.forEach((p) => {
        // Gravity attraction physics
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 320) {
            // Acceleration pull force inversely proportional to distance
            const force = (320 - dist) / 3200;
            p.vx += (dx / dist) * force * 0.45;
            p.vy += (dy / dist) * force * 0.45;
          }
        }

        // Apply friction drag to stabilize speed
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Add small idle drift
        p.x += (Math.random() - 0.5) * 0.15;
        p.y += (Math.random() - 0.5) * 0.15;

        // Bounding wraps
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = targetColor;
        ctx.globalAlpha = p.alpha;
        
        // Add glowing drop shadows to major stars
        if (p.radius > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = targetColor;
        }
        
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none block ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default GravityStarsBackground;
