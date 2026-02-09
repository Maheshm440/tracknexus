"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, TrendingUp, Eye, Users, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "time-tracking",
    title: "Time Tracking & Billing",
    icon: Clock,
    description: "Ensures precise tracking of work hours to avoid manual errors and improve payroll accuracy.",
    features: [
      { title: "Time Tracking", description: "Accurately track employee hours, automatically or manually" },
      { title: "Timeline & Routes", description: "See daily logs and GPS routes of activities" },
      { title: "Activity Logs", description: "Keep detailed logs of time entries, breaks, and sessions" },
      { title: "Task Tracking", description: "Track time per task to assess productivity and balance workload" },
      { title: "Time & Billing", description: "Turn tracked hours into billable entries for invoicing and payroll" },
      { title: "Invoice Generation", description: "Create detailed invoices based on tracked time" },
    ],
  },
  {
    id: "productivity",
    title: "Productivity & Performance",
    icon: TrendingUp,
    description: "Boost efficiency with intelligent insights",
    features: [
      { title: "Performance Analytics", description: "Real-time dashboards showing team productivity metrics" },
      { title: "Productivity Scoring", description: "AI-powered productivity scores based on activity patterns" },
      { title: "AI Insights", description: "Smart recommendations to improve team performance" },
      { title: "Activity Tracking", description: "Monitor application and website usage patterns" },
      { title: "Goal Setting", description: "Set productivity goals and track progress over time" },
      { title: "Custom Reports", description: "Create detailed performance reports with visualizations" },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring & Oversight",
    icon: Eye,
    description: "Complete visibility and control",
    features: [
      { title: "Screen Monitoring", description: "Capture screenshots at configurable intervals" },
      { title: "Activity Logs", description: "Detailed logs of all user activities and sessions" },
      { title: "Real-time Tracking", description: "Monitor active and idle time in real-time" },
      { title: "Usage Analytics", description: "Analyze application and website usage patterns" },
      { title: "Keystroke Logging", description: "Optional keystroke tracking for compliance needs" },
      { title: "Privacy Controls", description: "Configurable privacy settings and blur options" },
    ],
  },
  {
    id: "attendance",
    title: "Attendance, HR & Admin",
    icon: Users,
    description: "Streamline workforce management",
    features: [
      { title: "Attendance Tracking", description: "Automated clock in/out with geolocation tracking" },
      { title: "Leave Management", description: "Handle leave requests, approvals, and balances" },
      { title: "HR Reports", description: "Generate comprehensive HR and attendance reports" },
      { title: "Shift Management", description: "Create and manage employee shifts and schedules" },
      { title: "Compliance Tracking", description: "Ensure compliance with labor laws and regulations" },
      { title: "Employee Database", description: "Centralized employee information management" },
    ],
  },
]

export function AppitDropdown() {
  const [activeTab, setActiveTab] = useState(categories[0].id)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const currentCategory = categories.find(cat => cat.id === activeTab) || categories[0]

  return (
    <div
      className="relative ml-2 border-l border-white/40 pl-2.5"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      {/* appit button */}
      <button className="text-white text-sm font-bold leading-none tracking-wide hover:text-cyan-400 transition-colors">
        appit
      </button>

      {/* Mega Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-4 w-screen max-w-5xl z-50"
            style={{ left: "-200px" }}
          >
            <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden p-6">

              {/* Horizontal Tabs Navigation */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 p-1.5 bg-white/60 backdrop-blur-xl rounded-xl shadow-md border border-gray-200/50">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isActive = category.id === activeTab

                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="appitDropdownActiveTab"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-lg shadow-lg"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}

                        <div className="relative z-10">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-cyan-600"}`} />
                        </div>

                        <span className="relative z-10 whitespace-nowrap">{category.title}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Content Area */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Header Card */}
                <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-xl shadow-xl overflow-hidden mb-4">
                  <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>

                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg blur-lg opacity-50"></div>
                        <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                          <currentCategory.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-lg"></div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {currentCategory.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {currentCategory.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {currentCategory.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className="group relative"
                    >
                      <div className="relative h-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">

                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 via-blue-50/0 to-cyan-50/0 group-hover:from-cyan-50/80 group-hover:via-blue-50/50 group-hover:to-cyan-50/80 transition-all duration-500 rounded-xl"></div>

                        <div className="relative z-10">
                          <div className="flex items-start gap-2 mb-1">
                            <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                            </div>

                            <h4 className="flex-1 text-sm font-bold text-gray-900 leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                              {feature.title}
                            </h4>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed pl-8">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl p-4 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white mb-1">
                        Ready to explore more?
                      </h4>
                      <p className="text-xs text-cyan-50">
                        Discover all {currentCategory.title} features
                      </p>
                    </div>

                    <Link href="/appit">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2 bg-white text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2"
                      >
                        View All
                        <ArrowRight className="w-4 h-4 text-cyan-600" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
