import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface GionatanTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  triggerHook?: string; // custom target trigger e.g. 'top 80%'
}

export const GionatanTextReveal: React.FC<GionatanTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  triggerHook = 'top 85%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.reveal-word');
    
    // Animate words sliding up using GSAP ScrollTrigger
    gsap.fromTo(
      words,
      { 
        y: '115%', 
        skewY: 6,
        opacity: 0 
      },
      {
        y: '0%',
        skewY: 0,
        opacity: 1,
        duration: 1.1,
        delay: delay,
        ease: 'power4.out',
        stagger: 0.04,
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

  // Split string by space into words
  const words = text.split(' ');

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap gap-x-[0.2em] gap-y-[0.05em] overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <span 
          key={index} 
          className="inline-block overflow-hidden relative py-[0.1em]"
        >
          <span className="reveal-word inline-block translate-y-full opacity-0 will-change-transform origin-left">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};
export default GionatanTextReveal;
