"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  imagePath: string
  detailedDescription: string
}

interface CategoryData {
  id: string
  title: string
  subtitle: string
  gradient: string
  hoverGradient: string
  icon: React.ElementType
  features: Feature[]
}

interface FeatureDetailModalProps {
  isOpen: boolean
  onClose: () => void
  category: CategoryData | null
  defaultFeatureIndex?: number
}

export function FeatureDetailModal({ isOpen, onClose, category, defaultFeatureIndex = 0 }: FeatureDetailModalProps) {
  const [activeFeature, setActiveFeature] = useState(defaultFeatureIndex)

  useEffect(() => {
    if (isOpen) {
      setActiveFeature(defaultFeatureIndex)
    }
  }, [isOpen, defaultFeatureIndex])

  if (!category) return null

  const CategoryIcon = category.icon
  const currentFeature = category.features[activeFeature]

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-0">
            {/* Header with gradient background */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 p-4 flex items-center justify-between sticky top-0 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CategoryIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-white">
                    {category.title}
                  </DialogTitle>
                  <p className="text-white/90 text-xs">{category.subtitle}</p>
                </div>
              </div>
              <DialogClose className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </DialogClose>
            </motion.div>

            {/* Content */}
            <div className="p-4">
              {/* Feature Selection Tabs */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 font-medium mb-3">Select a feature to learn more:</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="grid grid-cols-3 sm:grid-cols-6 gap-2"
                >
                  {category.features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`flex flex-col items-center gap-1.5 px-2 py-2 rounded-lg border transition-all ${
                        activeFeature === index
                          ? "border-cyan-500 bg-cyan-50 text-cyan-600"
                          : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <feature.icon className="w-4 h-4" />
                      <span className="text-[10px] font-medium text-center line-clamp-2 leading-tight">{feature.title}</span>
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Feature Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Feature Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative w-full h-[200px] sm:h-[250px] rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={currentFeature.imagePath}
                      alt={currentFeature.title}
                      fill
                      className="object-cover"
                      priority={false}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/placeholder.png'
                      }}
                    />
                  </motion.div>

                  {/* Feature Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="space-y-3"
                  >
                    {/* Title with Icon */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <currentFeature.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{currentFeature.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {currentFeature.detailedDescription}
                    </p>

                    {/* Quick Benefits */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-100">
                      <p className="text-xs font-semibold text-gray-900 mb-2">Key Benefits:</p>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-cyan-500 font-bold mt-0.5">✓</span>
                          <span>Streamlined workflow and improved efficiency</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-cyan-500 font-bold mt-0.5">✓</span>
                          <span>Real-time insights and data-driven decisions</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-cyan-500 font-bold mt-0.5">✓</span>
                          <span>Enhanced accuracy and compliance tracking</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Feature Counter */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">
                      Feature {activeFeature + 1} of {category.features.length}
                    </p>
                    <div className="flex gap-1">
                      {category.features.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveFeature(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            i === activeFeature ? 'bg-cyan-500' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
