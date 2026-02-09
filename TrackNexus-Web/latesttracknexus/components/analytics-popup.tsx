"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, Users, DollarSign, Activity, Calendar, ArrowUp, ArrowDown, Eye, MousePointer } from "lucide-react"

interface AnalyticsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function AnalyticsPopup({ isOpen, onClose }: AnalyticsPopupProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  const analyticsData = {
    overview: [
      { label: "Total Users", value: "12,543", change: "+12.5%", trend: "up", icon: Users },
      { label: "Revenue", value: "$48,291", change: "+8.2%", trend: "up", icon: DollarSign },
      { label: "Active Sessions", value: "3,847", change: "-2.4%", trend: "down", icon: Activity },
      { label: "Conversion Rate", value: "4.8%", change: "+0.6%", trend: "up", icon: TrendingUp },
    ],
    charts: [
      { title: "User Growth", data: [65, 78, 90, 81, 96, 105, 112] },
      { title: "Revenue Trend", data: [28, 48, 40, 59, 76, 67, 90] },
    ],
    topPages: [
      { page: "/dashboard", views: "3,247", change: "+15%" },
      { page: "/analytics", views: "2,891", change: "+8%" },
      { page: "/reports", views: "1,456", change: "-3%" },
      { page: "/settings", views: "987", change: "+2%" },
    ]
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                    <p className="text-blue-100">Real-time performance metrics</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Period Selector */}
              <div className="flex gap-2">
                {['24h', '7d', '30d', '90d'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-white text-blue-600'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {period === '24h' ? '24 Hours' : period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {analyticsData.overview.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {analyticsData.charts.map((chart, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{chart.title}</h3>
                    <div className="h-40 flex items-end justify-between gap-2">
                      {chart.data.map((value, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${value}%` }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                          style={{ height: `${value}%` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Top Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Top Pages
                </h3>
                <div className="space-y-3">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <MousePointer className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{page.page}</p>
                          <p className="text-sm text-gray-500">{page.views} views</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        page.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {page.change}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
