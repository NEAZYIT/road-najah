'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import BlurFade from '@/components/ui/blur-fade'
import { useRef } from 'react'

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.8
      }
    }
  }

  return (
    <motion.div 
      ref={sectionRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/90" />
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <div className="w-[1000px] h-[500px] bg-pink-300/20 blur-[100px] rounded-full" />
          </div>
          <div className="absolute -top-4 left-32 w-[400px] h-[400px] z-20">
            <div className="w-[500px] h-[500px] inset-0 bg-orange-300/50 rounded-full blur-[180px]" />
          </div>
          <div className="absolute top-8 right-60 w-[400px] h-[400px] z-20">
            <div className="w-[500px] h-[500px] inset-0 bg-blue-300/50 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: -50, opacity: 0, rotate: 0 }}
            animate={{ y: 0, opacity: 1, rotate: 360 }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              rotate: { duration: 1.5, ease: "easeInOut" }
            }}
            className="mb-12"
          >
            <Image
              src="/images/road-logo.png"
              alt="Road a Najah Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </motion.div>

          <div className="text-center max-w-4xl mx-auto">
            <BlurFade delay={0.2} inView>
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gray-900 mb-4 font-dynapuff inline-flex">
                <span>Empower</span>
                <span className="ml-4">your</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.4} inView>
              <div className="flex items-center justify-center relative mb-12">
                <div className="flex items-baseline">
                  <span className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gray-900 font-dynapuff">
                    Education
                  </span>
                  <span className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gray-900 ml-4 font-dynapuff">
                    with
                  </span>
                </div>

                <div className="absolute top-20 -right-32 transform -rotate-12">
                  <motion.svg
                    width="710"
                    height="600"
                    viewBox="-1250 0 1600 900"
                    className="absolute -left-72 -top-24 z-10"
                    initial="hidden"
                    animate="visible"
                  >
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="8"
                        refY="3.5"
                        orient="auto-start-reverse"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
                      </marker>
                    </defs>
                    <motion.path
                      d="M100,100 C250,100 300,200 250,300 S100,200 250,200 S600,900 -1120,700 C-1200,700 -1200,690 -1240,810"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd="url(#arrowhead)"
                      variants={pathVariants}
                      className="filter drop-shadow-sm"
                    />
                  </motion.svg>

                  <motion.div
                    initial={{ 
                      y: 30,
                      opacity: 0,
                      scale: 0.9,
                      rotate: 25
                    }}
                    animate={{ 
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.23, 1, 0.32, 1],
                      opacity: { duration: 0.8 },
                      scale: { duration: 1 },
                      rotate: { duration: 1.4 }
                    }}
                  >
                    <span className="inline-block bg-blue-400 px-6 py-6 rounded-full text-white text-3xl md:text-4xl lg:text-5xl font-modak shadow-lg">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 0.6,
                          delay: 0.3,
                          ease: "easeOut"
                        }}
                      >
                        Road a Najah
                      </motion.span>
                    </span>
                  </motion.div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <div className="text-left max-w-xl ml-0 mt-8">
                <p className="text-yellow-800 text-xl leading-relaxed font-modak">
                  Join our educational platform and discover your path to success. 
                  Connect with expert mentors, access quality resources, and receive 
                  personalized guidance to achieve your academic goals
                </p>
              </div>
            </BlurFade>

            <motion.div 
              className="absolute left-[580px] top-[980px] transform -rotate-12"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                y: [0, -8, 0] 
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <p className="text-gray-600 font-modak text-lg">Scroll to see our mission</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSection