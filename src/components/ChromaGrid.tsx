import React, { useRef, useState } from 'react';

interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
  borderColor: string;
  gradient: string;
  url: string;
}

interface ChromaGridProps {
  items: ChromaItem[];
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  radius = 280,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {items.map((item, idx) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [coords, setCoords] = useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseMove = (e: React.MouseEvent) => {
          if (!cardRef.current) return;
          const rect = cardRef.current.getBoundingClientRect();
          setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        };

        const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://placehold.co/100x100/${item.borderColor.replace('#', '')}/ffffff?text=${item.title.charAt(0)}`;
        };

        return (
          <div
            key={idx}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-2xl border bg-[#0b0e14]/80 backdrop-blur-sm overflow-hidden p-[1px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between min-h-[280px]"
            style={{
              borderColor: isHovered ? item.borderColor : 'rgba(255,255,255,0.05)',
              boxShadow: isHovered ? `0 10px 30px -5px ${item.borderColor}15` : 'none'
            }}
          >
            {/* Spotlight Glow Overlay */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-50"
                style={{
                  background: `radial-gradient(${radius}px circle at ${coords.x}px ${coords.y}px, ${item.borderColor}20, transparent 80%)`,
                }}
              />
            )}

            <div className="relative bg-[#0a0d13] rounded-2xl p-5 flex flex-col justify-between h-full z-10 flex-grow">
              <div className="flex flex-col gap-4">
                {/* Profile Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError}
                    className="w-12 h-12 rounded-full object-cover border"
                    style={{ borderColor: item.borderColor }}
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white tracking-wide">{item.title}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{item.subtitle}</span>
                  </div>
                </div>
                
                {/* Visual Accent Box */}
                <div 
                  className="w-full h-24 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/5 bg-black/40"
                >
                  <div 
                    className="absolute inset-0 opacity-15"
                    style={{ background: item.gradient }}
                  />
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 z-10 uppercase">
                    {item.handle}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold tracking-widest uppercase cursor-pointer hover:underline transition-colors font-display"
                  style={{ color: item.borderColor }}
                >
                  Connect Profile
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChromaGrid;
