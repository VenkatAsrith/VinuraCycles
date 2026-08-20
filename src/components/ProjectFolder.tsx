import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { BIKES } from '../data/bikes';

interface ProjectFolderProps {
  onUnlock: () => void;
}

export const ProjectFolder: React.FC<ProjectFolderProps> = ({ onUnlock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleOpenFolder = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Staggered fly out animation of the bike cards out of the folder
    const cards = containerRef.current?.querySelectorAll('.folder-bike-card');
    if (cards) {
      gsap.timeline({
        onComplete: () => {
          // Butter-smooth transition to the landing page after layout completes
          setTimeout(() => {
            gsap.to(containerRef.current, {
              opacity: 0,
              y: -50,
              duration: 0.8,
              ease: 'power3.inOut',
              onComplete: onUnlock
            });
          }, 1500);
        }
      })
      .to(cards, {
        y: (i) => -180 - i * 32, // Staggered upward offset
        x: (i) => (i - 2) * 55,  // Spread out sideways in an arc
        rotation: (i) => (i - 2) * 8, // organic rotation fan
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 1.1,
        ease: 'power4.out'
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9998] bg-[#05070C] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background Starfield */}
      <div className="starfield-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D47844]/5 blur-[150px] pointer-events-none" />

      {/* Main interactive area */}
      <div 
        onClick={handleOpenFolder}
        onMouseEnter={handleOpenFolder}
        className="relative group flex flex-col items-center justify-center w-full h-full cursor-pointer"
      >
        
        {/* Arc Container for the escaping cards (starts hidden inside/behind folder) */}
        <div ref={cardsRef} className="absolute bottom-[48%] flex justify-center items-end pointer-events-none">
          {BIKES.map((bike, idx) => (
            <div
              key={bike.id}
              className="folder-bike-card absolute w-28 h-36 rounded-xl border border-white/10 bg-black/80 p-2 shadow-2xl flex flex-col justify-between opacity-0 scale-75 origin-bottom translate-y-0"
              style={{
                boxShadow: `0 10px 30px -5px ${bike.accentColor}40`,
                borderColor: `${bike.accentColor}30`,
                zIndex: 40 - idx
              }}
            >
              <div className="w-full h-18 rounded-lg overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-left mt-2">
                <span className="text-[7px] font-bold tracking-widest text-slate-500 uppercase">
                  {bike.brand}
                </span>
                <span className="text-[9px] font-black text-white uppercase truncate">
                  {bike.name.replace('CRUXON ', '')}
                </span>
                <span 
                  className="text-[8px] font-bold mt-1"
                  style={{ color: bike.accentColor }}
                >
                  {bike.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3D perspective folder layout */}
        <div className="file relative w-64 h-40 origin-bottom [perspective:1500px] z-50">
          {/* Back flap */}
          <div
            className="absolute inset-0 bg-[#bd602c] w-full h-full origin-top rounded-2xl rounded-tl-none transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-[#bd602c] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-[#bd602c] before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
            style={{
              boxShadow: isOpen ? '0 30px 60px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0,0,0,0.3)'
            }}
          ></div>
          
          {/* Paper inserts rotating open in 3D */}
          <div
            className="absolute inset-1 bg-zinc-600 rounded-2xl transition-all ease duration-500 origin-bottom select-none"
            style={{
              transform: isOpen ? 'rotateX(-25deg) translateY(-20px)' : 'rotateX(0deg)'
            }}
          ></div>
          <div
            className="absolute inset-1 bg-zinc-500 rounded-2xl transition-all ease duration-500 origin-bottom"
            style={{
              transform: isOpen ? 'rotateX(-35deg) translateY(-15px)' : 'rotateX(0deg)'
            }}
          ></div>
          <div
            className="absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-500 origin-bottom"
            style={{
              transform: isOpen ? 'rotateX(-45deg) translateY(-10px)' : 'rotateX(0deg)'
            }}
          ></div>
          
          {/* Front flap (Folds down) */}
          <div
            className="absolute bottom-0 bg-gradient-to-t from-[#D47844] to-[#f48c55] w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-[#f48c55] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-[#f48c55] before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-500 origin-bottom flex items-end"
            style={{
              transform: isOpen ? 'rotateX(-75deg) translateY(2px)' : 'rotateX(0deg)',
              boxShadow: isOpen ? 'inset 0 20px 40px rgba(251,191,36,0.3), inset 0 -20px 40px rgba(212,120,68,0.5)' : 'none'
            }}
          ></div>
        </div>

        {/* Action Label */}
        <p className={`text-xs uppercase tracking-[0.3em] pt-8 transition-opacity duration-500 font-semibold ${isOpen ? 'opacity-10' : 'opacity-40 animate-pulse'}`}>
          {isOpen ? 'Decrypting Archives...' : 'Hover or Click to Access Project Configurations'}
        </p>

      </div>
    </div>
  );
};
export default ProjectFolder;
