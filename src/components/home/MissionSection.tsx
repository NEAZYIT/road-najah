// components/home/MissionSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MissionSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    })
  
    // Enhanced transform values for 3D effect
    const yPos = useTransform(scrollYProgress, [0.8, 1], ["100%", "0%"])
    const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])
    const scale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1])
    const rotateX = useTransform(scrollYProgress, [0.8, 1], [15, 0])
    const perspective = useTransform(scrollYProgress, [0.8, 1], [800, 1000])

    return (
        <div className="relative overflow-hidden">
            <motion.div 
                ref={sectionRef}
                style={{ 
                    y: yPos,
                    opacity,
                    scale,
                    rotateX,
                    perspective,
                    transformOrigin: "bottom",
                }}
                className="min-h-screen bg-gradient-to-br from-white to-blue-50 relative"
            >
                {/* Top edge shadow for 3D effect */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
                
                {/* Content container with inner shadow */}
                <div className="relative h-screen shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-4xl">Mission Section</h1>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default MissionSection