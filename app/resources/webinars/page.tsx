"use client"

import { motion } from "framer-motion"
import { Video, Calendar, Clock, Users, Play } from "lucide-react"

const upcomingWebinars = [
  {
    id: "future-hybrid-work",
    title: "The Future of Hybrid Work: Trends & Strategies",
    description: "Join industry experts as they explore emerging trends in hybrid work and share proven strategies for building successful flexible work models.",
    date: "February 5, 2026",
    time: "2:00 PM EST",
    duration: "60 min",
    speakers: ["Dr. Sarah Chen", "Mark Rodriguez"],
    attendees: "245 registered",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    status: "upcoming",
  },
  {
    id: "ai-workforce-analytics",
    title: "AI-Powered Workforce Analytics: Practical Applications",
    description: "Discover how leading companies leverage AI to transform workforce management and drive data-driven decisions.",
    date: "February 12, 2026",
    time: "1:00 PM EST",
    duration: "45 min",
    speakers: ["Lisa Wang", "James Wilson"],
    attendees: "198 registered",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    status: "upcoming",
  },
]

const onDemandWebinars = [
  {
    id: "remote-productivity",
    title: "Mastering Remote Team Productivity",
    description: "Learn actionable strategies to boost productivity and engagement across distributed teams.",
    date: "January 15, 2026",
    duration: "55 min",
    views: "1,234 views",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "time-tracking-best-practices",
    title: "Time Tracking Best Practices for Modern Teams",
    description: "Essential tips and tricks for implementing effective time tracking in your organization.",
    date: "December 20, 2025",
    duration: "50 min",
    views: "2,156 views",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "employee-monitoring-ethics",
    title: "Employee Monitoring: Balancing Privacy and Productivity",
    description: "Navigate the ethical considerations of workplace monitoring with expert guidance.",
    date: "November 28, 2025",
    duration: "45 min",
    views: "1,890 views",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
  },
]

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-deloitte-green/10 rounded-full mb-6">
              <Video className="w-4 h-4 text-deloitte-green" />
              <span className="text-sm font-semibold text-deloitte-green uppercase tracking-wide">
                Live & On-Demand
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Educational
              <br />
              <span className="text-deloitte-green font-normal">Webinars</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry experts and discover best practices for workforce management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <motion.article
                key={webinar.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-deloitte-green overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-56">
                  <img src={webinar.image} alt={webinar.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                      LIVE
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{webinar.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{webinar.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{webinar.date} at {webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{webinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{webinar.attendees}</span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-colors">
                    Register Now
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* On-Demand Webinars */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Watch On-Demand</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onDemandWebinars.map((webinar, index) => (
              <motion.article
                key={webinar.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative h-48">
                  <img src={webinar.image} alt={webinar.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <Play className="w-8 h-8 text-deloitte-green ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 text-white text-xs rounded">
                    {webinar.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{webinar.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{webinar.description}</p>
                  <div className="text-xs text-gray-500">{webinar.views}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
