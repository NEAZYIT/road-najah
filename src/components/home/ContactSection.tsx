'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

const ContactSection = () => {
  const [showContact, setShowContact] = useState(false);
  const containerRef = useRef(null);
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
    const handleEventComplete = (event) => {
      const direction = event.detail?.direction || 'forward';
      
      if (direction === 'forward') {
        setShowContact(true);
        document.body.style.setProperty('--header-visibility', 'visible');
      } else {
        setShowContact(false);
      }
    };

    window.addEventListener('eventComplete', handleEventComplete);
    return () => window.removeEventListener('eventComplete', handleEventComplete);
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
    <div ref={containerRef} className="min-h-screen relative bg-black">
      <AnimatePresence mode="wait">
        {showContact && (
          <motion.div 
            className="fixed inset-0 z-[100]"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Background Overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Lamp Effect Container - Positioned at Top */}
            <div className="absolute top-0 left-0 right-0 z-[101]">
              <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate h-64">
                <motion.div
                  initial={{ opacity: 0.5, width: "15rem" }}
                  whileInView={{ opacity: 1, width: "30rem" }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                  }}
                  className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                >
                  <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
                  <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 [mask-image:linear-gradient(to_right,white,transparent)]" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0.5, width: "15rem" }}
                  whileInView={{ opacity: 1, width: "30rem" }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                  }}
                  className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
                >
                  <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 [mask-image:linear-gradient(to_left,white,transparent)]" />
                  <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>
                <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
                <div className="absolute top-1/2 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                <div className="absolute inset-auto h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
                <motion.div
                  initial={{ width: "8rem" }}
                  whileInView={{ width: "16rem" }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-auto h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
                ></motion.div>
                <motion.div
                  initial={{ width: "15rem" }}
                  whileInView={{ width: "30rem" }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-auto h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
                ></motion.div>
              </div>
            </div>

            {/* Contact Card - Positioned on Right Side */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-full max-w-3xl z-[102]">
              <motion.div 
                className="bg-gradient-to-br from-orange-500 to-orange-480 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden h-[32rem] border border-blue-800/30"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative p-8">
                  {/* Decorative Gradient Effects */}
                  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-400/10 to-blue-600/10 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-orange-400/50 to-blue-600/10 blur-3xl" />

                  {/* Content Grid */}
                  <div className="relative grid md:grid-cols-2 gap-8 justify-end">
                    {/* Left Column - Contact Information */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-dynapuff font-semibold text-blue-200 mb-3">Contact Information</h2>
                        <p className="text-blue-100/80 font-dynapuff">Get in touch with our dedicated team for assistance and inquiries.</p>
                      </div>

                      <div className="space-y-4">
                        {/* Email Section */}
                        <div className="text-blue-100/90">
                          <div className="font-dynapuff font-medium mb-2 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-blue-300" />
                            <span>Email</span>
                          </div>
                          <p className="text-blue-300 font-dynapuff">contact@company.com</p>
                        </div>

                        {/* Phone Section */}
                        <div className="text-blue-100/90">
                          <div className="font-dynapuff font-medium mb-2 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-blue-300" />
                            <span>Phone</span>
                          </div>
                          <p className="text-blue-300 font-dynapuff">+1 (555) 123-4567</p>
                        </div>

                        {/* Address Section */}
                        <div className="text-blue-100/90">
                          <div className="font-dynapuff font-medium mb-2 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-300" />
                            <span>Address</span>
                          </div>
                          <p className="text-blue-300 font-dynapuff">123 Business Street<br />New York, NY 10001</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Column - Social Connections */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-dynapuff font-semibold text-blue-200 mb-3">Connect With Us</h2>
                        <p className="text-blue-100/80 font-dynapuff">Follow us on social media to stay updated with our latest news and events.</p>
                      </div>

                      <div className="space-y-4">
                        {/* Schedule Meeting Button */}
                        <div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-dynapuff font-medium transition-all hover:shadow-lg hover:from-blue-500 hover:to-blue-700 flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-5 h-5" />
                            <span>Schedule a Meeting</span>
                          </motion.button>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-blue-800/30 text-white rounded-lg font-dynapuff font-medium transition-all hover:bg-blue-800/50 flex items-center justify-center gap-2"
                          >
                            <Facebook className="w-5 h-5" />
                            <span>Facebook</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-blue-800/30 text-white rounded-lg font-dynapuff font-medium transition-all hover:bg-blue-800/50 flex items-center justify-center gap-2"
                          >
                            <Instagram className="w-5 h-5" />
                            <span>Instagram</span>
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