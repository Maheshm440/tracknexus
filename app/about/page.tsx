"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Lightbulb, Eye, Users, Shield, Quote, Globe, Cpu, BrainCircuit, Building2, Rocket, BarChart3, Zap, Clock, ShieldCheck, LineChart, Smartphone, Cloud, Lock, Layers, ArrowRight } from "lucide-react"
import { StatsSection } from "@/components/stats-section"
import { FAQSection, FAQ } from "@/components/faq-section"
import { LogoTrain } from "@/components/logo-train"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
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

// Data
const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously pushing boundaries with AI-driven solutions that transform how teams work.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Building trust through honest, open communication and clear visibility into work patterns.",
  },
  {
    icon: Users,
    title: "Empowerment",
    description: "Enabling teams to achieve their full potential with actionable insights and smart tools.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Committed to ethical practices, data privacy, and treating every user with respect.",
  },
]

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Track Nexus was founded during the global shift to remote work, addressing a critical need.",
  },
  {
    year: "2021",
    title: "First 1,000 Users",
    description: "Reached our first major milestone with early adopters across India and beyond.",
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Launched AI-powered productivity insights and intelligent analytics features.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to 10+ countries with 50,000 active users worldwide.",
  },
  {
    year: "2024",
    title: "Enterprise Ready",
    description: "Launched enterprise features serving 100,000+ users across multiple industries.",
  },
]

const platformCapabilities = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Analytics",
    description: "Machine learning algorithms analyze work patterns and deliver actionable productivity insights in real time.",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: Clock,
    title: "Automatic Time Tracking",
    description: "Seamlessly captures work hours, breaks, and idle time without manual input — zero disruption to your workflow.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: LineChart,
    title: "Productivity Dashboards",
    description: "Comprehensive dashboards with real-time metrics, trends, and customizable reports for data-driven decisions.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Support",
    description: "Works across Windows, macOS, Linux, iOS, and Android — track productivity from any device, anywhere.",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Infrastructure",
    description: "Built on scalable cloud architecture with 99.99% uptime, processing over 1 billion events per day globally.",
    gradient: "from-sky-500 to-cyan-600",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    description: "End-to-end encryption, SOC 2 compliance, GDPR-ready, and role-based access controls to protect your data.",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: Layers,
    title: "50+ Integrations",
    description: "Connects with Slack, Jira, Asana, Google Workspace, Microsoft 365, and more for a unified workflow.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Globe,
    title: "Global Team Management",
    description: "Manage remote, hybrid, and in-office teams across time zones with location-aware tracking and reporting.",
    gradient: "from-pink-500 to-rose-600",
  },
]

const testimonials = [
  {
    quote: "Track Nexus transformed how we manage our remote team. The insights are invaluable for decision-making.",
    name: "Sarah Mitchell",
    role: "VP of Operations",
    company: "TechCorp Inc.",
    icon: Building2,
    color: "bg-cyan-500",
    result: "35% faster decisions",
  },
  {
    quote: "The AI-powered analytics helped us increase productivity by 40% in just 3 months. Remarkable results.",
    name: "James Chen",
    role: "CEO",
    company: "InnovateTech",
    icon: Rocket,
    color: "bg-purple-500",
    result: "40% productivity boost",
  },
  {
    quote: "Simple, intuitive, and powerful. Exactly what we needed for our growing distributed team.",
    name: "Emily Rodriguez",
    role: "HR Director",
    company: "GrowthFirst",
    icon: BarChart3,
    color: "bg-emerald-500",
    result: "50+ team members tracked",
  },
  {
    quote: "The best workforce management tool we've ever used. Our team's efficiency has never been higher.",
    name: "Michael Park",
    role: "CTO",
    company: "DataDriven Co.",
    icon: Zap,
    color: "bg-orange-500",
    result: "2x efficiency gains",
  },
]

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
      {/* Hero Section - Deloitte Style */}
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
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-deloitte-green/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-widest text-deloitte-green uppercase mb-4 font-medium">
              About Us
            </p>
            <h1 className="text-hero font-light mb-6 leading-tight">
              Building the Future of{" "}
              <span className="text-deloitte-green">Workforce Management</span>
            </h1>
            <p className="text-lg lg:text-xl text-deloitte-gray-300 max-w-3xl mx-auto leading-relaxed">
              We empower organizations with AI-driven insights to unlock their team&apos;s full potential,
              no matter where they work from.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <motion.div className="space-y-6" {...fadeInLeft}>
              <p className="text-sm tracking-widest text-highlight uppercase font-medium">
                Our Story
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                From a Simple Idea to a Global Solution
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The pandemic and its aftermath gave rise to a more flexible way of working — where employees could
                  operate from home, in the office, or remotely from anywhere. This shift created a new challenge for
                  organizations: how to maintain visibility, accountability, and productivity in an increasingly hybrid
                  and distributed work environment.
                </p>
                <p>
                  Recognizing this need, <span className="text-highlight font-semibold">Aravind Gajjela</span>, along
                  with co-founder <span className="text-highlight font-semibold">Sri Lakshmi</span>, set out to
                  build a solution that would transform how organizations understand and manage work.
                </p>
                <p>
                  That solution became <span className="font-semibold">Track Nexus</span> — a powerful workforce analytics platform that turns data from every
                  corner of the workplace into clear, actionable insights.
                </p>
              </div>
            </motion.div>

            {/* Right - AI Illustration */}
            <motion.div className="relative" {...fadeInRight}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80"
                  alt="AI-powered workforce analytics dashboard with data-driven productivity insights"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl">
                    <p className="text-sm font-semibold text-gray-900">AI-Powered Workforce Intelligence</p>
                    <p className="text-xs text-gray-600">Transforming how organizations understand and manage work</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Mission Statement */}
          <motion.div className="text-center mb-10 lg:mb-12" {...fadeInUp}>
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Our Mission
            </p>
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 max-w-4xl mx-auto leading-relaxed">
              &ldquo;To empower every organization with intelligent tools that transform how teams work,
              fostering productivity, transparency, and sustainable success.&rdquo;
            </blockquote>
          </motion.div>

          {/* Values Grid */}
          <div>
            <motion.p
              className="text-sm tracking-widest text-highlight uppercase font-medium text-center mb-8"
              {...fadeInUp}
            >
              Our Values
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  variants={staggerItem}
                >
                  <div className="w-14 h-14 bg-highlight/10 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-highlight" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Our Journey
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Key Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 lg:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-4 lg:left-1/2 w-4 h-4 bg-highlight rounded-full lg:-translate-x-1/2 z-10 ring-4 ring-white" />

                  {/* Content */}
                  <div className={`ml-12 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <span className="inline-block px-4 py-1 bg-highlight text-white text-sm font-bold rounded-full mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Powers Track Nexus Section */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Our Platform
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Powers Track Nexus
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive suite of AI-driven tools and enterprise-grade infrastructure designed to transform workforce management.
            </p>
          </motion.div>

          {/* Platform Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">1B+</div>
              <div className="text-sm text-gray-600 font-medium">Events Processed Daily</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">99.99%</div>
              <div className="text-sm text-gray-600 font-medium">Platform Uptime</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Integrations</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-highlight mb-2">10+</div>
              <div className="text-sm text-gray-600 font-medium">Countries Served</div>
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {platformCapabilities.map((cap, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-highlight/30"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className={`h-2 bg-gradient-to-r ${cap.gradient}`} />
                <div className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cap.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <cap.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-highlight transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="/product"
              className="inline-flex items-center gap-2 bg-highlight text-white px-8 py-3 rounded-full font-semibold hover:bg-highlight/90 transition-colors duration-300"
            >
              Explore All Features
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Testimonials
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 lg:p-8 rounded-2xl relative"
                variants={staggerItem}
              >
                <Quote className="w-8 h-8 text-highlight/20 absolute top-6 right-6" />
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center`}>
                    <testimonial.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.role}</p>
                    <p className="text-sm text-highlight">{testimonial.company}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Result</p>
                  <p className="text-sm font-semibold text-highlight">{testimonial.result}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <motion.p
            className="text-sm tracking-widest text-highlight uppercase font-medium text-center mb-6"
            {...fadeInUp}
          >
            Trusted by Industry Leaders
          </motion.p>
        </div>
        <LogoTrain />
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* FAQ Section */}
      <FAQSection
        faqs={aboutFaqs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Track Nexus"
        showImage={false}
      />
    </div>
  )
}
