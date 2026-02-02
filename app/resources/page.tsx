"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, FileText, Video, HelpCircle, Users, ArrowRight } from "lucide-react"

const resources = [
  {
    id: "blog",
    title: "Blog",
    description: "Industry insights & tips",
    longDescription: "Stay updated with the latest trends, tips, and best practices in workforce management, productivity, and remote work.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    href: "/resources/blog",
    stats: "50+ Articles",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Customer success stories",
    longDescription: "Discover how leading organizations use Track Nexus to transform their workforce management and boost productivity.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    href: "/resources/case-studies",
    stats: "20+ Stories",
  },
  {
    id: "whitepapers",
    title: "Whitepapers",
    description: "Research & reports",
    longDescription: "Download comprehensive research, industry reports, and expert guides on workforce productivity and management.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    href: "/resources/whitepapers",
    stats: "15+ Reports",
  },
  {
    id: "webinars",
    title: "Webinars",
    description: "Educational sessions",
    longDescription: "Join live webinars and watch on-demand sessions featuring workforce management experts and industry leaders.",
    icon: Video,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    href: "/resources/webinars",
    stats: "Monthly Events",
  },
  {
    id: "help-center",
    title: "Help Center",
    description: "Support & documentation",
    longDescription: "Find answers to your questions with our comprehensive knowledge base, guides, and documentation.",
    icon: HelpCircle,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    href: "/resources/help-center",
    stats: "100+ Articles",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Resources to
              <br />
              <span className="text-deloitte-green font-normal">Power Your Success</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of insights, guides, and tools to help you maximize workforce productivity
            </p>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={resource.href}>
                    <div className="group h-full bg-white rounded-xl border border-gray-200 hover:shadow-2xl hover:border-deloitte-green/30 transition-all duration-300 overflow-hidden">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-deloitte-green flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{resource.title}</h3>
                            <p className="text-white/80 text-sm">{resource.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {resource.longDescription}
                        </p>

                        {/* Stats */}
                        <div className="mb-4 px-3 py-2 bg-gray-50 rounded-lg inline-block">
                          <span className="text-sm font-medium text-deloitte-green">
                            {resource.stats}
                          </span>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-sm font-medium text-deloitte-green group-hover:text-deloitte-green-dark transition-colors">
                            Explore {resource.title.toLowerCase()}
                          </span>
                          <ArrowRight className="w-5 h-5 text-deloitte-green group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter for the latest insights, tips, and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-deloitte-green focus:border-transparent"
              />
              <motion.button
                className="px-8 py-3.5 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to help you succeed with Track Nexus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3.5 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a demo
              </motion.button>
              <motion.button
                className="px-8 py-3.5 bg-white border border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-deloitte-green hover:text-deloitte-green transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
