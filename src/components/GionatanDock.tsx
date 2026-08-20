import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Home, Info, Cpu, Star, Coffee } from "lucide-react";

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35.0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35.0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


interface DockIconProps {
  mouseX?: MotionValue<number>;
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const DockIcon: React.FC<DockIconProps> = ({
  mouseX,
  href,
  children,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const iconSize = 36;
  const iconMagnification = 56;
  const iconDistance = 120;

  const distance = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square items-center justify-center rounded-full bg-white/[0.03] hover:bg-white/[0.1] border border-white/5 transition-colors duration-300"
    >
      <a
        href={href}
        className="flex h-full w-full items-center justify-center p-2 text-slate-400 hover:text-white transition-colors"
        onClick={onClick}
      >
        {children}
      </a>
    </motion.div>
  );
};

interface DockProps {
  children: React.ReactNode;
}

const Dock: React.FC<DockProps> = ({ children }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex h-[54px] items-end gap-3 rounded-2xl bg-black/60 border border-white/5 px-3 pb-2 backdrop-blur-md shadow-2xl"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(
            child as React.ReactElement<DockIconProps>,
            {
              ...(child.props as DockIconProps),
              mouseX: mouseX,
            }
          );
        }
        return child;
      })}
    </motion.div>
  );
};

interface GionatanDockProps {
  onNavigate: (sectionId: string) => void;
}

export const GionatanDock: React.FC<GionatanDockProps> = ({ onNavigate }) => {
  const handleNav = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] flex justify-center pointer-events-auto">
      <Dock>
        {/* Section Navigation */}
        <DockIcon href="#hero" onClick={handleNav("hero")}>
          <Home className="h-full w-full" />
        </DockIcon>
        <DockIcon href="#about" onClick={handleNav("about")}>
          <Info className="h-full w-full" />
        </DockIcon>
        <DockIcon href="#technology" onClick={handleNav("technology")}>
          <Cpu className="h-full w-full" />
        </DockIcon>
        <DockIcon href="#reviews" onClick={handleNav("reviews")}>
          <Star className="h-full w-full" />
        </DockIcon>

        {/* Separator rail */}
        <div className="h-8 w-[1px] bg-white/10 self-center mx-1" />

        {/* Social / Developer Links */}
        <DockIcon href="https://github.com/VenkatAsrith">
          <GithubIcon className="h-full w-full" />
        </DockIcon>
        <DockIcon href="https://linkedin.com/in/venkat-asrith">
          <LinkedinIcon className="h-full w-full" />
        </DockIcon>
        <DockIcon href="https://buymeacoffee.com/venkatasrith">
          <Coffee className="h-full w-full text-[#D47844]" />
        </DockIcon>
      </Dock>
    </div>
  );
};

export default GionatanDock;
