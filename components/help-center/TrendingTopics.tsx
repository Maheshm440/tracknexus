"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { TrendingUp, Eye } from "lucide-react"
import { trendingTopics } from "@/lib/help-center-data"

export default function TrendingTopics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Header */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-deloitte-green" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Trending Topics
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Most popular help articles and resources accessed by our users
              </p>
              <div className="bg-deloitte-green/10 border border-deloitte-green/20 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Pro tip:</span> These topics are
                  frequently accessed by teams like yours
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Trending List */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link
                    href={`/resources/help-center/article/${topic.id}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-deloitte-green/10 border border-gray-200 hover:border-deloitte-green transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-deloitte-green to-deloitte-green-dark flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-deloitte-green transition-colors">
                          {topic.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-medium text-deloitte-green bg-deloitte-green/10 px-2 py-1 rounded">
                            {topic.category}
                          </span>
                        </div>
                      </div>

                      {/* Views */}
                      <div className="flex-shrink-0 text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600 font-medium group-hover:text-deloitte-green">
                          <Eye className="w-4 h-4" />
                          {(topic.views / 1000).toFixed(1)}k
                        </div>
                        <div className="text-xs text-gray-500">views</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Trending Chart */}
            <motion.div
              className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">
                Views this month
              </h4>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 w-20 truncate">
                      {topic.title.substring(0, 15)}...
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-deloitte-green to-deloitte-green-dark"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(topic.views / trendingTopics[0].views) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-medium w-12 text-right">
                      {topic.views}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
