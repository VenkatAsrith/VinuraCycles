import React, { useState, useEffect, useRef } from 'react';
import type { BikeData } from '../data/bikes';
import { Shield, Zap, Battery, Leaf, Gauge } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GionatanTextReveal from './GionatanTextReveal';
import GionatanSlideInText from './GionatanSlideInText';

gsap.registerPlugin(ScrollTrigger);

interface SpecTickerProps {
  value: string;
}

const SpecTicker: React.FC<SpecTickerProps> = ({ value }) => {
  const [displayVal, setDisplayVal] = useState('0');
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse numeric part and unit
  const match = value.match(/^([\d.]+)\s*(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 0;
  const unit = match ? match[2] : '';
  const isDecimal = value.includes('.');

  useEffect(() => {
    if (!elementRef.current) return;
    const obj = { val: 0 };
    
    // Reset display on value change
    setDisplayVal('0');

    const tween = gsap.to(obj, {
      val: targetNum,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayVal(isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val).toString());
      }
    });

    return () => {
      tween.kill();
    };
  }, [value, targetNum, isDecimal]);

  return (
    <span ref={elementRef} className="font-display font-extrabold text-white tracking-wider text-lg">
      {displayVal} <span className="text-slate-400 text-[10px] font-semibold font-sans uppercase tracking-widest ml-0.5">{unit}</span>
    </span>
  );
};

interface TechSectionProps {
  bike: BikeData;
}

export const TechSection: React.FC<TechSectionProps> = ({ bike }) => {
  const [activeDetailIdx, setActiveDetailIdx] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Icon mapping helper
  const getSpecIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'range':
        return <Shield className="w-5 h-5" />;
      case 'motor':
        return <Zap className="w-5 h-5" />;
      case 'battery':
        return <Battery className="w-5 h-5" />;
      case 'weight':
        return <Leaf className="w-5 h-5" />;
      case 'top assist':
      case 'top speed':
        return <Gauge className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const specsList = [
    { label: 'RANGE', value: bike.specs.range, icon: 'range' },
    { label: 'MOTOR', value: bike.specs.motor, icon: 'motor' },
    { label: 'BATTERY', value: bike.specs.battery, icon: 'battery' },
    { label: 'WEIGHT', value: bike.specs.weight, icon: 'weight' },
    { label: 'TOP ASSIST', value: bike.specs.topSpeed, icon: 'top speed' },
  ];

  // Mouse move tracker for parts parallax moving animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      
      // Calculate mouse offset from center of section
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      
      setMousePosition({ x, y });
    };

    const currentSection = sectionRef.current;
    if (currentSection) {
      currentSection.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (currentSection) {
        currentSection.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // GSAP animation when active detail changes
  useEffect(() => {
    if (sectionRef.current) {
      const q = gsap.utils.selector(sectionRef.current);
      gsap.fromTo(
        q('.gsap-tech-preview'),
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [activeDetailIdx, bike.id]);

  // GSAP scroll entrance animation
  useEffect(() => {
    if (sectionRef.current) {
      const q = gsap.utils.selector(sectionRef.current);
      gsap.fromTo(
        q('.gsap-tech-fade'),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.08, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  // Moving offset values for the parts container
  const partTranslateX = mousePosition.x * 25;
  const partTranslateY = mousePosition.y * 20;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-between bg-[#05070C] border-t border-white/5 overflow-hidden"
    >
      {/* Decorative background grid and aura */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/4 w-[40vw] h-[40vh] blur-[150px] opacity-[0.08] rounded-full transition-all duration-1000 ease-out pointer-events-none"
        style={{ backgroundColor: bike.accentColor }}
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center z-10 flex-grow">
        {/* Left Side: Title Copy + Main Centerpiece Bike Render */}
        <div className="flex flex-col text-left gap-8 h-full justify-between py-6">
          <div className="max-w-md">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 block mb-2">
              Technology & Craft
            </span>
            <GionatanSlideInText 
              text="ENGINEERED TO PERFORM"
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-none mb-6 font-display"
            />
            <GionatanTextReveal 
              text={`Every detail of ${bike.brand} is crafted for speed, efficiency and control. Advanced materials, seamless integration, and digital synergy unite to create a riding experience that moves with you.`}
              className="text-slate-400 text-sm leading-relaxed tracking-wide font-light"
              delay={0.15}
            />
          </div>

          {/* Main Showcase (Center Profile Uiverse 3D perspective folder animation containing active spec image) */}
          <div className="relative w-full h-[250px] sm:h-[350px] flex items-center justify-center overflow-visible mt-6 gsap-tech-fade group">
            <div 
              className="gsap-tech-preview relative w-64 h-40 cursor-pointer origin-bottom [perspective:1500px] z-20 transition-all duration-300 ease-out"
              style={{
                transform: `translate3d(${partTranslateX}px, ${partTranslateY}px, 0)`
              }}
            >
              {/* Folder Back Flap */}
              <div 
                className="tech-folder-back absolute inset-0 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.4)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
                style={{ 
                  backgroundColor: `${bike.accentColor}cc`,
                  border: '1px solid rgba(255,255,255,0.05)',
                  // Pass dynamic folder backing color for pseudo elements
                  ['--folder-accent' as any]: `${bike.accentColor}cc`
                }}
              />
              
              {/* Paper Inserts / Active spec image sliding out in 3D */}
              <div 
                className="absolute inset-1 rounded-2xl border border-white/10 bg-black/85 p-2 shadow-2xl transition-all ease duration-500 origin-bottom group-hover:-translate-y-16 group-hover:rotate-x-12 select-none overflow-hidden flex items-center justify-center"
              >
                <img 
                  src={bike.details[activeDetailIdx].image} 
                  alt={bike.details[activeDetailIdx].title} 
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-1 right-2 glass-panel px-1.5 py-0.5 rounded border border-white/10 text-[6px] tracking-widest font-bold text-white uppercase">
                  {bike.details[activeDetailIdx].title}
                </div>
              </div>
              
              {/* Folder Front Flap (Folds down) */}
              <div 
                className="tech-folder-front absolute bottom-0 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-500 origin-bottom group-hover:[transform:rotateX(-75deg)_translateY(2px)] group-hover:shadow-[inset_0_20px_40px_rgba(255,255,255,0.1),_inset_0_-20px_40px_rgba(0,0,0,0.5)]"
                style={{ 
                  backgroundColor: bike.accentColor,
                  border: '1px solid rgba(255,255,255,0.1)',
                  ['--folder-accent-front' as any]: bike.accentColor
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Technical Specs Cards list with hover animations */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 mb-2 text-left gsap-tech-fade">
            <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-semibold">
              Technical Modules
            </span>
            <div className="h-[1px] w-12 bg-white/10"></div>
          </div>

          <div className="flex flex-col gap-3 gsap-tech-fade">
            {bike.details.map((detail, idx) => {
              const isActive = activeDetailIdx === idx;
              return (
                <button
                  key={detail.id}
                  onClick={() => setActiveDetailIdx(idx)}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.04] border-white/20 shadow-xl scale-[1.01]'
                      : 'bg-transparent border-white/5 opacity-60 hover:opacity-95 hover:border-white/10'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 10px 30px rgba(0, 0, 0, 0.5)` : 'none'
                  }}
                >
                  {/* Serial Number */}
                  <span 
                    className="text-xs font-extrabold tracking-widest transition-colors duration-300"
                    style={{ color: isActive ? bike.accentColor : '#64748B' }}
                  >
                    {detail.id}
                  </span>

                  {/* Text details */}
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-1">
                      {detail.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {detail.description}
                    </p>
                  </div>

                  {/* Detail Thumbnail preview */}
                  <div className="w-16 h-12 rounded overflow-hidden border border-white/10 bg-black/40 flex-shrink-0">
                    <img
                      src={detail.image}
                      alt={detail.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Specifications Dashboard */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/5 pt-8 mt-12 z-10 gsap-tech-fade">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {specsList.map((spec, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl glass-panel border border-white/5 text-left transform hover:-translate-y-1 hover:scale-[1.03] hover:border-white/10 hover:shadow-2xl transition-all duration-300 cursor-default"
            >
              <div 
                className="p-2 rounded-lg flex items-center justify-center transition-colors duration-300"
                style={{ 
                  backgroundColor: `${bike.accentColor}10`,
                  color: bike.accentColor 
                }}
              >
                {getSpecIcon(spec.label)}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-widest text-slate-500 font-bold uppercase">
                  {spec.label}
                </span>
                <SpecTicker value={spec.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TechSection;
