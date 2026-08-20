import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

interface DragReviewsProps {
  reviews: Review[];
  accentColor: string;
}

interface CardProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  review: Review;
  top: string;
  left: string;
  rotate: string;
  accentColor: string;
  className?: string;
}

const DragCard: React.FC<CardProps> = ({
  containerRef,
  review,
  top,
  left,
  rotate,
  accentColor,
  className = '',
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-review-element");
    let maxZIndex = 0;

    els.forEach((el) => {
      const z = parseInt(window.getComputedStyle(el).getPropertyValue("z-index"));
      if (!isNaN(z) && z > maxZIndex) {
        maxZIndex = z;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.div
      onPointerDown={updateZIndex}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={`drag-review-element absolute w-60 sm:w-64 p-[1.2px] rounded-2xl cursor-grab active:cursor-grabbing bg-white/5 border border-white/10 select-none ${className}`}
    >
      <div className="bg-[#0b0e14]/90 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between min-h-[180px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-2.5" style={{ color: accentColor }}>
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={11} fill="currentColor" stroke="currentColor" />
            ))}
          </div>
          <p className="text-[11px] text-slate-300 italic font-light leading-relaxed mb-4">
            "{review.quote}"
          </p>
        </div>
        
        <div className="flex flex-col border-t border-white/5 pt-3">
          <span className="text-[11px] font-bold text-white tracking-wide">
            {review.name}
          </span>
          <span className="text-[9px] text-slate-500 tracking-wider">
            {review.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const DragReviews: React.FC<DragReviewsProps> = ({ reviews, accentColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const desktopPlacements = [
    { top: "10%", left: "5%", rotate: "-6deg" },
    { top: "15%", left: "38%", rotate: "8deg" },
    { top: "8%", left: "68%", rotate: "-4deg" },
    { top: "52%", left: "8%", rotate: "12deg" },
    { top: "54%", left: "40%", rotate: "-8deg" },
    { top: "48%", left: "70%", rotate: "16deg" },
  ];

  const mobilePlacements = [
    { top: "6%", left: "4%", rotate: "-4deg" },
    { top: "34%", left: "10%", rotate: "5deg" },
    { top: "62%", left: "6%", rotate: "-3deg" },
  ];

  const placements = isMobile ? mobilePlacements : desktopPlacements;
  const cardsLimit = isMobile ? 3 : 6;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[620px] bg-black/40 border border-white/5 rounded-3xl overflow-hidden select-none pointer-events-auto"
    >
      {/* Dynamic Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] select-none">
        <span className="text-[12vw] font-black tracking-widest uppercase font-display">
          REVIEWS
        </span>
      </div>

      {/* Grid instructions overlay */}
      <div className="absolute top-4 left-6 pointer-events-none text-slate-600 text-[9px] uppercase tracking-[0.2em]">
        ★ Arrange / Drag feedback tiles anywhere
      </div>

      {reviews.slice(0, cardsLimit).map((review, idx) => {
        const placement = placements[idx] || placements[0];
        return (
          <DragCard
            key={idx}
            containerRef={containerRef}
            review={review}
            top={placement.top}
            left={placement.left}
            rotate={placement.rotate}
            accentColor={accentColor}
          />
        );
      })}
    </div>
  );
};

export default DragReviews;
