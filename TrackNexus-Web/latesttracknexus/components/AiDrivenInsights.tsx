"use client"

import { useState } from "react"

interface InsightFeature {
  id: string
  title: string
  description: string
  videoSrc: string
}

const features: InsightFeature[] = [
  {
    id: "focus-levels",
    title: "AI-tagged focus levels",
    description:
      "Track Nexus uses AI to evaluate user activity and tag focus levels as high, medium, or low. This gives you quick insight into concentration patterns and productivity trends.",
    videoSrc: "/placeholder.svg?height=400&width=600&text=Focus+Levels+Video",
  },
  {
    id: "idle-detection",
    title: "Smart idle detection",
    description:
      "Advanced algorithms automatically detect when users are away from their workstation, providing accurate time tracking and eliminating manual clock-in/out processes.",
    videoSrc: "/placeholder.svg?height=400&width=600&text=Idle+Detection+Video",
  },
  {
    id: "productivity-scoring",
    title: "Productivity Scoring",
    description:
      "Get comprehensive productivity scores based on application usage, task completion rates, and work patterns to identify optimization opportunities.",
    videoSrc: "/placeholder.svg?height=400&width=600&text=Productivity+Scoring+Video",
  },
  {
    id: "behavior-alerts",
    title: "Behavior-based alerts",
    description:
      "Receive intelligent notifications about unusual work patterns, extended idle times, or productivity dips to maintain optimal team performance.",
    videoSrc: "/placeholder.svg?height=400&width=600&text=Behavior+Alerts+Video",
  },
]

export default function AIInsights() {
  const [activeFeature, setActiveFeature] = useState(features[0])
  const [hoveredFeature, setHoveredFeature] = useState<InsightFeature | null>(null)

  const currentFeature = hoveredFeature || activeFeature

  return (
    <div className="min-h-screen  py-16 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">AI-Driven Insights by Track Nexus</h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Gain real-time visibility into team productivity, task efficiency, and work patterns with intelligent,
            AI-driven performance tracking
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Left Side - Feature Buttons */}
          <div className="space-y-4 w-[30%]">
            {features.map((feature) => {
              const isActive = currentFeature.id === feature.id
              const isHovered = hoveredFeature?.id === feature.id

              return (
                <div
                  key={feature.id}
                  className="relative"
                  onMouseEnter={() => setHoveredFeature(feature)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <button
                    className="relative w-full h-20 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setActiveFeature(feature)}
                    style={{
                      backgroundImage: `url(${
                        isActive || isHovered ? "/images/activity-logs/hover.png" : "/images/activity-logs/normal.png"
                      })`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Text overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`font-semibold text-xs transition-colors duration-300 ${
                          isActive || isHovered ? "text-white" : "text-blue-600"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Right Side - Video Content */}
          <div className="bg-white rounded-2xl p-8 shadow-xl w-[70%]">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-600 rounded-xl mb-6 overflow-hidden relative">
              {/* Placeholder for video - replace with actual video element */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={currentFeature.videoSrc || "/placeholder.svg"}
                  alt={`${currentFeature.title} demonstration`}
                  className="w-full h-full object-cover"
                />
                {/* Video overlay effect */}
                <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                    <p className="text-sm opacity-80">Video: {currentFeature.title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Description */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed text-sm">{currentFeature.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
