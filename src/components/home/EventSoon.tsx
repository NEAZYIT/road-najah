'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
        }, 400); // Increased delay for better timing with cards
      } else {
        // Immediate hide when scrolling back
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
          className="fixed inset-0 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center z-40"
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
          <motion.div
            className="text-center transform-gpu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                delay: 0.2,
                duration: 0.4,
                ease: "easeOut"
              }
            }}
          >
            <motion.h1
              className="text-6xl font-bold text-gray-800 font-dynapuff mb-6"
            >
              Event Coming Soon!
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 font-dynapuff"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.3,
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
            >
              Get ready for something amazing!
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventSoon;