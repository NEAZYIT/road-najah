'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const ContactSection = () => {
  const [showContact, setShowContact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEventComplete = (event: CustomEvent) => {
      const direction = event.detail?.direction || 'forward';
      
      if (direction === 'forward') {
        setShowContact(true);
        document.body.style.setProperty('--header-visibility', 'visible');
      } else {
        setShowContact(false);
      }
    };

    window.addEventListener('eventComplete', handleEventComplete as EventListener);
    return () => window.removeEventListener('eventComplete', handleEventComplete as EventListener);
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-[100vh] relative">
      <AnimatePresence mode="wait">
        {showContact && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Background Overlay with Gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
              <motion.div 
                className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative p-12">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 blur-3xl" />

                  {/* Content Grid */}
                  <div className="relative grid md:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-semibold text-white mb-4">Contact Information</h2>
                        <p className="text-gray-300">Get in touch with our dedicated team for assistance and inquiries.</p>
                      </div>

                      <div className="space-y-6">
                        <div className="text-gray-200">
                          <div className="font-medium mb-2">Email</div>
                          <p className="text-blue-400">contact@company.com</p>
                        </div>

                        <div className="text-gray-200">
                          <div className="font-medium mb-2">Phone</div>
                          <p className="text-blue-400">+1 (555) 123-4567</p>
                        </div>

                        <div className="text-gray-200">
                          <div className="font-medium mb-2">Address</div>
                          <p className="text-blue-400">123 Business Street<br />New York, NY 10001</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-semibold text-white mb-4">Connect With Us</h2>
                        <p className="text-gray-300">Follow us on social media to stay updated with our latest news and events.</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:from-blue-500 hover:to-indigo-500"
                          >
                            Schedule a Meeting
                          </motion.button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-white/10 text-white rounded-lg font-medium transition-all hover:bg-white/20"
                          >
                            LinkedIn
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-white/10 text-white rounded-lg font-medium transition-all hover:bg-white/20"
                          >
                            Twitter
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactSection;