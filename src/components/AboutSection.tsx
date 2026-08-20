import React from 'react';
import GionatanLetterReveal from './GionatanLetterReveal';
import GionatanTextReveal from './GionatanTextReveal';
import FlipWords from './FlipWords';

export const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#05070C] border-t border-white/5 overflow-hidden flex items-center justify-center">
      {/* Moving Starfield Background */}
      <div className="starfield-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] rounded-full bg-[#D47844]/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Massive Vinura Title & Brand copy */}
        <div className="flex flex-col text-left gap-6">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D47844]">
            Who We Are
          </span>
          
          <div className="relative">
            {/* Massive Display Text (Letter-by-letter with gradient highlights) */}
            <div className="absolute -top-16 sm:-top-24 left-0 flex flex-wrap leading-none select-none z-0">
              <GionatanLetterReveal 
                text="VINURA"
                className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E6D5BC] via-[#D47844] to-[#EF4444] opacity-[0.22] uppercase mr-3 sm:mr-5 font-display"
              />
              <GionatanLetterReveal 
                text="CYCLES"
                className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white/[0.03] uppercase font-display"
              />
            </div>
            
            <div className="flex items-baseline text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase relative z-10 font-display">
              <span>CRAFTING</span>
              <FlipWords 
                words={["SPEED", "POWER", "CONTROL", "DESIGN", "FUTURE"]} 
                className="text-[#D47844]"
              />
            </div>
          </div>

          <GionatanTextReveal 
            text="Vinura Cycles is a premium technology boutique specializing in futuristic electric bicycles. We merge structural carbon-fiber craft, Mid-Drive electric powertrains, and HUD software telemetry to design two-wheeled vehicles that move with complete organic synergy."
            className="text-slate-400 text-sm md:text-base font-light leading-relaxed tracking-wide mt-2"
            delay={0.1}
          />

          <GionatanTextReveal 
            text="Every chassis size, geometry curve, and lighting system is customized in our laboratories. Designed for riders who seek the absolute pinnacle of speed, visual excellence, and green cybernetic engineering."
            className="text-slate-400 text-xs md:text-sm font-light leading-relaxed tracking-wide opacity-80"
            delay={0.2}
          />
        </div>

        {/* Right Side: Visualizing HUD pulse schematics (utilizing the Uiverse skeleton pulse loading card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Schematic Module A (Uiverse Pulse Loader) */}
          <div className="p-5 border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur-md shadow-2xl animate-pulse flex flex-col gap-4 text-left">
            <div className="flex items-center justify-center h-36 bg-white/5 rounded-xl overflow-hidden relative">
              <img 
                src="/assets/tech_cockpit.jpg" 
                alt="Telemetry Lab"
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="h-3 bg-white/10 rounded-full w-2/3"></div>
            <div className="h-2 bg-white/5 rounded-full w-full"></div>
            <div className="h-2 bg-white/5 rounded-full w-5/6"></div>
            <div className="h-2 bg-white/5 rounded-full w-4/5"></div>
            <div className="flex items-center gap-3 mt-2 border-t border-white/5 pt-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 animate-pulse" />
              <div className="flex flex-col gap-1.5 flex-grow">
                <div className="h-2 bg-white/10 rounded-full w-1/3"></div>
                <div className="h-1.5 bg-white/5 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Schematic Module B (Uiverse Pulse Loader) */}
          <div className="p-5 border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur-md shadow-2xl animate-pulse flex flex-col gap-4 text-left">
            <div className="flex items-center justify-center h-36 bg-white/5 rounded-xl overflow-hidden relative">
              <img 
                src="/assets/lifestyle_hero.jpg" 
                alt="Minimal Pavilion"
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="h-3 bg-white/10 rounded-full w-1/2"></div>
            <div className="h-2 bg-white/5 rounded-full w-full"></div>
            <div className="h-2 bg-white/5 rounded-full w-4/5"></div>
            <div className="h-2 bg-white/5 rounded-full w-3/4"></div>
            <div className="flex items-center gap-3 mt-2 border-t border-white/5 pt-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 animate-pulse" />
              <div className="flex flex-col gap-1.5 flex-grow">
                <div className="h-2 bg-white/10 rounded-full w-1/4"></div>
                <div className="h-1.5 bg-white/5 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default AboutSection;
