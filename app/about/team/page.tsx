"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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

        <div className="relative mx-auto max-w-5xl text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-highlight/20 backdrop-blur-sm border border-highlight/30 rounded-full px-6 py-2 mb-6">
              <Users className="w-5 h-5 text-highlight" />
              <span className="text-sm font-semibold text-highlight uppercase tracking-widest">Our Team</span>
            </div>
            <h1 className="text-hero font-light mb-6 leading-tight">
              Meet the People Behind{" "}
              <span className="text-deloitte-green">Track Nexus</span>
            </h1>
            <p className="text-lg lg:text-xl text-deloitte-gray-300 max-w-3xl mx-auto leading-relaxed">
              A passionate team of innovators, engineers, and strategists dedicated to transforming workforce management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="bg-gray-50 px-4 py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Team Members</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">10+</div>
              <div className="text-sm text-gray-600 font-medium">Countries</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">15+</div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">100%</div>
              <div className="text-sm text-gray-600 font-medium">Remote Friendly</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Culture */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              How We Work
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built by Innovators, For Innovators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team thrives on collaboration, innovation, and a shared commitment to excellence in everything we build.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Culture Card 1 */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diverse & Inclusive</h3>
              <p className="text-gray-700 leading-relaxed">
                We celebrate diversity in backgrounds, perspectives, and experiences. Our team spans 10+ countries, bringing together unique viewpoints that drive innovation.
              </p>
            </motion.div>

            {/* Culture Card 2 */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation First</h3>
              <p className="text-gray-700 leading-relaxed">
                We encourage experimentation and creative problem-solving. Every team member has the autonomy to explore new ideas and challenge the status quo.
              </p>
            </motion.div>

            {/* Culture Card 3 */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100/50 p-8 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Work-Life Balance</h3>
              <p className="text-gray-700 leading-relaxed">
                We're 100% remote-friendly with flexible schedules. Our team members work when and where they're most productive, ensuring sustainable performance.
              </p>
            </motion.div>

            {/* Culture Card 4 */}
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 rounded-2xl border border-orange-200 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Obsessed</h3>
              <p className="text-gray-700 leading-relaxed">
                Every decision we make starts with our customers. We listen, learn, and iterate to deliver solutions that truly solve real-world problems.
              </p>
            </motion.div>

            {/* Culture Card 5 */}
            <motion.div
              className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-8 rounded-2xl border border-pink-200 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Learning</h3>
              <p className="text-gray-700 leading-relaxed">
                We invest in our team's growth through training programs, conferences, certifications, and knowledge-sharing sessions. Learning never stops here.
              </p>
            </motion.div>

            {/* Culture Card 6 */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-8 rounded-2xl border border-indigo-200 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-14 h-14 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Mindset</h3>
              <p className="text-gray-700 leading-relaxed">
                With team members across multiple time zones, we've mastered asynchronous collaboration and built a truly global culture that operates 24/7.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Benefits & Perks */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Why Join Us
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits & Perks for Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team members with comprehensive benefits, competitive compensation, and a supportive work environment.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Benefit 1 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Competitive Salary</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Industry-leading compensation packages with regular performance reviews, annual raises, and performance bonuses.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Health & Wellness</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Comprehensive health insurance (medical, dental, vision), mental health support, and wellness program stipends.
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Remote-First Culture</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Work from anywhere with flexible hours, home office stipends, and co-working space reimbursements.
              </p>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Learning & Development</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                $2,000 annual learning budget for courses, certifications, conferences, and professional development.
              </p>
            </motion.div>

            {/* Benefit 5 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Unlimited PTO</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Take time off when you need it with our unlimited paid time off policy, plus 10 company holidays annually.
              </p>
            </motion.div>

            {/* Benefit 6 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Equity & Ownership</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stock options for all employees — every team member has a stake in our success and growth.
              </p>
            </motion.div>

            {/* Benefit 7 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Latest Equipment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Top-tier MacBook/PC, monitors, accessories, and software licenses — everything you need to do your best work.
              </p>
            </motion.div>

            {/* Benefit 8 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Events</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Quarterly team retreats, virtual social events, and annual company offsite to build connections and celebrate wins.
              </p>
            </motion.div>

            {/* Benefit 9 */}
            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Clear career progression paths, mentorship programs, and internal mobility opportunities to advance your career.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How We Collaborate */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Collaboration
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Work Together
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team operates with transparency, trust, and cutting-edge tools that enable seamless collaboration across time zones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Process */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Async-First Communication</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      We default to written communication (Slack, Notion, Linear) so team members can work on their own schedule without being blocked by meetings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Documentation</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      All decisions, processes, and technical specs are documented in Notion — accessible to everyone, ensuring no knowledge silos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Regular Syncs</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Weekly team standups, monthly all-hands, and quarterly planning sessions keep everyone aligned on goals and progress.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Tools & Stats */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Our Tech Stack</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Slack</p>
                    <p className="text-xs text-gray-500">Communication</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Notion</p>
                    <p className="text-xs text-gray-500">Documentation</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Linear</p>
                    <p className="text-xs text-gray-500">Project Mgmt</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">GitHub</p>
                    <p className="text-xs text-gray-500">Code & CI/CD</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Figma</p>
                    <p className="text-xs text-gray-500">Design</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Zoom</p>
                    <p className="text-xs text-gray-500">Video Calls</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Team Collaboration Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Avg. Response Time</span>
                    <span className="text-sm font-bold text-highlight">Under 2 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-700">Meeting-Free Days/Week</span>
                    <span className="text-sm font-bold text-highlight">3 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-700">Documentation Coverage</span>
                    <span className="text-sm font-bold text-highlight">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-deloitte-black to-gray-900 text-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Join Our Growing Team
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            <motion.a
              href="/about/careers"
              className="inline-block bg-highlight hover:bg-highlight/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions →
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
