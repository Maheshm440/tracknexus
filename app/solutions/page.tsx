"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, Home, Building2, Rocket, ArrowRight, CheckCircle } from "lucide-react"

const solutions = [
  {
    id: "remote-teams",
    title: "Remote Teams",
    description: "Distributed workforce",
    longDescription: "Complete visibility and management for remote teams across the globe. Track, manage, and optimize productivity for your distributed workforce.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/remote-teams",
    features: [
      "Global workforce management",
      "Asynchronous time tracking",
      "Real-time team visibility",
      "Privacy-first monitoring",
    ],
  },
  {
    id: "hybrid-workforce",
    title: "Hybrid Workforce",
    description: "Flexible work models",
    longDescription: "Seamlessly manage teams working from home, office, or anywhere. Get unified insights across all work environments.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/hybrid-workforce",
    features: [
      "Office vs remote analytics",
      "Smart scheduling",
      "Location tracking",
      "Flexible policy management",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Large organizations",
    longDescription: "Enterprise-grade security, unlimited scalability, and dedicated support for organizations of any size.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/enterprise",
    features: [
      "SOC 2 compliance",
      "Unlimited scalability",
      "Advanced security",
      "24/7 priority support",
    ],
  },
  {
    id: "startups",
    title: "Startups & SMBs",
    description: "Growing businesses",
    longDescription: "Affordable, easy-to-use workforce management that scales with your business. Enterprise features at startup prices.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=800&q=80",
    href: "/solutions/startups",
    features: [
      "Quick 5-minute setup",
      "Affordable pricing",
      "Easy to use",
      "Scales as you grow",
    ],
  },
]

export default function SolutionsPage() {
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
              Solutions for
              <br />
              <span className="text-deloitte-green font-normal">Every Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tailored workforce management solutions designed for your specific business needs and team size
            </p>
          </motion.div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={solution.href}>
                    <div className="group h-full bg-white rounded-xl border border-gray-200 hover:shadow-2xl hover:border-deloitte-green/30 transition-all duration-300 overflow-hidden">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-deloitte-green flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{solution.title}</h3>
                            <p className="text-white/80 text-sm">{solution.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {solution.longDescription}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2 mb-6">
                          {solution.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-deloitte-green flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-sm font-medium text-deloitte-green group-hover:text-deloitte-green-dark transition-colors">
                            Learn more
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

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Not sure which solution is right for you?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let our team help you find the perfect fit for your organization
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-3.5 bg-deloitte-green text-white rounded font-semibold hover:bg-deloitte-green-dark transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a demo
              </motion.button>
              <motion.button
                className="px-8 py-3.5 bg-white border border-gray-300 text-gray-900 rounded font-semibold hover:border-deloitte-green hover:text-deloitte-green transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
