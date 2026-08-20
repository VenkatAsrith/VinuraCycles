import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GionatanLetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  triggerHook?: string;
}

export const GionatanLetterReveal: React.FC<GionatanLetterRevealProps> = ({
  text,
  className = '',
  delay = 0,
  triggerHook = 'top 85%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.reveal-char');
    
    // Stagger letters sliding up with GSAP
    gsap.fromTo(
      letters,
      { 
        y: '110%', 
        skewX: 10,
        opacity: 0 
      },
      {
        y: '0%',
        skewX: 0,
        opacity: 1,
        duration: 0.95,
        delay: delay,
        ease: 'power4.out',
        stagger: 0.02, // ultra fast staggering for letters
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerHook,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text, delay, triggerHook]);

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap overflow-hidden leading-none py-1 select-none ${className}`}
    >
      {text.split('').map((char, index) => {
        // If character is a space, render a blank space span
        if (char === ' ') {
          return <span key={index} className="w-[0.25em]">&nbsp;</span>;
        }

        return (
          <span 
            key={index} 
            className="inline-block overflow-hidden relative"
          >
            <span className="reveal-char inline-block translate-y-full opacity-0 will-change-transform">
              {char}
            </span>
          </span>
        );
      })}
    </div>
  );
};
export default GionatanLetterReveal;
