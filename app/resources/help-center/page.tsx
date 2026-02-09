"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Book, Clock, BarChart3, Zap, Shield, CreditCard, FileText, Video } from "lucide-react"
import HelpCenterSearch from "@/components/help-center/HelpCenterSearch"
import RecentArticles from "@/components/help-center/RecentArticles"
import FAQSection from "@/components/help-center/FAQSection"
import QuickLinks from "@/components/help-center/QuickLinks"
import TrendingTopics from "@/components/help-center/TrendingTopics"
import VideoTutorials from "@/components/help-center/VideoTutorials"
import ContactSupportForm from "@/components/help-center/ContactSupportForm"

const categories = [
  {
    title: "Getting Started",
    slug: "getting-started",
    icon: Book,
    articles: 24,
    description: "Quick start guides and setup tutorials",
  },
  {
    title: "Time Tracking",
    slug: "time-tracking",
    icon: Clock,
    articles: 18,
    description: "Track time effectively across your team",
  },
  {
    title: "Analytics & Reports",
    slug: "analytics-reports",
    icon: BarChart3,
    articles: 15,
    description: "Generate insights and custom reports",
  },
  {
    title: "Integrations",
    slug: "integrations",
    icon: Zap,
    articles: 22,
    description: "Connect with your favorite tools",
  },
  {
    title: "Security & Privacy",
    slug: "security-privacy",
    icon: Shield,
    articles: 12,
    description: "Data protection and compliance",
  },
  {
    title: "Billing & Plans",
    slug: "billing-plans",
    icon: CreditCard,
    articles: 16,
    description: "Subscription and payment information",
  },
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Search */}
      <section className="relative bg-gradient-to-br from-deloitte-green via-deloitte-green-dark to-cyan-700 py-10 lg:py-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-5 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-semibold text-white">24/7 Support Available</span>
            </motion.div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
              How can we help you?
            </h1>
            <p className="text-sm lg:text-base text-white/90 mb-6 max-w-xl mx-auto">
              Search our knowledge base, browse helpful articles, or get in touch with our support team
            </p>

            {/* Search Bar */}
            <HelpCenterSearch />

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-6"
            >
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-white/80">Help Articles</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-white/80">Video Tutorials</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-white/80">Support Available</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Find answers organized by topic and get the help you need quickly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/resources/help-center/category/${category.slug}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative h-full"
                  >
                    {/* Glow Effect on Hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-deloitte-green to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity" />

                    <div className="relative h-full p-6 bg-white rounded-xl border-2 border-gray-100 group-hover:border-deloitte-green shadow-lg group-hover:shadow-2xl transition-all cursor-pointer">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-deloitte-green to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-deloitte-green transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-semibold text-gray-500">
                          {category.articles} articles
                        </span>
                        <div className="flex items-center gap-1 text-deloitte-green font-semibold text-sm">
                          Explore
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <QuickLinks />

      {/* Recent Articles */}
      <RecentArticles />

      {/* Trending Topics */}
      <TrendingTopics />

      {/* Video Tutorials */}
      <VideoTutorials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Support Form */}
      <ContactSupportForm />

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
                <Zap className="w-6 h-6 text-deloitte-green group-hover:text-white transition-colors" />
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
    </div>
  )
}
