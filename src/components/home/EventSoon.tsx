'use client'

import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import HyperText from "@/components/ui/hyper-text";

interface CardsCompleteEvent extends CustomEvent {
  detail: {
    direction: 'forward' | 'backward';
  };
}

const EventSoon = () => {
  const [showEvent, setShowEvent] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward');
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollPosition = useRef(0);
  const eventStartTime = useRef<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleCardsComplete = (event: Event) => {
      const customEvent = event as CardsCompleteEvent;
      const direction = customEvent.detail?.direction || 'forward';
      setScrollDirection(direction);
      
      if (direction === 'forward') {
        // Hide header when event shows
        document.body.style.setProperty('--header-visibility', 'hidden');
        setTimeout(() => {
          setShowEvent(true);
          eventStartTime.current = Date.now();
        }, 400);
      } else {
        // Show header when going back
        document.body.style.setProperty('--header-visibility', 'visible');
        setShowEvent(false);
        eventStartTime.current = null;
      }
    };

    window.addEventListener('cardsComplete', handleCardsComplete);
    
    return scrollYProgress.onChange((latest) => {
      const scrollingDown = latest > lastScrollPosition.current;
      lastScrollPosition.current = latest;

      const hasMinimumEventTime = eventStartTime.current && (Date.now() - eventStartTime.current > 800);

      if (scrollingDown && latest >= 0.6 && hasMinimumEventTime) {
        window.dispatchEvent(new CustomEvent('eventComplete', { 
          detail: { direction: 'forward' } 
        }));
      }

      if (!scrollingDown && latest <= 0.4) {
        window.dispatchEvent(new CustomEvent('eventComplete', { 
          detail: { direction: 'backward' } 
        }));
      }
    });

    return () => {
      window.removeEventListener('cardsComplete', handleCardsComplete);
      // Reset header visibility when component unmounts
      document.body.style.setProperty('--header-visibility', 'visible');
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="min-h-[200vh] relative">
      <AnimatePresence mode="wait">
        {showEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40"
            style={{
              background: 'linear-gradient(130deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)'
            }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 45,
                duration: 0.6
              }
            }}
            exit={{ 
              opacity: 0, 
              x: '100%',
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 45,
                duration: 0.4
              }
            }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              {/* Animated Grid */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                  linear-gradient(180deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                }}
                animate={{
                  y: [0, 50],
                  x: [0, 50]
                }}
                transition={{
                  duration: 20,
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
                  className="text-9xl font-[VT323] tracking-wide text-red-500"
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
                   background: 'radial-gradient(circle at center, transparent 0%, #0A0A0A 90%)',
                   opacity: 0.8
                 }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSoon;