'use client'

import { motion } from 'framer-motion'
import { Zap, Target, Lightbulb } from 'lucide-react'

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

export default function Features() {
  return (
    <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-screen-lg px-4 md:px-6">
        <motion.div 
          className="grid gap-6 lg:grid-cols-3 lg:gap-12 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Quick Validation"
            description="Validate your ideas in minutes, not days. Get instant feedback to refine your concept."
            bgColor="bg-yellow-100"
            hoverBgColor="bg-yellow-200"
            hoverTextColor="text-yellow-600"
          />
          <FeatureCard
            icon={<Target className="h-6 w-6 text-red-500" />}
            title="Market Insights"
            description="Gain valuable market insights to understand your target audience and potential demand."
            bgColor="bg-red-100"
            hoverBgColor="bg-red-200"
            hoverTextColor="text-red-600"
          />
          <FeatureCard
            icon={<Lightbulb className="h-6 w-6 text-yellow-500" />}
            title="Idea Refinement"
            description="Refine and improve your ideas based on data-driven insights and expert suggestions."
            bgColor="bg-yellow-100"
            hoverBgColor="bg-yellow-200"
            hoverTextColor="text-yellow-600"
          />
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description, bgColor, hoverBgColor, hoverTextColor }) {
  return (
    <motion.div className="flex flex-col items-center space-y-4 text-center group" variants={item}>
      <div className={`rounded-full ${bgColor} p-3 transition-colors duration-200 group-hover:${hoverBgColor}`}>
        {icon}
      </div>
      <h2 className={`text-xl font-bold text-gray-900 group-hover:${hoverTextColor} transition-colors duration-200`}>
        {title}
      </h2>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
        {description}
      </p>
    </motion.div>
  )
}
