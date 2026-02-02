"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Building2, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"

const caseStudies = [
  {
    id: "techcorp-remote",
    company: "TechCorp Global",
    industry: "Technology",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    challenge: "Managing 500+ remote employees across 12 time zones",
    solution: "Implemented Track Nexus for unified time tracking and productivity insights",
    results: [
      "45% improvement in team collaboration",
      "30% reduction in project delivery time",
      "$2M annual cost savings",
    ],
    stats: {
      employees: "500+",
      productivity: "+45%",
      savings: "$2M",
    },
  },
  {
    id: "retail-giant",
    company: "RetailMax",
    industry: "Retail & E-commerce",
    logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    challenge: "Tracking workforce across 200+ retail locations",
    solution: "Deployed Track Nexus with geolocation and attendance tracking",
    results: [
      "98% attendance accuracy",
      "60% faster payroll processing",
      "Zero time theft incidents",
    ],
    stats: {
      locations: "200+",
      accuracy: "98%",
      efficiency: "+60%",
    },
  },
  {
    id: "consulting-firm",
    company: "Apex Consulting",
    industry: "Professional Services",
    logo: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    challenge: "Billing accuracy and client project tracking",
    solution: "Track Nexus automated time tracking with project-level insights",
    results: [
      "100% billable hour accuracy",
      "25% increase in billable utilization",
      "Client satisfaction improved to 4.8/5",
    ],
    stats: {
      accuracy: "100%",
      utilization: "+25%",
      satisfaction: "4.8/5",
    },
  },
]

export default function CaseStudiesPage() {
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
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Customer
              <br />
              <span className="text-deloitte-green font-normal">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how leading companies transform their workforce management with Track Nexus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={study.image}
                      alt={study.company}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <span className="px-3 py-1 bg-deloitte-green text-white text-xs font-semibold rounded-full">
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                      {study.company}
                    </h2>

                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Challenge</h3>
                        <p className="text-gray-700">{study.challenge}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Solution</h3>
                        <p className="text-gray-700">{study.solution}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Results</h3>
                        <div className="space-y-2">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-deloitte-green flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      {Object.entries(study.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-deloitte-green mb-1">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${study.id}`}
                      className="inline-flex items-center gap-2 mt-8 text-deloitte-green font-semibold hover:gap-3 transition-all"
                    >
                      Read full case study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
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
            Ready to write your success story?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of companies achieving remarkable results with Track Nexus
          </p>
          <button className="px-8 py-3.5 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green-dark transition-colors">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  )
}
