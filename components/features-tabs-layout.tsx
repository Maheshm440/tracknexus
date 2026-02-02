"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { useState } from "react"

interface FeatureDetail {
  title: string
  description: string
  icon?: LucideIcon
}

interface Category {
  id: string
  title: string
  icon: LucideIcon
  description: string
  features: FeatureDetail[]
}

interface FeaturesTabsLayoutProps {
  categories: Category[]
}

export function FeaturesTabsLayout({ categories }: FeaturesTabsLayoutProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "")

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 lg:py-16">

        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mb-4 border border-cyan-200/30">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">
              AI-Powered Features
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Enterprise-Grade <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">Time Tracking</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive workforce management solutions designed for modern teams
          </p>
        </motion.div>

        {/* Horizontal Tabs Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center justify-center gap-3 p-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = category.id === activeCategory

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Background with Gradient */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl shadow-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10">
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-cyan-600"}`} />
                  </div>

                  {/* Text */}
                  <span className="relative z-10 whitespace-nowrap">{category.title}</span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Mobile Tabs - Scrollable */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 p-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 min-w-max">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = category.id === activeCategory

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabMobile"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl shadow-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-cyan-600"}`} />
                    </div>

                    <span className="relative z-10">{category.title}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Content Area with Glassmorphism */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Header Card */}
            <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden mb-6">
              {/* Gradient Top Border */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>

              {/* Header Content */}
              <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur-xl opacity-50"></div>

                      {/* Icon Container */}
                      <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                        {currentCategory && (
                          <currentCategory.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2.5} />
                        )}

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-2xl"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <motion.h2
                      className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentCategory?.title}
                    </motion.h2>
                    <motion.p
                      className="text-base lg:text-lg text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentCategory?.description}
                    </motion.p>
                  </div>

                  {/* Decorative Element */}
                  <div className="hidden lg:block">
                    <div className="flex flex-col gap-2">
                      <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                      <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full ml-auto"></div>
                      <div className="w-8 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {currentCategory?.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-6 lg:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 via-blue-50/0 to-cyan-50/0 group-hover:from-cyan-50/80 group-hover:via-blue-50/50 group-hover:to-cyan-50/80 transition-all duration-500 rounded-2xl"></div>

                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-sm"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Title with Icon */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600"></div>
                        </div>

                        <h3 className="flex-1 text-lg lg:text-xl font-bold text-gray-900 leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                          {feature.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Decorative Corner Elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400/30 group-hover:bg-cyan-500 group-hover:scale-150 transition-all duration-300"></div>
                      <div className="absolute bottom-4 right-4 flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-blue-300/40 group-hover:bg-blue-500 transition-all duration-300"></div>
                        <div className="w-1 h-1 rounded-full bg-cyan-300/40 group-hover:bg-cyan-500 transition-all duration-300 delay-75"></div>
                      </div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Ready to transform your workflow?
                  </h3>
                  <p className="text-cyan-50 text-base lg:text-lg">
                    Discover how these features can boost your team's productivity
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap"
                >
                  Start Free Trial
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Add custom animation for shine effect */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
