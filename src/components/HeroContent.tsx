import React, { useEffect, useRef } from 'react';
import type { BikeData } from '../data/bikes';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import GionatanLetterReveal from './GionatanLetterReveal';

interface HeroContentProps {
  bike: BikeData;
  onExploreTech: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ bike, onExploreTech }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef.current);
      
      // Kill active tweens
      gsap.killTweensOf(q('.reveal-word-hero'));
      gsap.killTweensOf(q('.gsap-cta'));

      // Premium cinematic slide-up reveal with skew
      gsap.fromTo(
        q('.reveal-word-hero'),
        { 
          y: '115%', 
          skewY: 7,
          opacity: 0 
        },
        { 
          y: '0%', 
          skewY: 0,
          opacity: 1,
          stagger: 0.04, 
          duration: 1.1, 
          ease: 'power4.out' 
        }
      );

      // Fade-in the pricing & CTA buttons row
      gsap.fromTo(
        q('.gsap-cta'),
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.9, 
          delay: 0.35, 
          ease: 'power3.out' 
        }
      );
    }
  }, [bike.id]);

  // Splitting helper wrapping words in overflow-hidden containers
  const splitText = (text: string) => {
    return text.split(' ').map((word, idx) => (
      <span key={idx} className="inline-block overflow-hidden relative mr-[0.2em] py-[0.1em]">
        <span className="reveal-word-hero inline-block translate-y-full opacity-0 will-change-transform origin-left">
          {word}
        </span>
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="flex flex-col text-left max-w-xl">
      <div className="flex flex-col">
        {/* Brand Tagline */}
        <div 
          className="text-[10px] font-extrabold tracking-[0.4em] uppercase mb-4 flex flex-wrap"
          style={{ color: bike.accentColor }}
        >
          {splitText(bike.tagline)}
        </div>

        {/* Product Title (Perfect letter-by-letter reveal animation) */}
        <GionatanLetterReveal 
          key={bike.id}
          text={bike.name}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-6 font-display"
        />

        {/* Description */}
        <p className="text-slate-400 text-sm md:text-base leading-relaxed tracking-wide mb-8 max-w-md font-light flex flex-wrap">
          {splitText(bike.description)}
        </p>

        {/* Price & CTA Row */}
        <div className="gsap-cta flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold">
              Starting at
            </span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wider mt-1">
              {bike.price}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-xs font-semibold uppercase tracking-widest text-white rounded-lg group bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-white/20 cursor-pointer"
              style={{
                boxShadow: `0 4px 20px rgba(0,0,0,0.4)`
              }}
            >
              <span 
                className="relative px-6 py-3 transition-all duration-300 bg-[#05070C] rounded-md group-hover:bg-opacity-0"
              >
                Add to Cart
              </span>
            </button>

            <button
              onClick={onExploreTech}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer group"
            >
              Tech Specs
              <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroContent;
