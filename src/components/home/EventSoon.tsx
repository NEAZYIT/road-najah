'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HyperText from "@/components/ui/hyper-text";

interface CardsCompleteEvent extends CustomEvent {
  detail: {
    direction: 'forward' | 'backward';
  };
}

const EventSoon = () => {
  const [showEvent, setShowEvent] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    const handleCardsComplete = (event: Event) => {
      const customEvent = event as CardsCompleteEvent;
      const direction = customEvent.detail?.direction || 'forward';
      setScrollDirection(direction);
      
      if (direction === 'forward') {
        setTimeout(() => {
          setShowEvent(true);
        }, 400);
      } else {
        setShowEvent(false);
      }
    };

    window.addEventListener('cardsComplete', handleCardsComplete);
    return () => window.removeEventListener('cardsComplete', handleCardsComplete);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showEvent && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-40 overflow-hidden"
          style={{
            background: 'linear-gradient(130deg, #050215 0%, #0C0422 30%, #130635 70%, #050215 100%)'
          }}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 45,
              duration: 0.8
            }
          }}
          exit={{ 
            opacity: 0, 
            x: '100%',
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 45,
              duration: 0.5
            }
          }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large Dev Grid */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(99, 102, 241, 0.05) 2px, transparent 2px),
                                linear-gradient(180deg, rgba(99, 102, 241, 0.05) 2px, transparent 2px)`,
                backgroundSize: '120px 120px',
              }}
              animate={{
                y: [0, 120],
                x: [0, 120]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Binary Rain Effect */}
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`binary-${i}`}
                  className="absolute font-[VT323] text-indigo-500/20 whitespace-nowrap"
                  style={{
                    left: `${(i / 30) * 100}%`,
                    top: '-20px',
                    fontSize: '24px',
                    filter: 'blur(1px)',
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright'
                  }}
                  initial={{ y: -100 }}
                  animate={{
                    y: ['0vh', '100vh'],
                    opacity: [0.3, 0]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5
                  }}
                >
                  {Array.from({ length: 20 }).map(() => 
                    Math.random() > 0.5 ? '1' : '0'
                  ).join(' ')}
                </motion.div>
              ))}
            </div>

            {/* Light Trails */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`trail-${i}`}
                className="absolute h-[3px] w-[400px]"
                style={{
                  top: `${10 + i * 12}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
                  filter: 'blur(6px)'
                }}
                animate={{
                  x: ['-100vw', '100vw']
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.5
                }}
              />
            ))}
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 1,
                ease: "easeOut"
              }
            }}
          >
            <motion.div 
              className="flex flex-col items-center gap-8"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <HyperText
                className="text-9xl font-[VT323] tracking-wide text-transparent 
                           bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 
                           drop-shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse"
                text="Event Coming Soon"
              />
              <motion.p
                className="text-4xl font-['Pixelify_Sans'] tracking-wide text-indigo-300/80
                         drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: 0.3,
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }}
              >
                Get ready for something amazing!
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Enhanced Vignette */}
          <div className="absolute inset-0 pointer-events-none" 
               style={{
                 background: 'radial-gradient(circle at center, transparent 0%, #050215 90%)',
                 opacity: 0.8
               }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventSoon;