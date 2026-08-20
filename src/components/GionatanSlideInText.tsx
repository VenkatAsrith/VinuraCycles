import React from 'react';
import { motion } from 'framer-motion';

interface GionatanSlideInTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const GionatanSlideInText: React.FC<GionatanSlideInTextProps> = ({ 
  text, 
  className = '',
  delay = 0
}) => {
  return (
    <h2 className={`flex flex-wrap leading-none select-none ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ 
            delay: delay + i * 0.02, 
            ease: "easeOut",
            duration: 0.5
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h2>
  );
};

export default GionatanSlideInText;
