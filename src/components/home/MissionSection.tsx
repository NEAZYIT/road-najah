'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import BlurFade from "@/components/ui/blur-fade"
import SparklesText from "@/components/ui/sparkles-text"
import DotPattern from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"

const images = Array.from({ length: 6 }, (_, i) => {
    const isLandscape = i % 2 === 0;
    const width = isLandscape ? 800 : 600;
    const height = isLandscape ? 600 : 800;
    return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

const MissionSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [hovered, setHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    
    // Adjusted scroll configuration for delayed appearance
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Mouse spring configuration
    const dotX = useSpring(mouseX, { 
        stiffness: 150, 
        damping: 15,
        mass: 0.5 
    })
    
    const dotY = useSpring(mouseY, { 
        stiffness: 150, 
        damping: 15,
        mass: 0.5
    })

    // Adjusted transform ranges for more gradual appearance
    const yPos = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6],  // Increased range for more gradual transition
        ["100%", "80%", "40%", "0%"]
    )
    
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.5],  // Delayed fade-in
        [0, 0.3, 1]
    )
    
    const scale = useTransform(
        scrollYProgress,
        [0, 0.4],  // Slower scale up
        [0.8, 1]
    )

    // Smoother spring configuration
    const springConfig = { 
        stiffness: 40,  // Reduced stiffness for slower movement
        damping: 25,    // Increased damping for smoother motion
        mass: 1.5       // Increased mass for more weight to the movement
    }

    const smoothY = useSpring(yPos, springConfig)
    const smoothOpacity = useSpring(opacity, springConfig)
    const smoothScale = useSpring(scale, springConfig)

    // Track scroll position for visibility
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (latest > 0.1) {  // Start showing content earlier but animate slower
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        })

        return () => unsubscribe()
    }, [scrollYProgress])

    // Mouse move handler
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const offsetX = (e.clientX - window.innerWidth / 2) * (hovered ? 0.08 : 0.03)
            const offsetY = (e.clientY - window.innerHeight / 2) * (hovered ? 0.08 : 0.03)
            mouseX.set(offsetX)
            mouseY.set(offsetY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY, hovered])

    return (
        <div className="relative overflow-hidden">
            <motion.div 
                ref={sectionRef}
                style={{ 
                    y: smoothY,
                    opacity: smoothOpacity,
                    scale: smoothScale,
                    transformOrigin: "center",
                }}
                className="min-h-screen bg-white/90 relative"
            >
                <motion.div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        x: dotX,
                        y: dotY,
                    }}
                    className="absolute inset-0"
                >
                    <DotPattern 
                        width={30}
                        height={30}
                        cx={1.2}
                        cy={1.2}
                        cr={1.2}
                        className={cn(
                            "opacity-70 absolute inset-0 z-0",
                            "transition-all duration-500",
                            hovered ? "opacity-90 scale-105" : "opacity-70 scale-100",
                            "motion-reduce:transform-none"
                        )}
                    />
                    
                    <motion.div 
                        style={{
                            x: useSpring(mouseX, { stiffness: 100, damping: 30 }),
                            y: useSpring(mouseY, { stiffness: 100, damping: 30 }),
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 mix-blend-overlay pointer-events-none"
                    />
                </motion.div>

                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-[1000px] h-[500px] bg-pink-300/20 blur-[100px] rounded-full" />
                    </div>

                    <div className="absolute -left-1/4 -top-1/4 w-[150vw] h-[150vh]">
                        <div className="w-full h-full bg-blue-300/30 blur-[230px] rounded-full transform scale-110" />
                    </div>

                    <div className="absolute -right-20 top-0 w-[800px] h-screen">
                        <div className="w-full h-full bg-orange-300/50 blur-[200px] rounded-l-full" />
                    </div>
                </div>

                <div className="relative h-screen px-8 z-10">
                    <div className="flex flex-col items-start justify-start pt-20 max-w-7xl mx-auto">
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={isVisible ? { 
                                y: 0, 
                                opacity: 1,
                                transition: {
                                    duration: 1.2,
                                    delay: 0.3,
                                    ease: [0.16, 1, 0.3, 1]
                                }
                            } : { y: 50, opacity: 0 }}
                            className="self-center mb-20"
                        >
                            <div className="font-bold text-gray-800 font-dynapuff scale-150 transform-gpu">
                                <SparklesText 
                                    text="Our Mission" 
                                    className="!text-8xl sm:!text-7xl"
                                    sparklesCount={15}
                                    colors={{ first: "#FE8BBB", second: "#9E7AFF" }}
                                />
                            </div>
                        </motion.div>
                        
                        <div className="flex flex-row justify-between items-start w-full mb-32">
                            <motion.p 
                                initial={{ y: 50, opacity: 0 }}
                                animate={isVisible ? {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 1,
                                        delay: 0.5,
                                        ease: [0.16, 1, 0.3, 1]
                                    }
                                } : { y: 50, opacity: 0 }}
                                className="text-xl text-orange-800 max-w-lg text-left leading-relaxed pl-0 font-dynapuff mt-16"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </motion.p>

                            <div className="pl-32">
                                <BlurFade>
                                    <section id="photos" className="w-[400px]">
                                        <div className="flex flex-col gap-8">
                                            <div className="flex gap-6 justify-end">
                                                <BlurFade delay={0.6}>
                                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                                        <img
                                                            className="w-40 h-40 object-cover transform hover:scale-105 transition-transform duration-300"
                                                            src={images[0]}
                                                            alt="Image 1"
                                                        />
                                                    </div>
                                                </BlurFade>
                                                <BlurFade delay={0.7}>
                                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-12">
                                                        <img
                                                            className="w-40 h-40 object-cover transform hover:scale-105 transition-transform duration-300"
                                                            src={images[1]}
                                                            alt="Image 2"
                                                        />
                                                    </div>
                                                </BlurFade>
                                            </div>
                                            
                                            <div className="flex gap-6 justify-end -mt-4">
                                                <BlurFade delay={0.8}>
                                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ml-12">
                                                        <img
                                                            className="w-40 h-40 object-cover transform hover:scale-105 transition-transform duration-300"
                                                            src={images[2]}
                                                            alt="Image 3"
                                                        />
                                                    </div>
                                                </BlurFade>
                                                <BlurFade delay={0.9}>
                                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
                                                        <img
                                                            className="w-40 h-40 object-cover transform hover:scale-105 transition-transform duration-300"
                                                            src={images[3]}
                                                            alt="Image 4"
                                                        />
                                                    </div>
                                                </BlurFade>
                                            </div>
                                        </div>
                                    </section>
                                </BlurFade>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default MissionSection