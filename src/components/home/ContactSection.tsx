"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const ContactSection = () => {
  const [showContact, setShowContact] = useState(false);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const testimonials = [
    {
      quote: "Wtg3aaaaaaaaad haaaaaaaaa lgragi",
      name: "Nordin chinwi",
      designation: "Product Manager",
      src: "/images/testimonial1.jpg",
    },
    {
      quote: "lyoum l7ad ahhh 8 3id 7ob  ahhh",
      name: "tmania",
      designation: "CTO",
      src: "/images/testimonial2.jpg",
    },
    {
      quote: "whiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
      name: "ANAS",
      designation: "Mol chi",
      src: "/images/testimonial3.jpg",
    },
    // tzid testimonials khra...
  ];

  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEventComplete = (event) => {
      const direction = event.detail?.direction || "forward";

      if (direction === "forward") {
        setShowContact(true);
        document.body.style.setProperty("--header-visibility", "visible");
      } else {
        setShowContact(false);
      }
    };

    window.addEventListener("eventComplete", handleEventComplete);
    return () =>
      window.removeEventListener("eventComplete", handleEventComplete);
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
        mass: 1,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
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
              className="absolute inset-0 bg-black/100"
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
                  className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
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
                  className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-400 text-white [--conic-position:from_290deg_at_center_top]"
                >
                  <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 [mask-image:linear-gradient(to_left,white,transparent)]" />
                  <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>
                <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
                <div className="absolute top-1/2 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                <div className="absolute inset-auto h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-400 opacity-50 blur-3xl"></div>
                <motion.div
                  initial={{ width: "8rem" }}
                  whileInView={{ width: "16rem" }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-auto h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-300 blur-2xl"
                ></motion.div>
                <motion.div
                  initial={{ width: "15rem" }}
                  whileInView={{ width: "30rem" }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-auto h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-300"
                ></motion.div>
              </div>
            </div>

            {/* Contact Card - Positioned on Right Side */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-full max-w-3xl z-[102]">
              {/* Testimonials - Updated styling for better visibility */}
              <div className="absolute right-[120%] top-1/2 -translate-y-1/2 w-[500px]">
                <motion.div
                  className="bg-gradient-to-br  rounded-3xl shadow-2xl overflow-hidden   p-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-content-wrapper">
                    <style jsx>{`
                      .text-content-wrapper :global(.text-gray-500) {
                        color: white !important;
                        opacity: 0.9;
                      }
                      .text-content-wrapper :global(.text-2xl) {
                        color: #f97316 !important; /* Orange color b7al headers dyalk */
                        text-shadow: 0 0 8px rgba(251, 146, 60, 0.3);
                      }
                      .text-content-wrapper :global(.text-sm) {
                        color: #22d3ee !important; /* Cyan color b7al icons dyalk */
                        opacity: 0.8;
                      }
                    `}</style>
                    <AnimatedTestimonials
                      testimonials={testimonials}
                      autoplay={true}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="bg-gradient-to-br from-cyan-900/80 to-cyan-950/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden h-[32rem] border border-cyan-500/30"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative p-8">
                  {/* Decorative Gradient Effects */}
                  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-400/10 to-cyan-600/10 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-cyan-400/20 to-cyan-600/10 blur-3xl" />

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
                        <h2 className="text-2xl font-dynapuff font-semibold text-orange-500 mb-3 drop-shadow-[0_0_8px_rgba(251,146,60,0.3)]">
                          Contact Information
                        </h2>
                        <p className="text-white/90 font-dynapuff">
                          Get in touch with our dedicated team for assistance
                          and inquiries.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Email Section */}
                        <div className="text-white/90">
                          <div className="font-dynapuff font-medium mb-2 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-cyan-300" />
                            <span>Email</span>
                          </div>
                          <p className="text-white font-dynapuff ml-7">
                            contact@company.com
                          </p>
                        </div>

                        {/* Phone Section */}
                        <div className="text-white/90">
                          <div className="font-dynapuff font-medium mb-2 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-cyan-300" />
                            <span>Phone</span>
                          </div>
                          <p className="text-white font-dynapuff ml-7">
                            +1 (555) 123-4567
                          </p>
                        </div>

                        {/* Address Section */}
                        <div className="text-white/90">
                          <div className="font-dynapuff font-medium mb-2 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-cyan-300" />
                            <span>Address</span>
                          </div>
                          <p className="text-white font-dynapuff ml-7">
                            123 La cigogne
                            <br />
                            Kenitra
                          </p>
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
                        <h2 className="text-2xl font-dynapuff font-semibold text-orange-500 mb-3 drop-shadow-[0_0_8px_rgba(251,146,60,0.3)]">
                          Connect With Us
                        </h2>
                        <p className="text-white/90 font-dynapuff">
                          Follow us on social media to stay updated with our
                          latest news and events.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Logo Display */}
                        <div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-6  rounded-lg flex items-center justify-center gap-2 "
                          >
                            <Image
                              src="/images/road-logo.png"
                              alt="Road Logo"
                              width={240} // 3tina width w height specific bach Next.js y optimizi image
                              height={240}
                              className="h-40 w-auto object-contain"
                            />
                          </motion.div>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-cyan-400/20 text-white rounded-lg font-dynapuff font-medium transition-all hover:bg-cyan-400/30 flex items-center justify-center gap-2 border border-cyan-400/30 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]"
                          >
                            <Facebook className="w-5 h-5" />
                            <span>Facebook</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="py-3 px-6 bg-cyan-400/20 text-white rounded-lg font-dynapuff font-medium transition-all hover:bg-cyan-400/30 flex items-center justify-center gap-2 border border-cyan-400/30 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]"
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
