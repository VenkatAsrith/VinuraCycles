import React from 'react';
import { Coffee, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative w-full bg-[#05070C] border-t border-white/5 py-12 px-6 md:px-12 z-10 overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand & Creator Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-black tracking-widest text-white">
              VINURA CYCLES
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D47844]" />
          </div>
          <p className="text-[11px] text-slate-500 font-light">
            Designed & Developed by{' '}
            <a 
              href="https://github.com/VenkatAsrith" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white font-semibold transition-colors duration-300 underline underline-offset-4"
            >
              VenkatAsrith
            </a>
          </p>

          {/* Social Profiles */}
          <div className="flex items-center gap-4 mt-2">
            <a 
              href="https://github.com/VenkatAsrith" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/venkat-asrith" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://buymeacoffee.com/venkatasrith" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all duration-300"
              aria-label="Buy Me A Coffee"
            >
              <Coffee size={16} />
            </a>
          </div>
        </div>

        {/* Center: Buy Me A Coffee Box */}
        <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center gap-4 max-w-sm">
          <div className="p-2.5 rounded-lg bg-[#D47844]/10 text-[#D47844]">
            <Coffee size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Support the craft
            </span>
            <a 
              href="https://buymeacoffee.com/venkatasrith"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white hover:underline mt-0.5 font-semibold flex items-center gap-1 group cursor-pointer"
            >
              Buy me a coffee
              <span className="text-[10px] text-slate-500 font-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right Side: Back to Top */}
        <button
          onClick={onScrollToTop}
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 hover:text-white uppercase p-2.5 rounded-xl border border-white/5 glass-panel-hover transition-all duration-300 cursor-pointer"
        >
          Back to Top
          <ArrowUp size={12} strokeWidth={2.5} />
        </button>

      </div>

      {/* Small copyright note */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 text-center">
        <span className="text-[9px] tracking-widest text-slate-600 font-light block">
          &copy; {new Date().getFullYear()} VINURA CYCLES. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
