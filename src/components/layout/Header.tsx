'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Home, Info, Calendar, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed w-full top-0 z-50  backdrop-blur-[2px]  bg-gradient-to-r from-orange-300/10 via-white/20 to-blue-300/10  "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <Image
                  src="/images/road-logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-gray-800 hover:text-blue-600 px-3 py-2 text-base font-dynapuff transition-colors duration-200 group flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Sign In Button */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex"
            >
              <Button 
                className="
                  font-dynapuff
                  bg-blue-600 text-white
                  before:bg-blue-400/20
                  transform-gpu
                  shadow-blue-800/50
                  hover:bg-blue-500
                  active:bg-blue-700
                  backdrop-blur-sm
                "
              >
                join us
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:hidden"
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-md bg-white/30"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-base font-dynapuff text-gray-700 hover:text-blue-600 hover:bg-white/20 rounded-md flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <div className="mt-4">
                <Button className="w-full bg-blue-600/80 hover:bg-blue-700 text-white backdrop-blur-sm font-dynapuff">
                  join us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  )
}

export default Header