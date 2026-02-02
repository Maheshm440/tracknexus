"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  DollarSign,
  TrendingUp,
  BarChart,
  Eye,
  Shield,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  X,
  Info,
  Zap,
  Target,
  Award,
  LineChart,
  Timer,
  UserCheck,
  Sparkles,
  Rocket,
  Crown,
  Star
} from "lucide-react"
import { FeatureDetailModal } from "./FeatureDetailModal"

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

const categories: CategoryData[] = [
  {
    id: "time-tracking",
    title: "Time Tracking & Billing",
    subtitle: "Accurate time management and invoicing",
    gradient: "from-blue-500 to-cyan-500",
    hoverGradient: "from-blue-600 to-cyan-600",
    icon: Clock,
    features: [
      {
        icon: Clock,
        title: "Automated Time Tracking",
        description: "Track work hours automatically across all devices and applications",
        imagePath: "/images/time-billing/1.png",
        detailedDescription: "Automatically capture work hours across all devices with intelligent start/stop detection. Monitor time spent on different applications and websites in real-time. The system automatically identifies idle time and provides detailed activity logs. Perfect for billing accuracy and productivity monitoring with zero manual effort required."
      },
      {
        icon: DollarSign,
        title: "Invoice Generation",
        description: "Create detailed invoices based on tracked time and billable hours",
        imagePath: "/images/time-billing/2.png",
        detailedDescription: "Generate professional invoices automatically from tracked time data. Customize invoice templates with company branding, add project details, hourly rates, and payment terms. Export as PDF or send directly to clients. Includes invoice numbering, payment tracking, and recurring invoice scheduling for streamlined billing workflows."
      },
      {
        icon: Calendar,
        title: "Timesheet Management",
        description: "Approve, edit, and export timesheets with ease",
        imagePath: "/images/time-billing/3.png",
        detailedDescription: "Centralized timesheet management with easy approval workflows. Managers can review, edit, and approve timesheets with detailed notes. Support for manual entry, overtime tracking, and time-off requests. Export timesheets in multiple formats (CSV, PDF, Excel) for payroll and compliance. Includes audit trails for all modifications."
      },
      {
        icon: CheckCircle,
        title: "Project Time Allocation",
        description: "Allocate time to specific projects and track budget vs actual",
        imagePath: "/images/time-billing/4.png",
        detailedDescription: "Assign tracked time to specific projects and tasks for accurate project costing. Monitor budgeted vs actual time spent with real-time progress tracking. Identify cost overruns early and optimize resource allocation. Generate project profitability reports to understand project economics and improve future estimates."
      },
      {
        icon: FileText,
        title: "Billing Reports",
        description: "Generate comprehensive billing reports for clients",
        imagePath: "/images/time-billing/5.png",
        detailedDescription: "Create detailed billing reports with time summaries, hourly breakdowns, and cost analysis. Customize report layouts to match client requirements. Include project summaries, team member details, and payment information. Support for recurring reports sent automatically to clients via email."
      },
      {
        icon: TrendingUp,
        title: "Rate Management",
        description: "Set and manage hourly rates for different team members",
        imagePath: "/images/time-billing/time-billing-1.png",
        detailedDescription: "Configure flexible hourly rates for different team members, projects, and client types. Support role-based rates for different skill levels and departments. Track rate history for audit and compliance. Automatically apply correct rates when generating invoices and billing reports."
      }
    ]
  },
  {
    id: "productivity",
    title: "Productivity & Performance",
    subtitle: "Boost efficiency with intelligent insights",
    gradient: "from-deloitte-green to-emerald-500",
    hoverGradient: "from-deloitte-green-dark to-emerald-600",
    icon: TrendingUp,
    features: [
      {
        icon: BarChart,
        title: "Performance Analytics",
        description: "Real-time dashboards showing team productivity metrics",
        imagePath: "/images/task-tracking/1.png",
        detailedDescription: "Access comprehensive performance dashboards with real-time metrics including tasks completed, time spent, application usage, and engagement levels. Track individual and team-level productivity trends with visual charts and graphs. Monitor performance over daily, weekly, and monthly periods. Identify top performers and areas needing improvement."
      },
      {
        icon: TrendingUp,
        title: "Productivity Scoring",
        description: "AI-powered productivity scores based on activity patterns",
        imagePath: "/images/task-tracking/2.png",
        detailedDescription: "Get AI-calculated productivity scores for each team member based on activity patterns, application usage, and work behavior. Receive personalized recommendations to boost productivity. Compare scores across teams and departments. Identify productivity trends and predict performance changes before they happen."
      },
      {
        icon: BarChart,
        title: "AI Insights",
        description: "Smart recommendations to improve team performance",
        imagePath: "/images/task-tracking/3.png",
        detailedDescription: "Leverage machine learning to get actionable insights and recommendations. AI analyzes work patterns to identify bottlenecks, focus time, and distractions. Receive automated suggestions to optimize workflows and improve work-life balance. Discover best practices from your top performers and share with the team."
      },
      {
        icon: BarChart,
        title: "Activity Tracking",
        description: "Monitor application and website usage patterns",
        imagePath: "/images/task-tracking/4.png",
        detailedDescription: "Track which applications and websites your team uses and how much time they spend on each. Identify productivity blockers and time-wasting activities. Understand work patterns and peak productivity times. Support detailed activity logs with granular timestamps for compliance and auditing."
      },
      {
        icon: CheckCircle,
        title: "Goal Setting & Tracking",
        description: "Set productivity goals and track progress over time",
        imagePath: "/images/task-tracking/5.png",
        detailedDescription: "Set SMART productivity goals for individuals and teams. Track progress against goals with real-time dashboards. Provide automated updates on goal achievement. Support milestone tracking and celebrate achievements. Enable collaborative goal setting with team members."
      },
      {
        icon: FileText,
        title: "Custom Reports",
        description: "Create detailed performance reports with visualizations",
        imagePath: "/images/task-tracking/task-management.png",
        detailedDescription: "Build custom reports combining any productivity metrics and visualization types. Create scheduled reports that automatically send to stakeholders. Include performance summaries, trend analysis, and comparative metrics. Export reports in multiple formats (PDF, Excel, PowerPoint)."
      }
    ]
  },
  {
    id: "monitoring",
    title: "Monitoring & Oversight",
    subtitle: "Complete visibility and control",
    gradient: "from-purple-500 to-pink-500",
    hoverGradient: "from-purple-600 to-pink-600",
    icon: Eye,
    features: [
      {
        icon: Eye,
        title: "Screen Monitoring",
        description: "Capture screenshots at configurable intervals",
        imagePath: "/images/audio-tracking/1.png",
        detailedDescription: "Capture periodic screenshots of team member screens for oversight and compliance. Configure capture frequency (every 5, 10, 15 minutes). View screenshot galleries with timestamps. Automatic blur for sensitive information. Support for privacy modes where employees can temporarily pause monitoring. Configurable screenshot quality and storage options."
      },
      {
        icon: Shield,
        title: "Activity Logs",
        description: "Detailed logs of all user activities and sessions",
        imagePath: "/images/audio-tracking/2.png",
        detailedDescription: "Comprehensive activity logs tracking logins, logouts, application launches, file access, and document edits. Maintain complete audit trail for compliance and security. Search and filter logs by user, date, activity type, and application. Export logs for compliance reports and investigations."
      },
      {
        icon: Clock,
        title: "Real-time Tracking",
        description: "Monitor active and idle time in real-time",
        imagePath: "/images/audio-tracking/3.png",
        detailedDescription: "Monitor which team members are actively working and when they're idle. Get real-time status updates for all team members. Set alerts for extended idle periods. Track productivity throughout the day. Support for remote and office-based team members with automatic idle detection."
      },
      {
        icon: BarChart,
        title: "Usage Analytics",
        description: "Analyze application and website usage patterns",
        imagePath: "/images/audio-tracking/4.png",
        detailedDescription: "Detailed analytics on application and website usage including time spent, frequency of use, and usage patterns. Create usage reports to understand productivity. Identify time-wasting websites and applications. Support categorization of websites (productive, social media, entertainment). Generate department and company-wide usage statistics."
      },
      {
        icon: CheckCircle,
        title: "Keystroke Logging",
        description: "Optional keystroke tracking for compliance needs",
        imagePath: "/images/audio-tracking/5.png",
        detailedDescription: "Optional keystroke recording for compliance, security, and investigation purposes. Capture all typed content with timestamps. Search and review keystroke logs by date, user, or application. Support for temporary disabling during sensitive operations. Compliance-friendly with proper audit trails and access controls."
      },
      {
        icon: Shield,
        title: "Privacy Controls",
        description: "Configurable privacy settings and blur options",
        imagePath: "/images/audio-tracking/6.png",
        detailedDescription: "Built-in privacy controls to blur sensitive information in screenshots. Allow employees to mark time as private for personal breaks. Configurable privacy policies for different roles and departments. Automatic blur for passwords and sensitive data. Full transparency with employees about monitoring practices."
      }
    ]
  },
  {
    id: "attendance",
    title: "Attendance, HR & Admin",
    subtitle: "Streamline workforce management",
    gradient: "from-orange-500 to-red-500",
    hoverGradient: "from-orange-600 to-red-600",
    icon: Users,
    features: [
      {
        icon: Calendar,
        title: "Attendance Tracking",
        description: "Automated clock in/out with geolocation tracking",
        imagePath: "/images/project-management/1.png",
        detailedDescription: "Automated clock in/out with geolocation verification ensuring employees are at the office or remote location. Support mobile check-in with GPS coordinates. Attendance reports with patterns and anomalies. Integration with time tracking for seamless workflow. Support for biometric devices and NFC cards for office locations."
      },
      {
        icon: Users,
        title: "Leave Management",
        description: "Handle leave requests, approvals, and balances",
        imagePath: "/images/project-management/2.png",
        detailedDescription: "Streamlined leave request and approval process. Track leave balances for all employee types (sick, annual, personal). Support cascading approvals and workflows. Set leave policies by department and employee type. Generate leave summaries and forecasts. Support for comp-off and special leaves."
      },
      {
        icon: FileText,
        title: "HR Reports",
        description: "Generate comprehensive HR and attendance reports",
        imagePath: "/images/project-management/3.png",
        detailedDescription: "Generate comprehensive HR reports including attendance summaries, leave summaries, salary deductions, and performance reviews. Create custom HR reports combining any HR metrics. Schedule automatic monthly, quarterly, and annual reports. Export in PDF and Excel formats. Support for departmental and company-wide reports."
      },
      {
        icon: Shield,
        title: "Shift Management",
        description: "Create and manage employee shifts and schedules",
        imagePath: "/images/project-management/4.png",
        detailedDescription: "Create flexible shift schedules for different departments and locations. Support rotating shifts and part-time employees. Automated shift assignment with conflict detection. Employee shift preferences and swap requests. Mobile access for employees to view and manage their schedules."
      },
      {
        icon: CheckCircle,
        title: "Compliance Tracking",
        description: "Ensure compliance with labor laws and regulations",
        imagePath: "/images/project-management/5.png",
        detailedDescription: "Track compliance with labor laws including work hour limits, break requirements, and overtime regulations. Automated alerts for potential compliance violations. Generate compliance reports for audits. Support for multiple jurisdictions and regulatory requirements. Maintain detailed audit trails for all HR activities."
      },
      {
        icon: BarChart,
        title: "Employee Database",
        description: "Centralized employee information management",
        imagePath: "/images/timeline-routes/1.png",
        detailedDescription: "Centralized database for all employee information including personal details, employment history, roles, and designations. Track employee lifecycle from onboarding to offboarding. Manage employee documents and certifications. Support for organizational hierarchy and reporting structure. Access control based on roles and permissions."
      }
    ]
  }
]

export function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState(categories[0].id)
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTitlePopupOpen, setIsTitlePopupOpen] = useState(false)

  const currentCategory = categories.find(cat => cat.id === activeTab) || categories[0]

  // ESC key handler for popup
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsTitlePopupOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isTitlePopupOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isTitlePopupOpen, handleEscKey])

  const handleFeatureClick = (index: number) => {
    setSelectedFeatureIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const platformBenefits = [
    {
      icon: LineChart,
      title: "Boost Productivity",
      description: "Leverage AI-driven insights to identify bottlenecks, optimize workflows, and help your team achieve more in less time."
    },
    {
      icon: Eye,
      title: "Complete Visibility",
      description: "Gain real-time visibility into workforce activities, project progress, and resource utilization across your entire organization."
    },
    {
      icon: Timer,
      title: "Smart Time Management",
      description: "Automate time tracking, streamline timesheets, and ensure accurate billing with intelligent capture and reporting."
    },
    {
      icon: UserCheck,
      title: "Performance Excellence",
      description: "Track performance metrics, set goals, and drive continuous improvement with data-driven workforce management."
    }
  ]

  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 px-4 py-14 lg:px-6 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge - Centered */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-200/30">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
              <span className="text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">
                Complete Platform
              </span>
            </div>
          </div>

          {/* Title - Centered */}
          <div className="text-center mb-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Everything you need for{" "}
              <span
                onClick={() => setIsTitlePopupOpen(true)}
                className="relative cursor-pointer bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 group inline-flex items-center"
              >
                Workforce Excellence
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <Info className="w-5 h-5 text-cyan-500 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
              </span>
            </h2>
          </div>

          {/* Description - Centered */}
          <p className="text-base text-gray-600 max-w-2xl mx-auto text-center">
            Track, manage, and optimize your team's productivity with AI-powered insights
          </p>
        </motion.div>

        {/* Horizontal Tabs Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center justify-center gap-2 p-2 bg-white/60 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = category.id === activeTab

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-lg shadow-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-cyan-600"}`} />
                  </div>

                  <span className="relative z-10 whitespace-nowrap">{category.title}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Mobile Tabs - Scrollable */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 p-2 bg-white/60 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 min-w-max">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = category.id === activeTab

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBgMobile"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-lg shadow-lg"
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

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Category Header Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden mb-5">
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>

            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur-lg opacity-40"></div>
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 flex items-center justify-center shadow-xl">
                    <currentCategory.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentCategory.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentCategory.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory.features.map((feature, index) => {
              const FeatureIcon = feature.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative cursor-pointer"
                  onClick={() => handleFeatureClick(index)}
                >
                  <div className="relative h-full bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 via-blue-50/0 to-cyan-50/0 group-hover:from-cyan-50/60 group-hover:via-blue-50/40 group-hover:to-cyan-50/60 transition-all duration-400 rounded-xl"></div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                          <FeatureIcon className="w-4.5 h-4.5 text-cyan-600" />
                        </div>

                        <h4 className="flex-1 text-sm font-bold text-gray-900 leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                          {feature.title}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 pl-12">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl p-5 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg lg:text-xl font-bold text-white">
                  Ready to experience {currentCategory.title}?
                </h3>
                <p className="text-cyan-50 text-sm">
                  Start your free trial today and boost your team's productivity
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-white text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 text-cyan-600" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Detail Modal */}
        <FeatureDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={currentCategory}
          defaultFeatureIndex={selectedFeatureIndex}
        />

        {/* Title Popup - Workforce Excellence - Ultra Premium Design */}
        <AnimatePresence>
          {isTitlePopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-1000"
              onClick={() => setIsTitlePopupOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
            >
              {/* Cinematic Dark Background with Animated Gradient */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-transparent to-purple-900/40" />
              </motion.div>

              {/* Animated Floating Orbs with Glow */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-[100px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/30 rounded-full blur-[100px]"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -30, 0],
                    y: [0, 30, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px]"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated Border Gradient */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-[26px] opacity-75 blur-sm animate-gradient-x" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 rounded-[25px] animate-gradient-x" />

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden">

                  {/* Top Glow Line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                  {/* Mesh Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Close Button - Neon Style */}
                  <motion.button
                    onClick={() => setIsTitlePopupOpen(false)}
                    className="absolute top-5 right-5 z-10 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close popup"
                  >
                    <X className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                  </motion.button>

                  {/* Header Section */}
                  <div className="relative px-8 pt-10 pb-8">
                    <div className="flex items-center gap-6">
                      {/* Animated Crown Icon with Glow */}
                      <motion.div
                        className="relative"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                      >
                        <motion.div
                          className="absolute -inset-3 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-60"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="relative w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20"
                          animate={{ rotateY: [0, 10, -10, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Crown className="w-10 h-10 text-white drop-shadow-lg" />
                          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                        </motion.div>
                      </motion.div>

                      <div className="flex-1">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <h3
                              id="popup-title"
                              className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                            >
                              Workforce Excellence
                            </h3>
                            <motion.div
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Rocket className="w-7 h-7 text-cyan-400" />
                            </motion.div>
                          </div>
                          <p className="text-gray-400 flex items-center gap-2 text-sm">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            The Complete Platform for Modern Teams
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-8 pb-8">
                    {/* Hero Quote with Animated Border */}
                    <motion.div
                      className="relative p-6 rounded-2xl mb-8 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
                      <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full" />
                        <p className="text-gray-300 leading-relaxed text-lg">
                          Transform your organization with <span className="text-cyan-400 font-semibold">AI-powered workforce management</span>.
                          Achieve <span className="text-purple-400 font-semibold">peak productivity</span> with tools designed for the future.
                        </p>
                      </div>
                    </motion.div>

                    {/* Benefits Grid - Premium Cards with Neon Glow */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {platformBenefits.map((benefit, index) => {
                        const BenefitIcon = benefit.icon
                        const colors = [
                          { gradient: 'from-cyan-500 to-teal-500', glow: 'cyan', border: 'border-cyan-500/30 hover:border-cyan-400/60' },
                          { gradient: 'from-blue-500 to-indigo-500', glow: 'blue', border: 'border-blue-500/30 hover:border-blue-400/60' },
                          { gradient: 'from-purple-500 to-pink-500', glow: 'purple', border: 'border-purple-500/30 hover:border-purple-400/60' },
                          { gradient: 'from-amber-500 to-orange-500', glow: 'amber', border: 'border-amber-500/30 hover:border-amber-400/60' },
                        ]
                        const color = colors[index % colors.length]

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 150 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className={`group relative p-5 rounded-2xl bg-white/5 backdrop-blur-sm border ${color.border} transition-all duration-500 overflow-hidden cursor-pointer`}
                          >
                            {/* Hover Glow Effect */}
                            <div className={`absolute -inset-px bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`} />

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-white/30 to-transparent" />
                            <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />

                            <div className="relative z-10">
                              <motion.div
                                className={`w-14 h-14 bg-gradient-to-br ${color.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <BenefitIcon className="w-7 h-7 text-white" />
                              </motion.div>
                              <h4 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">{benefit.title}</h4>
                              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{benefit.description}</p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Stats Section - Futuristic Design */}
                    <motion.div
                      className="relative p-8 rounded-2xl mb-8 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20" />
                      <div className="absolute inset-0 backdrop-blur-sm" />
                      <div className="absolute inset-0 border border-white/10 rounded-2xl" />

                      {/* Scanning Line Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />

                      <div className="relative flex items-center justify-around">
                        {[
                          { value: '10K+', label: 'Companies', icon: Target, delay: 0.95 },
                          { value: '500K+', label: 'Users', icon: Users, delay: 1.0 },
                          { value: '99.9%', label: 'Uptime', icon: Star, delay: 1.05 },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            className="text-center group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: stat.delay, type: "spring" }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:text-cyan-300 transition-colors" />
                            <motion.p
                              className="text-3xl lg:text-4xl font-black text-white mb-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: stat.delay + 0.1 }}
                            >
                              {stat.value}
                            </motion.p>
                            <p className="text-xs text-cyan-300/80 uppercase tracking-widest font-medium">{stat.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA Buttons - Neon Style */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}
                        whileTap={{ scale: 0.97 }}
                        className="relative flex-1 py-4 px-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg overflow-hidden group"
                      >
                        <span className="relative z-10">Start Free Trial</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsTitlePopupOpen(false)}
                        className="py-4 px-8 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300"
                      >
                        Explore Features
                      </motion.button>
                    </motion.div>

                    {/* Footer hint - Minimalist */}
                    <motion.p
                      className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-gray-400">ESC</span>
                      <span>or click outside to close</span>
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  )
}
