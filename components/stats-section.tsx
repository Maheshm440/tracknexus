"use client"

import { motion, useInView } from "framer-motion"
import { BarChart3, Users, Globe } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const stats = [
  {
    icon: BarChart3,
    number: 3000,
    suffix: "+",
    label: "Clients",
  },
  {
    icon: Users,
    number: 100000,
    suffix: "+",
    label: "Users",
  },
  {
    icon: Globe,
    number: 10,
    suffix: "+",
    label: "Countries",
  },
]

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Counter component for animated numbers
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * target)
        
        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, target, duration])

  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return (num / 1000).toLocaleString() + ",000"
    }
    return num.toLocaleString()
  }

  return (
    <span ref={ref} className="text-2xl lg:text-3xl font-bold">
      {formatNumber(count)}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative bg-gray-900 rounded-2xl p-8 lg:p-12 text-white overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Geometric lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path
                  d="M0,100 L100,50 L200,120 L300,30 L400,80"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.3"
                />
                <path
                  d="M0,150 L150,100 L250,160 L400,120"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.2"
                />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            {/* Main Heading */}
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Transform Your Time into Value</h2>
              <p className="text-lg lg:text-xl text-gray-300">Time. Productivity. Monitoring. Tasks.</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div key={stat.label} className="text-center" variants={fadeInUp}>
                  <div className="flex items-center justify-center mb-4">
                    <stat.icon className="w-8 h-8 text-white mr-3" />
                    <AnimatedCounter 
                      target={stat.number} 
                      suffix={stat.suffix}
                      duration={2000 + index * 200} // Slightly stagger the animations
                    />
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
