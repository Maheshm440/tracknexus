"use client"

import { motion } from "framer-motion"
import { Search, Book, MessageCircle, Video, FileText, HelpCircle } from "lucide-react"

const categories = [
  {
    title: "Getting Started",
    icon: Book,
    articles: 24,
    description: "Quick start guides and setup tutorials",
  },
  {
    title: "Time Tracking",
    icon: FileText,
    articles: 18,
    description: "Track time effectively across your team",
  },
  {
    title: "Analytics & Reports",
    icon: Video,
    articles: 15,
    description: "Generate insights and custom reports",
  },
  {
    title: "Integrations",
    icon: MessageCircle,
    articles: 22,
    description: "Connect with your favorite tools",
  },
  {
    title: "Security & Privacy",
    icon: HelpCircle,
    articles: 12,
    description: "Data protection and compliance",
  },
  {
    title: "Billing & Plans",
    icon: FileText,
    articles: 16,
    description: "Subscription and payment information",
  },
]

const popularArticles = [
  "How to set up your first project",
  "Understanding productivity metrics",
  "Inviting team members and setting permissions",
  "Configuring automated time tracking",
  "Creating custom reports and dashboards",
  "Integrating with Slack and Microsoft Teams",
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Search */}
      <section className="bg-gradient-to-b from-deloitte-green to-deloitte-green-dark py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Search our knowledge base or browse categories below
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-white text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-deloitte-green hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-deloitte-green/10 flex items-center justify-center mb-4 group-hover:bg-deloitte-green group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-deloitte-green group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {category.description}
                  </p>
                  <div className="text-sm text-deloitte-green font-medium">
                    {category.articles} articles →
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Popular Articles
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 group-hover:text-deloitte-green transition-colors">
                    {article}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-deloitte-green group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              More Resources
            </h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive library of guides, insights, and learning materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Blog */}
            <motion.a
              href="/resources/blog"
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-deloitte-green transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-lg bg-deloitte-green/10 flex items-center justify-center mb-4 group-hover:bg-deloitte-green transition-colors">
                <Book className="w-6 h-6 text-deloitte-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog</h3>
              <p className="text-sm text-gray-600 mb-3">
                Latest insights, trends, and best practices in workforce management
              </p>
              <div className="text-sm text-deloitte-green font-medium flex items-center gap-1">
                Read articles
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>

            {/* Case Studies */}
            <motion.a
              href="/resources/case-studies"
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-deloitte-green transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-deloitte-green/10 flex items-center justify-center mb-4 group-hover:bg-deloitte-green transition-colors">
                <MessageCircle className="w-6 h-6 text-deloitte-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Studies</h3>
              <p className="text-sm text-gray-600 mb-3">
                Real success stories from companies using Track Nexus
              </p>
              <div className="text-sm text-deloitte-green font-medium flex items-center gap-1">
                View case studies
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>

            {/* Whitepapers */}
            <motion.a
              href="/resources/whitepapers"
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-deloitte-green transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-lg bg-deloitte-green/10 flex items-center justify-center mb-4 group-hover:bg-deloitte-green transition-colors">
                <FileText className="w-6 h-6 text-deloitte-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Whitepapers</h3>
              <p className="text-sm text-gray-600 mb-3">
                In-depth research and comprehensive guides for download
              </p>
              <div className="text-sm text-deloitte-green font-medium flex items-center gap-1">
                Download whitepapers
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>

            {/* Webinars */}
            <motion.a
              href="/resources/webinars"
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-deloitte-green transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-lg bg-deloitte-green/10 flex items-center justify-center mb-4 group-hover:bg-deloitte-green transition-colors">
                <Video className="w-6 h-6 text-deloitte-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Webinars</h3>
              <p className="text-sm text-gray-600 mb-3">
                Live and on-demand educational sessions with experts
              </p>
              <div className="text-sm text-deloitte-green font-medium flex items-center gap-1">
                Watch webinars
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our support team is here to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3.5 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-colors">
              Contact Support
            </button>
            <button className="px-8 py-3.5 bg-white border border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-deloitte-green hover:text-deloitte-green transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
