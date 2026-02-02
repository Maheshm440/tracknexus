"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"

const blogPosts = [
  {
    id: "remote-work-productivity-tips",
    title: "10 Ways to Boost Productivity in Remote Teams",
    excerpt: "Discover proven strategies to enhance productivity and engagement across distributed teams. Learn how leading companies maintain high performance with remote workforces.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    category: "Productivity",
    date: "January 20, 2026",
    readTime: "5 min read",
    author: "Sarah Johnson",
  },
  {
    id: "time-tracking-best-practices",
    title: "Time Tracking Best Practices for Modern Businesses",
    excerpt: "Master the art of time tracking with these essential best practices. Improve accuracy, accountability, and insights across your organization.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    category: "Time Management",
    date: "January 18, 2026",
    readTime: "7 min read",
    author: "Michael Chen",
  },
  {
    id: "employee-monitoring-guide",
    title: "Employee Monitoring: Balancing Privacy and Productivity",
    excerpt: "Explore the ethical considerations of employee monitoring and learn how to implement transparency while respecting privacy in the workplace.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    category: "Privacy",
    date: "January 15, 2026",
    readTime: "6 min read",
    author: "David Park",
  },
]

const categories = ["All", "Productivity", "Time Management", "Privacy"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-deloitte-green/10 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-deloitte-green" />
              <span className="text-sm font-semibold text-deloitte-green uppercase tracking-wide">
                Track Nexus Blog
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Insights for
              <br />
              <span className="text-deloitte-green font-normal">smarter workforce management</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert tips, industry trends, and best practices for modern teams
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === "All"
                    ? "bg-deloitte-green text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="group h-full bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-deloitte-green/30 transition-all duration-300 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-deloitte-green text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-deloitte-green transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-deloitte-green group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Stay updated with our latest insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for weekly tips and industry trends
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
