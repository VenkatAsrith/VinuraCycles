import React, { useState } from 'react';
import { Search, Menu, ShoppingCart, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Product', id: 'product' },
    { label: 'Technology', id: 'technology' },
    { label: 'Reviews', id: 'reviews' }
  ];

  const handleMobileNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/5 bg-[#05070C]/35 backdrop-blur-md">
        {/* Brand Logo */}
        <motion.div 
          layoutId="brand-logo-shared"
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('hero')}
        >
          <span className="font-display text-lg sm:text-xl font-black tracking-widest uppercase transition-all duration-300 group-hover:tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6D5BC] via-[#D47844] to-[#EF4444] mr-1.5">
              VINURA
            </span>
            <span className="text-white">CYCLES</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#E6D5BC] animate-pulse"></span>
        </motion.div>

        {/* Main Nav Items */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:text-white cursor-pointer relative py-1 ${
                currentSection === item.id ? 'text-white' : 'text-slate-400'
              }`}
            >
              {item.label}
              {currentSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E6D5BC]" />
              )}
            </button>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6 text-slate-300">
          <button className="hover:text-white transition-colors duration-300 cursor-pointer p-2">
            <Search size={18} strokeWidth={2} />
          </button>
          <button className="hover:text-white transition-colors duration-300 cursor-pointer p-2 relative">
            <ShoppingCart size={18} strokeWidth={2} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E6D5BC]" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="hover:text-white transition-colors duration-300 cursor-pointer p-2 md:hidden"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#05070C] flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-black tracking-widest uppercase">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6D5BC] via-[#D47844] to-[#EF4444] mr-1.5">
                  VINURA
                </span>
                <span className="text-white">CYCLES</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6D5BC]" />
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-400 hover:text-white p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-8 text-left py-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNav(item.id)}
                className="text-2xl font-bold tracking-widest uppercase text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 text-slate-500 text-xs flex justify-between items-center">
            <span>&copy; {new Date().getFullYear()} Vinura Cycles</span>
            <div className="flex gap-4">
              <a href="https://github.com/VenkatAsrith" target="_blank" rel="noreferrer" className="hover:text-white">Github</a>
              <a href="https://linkedin.com/in/venkat-asrith" target="_blank" rel="noreferrer" className="hover:text-white">Linkedin</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
