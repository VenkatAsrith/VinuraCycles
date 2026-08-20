import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StackProps {
  cards: React.ReactNode[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
}

export const Stack: React.FC<StackProps> = ({
  cards,
  randomRotation = true,
  sendToBackOnClick = true,
}) => {
  const [cardList, setCardList] = useState(
    cards.map((card, i) => ({
      id: i,
      content: card,
      // Generates staggered angles
      rotate: randomRotation ? (i % 2 === 0 ? 3 * i + 1 : -3 * i - 2) : 0,
    }))
  );

  const handleCardClick = (id: number) => {
    if (!sendToBackOnClick) return;
    
    const clickedIdx = cardList.findIndex((c) => c.id === id);
    // Only send the top card to the back
    if (clickedIdx !== cardList.length - 1) return;

    setCardList((prev) => {
      const topCard = prev[clickedIdx];
      const rest = prev.filter((_, i) => i !== clickedIdx);
      return [topCard, ...rest]; // Shifts top card to bottom
    });
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {cardList.map((card, index) => {
        const isTop = index === cardList.length - 1;
        return (
          <motion.div
            key={card.id}
            style={{
              zIndex: index,
            }}
            animate={{
              rotate: card.rotate,
              scale: 0.95 + index * 0.015,
              y: (cardList.length - 1 - index) * -5,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 22,
            }}
            whileHover={isTop ? { scale: 1.05, rotate: card.rotate + 3 } : {}}
            onClick={() => handleCardClick(card.id)}
            className="absolute w-full h-full rounded-2xl border border-white/10 bg-[#0d111a]/90 p-1 shadow-2xl cursor-pointer"
          >
            {card.content}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Stack;
