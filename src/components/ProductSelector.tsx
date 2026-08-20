import React from 'react';
import type { BikeData } from '../data/bikes';

interface ProductSelectorProps {
  bikes: BikeData[];
  selectedBike: BikeData;
  onSelect: (bike: BikeData) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  bikes,
  selectedBike,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-6 md:w-[220px]">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-semibold">
          Select Version
        </span>
        <div className="h-[1px] w-12 bg-white/10 mt-1"></div>
      </div>

      <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
        {bikes.map((bike) => {
          const isActive = selectedBike.id === bike.id;
          
          return (
            <button
              key={bike.id}
              onClick={() => onSelect(bike)}
              className={`flex items-center gap-4 text-left p-3 rounded-lg border transition-all duration-500 cursor-pointer min-w-[200px] md:min-w-0 ${
                isActive
                  ? 'bg-white/[0.04] border-white/15'
                  : 'bg-transparent border-white/5 opacity-50 hover:opacity-80 hover:border-white/10'
              }`}
            >
              {/* Image Thumbnail */}
              <div className="w-12 h-8 rounded bg-black/40 overflow-hidden border border-white/10 flex-shrink-0">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {bike.brand}
                </span>
                <span className="text-xs font-semibold text-white tracking-wider">
                  {bike.name.replace('Cruxon ', '')}
                </span>
              </div>

              {/* Active Indicator Light */}
              {isActive && (
                <div 
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: bike.accentColor, boxShadow: `0 0 8px ${bike.accentColor}` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ProductSelector;
