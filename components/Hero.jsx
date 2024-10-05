'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import IdeaValidationModal from './IdeaValidationModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0.5, 1, 0.5],
      transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
    })
  }, [controls])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative w-full flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden shadow-md min-h-[90vh] ">
      {/* Background design */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-red-50 opacity-70"></div>
        <motion.div 
          className="absolute inset-0"
          animate={controls}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-yellow-300 opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-screen-lg text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.div className="space-y-2" variants={item}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
              Illuminate Your <span className="text-yellow-500 animate-pulse">Ideas</span> in Minutes
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Turn your bright concepts into reality with our Quick Idea Validation Tool. Get instant feedback and make informed decisions.
            </p>
          </motion.div>
          <motion.div className="space-x-4" variants={item}>
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
          </motion.div>
        </div>
      </motion.div>

      <IdeaValidationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
