"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users,
  Clock,
  BarChart3,
  Zap,
  Shield,
  CreditCard,
  ArrowRight,
} from "lucide-react"
import { quickLinks } from "@/lib/help-center-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Clock,
  BarChart3,
  Zap,
  Shield,
  CreditCard,
}

export default function QuickLinks() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            Quick Start
          </h2>
          <p className="text-lg text-gray-600">
            Get answers to the most common tasks
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {quickLinks.map((link, index) => {
            const Icon = iconMap[link.icon]
            return (
              <motion.div key={link.id} variants={itemVariants}>
                <Link href={link.href}>
                  <div className="group h-full p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-deloitte-green hover:from-deloitte-green/5 hover:to-deloitte-green-dark/5 hover:shadow-xl transition-all cursor-pointer">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-deloitte-green to-deloitte-green-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {Icon && (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-deloitte-green transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {link.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-deloitte-green font-semibold text-sm group-hover:gap-3 transition-all">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Help Section */}
        <motion.div
          className="mt-12 p-8 bg-gradient-to-r from-deloitte-green/10 to-deloitte-green-dark/10 rounded-xl border border-deloitte-green/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Learn at your pace</h4>
              <p className="text-sm text-gray-600">
                Our comprehensive tutorials guide you through every feature
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert support</h4>
              <p className="text-sm text-gray-600">
                Get personalized help from our support team whenever you need it
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Community help</h4>
              <p className="text-sm text-gray-600">
                Connect with other TrackNexus users and share best practices
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
