"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"
import { allBlogPosts } from "@/lib/blog-data"

const categories = ["All", "Productivity", "Time Management", "Privacy"]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const posts = useMemo(
    () =>
      Object.values(allBlogPosts).sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      ),
    []
  )

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts
    }
    // Map category names for filtering
    const categoryMap: Record<string, string[]> = {
      "Productivity": ["Productivity Tools", "Software Solutions", "Automation"],
      "Time Management": ["Time Tracking", "Team Management"],
      "Privacy": ["Employee Management", "Enterprise Solutions"],
    }
    const matchCategories = categoryMap[activeCategory] || []
    return posts.filter((p) => matchCategories.includes(p.category))
  }, [posts, activeCategory])

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
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
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
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group h-full bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-deloitte-green/30 transition-all duration-300 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.heroImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        quality={80}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        loading="lazy"
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
                        {post.introduction}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime} min read</span>
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
