import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BikeData } from '../data/bikes';

interface HeroBikeProps {
  bike: BikeData;
}

export const HeroBike: React.FC<HeroBikeProps> = ({ bike }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get percentage displacement from center of window (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Parallax displacement values
  const bikeTranslateX = mousePosition.x * 30; // max 30px
  const bikeTranslateY = mousePosition.y * 20; // max 20px
  const bikeRotateY = mousePosition.x * 12;    // max 12deg
  const bikeRotateX = -mousePosition.y * 8;     // max 8deg

  // Background glow displacement (opposite direction for parallax depth)
  const glowTranslateX = -mousePosition.x * 50;
  const glowTranslateY = -mousePosition.y * 40;

  return (
    <div className="relative w-full h-[300px] sm:h-[450px] md:h-[600px] flex items-center justify-center overflow-visible select-none">
      
      {/* Background Ambient Glow (changes color dynamically) */}
      <div 
        className="absolute w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full blur-[100px] sm:blur-[160px] opacity-20 sm:opacity-25 transition-all duration-1000 ease-out z-0"
        style={{
          backgroundColor: bike.accentColor,
          transform: `translate3d(${glowTranslateX}px, ${glowTranslateY}px, 0)`,
        }}
      />

      {/* Decorative Radial Grid / Tech Ring */}
      <div 
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full border border-white/[0.02] flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate3d(${bikeTranslateX * 0.3}px, ${bikeTranslateY * 0.3}px, 0)`,
        }}
      >
        <div className="w-[80%] h-[80%] rounded-full border border-dashed border-white/[0.01]" />
      </div>

      {/* Dynamic Animated Bicycle Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bike.id}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto"
          style={{
            transform: `translate3d(${bikeTranslateX}px, ${bikeTranslateY}px, 0) rotateY(${bikeRotateY}deg) rotateX(${bikeRotateX}deg)`,
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Interactive Design Hotspots (extracted from the lamp mockup layout!) */}
          <div className="absolute inset-0 pointer-events-auto select-none z-20">
            {/* Hotspot 1: Smart Cockpit */}
            <div className="absolute left-[38%] top-[30%] group">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center border cursor-pointer bg-black/60 backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 active:scale-95"
                style={{ borderColor: bike.accentColor }}
              >
                <span className="text-[10px] font-bold text-white transition-colors group-hover:text-amber-200">↗</span>
              </div>
              <div className="absolute left-9 -top-4 w-44 glass-panel border border-white/10 p-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 text-left">
                <span className="text-[8px] font-bold tracking-widest text-slate-500 uppercase block">Integrated System</span>
                <span className="text-[10px] font-bold text-white uppercase block mt-0.5">Smart Cockpit</span>
                <span className="text-[9px] text-slate-400 font-light leading-normal block mt-1">Minimalist display with integrated HUD telemetry.</span>
              </div>
            </div>

            {/* Hotspot 2: Carbon Frame */}
            <div className="absolute left-[62%] top-[54%] group">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center border cursor-pointer bg-black/60 backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 active:scale-95"
                style={{ borderColor: bike.accentColor }}
              >
                <span className="text-[10px] font-bold text-white transition-colors group-hover:text-amber-200">↗</span>
              </div>
              <div className="absolute left-9 -top-4 w-44 glass-panel border border-white/10 p-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 text-left">
                <span className="text-[8px] font-bold tracking-widest text-slate-500 uppercase block">Aerodynamics</span>
                <span className="text-[10px] font-bold text-white uppercase block mt-0.5">Carbon Frame</span>
                <span className="text-[9px] text-slate-400 font-light leading-normal block mt-1">Ultra-light monocoque layout for maximum structural speed.</span>
              </div>
            </div>
          </div>

          {/* Main Bicycle Image Render */}
          <img
            src={bike.image}
            alt={bike.name}
            className="max-w-[100%] max-h-[85%] md:max-h-[95%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter brightness-[1.05]"
          />

          {/* Floating Price Tag/Badge near rear frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute right-[5%] sm:right-[15%] top-[20%] sm:top-[25%] glass-panel px-4 py-2 rounded-lg border border-white/10 hidden sm:flex flex-col backdrop-blur-md"
            style={{
              transform: 'translateZ(50px)', // Bring forward in 3D space
            }}
          >
            <span className="text-[8px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Specs Limit
            </span>
            <span className="text-sm font-display font-extrabold text-white">
              {bike.specs.topSpeed}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Futuristic UI line indicator pointing to bike */}
      <div className="absolute left-[15%] bottom-[15%] hidden lg:block opacity-30 select-none">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="stroke-white/30">
          <circle cx="4" cy="36" r="3" fill="white" />
          <path d="M4 36 L40 36 L80 4" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="4" r="2" fill="white" />
        </svg>
        <span className="absolute left-12 top-6 text-[8px] font-bold tracking-widest text-slate-400 uppercase">
          E-DRIVE SYSTEM
        </span>
      </div>
    </div>
  );
};
export default HeroBike;
