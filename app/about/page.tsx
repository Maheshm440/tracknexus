"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Target, Lightbulb, Clock, Shield, TrendingUp, Eye, BarChart } from "lucide-react"
import { StatsSection } from "@/components/stats-section"
import { FAQSection, FAQ } from "@/components/faq-section"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const aboutFaqs: FAQ[] = [
  {
    id: 1,
    question: "What is the mission of Track Nexus?",
    answer: "Our mission at Track Nexus is to help businesses unlock their full potential by offering intelligent time tracking and productivity solutions. We aim to empower teams with tools that drive efficiency, transparency, and smarter decision-making.",
  },
  {
    id: 2,
    question: "Who founded Track Nexus and why?",
    answer: "Track Nexus was founded by a group of technology and business professionals who saw the need for better visibility into how teams spend their time. Their goal was to create a platform that simplifies performance management and enhances workplace productivity.",
  },
  {
    id: 3,
    question: "What makes Track Nexus different from other time tracking tools?",
    answer: "Track Nexus stands out through its holistic approach—it not only tracks time but also provides deep productivity insights, behavior analytics, and customizable reporting. Our platform is built with user experience, privacy, and scalability in mind.",
  },
  {
    id: 4,
    question: "Where is Track Nexus based?",
    answer: "Track Nexus operates globally with its core team headquartered in India. We serve clients across various industries and regions, supporting businesses of all sizes.",
  },
  {
    id: 5,
    question: "What industries does Track Nexus serve?",
    answer: "We serve a wide range of industries, including IT, BPO, remote teams, education, finance, and more. Whether you're a startup or a large enterprise, Track Nexus adapts to your unique productivity needs.",
  },
  {
    id: 6,
    question: "How can I get in touch with the Track Nexus team?",
    answer: "You can reach out to us through our Contact Us page, or connect via email and social platforms. We're always happy to answer questions, schedule a demo, or explore partnership opportunities.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Black Background */}
      <section className="relative bg-black text-white px-4 py-20 lg:px-8 lg:py-32 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/aboutus/banner.mp4" type="video/mp4" />
          </video>
          {/* Video overlay to maintain text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="relative mx-auto max-w-6xl text-center z-20">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-wider">About Us</h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet the Team Behind Track Nexus Productivity Revolution
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div className="space-y-6" {...fadeInLeft} viewport={{ once: true }}>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The pandemic and its aftermath gave rise to a more flexible way of working — where employees could
                  operate from home, in the office, or remotely from anywhere. This shift created a new challenge for
                  organizations: how to maintain visibility, accountability, and productivity in an increasingly hybrid
                  and distributed work environment.
                </p>
                <p>
                  Recognizing this need, <span className="text-highlight font-semibold">Aravind Gajjela</span>, along
                  with co-founders, and <span className="text-highlight font-semibold">Sri Lakshmi</span>, set out to
                  build a solution that would transform how organizations understand and manage work.
                </p>
                <p>
                  That solution became Track Nexus — a powerful workforce analytics platform that turns data from every
                  corner of the workplace into clear, actionable insights. Track Nexus helps businesses monitor
                  performance, streamline workflows, and make smarter decisions in real time — empowering teams to
                  thrive, no matter where they work from.
                </p>
              </div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div className="relative" {...fadeInRight} viewport={{ once: true }}>
              <Image
                src="/images/aboutus/manillustrating.png"
                alt="Person analyzing dashboard data with multiple screens showing analytics"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center" {...fadeInUp} viewport={{ once: true }}>
            <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed">
              &ldquo;Unlock peak performance with <span className="text-highlight">Track Nexus</span>, the all-in-one trusted
              time tracking platform!&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Why Track Nexus Section */}
      <section className="bg-gray-50 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <motion.div className="relative" {...fadeInLeft} viewport={{ once: true }}>
              <Image
                src="/images/aboutus/why.png"
                alt="Track Nexus dashboard showing engagement rate statistics and analytics"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div className="space-y-6" {...fadeInRight} viewport={{ once: true }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why <span className="text-highlight">Track Nexus</span>?
              </h2>
              <h3 className="text-xl font-semibold text-highlight mb-4">
                Boost Productivity. Enhance Accountability. Gain Clarity.
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Track Nexus is the all-in-one employee productivity and time tracking software trusted by businesses of all sizes. It helps you take control of your team&apos;s time, performance, and workflow with real-time insights and automation.
                </p>
              </div>

              {/* Five Key Benefits */}
              <div className="space-y-4 mt-6">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-highlight mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Track Time with Precision</h4>
                    <p className="text-gray-700">Automatically capture time spent on tasks, apps, and websites — no manual input required.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-highlight mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Empower Your Team</h4>
                    <p className="text-gray-700">Promote focus, reduce distractions, and enable smarter work habits with data-backed feedback.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-highlight mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Simplify Remote Work</h4>
                    <p className="text-gray-700">Perfect for hybrid or remote teams — monitor activity and performance from anywhere.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-highlight mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Boost Transparency</h4>
                    <p className="text-gray-700">Know exactly how time is spent. Spot inefficiencies and improve project planning with detailed reports.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-highlight mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Drive Business Growth</h4>
                    <p className="text-gray-700">More productivity, better time utilization, and smarter decisions lead to improved ROI.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our <span className="text-highlight">Core Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content - Values */}
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* What We Stand For */}
              <motion.div className="flex items-start space-x-4" variants={fadeInUp}>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-highlight" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-highlight mb-3">What We Stand For</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Track Nexus</span> delivers ethical, user-friendly time tracking to
                    boost productivity and trust. Trusted by 100,000+ users, we empower teams with real-time insights
                    for a smarter, human-first workplace.
                  </p>
                </div>
              </motion.div>

              {/* Our Vision & Purpose */}
              <motion.div className="flex items-start space-x-4" variants={fadeInUp}>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-highlight" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-highlight mb-3">Our Vision & Purpose</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Track Nexus</span> empowers organizations with ethical, AI-driven
                    workforce optimization, fostering smarter work and sustainable success. We champion transparency and
                    growth through privacy-respecting tools that support teams and elevate performance.
                  </p>
                </div>
              </motion.div>

              {/* How It Started */}
              <motion.div className="flex items-start space-x-4" variants={fadeInUp}>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-highlight" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-highlight mb-3">How It Started</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Track Nexus</span> was created to help managers track work and
                    progress without micromanaging. By replacing scattered tools and check-ins with a smart, all-in-one
                    solution, we bring clarity, accountability, and focus to teams—saving time and building trust.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div className="relative" {...fadeInRight} viewport={{ once: true }}>
              <Image
                src="/images/aboutus/core_values.png"
                alt="Professional team members with analytics dashboards showing business metrics"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* FAQ Section */}
      <FAQSection 
        faqs={aboutFaqs}
        title="FAQs"
        subtitle="Frequently asked questions about Track Nexus"
        showImage={true}
      />
    </div>
  )
}
