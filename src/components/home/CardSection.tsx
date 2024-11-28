'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const cards = [
  {
    title: "Feel the vibe of your Family",
    content: "Create stronger bonds with your relatives, learn to understand them better and share essential things about yourself during daily challenges and special events.",
    buttonText: "Learn more about Bonding Activities",
    color: "bg-purple-200",
  },
  {
    title: "Follow the beat of your Family",
    content: "Create events and mark important days on Timeline — a smart shared calendar for all the significant and not-so-much things. Track your Family's activity and never miss a date!",
    buttonText: "Learn more about Timeline",
    color: "bg-yellow-200",
  },
  {
    title: "Untangle your Family connections",
    content: "Learn who is who in your family! Invite your relatives, add ties and watch Weera build a 3D map of your relatives.",
    buttonText: "Learn more about Timeline",
    color: "bg-cyan-200",
  },
  {
    title: "Share Family Stories",
    content: "Document and share your family's stories, preserving history for future generations.",
    buttonText: "Share Your Story",
    color: "bg-blue-200",
  },
];

const CardSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastCardOffset, setLastCardOffset] = useState("0px");
  
  useEffect(() => {
    const calculateOffset = () => {
      const totalCards = cards.length;
      const cardWidth = 500;
      const gap = 24;
      const containerWidth = window.innerWidth;
      const cardsWidth = totalCards * cardWidth + (totalCards - 1) * gap;
      const offset = cardsWidth - containerWidth;
      setLastCardOffset(`-${offset + 8}px`); // Adding small padding
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardsTransform = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9], 
    ["120%", "120%", "0%", lastCardOffset]
  );

  return (
    <div 
      ref={containerRef}
      className="min-h-[300vh] relative"
    >
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <motion.div 
          style={{ x: cardsTransform }}
          className="flex gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`
                ${card.color} 
                w-[500px] h-[600px] 
                p-12 
                rounded-[32px]
                shadow-xl 
                flex flex-col 
                justify-between
                font-dynapuff
                flex-shrink-0
              `}
            >
              <div>
                <h2 className="text-4xl font-bold mb-6 leading-tight">{card.title}</h2>
                <p className="text-xl mb-8 leading-relaxed">{card.content}</p>
              </div>
              <button className="bg-white hover:bg-white/90 text-gray-800 py-4 px-8 rounded-full text-lg w-fit
                shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                {card.buttonText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardSection;