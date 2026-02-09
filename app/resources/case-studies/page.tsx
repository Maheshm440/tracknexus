"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Building2, Users, TrendingUp, ArrowRight, CheckCircle, Award, Clock, DollarSign } from "lucide-react"

const caseStudies = [
  {
    id: "techcorp-remote",
    company: "TechCorp Global",
    industry: "Technology",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    challenge: "Managing 500+ remote employees across 12 time zones with inconsistent productivity tracking and communication gaps",
    solution: "Implemented Track Nexus for unified time tracking and productivity insights with real-time dashboards and automated reporting",
    results: [
      "45% improvement in team collaboration",
      "30% reduction in project delivery time",
      "$2M annual cost savings",
      "99.5% employee adoption rate",
    ],
    stats: {
      employees: "500+",
      productivity: "+45%",
      savings: "$2M",
    },
    testimonial: {
      quote: "Track Nexus transformed how we manage our distributed workforce. The insights we gain are invaluable for decision-making.",
      author: "Sarah Johnson",
      role: "VP of Operations",
    },
    timeline: "3 months",
    roi: "320%",
  },
  {
    id: "retail-giant",
    company: "RetailMax",
    industry: "Retail & E-commerce",
    logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    challenge: "Tracking workforce across 200+ retail locations with manual time cards leading to payroll errors and time theft",
    solution: "Deployed Track Nexus with geolocation, biometric attendance tracking, and automated payroll integration",
    results: [
      "98% attendance accuracy",
      "60% faster payroll processing",
      "Zero time theft incidents",
      "$850K saved in first year",
    ],
    stats: {
      locations: "200+",
      accuracy: "98%",
      efficiency: "+60%",
    },
    testimonial: {
      quote: "The ROI was evident within the first quarter. Our payroll team now spends time on strategic work instead of data entry.",
      author: "Michael Chen",
      role: "HR Director",
    },
    timeline: "2 months",
    roi: "275%",
  },
  {
    id: "consulting-firm",
    company: "Apex Consulting",
    industry: "Professional Services",
    logo: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    challenge: "Billing accuracy and client project tracking with consultants manually logging hours leading to revenue leakage",
    solution: "Track Nexus automated time tracking with project-level insights and seamless invoicing integration",
    results: [
      "100% billable hour accuracy",
      "25% increase in billable utilization",
      "Client satisfaction improved to 4.8/5",
      "$1.2M additional revenue captured",
    ],
    stats: {
      accuracy: "100%",
      utilization: "+25%",
      satisfaction: "4.8/5",
    },
    testimonial: {
      quote: "We were leaving money on the table. Track Nexus helped us capture every billable minute and improved client trust.",
      author: "David Martinez",
      role: "Managing Partner",
    },
    timeline: "6 weeks",
    roi: "410%",
  },
  {
    id: "healthcare-provider",
    company: "HealthCare Plus",
    industry: "Healthcare",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    challenge: "Managing shift schedules for 1,200+ healthcare workers across multiple facilities with compliance requirements",
    solution: "Integrated Track Nexus with scheduling system for automated shift tracking, overtime alerts, and compliance monitoring",
    results: [
      "92% reduction in scheduling conflicts",
      "100% compliance with labor regulations",
      "35% decrease in overtime costs",
      "Staff satisfaction up 40%",
    ],
    stats: {
      workers: "1,200+",
      compliance: "100%",
      savings: "-35%",
    },
    testimonial: {
      quote: "The automated compliance tracking alone saved us from potential regulatory penalties. Our staff loves the transparency.",
      author: "Dr. Emily Rodriguez",
      role: "Chief Operations Officer",
    },
    timeline: "4 months",
    roi: "265%",
  },
  {
    id: "manufacturing-corp",
    company: "PrecisionTech Manufacturing",
    industry: "Manufacturing",
    logo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80",
    challenge: "Optimizing production line efficiency with 800+ workers across three shifts and outdated punch card systems",
    solution: "Implemented Track Nexus with IoT integration for real-time production tracking and workforce analytics",
    results: [
      "28% increase in production output",
      "40% reduction in downtime",
      "95% on-time shift transitions",
      "$3.5M annual productivity gains",
    ],
    stats: {
      output: "+28%",
      downtime: "-40%",
      gains: "$3.5M",
    },
    testimonial: {
      quote: "Real-time visibility into our production floor transformed our operations. We can now predict and prevent issues.",
      author: "Robert Kim",
      role: "Plant Manager",
    },
    timeline: "5 months",
    roi: "385%",
  },
  {
    id: "financial-services",
    company: "FinServe Global",
    industry: "Financial Services",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    challenge: "Ensuring regulatory compliance and accurate timekeeping for 350+ financial advisors in highly regulated environment",
    solution: "Deployed Track Nexus with advanced security features, audit trails, and automated compliance reporting",
    results: [
      "100% audit trail accuracy",
      "50% faster compliance reporting",
      "Zero compliance violations",
      "Enhanced client trust and retention",
    ],
    stats: {
      audit: "100%",
      reporting: "+50%",
      violations: "0",
    },
    testimonial: {
      quote: "In our industry, compliance is everything. Track Nexus gives us complete peace of mind and makes audits effortless.",
      author: "Jennifer Taylor",
      role: "Compliance Director",
    },
    timeline: "3 months",
    roi: "290%",
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-deloitte-black text-white px-4 py-12 lg:px-8 lg:py-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-[10%] w-64 h-64 bg-deloitte-green/10 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-[10%] w-80 h-80 bg-deloitte-green/10 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-highlight/20 backdrop-blur-sm border border-highlight/30 rounded-full px-6 py-2 mb-6">
              <Award className="w-5 h-5 text-highlight" />
              <span className="text-sm font-semibold text-highlight uppercase tracking-widest">Success Stories</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              Real Companies,{" "}
              <span className="text-deloitte-green font-normal">Real Results</span>
            </h1>
            <p className="text-lg lg:text-xl text-deloitte-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover how industry leaders across sectors are transforming workforce management and achieving measurable success with Track Nexus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Impact Stats */}
      <section className="bg-gradient-to-br from-highlight to-highlight/90 text-white px-4 py-10 lg:px-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Combined Customer Impact</h2>
            <p className="text-white/90">Aggregate results from our customer success stories</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Users className="w-8 h-8 mx-auto mb-3 text-white" />
              <div className="text-3xl lg:text-4xl font-bold mb-2">3,250+</div>
              <div className="text-sm text-white/90">Employees Managed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-white" />
              <div className="text-3xl lg:text-4xl font-bold mb-2">+38%</div>
              <div className="text-sm text-white/90">Avg Productivity Gain</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <DollarSign className="w-8 h-8 mx-auto mb-3 text-white" />
              <div className="text-3xl lg:text-4xl font-bold mb-2">$9.5M+</div>
              <div className="text-sm text-white/90">Total Savings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Building2 className="w-8 h-8 mx-auto mb-3 text-white" />
              <div className="text-3xl lg:text-4xl font-bold mb-2">6</div>
              <div className="text-sm text-white/90">Industries Served</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">
              Case Studies
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transforming Businesses Across Industries
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From technology to healthcare, see how Track Nexus delivers measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-highlight/30 transition-all duration-300 group flex flex-col"
              >
                {/* Image - Square top */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.company}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-highlight text-white text-xs font-bold rounded-full shadow-lg">
                      {study.industry}
                    </span>
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full shadow-lg">
                      ROI: {study.roi}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-bold text-white drop-shadow-lg mb-1">
                      {study.company}
                    </h2>
                    <div className="flex items-center gap-3">
                      {Object.entries(study.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <span className="text-base font-bold text-white">{value}</span>
                          <span className="text-[10px] text-white/70 capitalize ml-1">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-highlight uppercase tracking-wider mb-1.5">Challenge</h3>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-highlight uppercase tracking-wider mb-1.5">Solution</h3>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{study.solution}</p>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-2 gap-2">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5">
                          <CheckCircle className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 font-medium leading-tight">{result}</span>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-r from-highlight/5 to-highlight/10 border border-highlight/15 rounded-lg p-4">
                      <p className="text-sm text-gray-800 italic leading-relaxed mb-3 line-clamp-2">
                        &ldquo;{study.testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-highlight/20 flex items-center justify-center">
                          <span className="text-highlight font-bold text-[10px]">
                            {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{study.testimonial.author}</span>
                        <span className="text-xs text-gray-500">· {study.testimonial.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-highlight" />
                      <span>{study.timeline}</span>
                    </div>
                    <Link
                      href={`/resources/case-studies/${study.id}`}
                      className="inline-flex items-center gap-1.5 text-highlight font-semibold hover:gap-2.5 transition-all text-sm"
                    >
                      Full Story
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
      <section className="bg-gradient-to-br from-deloitte-black to-gray-900 text-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of companies achieving remarkable results with Track Nexus. Start your transformation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="px-8 py-4 bg-highlight hover:bg-highlight/90 text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-all duration-300 border border-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">500+</div>
              <div className="text-sm text-gray-400">Companies Trust Us</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">24/7</div>
              <div className="text-sm text-gray-400">Customer Support</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">4.9/5</div>
              <div className="text-sm text-gray-400">Customer Rating</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
