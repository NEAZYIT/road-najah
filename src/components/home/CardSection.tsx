'use client'

import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Card {
  title: string;
  content: string;
  buttonText: string;
  color: string;
}

const cards: Card[] = [
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
  const [xPosition, setXPosition] = useState("120%");
  const lastScrollPosition = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const scrollingDown = latest > lastScrollPosition.current;
      lastScrollPosition.current = latest;

      // Trigger event screen transitions first when scrolling up
      if (!scrollingDown && latest <= 0.75) {
        window.dispatchEvent(new CustomEvent('cardsComplete', { 
          detail: { direction: 'backward' } 
        }));
      }

      // Calculate card positions with adjusted timing
      let newPosition = "120%";
      if (latest <= 0.2) {
        newPosition = "120%";
      } else if (latest <= 0.4) {
        newPosition = "60%";
      } else if (latest <= 0.7) {
        newPosition = "0%";
      } else {
        newPosition = "-150%";
      }
      setXPosition(newPosition);

      // Trigger event screen when scrolling down
      if (scrollingDown && latest >= 0.75) {
        window.dispatchEvent(new CustomEvent('cardsComplete', { 
          detail: { direction: 'forward' } 
        }));
      }
    });
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef}
      className="min-h-[300vh] relative"
    >
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ x: "120%" }}  // Added this line to set initial position
          animate={{ x: xPosition }}
          className="flex gap-6 will-change-transform"
          transition={{
            type: "spring",
            stiffness: 45,
            damping: 25,
            restDelta: 0.001
          }}
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
                transform-gpu
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