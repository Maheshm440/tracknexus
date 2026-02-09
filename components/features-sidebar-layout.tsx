"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { useState } from "react"

interface FeatureDetail {
  title: string
  description: string
}

interface Category {
  id: string
  title: string
  icon: LucideIcon
  description: string
  features: FeatureDetail[]
}

interface FeaturesSidebarLayoutProps {
  categories: Category[]
}

export function FeaturesSidebarLayout({ categories }: FeaturesSidebarLayoutProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "")

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = category.id === activeCategory

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 text-left ${
                      isActive
                        ? "bg-deloitte-green text-white shadow-lg"
                        : "bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white/80 hover:border-deloitte-green/30 hover:shadow-md"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-white/20" : "bg-gray-100"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-deloitte-green"}`} />
                    </div>
                    <span className="text-sm font-medium">{category.title}</span>
                  </motion.button>
                )
              })}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/40 backdrop-blur-md border border-gray-200/30 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border-b border-gray-200/30 p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-deloitte-green to-deloitte-green-dark flex items-center justify-center shadow-lg">
                      {currentCategory && (
                        <currentCategory.icon className="w-7 h-7 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                      {currentCategory?.title}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {currentCategory?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {currentCategory?.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group relative bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-xl p-5 hover:bg-white/80 hover:border-deloitte-green/30 hover:shadow-md transition-all duration-200"
                    >
                      {/* Subtle gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-deloitte-green/0 to-deloitte-green/0 group-hover:from-deloitte-green/5 group-hover:to-transparent rounded-xl transition-all duration-200" />

                      <div className="relative">
                        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-deloitte-green transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Decorative corner dot */}
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-deloitte-green transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer CTA (optional) */}
              <div className="bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm border-t border-gray-200/30 p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Want to learn more about these features?
                  </p>
                  <button className="px-6 py-2.5 bg-deloitte-green hover:bg-deloitte-green-dark text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    Explore in detail
                  </button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
