'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Lightbulb, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Generate random chart data
    const newChartData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
    setChartData(newChartData)

    // Animate chart data every 3 seconds
    const interval = setInterval(() => {
      setChartData(prevData => 
        prevData.map(
          value => Math.max(0, Math.min(100, value + Math.floor(Math.random() * 21) - 10))
        ))
    }, 3000)

    return () => clearInterval(interval);
  }, [])

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
    (<div
      className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-50 via-white to-red-50">
      <header className="relative px-4 lg:px-6 h-20 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="text-yellow-200">
            <path
              d={`M0,50 ${chartData.map((value, index) => `L${index * 5},${100 - value}`).join(' ')}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2" />
          </svg>
        </div>
        <Link
          className="flex items-center justify-center z-10 transition-transform hover:scale-105"
          href="#">
          <Lightbulb className="h-8 w-8 text-yellow-500" />
          <span className="ml-2 text-xl font-bold text-gray-900">Quick Idea Validation</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 z-10">
          <Link
            className="text-sm font-medium hover:text-yellow-600 transition-colors duration-200"
            href="#">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-yellow-600 transition-colors duration-200"
            href="#">
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-yellow-600 transition-colors duration-200"
            href="#">
            About
          </Link>
          <Link
            className="text-sm font-medium hover:text-yellow-600 transition-colors duration-200"
            href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <motion.div
            className="container px-4 md:px-6"
            variants={container}
            initial="hidden"
            animate="show">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2" variants={item}>
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Illuminate Your <span className="text-yellow-500 animate-pulse">Ideas</span> in Minutes
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Turn your bright concepts into reality with our Quick Idea Validation Tool. Get instant feedback and make informed decisions.
                </p>
              </motion.div>
              <motion.div className="space-x-4" variants={item}>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200 transform hover:scale-105">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex items-center justify-center border-yellow-500 text-yellow-500 hover:bg-yellow-50 transition-colors duration-200 transform hover:scale-105">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-3 lg:gap-12"
              variants={container}
              initial="hidden"
              animate="show">
              <motion.div
                className="flex flex-col items-center space-y-4 text-center group"
                variants={item}>
                <div
                  className="rounded-full bg-yellow-100 p-3 transition-colors duration-200 group-hover:bg-yellow-200">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <h2
                  className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">Quick Validation</h2>
                <p
                  className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Validate your ideas in minutes, not days. Get instant feedback to refine your concept.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-4 text-center group"
                variants={item}>
                <div
                  className="rounded-full bg-red-100 p-3 transition-colors duration-200 group-hover:bg-red-200">
                  <Target className="h-6 w-6 text-red-500" />
                </div>
                <h2
                  className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">Market Insights</h2>
                <p
                  className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Gain valuable market insights to understand your target audience and potential demand.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-4 text-center group"
                variants={item}>
                <div
                  className="rounded-full bg-yellow-100 p-3 transition-colors duration-200 group-hover:bg-yellow-200">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />
                </div>
                <h2
                  className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">Idea Refinement</h2>
                <p
                  className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Refine and improve your ideas based on data-driven insights and expert suggestions.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Validate Your Idea</DialogTitle>
            <DialogDescription>
              Enter your idea below and we'll help you validate it quickly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idea-title" className="text-right">
                Title
              </Label>
              <Input
                id="idea-title"
                className="col-span-3"
                placeholder="Enter a short title for your idea" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idea-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="idea-description"
                className="col-span-3"
                placeholder="Describe your idea in detail" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200">Validate Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>)
  );
}