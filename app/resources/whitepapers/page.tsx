"use client"

import { motion } from "framer-motion"
import { FileText, Download, Calendar } from "lucide-react"

const whitepapers = [
  {
    id: "future-of-remote-work",
    title: "The Future of Remote Work: 2026 Trends and Predictions",
    description: "Comprehensive analysis of remote work evolution, emerging technologies, and workforce management strategies for the next decade.",
    pages: "45 pages",
    date: "January 2026",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    topics: ["Remote Work", "Future Trends", "Technology", "Management"],
  },
  {
    id: "productivity-metrics",
    title: "Measuring What Matters: Modern Productivity Metrics",
    description: "Data-driven insights into productivity measurement, KPIs, and performance tracking for distributed teams in the digital age.",
    pages: "38 pages",
    date: "December 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    topics: ["Productivity", "Metrics", "Analytics", "Performance"],
  },
  {
    id: "employee-privacy",
    title: "Balancing Privacy and Productivity: Best Practices Guide",
    description: "Navigate the complexities of employee monitoring with ethical frameworks, legal considerations, and transparency best practices.",
    pages: "52 pages",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
    topics: ["Privacy", "Ethics", "Compliance", "Legal"],
  },
  {
    id: "hybrid-workplace",
    title: "The Hybrid Workplace Revolution: Implementation Guide",
    description: "Complete roadmap for transitioning to hybrid work models, including technology requirements, policy frameworks, and success metrics.",
    pages: "60 pages",
    date: "October 2025",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    topics: ["Hybrid Work", "Strategy", "Implementation", "Technology"],
  },
  {
    id: "ai-workforce-analytics",
    title: "AI in Workforce Analytics: Practical Applications",
    description: "Explore how artificial intelligence transforms workforce management with real-world use cases, implementation strategies, and ROI analysis.",
    pages: "48 pages",
    date: "September 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    topics: ["AI", "Analytics", "Innovation", "ROI"],
  },
  {
    id: "time-tracking-roi",
    title: "The ROI of Time Tracking: Financial Impact Study",
    description: "Quantitative analysis of time tracking implementations across 500+ companies, including cost-benefit analysis and success factors.",
    pages: "42 pages",
    date: "August 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    topics: ["Time Tracking", "ROI", "Finance", "Cost Savings"],
  },
]

export default function WhitepapersPage() {
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
              <FileText className="w-4 h-4 text-deloitte-green" />
              <span className="text-sm font-semibold text-deloitte-green uppercase tracking-wide">
                Research & Insights
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              In-Depth
              <br />
              <span className="text-deloitte-green font-normal">Whitepapers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive research and analysis on workforce management trends and best practices
            </p>
          </motion.div>
        </div>
      </section>

      {/* Whitepapers Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <motion.article
                key={paper.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-xl border border-gray-200 hover:shadow-2xl hover:border-deloitte-green/30 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={paper.image}
                    alt={paper.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                    <FileText className="w-4 h-4" />
                    <span>{paper.pages}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{paper.date}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-deloitte-green transition-colors line-clamp-2">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {paper.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Download Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Get exclusive access to all whitepapers
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to receive our latest research and insights directly to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-deloitte-green"
            />
            <button className="px-6 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
