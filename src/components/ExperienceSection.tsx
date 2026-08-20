import React, { useState, useEffect, useCallback } from 'react';
import type { BikeData } from '../data/bikes';
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import GionatanTextReveal from './GionatanTextReveal';
import GionatanSlideInText from './GionatanSlideInText';
import { motion, AnimatePresence } from 'framer-motion';
import { DragReviews } from './DragReviews';

interface ExperienceSectionProps {
  bike: BikeData;
  bikes: BikeData[];
  onSelectBike: (bike: BikeData) => void;
  onBuyNow: () => void;
}

// Custom hook for mobile detection in orbiting calculations
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreenSize = (): void => setIsMobile(window.innerWidth < breakpoint);
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  
  return isMobile;
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  bike,
  bikes,
  onSelectBike,
  onBuyNow,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [showPrebookModal, setShowPrebookModal] = useState<boolean>(false);
  const [prebookForm, setPrebookForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPrebooked, setIsPrebooked] = useState<boolean>(false);

  const isMobile = useIsMobile();
  
  // Orbit configurations
  const containerRadius = isMobile ? 120 : 180;
  const profileSize = isMobile ? 55 : 70;
  const containerSize = containerRadius * 2 + 100;

  // Active index selector mapped to the selected bike object
  const activeIndex = bikes.findIndex((b) => b.id === bike.id);

  // Calculate rotation offset for each orbiting card
  const getRotation = useCallback(
    (index: number): number => (index - activeIndex) * (360 / bikes.length),
    [activeIndex, bikes.length]
  );

  const next = () => {
    const nextIdx = (activeIndex + 1) % bikes.length;
    onSelectBike(bikes[nextIdx]);
  };

  const prev = () => {
    const prevIdx = (activeIndex - 1 + bikes.length) % bikes.length;
    onSelectBike(bikes[prevIdx]);
  };

  const handleProfileClick = (index: number) => {
    if (index === activeIndex) return;
    onSelectBike(bikes[index]);
  };

  // Keyboard navigation for active orbit rotation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') prev();
      else if (event.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const handlePrebookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prebookForm.name || !prebookForm.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsPrebooked(true);
      onBuyNow(); // Trigger state hook
      setTimeout(() => {
        setShowPrebookModal(false);
        // Reset form
        setPrebookForm({ name: '', email: '', phone: '' });
        setIsPrebooked(false);
      }, 2000);
    }, 1800);
  };

  // Customer Reviews (Expanded to 6 reviews for collage layout!)
  const reviews = [
    {
      name: "Marcus Vance",
      role: "Urban commuter",
      quote: "Cruxon Model A transformed my daily travel. The frame integration is clean, and the mid-drive assist feels completely organic. I get comments at every traffic light.",
      rating: 5
    },
    {
      name: "Helena Rostova",
      role: "Track racer & designer",
      quote: "Model R is the absolute pinnacle of speed. Light, responsive, and incredibly aggressive. The telemetry feedback feeds straight to my watch.",
      rating: 5
    },
    {
      name: "Devon Lane",
      role: "E-bike enthusiast",
      quote: "The battery range is insane! Cruxon Model X easily gets me through a full week of commuting on a single charge. The build quality is solid.",
      rating: 5
    },
    {
      name: "Kristin Watson",
      role: "Daily rider",
      quote: "The smart app connection is flawless. Auto-locking, route tracking, and custom assist adjustments right from my phone. Absolutely love the design.",
      rating: 5
    },
    {
      name: "Robert Fox",
      role: "Weekend trail rider",
      quote: "Cruxon Model D has a fantastic suspension and climbing capability. Off-road trails are a breeze, and the torque delivery is instantaneous.",
      rating: 5
    },
    {
      name: "Jenny Wilson",
      role: "Urban commuter",
      quote: "It's the most gorgeous bike I've ever owned. People literally stop me in the street to ask about it. The custom color strip is a brilliant touch.",
      rating: 5
    }
  ];

  return (
    <section className="relative w-full bg-[#05070C] border-t border-white/5 py-24 px-6 md:px-12 flex flex-col items-center overflow-hidden">
      {/* Background Aura */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] blur-[180px] opacity-[0.06] rounded-full transition-all duration-1000 ease-out pointer-events-none"
        style={{ backgroundColor: bike.accentColor }}
      />

      {/* Part 1: Lifestyle / Showcase Banner */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 z-10">
        <div className="flex flex-col text-left max-w-xl">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 mb-2">
            The Journey Begins
          </span>
          <GionatanSlideInText 
            text="THE FUTURE OF RIDING"
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-none mb-6 font-display"
          />
          <GionatanTextReveal 
            text="A lightweight electric bicycle engineered around performance, intelligence and design. Own the streets with unparalleled power management, structural carbon elegance, and integrated safety systems."
            className="text-slate-400 text-sm md:text-base leading-relaxed tracking-wide mb-8 font-light"
            delay={0.15}
          />

          <div className="flex items-center gap-6">
            <a 
              href="#purchase-config" 
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold uppercase tracking-widest text-white rounded-lg group bg-gradient-to-br from-white/10 to-white/5 hover:text-white dark:text-white cursor-pointer"
              style={{ boxShadow: `0 4px 20px rgba(0,0,0,0.4)` }}
            >
              <span className="relative px-6 py-3.5 transition-all duration-300 bg-[#05070C] rounded-md group-hover:bg-opacity-0">
                Configure Your Bike
              </span>
            </a>
          </div>
        </div>

        {/* Cinematic Lifestyle pavilion image */}
        <div className="relative w-full h-[300px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src="/assets/lifestyle_hero.jpg" 
            alt="Vinura Showcase" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Part 2: Premium Reviews (Draggable Polaroid collage!) */}
      <div className="w-full max-w-7xl border-t border-white/5 py-16 mb-16 text-left z-10">
        <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-semibold mb-8 block">
          Owner Experience
        </span>
        <DragReviews reviews={reviews} accentColor={bike.accentColor} />
      </div>

      {/* Part 3: Purchase / Configuration Module */}
      <div 
        id="purchase-config" 
        className="w-full max-w-7xl border-t border-white/5 pt-16 text-left z-10"
      >
        <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-semibold mb-8 block">
          Build Your Machine
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Orbiting Carousel Selector */}
          <div className="flex flex-col items-center justify-center relative min-h-[440px]">
            <div
              className="relative flex items-center justify-center"
              style={{ width: containerSize, height: containerSize }}
            >
              {/* Circular Orbit Ring */}
              <div
                className="absolute rounded-full border border-white/5 border-dashed"
                style={{
                  width: containerRadius * 2,
                  height: containerRadius * 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Active Center Card Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={bike.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="z-10 glass-panel backdrop-blur-md rounded-2xl p-5 w-44 md:w-48 text-center border border-white/10"
                >
                  <span className="text-[8px] font-bold tracking-[0.3em] uppercase block text-slate-500 mb-1">
                    Active Select
                  </span>
                  <h3 className="text-sm font-black text-white uppercase truncate">
                    {bike.name.replace('Cruxon ', '')}
                  </h3>
                  <span 
                    className="text-xs font-extrabold tracking-widest mt-1.5 block font-display"
                    style={{ color: bike.accentColor }}
                  >
                    {bike.price}
                  </span>
                  
                  {/* Orbit Navigation buttons inside center card */}
                  <div className="flex items-center justify-center gap-3 mt-4 border-t border-white/5 pt-3">
                    <button
                      onClick={prev}
                      className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={12} className="text-white" />
                    </button>
                    <button
                      onClick={next}
                      className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronRight size={12} className="text-white" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Orbiting Bike Profiles with Counter-Rotation */}
              {bikes.map((b, idx) => {
                const rotation = getRotation(idx);
                const isActive = b.id === bike.id;
                return (
                  <motion.div
                    key={b.id}
                    animate={{
                      transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      width: profileSize,
                      height: profileSize,
                      position: "absolute",
                      top: `calc(50% - ${profileSize / 2}px)`,
                      left: `calc(50% - ${profileSize / 2}px)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -rotation }}
                      transition={{
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full h-full"
                    >
                      <motion.div
                        onClick={() => handleProfileClick(idx)}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full h-full rounded-full border cursor-pointer p-1.5 bg-black/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
                          isActive 
                            ? "border-2" 
                            : "border-white/5 hover:border-white/20"
                        }`}
                        style={{
                          borderColor: isActive ? bike.accentColor : 'rgba(255,255,255,0.05)',
                          boxShadow: isActive ? `0 0 20px -2px ${bike.accentColor}50` : 'none'
                        }}
                      >
                        <img 
                          src={b.image} 
                          alt={b.name} 
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Frame Size selector right underneath orbit */}
            <div className="flex flex-col gap-3 mt-8 items-center">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">
                Chassis Frame Size
              </label>
              <div className="flex gap-3">
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg border text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      selectedSize === size
                        ? 'bg-white/[0.04] border-white/20 text-white'
                        : 'bg-transparent border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 font-light text-center">
                Recommended for riders {selectedSize === 'S' ? '160cm - 175cm' : selectedSize === 'M' ? '170cm - 185cm' : '180cm - 195cm'}.
              </span>
            </div>

          </div>

          {/* Right Side: Pricing Box / Purchase CTA */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col gap-6 lg:max-w-md w-full ml-auto">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Vinura Custom Order
                </span>
                <span className="text-xl font-extrabold text-white tracking-wider mt-1 uppercase">
                  {bike.name}
                </span>
              </div>
              <span className="text-2xl font-display font-extrabold text-white">
                {bike.price}
              </span>
            </div>

            <div className="h-[1px] w-full bg-white/5"></div>

            {/* Specs Summary list */}
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-light">
              <li className="flex justify-between">
                <span>Drivetrain Assist</span>
                <span className="text-white font-semibold">{bike.specs.motor} Peak</span>
              </li>
              <li className="flex justify-between">
                <span>Power Cells</span>
                <span className="text-white font-semibold">{bike.specs.battery} Smart Battery</span>
              </li>
              <li className="flex justify-between">
                <span>Approx Weight</span>
                <span className="text-white font-semibold">{bike.specs.weight}</span>
              </li>
              <li className="flex justify-between">
                <span>Active Color Strip</span>
                <span 
                  className="font-semibold uppercase tracking-wider text-[9px]"
                  style={{ color: bike.accentColor }}
                >
                  {bike.accentClass} neon
                </span>
              </li>
            </ul>

            <div className="h-[1px] w-full bg-white/5"></div>

            <button
              onClick={() => setShowPrebookModal(true)}
              className="w-full py-4 rounded-xl font-bold tracking-widest text-xs uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200"
            >
              Prebook Now
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* Slide-Up Prebook Form Modal */}
      <AnimatePresence>
        {showPrebookModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Dark glass backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrebookModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-up dialog box */}
            <motion.div 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-[#0d111a] border border-white/10 p-6 rounded-2xl shadow-2xl z-10 flex flex-col text-left gap-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
                    Preorder Registration
                  </span>
                  <h3 className="text-lg font-black text-white uppercase mt-1">
                    PREBOOK YOUR MACHINE
                  </h3>
                </div>
                <button 
                  onClick={() => setShowPrebookModal(false)}
                  className="p-1 rounded-lg border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Configurations Summary card */}
              <div 
                className="p-4 rounded-xl border border-white/5 flex items-center justify-between"
                style={{ backgroundColor: `${bike.accentColor}08` }}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white uppercase">{bike.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-0.5">Frame Size: {selectedSize} • {bike.specs.motor}</span>
                </div>
                <span className="text-base font-display font-extrabold text-white">{bike.price}</span>
              </div>

              {/* Conditionally render success panel */}
              {isPrebooked ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-2 animate-bounce"
                    style={{ borderColor: bike.accentColor, color: bike.accentColor }}
                  >
                    <CheckCircle size={32} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white uppercase">Preorder Registered!</span>
                    <span className="text-xs text-slate-400 mt-1">We have sent a verification code to {prebookForm.email}.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePrebookSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Venkat Asrith"
                      value={prebookForm.name}
                      onChange={(e) => setPrebookForm({ ...prebookForm, name: e.target.value })}
                      className="w-full p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.04]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. venkatasrith@example.com"
                      value={prebookForm.email}
                      onChange={(e) => setPrebookForm({ ...prebookForm, email: e.target.value })}
                      className="w-full p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.04]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +1 555-0199"
                      value={prebookForm.phone}
                      onChange={(e) => setPrebookForm({ ...prebookForm, phone: e.target.value })}
                      className="w-full p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.04]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 rounded-xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                    style={{ 
                      backgroundColor: bike.accentColor, 
                      color: '#000000',
                      boxShadow: `0 4px 20px ${bike.accentColor}30`
                    }}
                  >
                    {isSubmitting ? 'Registering Preorder...' : 'Confirm Prebook'}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
export default ExperienceSection;
