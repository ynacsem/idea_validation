'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lightbulb } from 'lucide-react'

export default function Header() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Generate random chart data
    const newChartData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
    setChartData(newChartData)

    // Animate chart data every 3 seconds
    const interval = setInterval(() => {
      setChartData(prevData => 
        prevData.map(value => Math.max(0, Math.min(100, value + Math.floor(Math.random() * 21) - 10)))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="relative px-4 lg:px-6 h-20 flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="text-yellow-200">
          <path d={`M0,50 ${chartData.map((value, index) => `L${index * 5},${100 - value}`).join(' ')}`} fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <Link className="flex items-center justify-center z-10 transition-transform hover:scale-105" href="#">
        <Lightbulb className="h-8 w-8 text-yellow-500" />
        <span className="ml-2 text-xl font-bold text-gray-900">Quick Idea Validation</span>
      </Link>
      
    </header>
  )
}
