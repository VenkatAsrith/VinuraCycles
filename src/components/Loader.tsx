import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Steady, smooth slower progression
        const next = prev + Math.floor(Math.random() * 2) + 1;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Loader exit animation with GSAP
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to('.loader-percentage, .loader-text', {
        y: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.in'
      })
      .to('.loader-percentage-container', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      }, '-=0.3')
      .to('.loader-panel', {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [progress, onComplete]);

  // Entrance animations for loader elements
  useEffect(() => {
    gsap.fromTo('.loader-percentage-container', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.75)' }
    );
  }, []);

  return (
    <div className="loader-panel fixed inset-0 z-[9999] bg-[#05070C] flex flex-col items-center justify-center select-none overflow-hidden">
      {/* High-tech radial backdrop */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#D47844]/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8">
        
        {/* Minimalist Percentage Loader (No circular HUD dials) */}
        <div className="loader-percentage-container relative w-32 h-16 flex items-center justify-center">
          {/* Ticking Percentage */}
          <span className="loader-percentage font-display text-4xl font-black text-white tracking-wider">
            {progress}%
          </span>
        </div>

        {/* Brand details */}
        <div className="flex flex-col items-center gap-2.5 text-center">
          <motion.div 
            layoutId="brand-logo-shared"
            className="loader-text font-display text-base font-black tracking-[0.3em] uppercase"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6D5BC] via-[#D47844] to-[#EF4444] mr-1.5">
              VINURA
            </span>
            <span className="text-white">CYCLES</span>
          </motion.div>
          <span className="loader-text text-[9px] tracking-[0.35em] text-slate-500 uppercase font-semibold">
            CYBERNETIC ASSEMBLY INITIALIZING
          </span>

          {/* Uiverse Words sliding vertical loop container */}
          <div className="loader-text word-loop-card border border-white/5 bg-[#05070C]">
            <div className="word-loop-loader">
              <span>SYSTEM</span>
              <div className="word-loop-words">
                <span className="word-loop-word text-[#D47844]">LOADING HARDWARE...</span>
                <span className="word-loop-word text-[#06B6D4]">CHASSIS CALIBRATING...</span>
                <span className="word-loop-word text-[#EAB308]">MOTOR TUNING...</span>
                <span className="word-loop-word text-[#EF4444]">BATTERY BALANCING...</span>
                <span className="word-loop-word text-[#10B981]">READY TO RIDE</span>
                {/* Loop duplicate */}
                <span className="word-loop-word text-[#D47844]">LOADING HARDWARE...</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative vertical grid rails */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
    </div>
  );
};
export default Loader;
