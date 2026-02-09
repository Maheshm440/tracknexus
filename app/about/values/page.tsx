



"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Users,
  Lightbulb,
  Shield,
  Target,
  Rocket,
  Award,
  Globe,
  CheckCircle2
} from "lucide-react"
import { useRouter } from "next/navigation"

// Animation variants with proper cubic-bezier easing
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Core values data
const coreValues = [
  {
    icon: Heart,
    title: "Customer First",
    subtitle: "Your success is our mission",
    description: "We prioritize customer needs above all else, building solutions that truly solve problems and deliver measurable value. From product development to customer support, every decision we make is guided by how it impacts our customers' success. We believe that when our customers succeed, we succeed—and this philosophy drives everything we do.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    principles: [
      "Listen actively to customer feedback and act on it quickly",
      "Deliver exceptional 24/7 support with <2 hour response time",
      "Build long-term partnerships focused on mutual growth",
      "Measure success by customer outcomes and ROI impact",
      "Provide transparent pricing with no hidden fees",
      "Offer comprehensive onboarding and training programs"
    ],
    stats: { metric: "98%", label: "Customer Satisfaction" }
  },
  {
    icon: Lightbulb,
    title: "Innovation & Excellence",
    subtitle: "Pushing boundaries daily",
    description: "We embrace cutting-edge technology and innovative thinking to stay ahead of industry trends and anticipate customer needs. Our commitment to excellence drives us to continuously improve our products, processes, and capabilities. We invest heavily in R&D and emerging technologies like AI and machine learning to deliver solutions that set industry standards.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&h=600&fit=crop",
    principles: [
      "Invest 15% of revenue in R&D and emerging technologies",
      "Encourage creative problem-solving with dedicated innovation time",
      "Maintain highest quality standards with rigorous testing",
      "Never ship features without customer validation",
      "Lead industry standards with thought leadership",
      "Celebrate learning from failures as much as successes"
    ],
    stats: { metric: "50+", label: "Product Updates/Year" }
  },
  {
    icon: Users,
    title: "Collaboration & Teamwork",
    subtitle: "Together we achieve more",
    description: "We believe in the power of diverse perspectives and collective intelligence. Our collaborative culture fosters open communication, knowledge sharing, and mutual support across all teams. When we work together, we achieve extraordinary results that benefit our customers, our company, and our team members.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    principles: [
      "Foster inclusive and diverse teams with equal opportunity",
      "Share knowledge openly through mentoring and training",
      "Support cross-functional collaboration with no silos",
      "Celebrate individual and team achievements equally",
      "Embrace different work styles and perspectives",
      "Create psychological safety for honest conversations"
    ],
    stats: { metric: "15+", label: "Countries Represented" }
  },
  {
    icon: Shield,
    title: "Integrity & Trust",
    subtitle: "Doing what's right, always",
    description: "We operate with unwavering integrity, transparency, and ethical standards that go beyond compliance. Trust is the foundation of every relationship we build—with customers, partners, and employees—and we protect it through honest communication, transparent practices, and reliable actions. Our reputation is our most valuable asset.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    principles: [
      "Be transparent in all communications and decision-making",
      "Honor commitments and deliver on every promise",
      "Protect customer data with enterprise-grade security",
      "Admit mistakes quickly and communicate remediation",
      "Maintain ethical business practices at all times",
      "Build trust through consistent, reliable actions"
    ],
    stats: { metric: "100%", label: "Data Security Compliance" }
  },
  {
    icon: Rocket,
    title: "Agility & Growth",
    subtitle: "Adapting to change rapidly",
    description: "We thrive in dynamic environments by staying agile, embracing change, and continuously learning. Our growth mindset enables us to pivot quickly and seize new opportunities as they emerge. We combine quick decision-making with strategic thinking to ensure sustainable growth that benefits all stakeholders.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    principles: [
      "Respond quickly to market changes with adaptive strategies",
      "Encourage continuous learning through training and development",
      "Experiment and iterate rapidly with customer feedback loops",
      "Scale efficiently without compromising quality or culture",
      "Stay ahead of market trends through research and innovation",
      "Empower teams to make decisions and take calculated risks"
    ],
    stats: { metric: "3x", label: "Growth Year-over-Year" }
  },
  {
    icon: Globe,
    title: "Social Responsibility",
    subtitle: "Making a positive impact",
    description: "We are committed to making a positive impact on society and the environment. Our business practices reflect our dedication to sustainability, diversity, and giving back to communities worldwide. We believe companies have a responsibility to be forces for good—economically, socially, and environmentally.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    principles: [
      "Achieve carbon neutrality by 2025 and net-zero by 2030",
      "Support diversity and inclusion with 50% diverse hiring goals",
      "Donate 1% of profits to education programs worldwide",
      "Partner exclusively with ethical suppliers and vendors",
      "Provide paid volunteer time for community service",
      "Ensure equal pay and opportunities for all employees"
    ],
    stats: { metric: "Carbon", label: "Neutral by 2025" }
  },
]

export default function ValuesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-deloitte-black text-white px-4 py-12 lg:px-8 lg:py-16">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
          >
            <source src="https://player.vimeo.com/external/418479660.hd.mp4?s=194f4275d6efc748dca8fc7dfa5d29ba94af84e7&profile_id=174" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-deloitte-black/80 via-deloitte-black/60 to-deloitte-black" />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2]" />
        </div>

        <div className="relative mx-auto max-w-6xl z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as const }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-highlight/20 backdrop-blur-sm border border-highlight/30 rounded-full px-6 py-2 inline-flex items-center gap-2">
                <Award className="w-5 h-5 text-highlight" />
                <span className="text-sm font-semibold text-highlight">Our Core Values</span>
              </div>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
              The Principles That{" "}
              <span className="text-highlight font-normal">Guide Us</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our values are more than words on a page—they're the foundation of everything we do.
              They shape our culture, drive our decisions, and define who we are as a company.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => router.push("/about")}
                className="bg-highlight hover:bg-highlight/90 text-white px-8 py-6 text-base font-bold"
              >
                Learn About Our Team
              </Button>
              <Button
                size="lg"
                onClick={() => router.push("/contact")}
                variant="outline"
                className="bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 px-8 py-6 text-base font-bold"
              >
                Join Our Mission
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Overview Stats */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">6</div>
              <div className="text-sm text-gray-600 font-medium">Core Values</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">100%</div>
              <div className="text-sm text-gray-600 font-medium">Team Alignment</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">Companies Trusting Us</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">15+</div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Our <span className="text-highlight font-normal">Six Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These values are woven into the fabric of our company, guiding every decision,
              interaction, and innovation we pursue.
            </p>
          </motion.div>

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => {
              const Icon = value.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-highlight/30 ${
                    isEven ? "" : ""
                  }`}
                >
                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Image Section */}
                    <div className="relative lg:w-1/2 h-64 lg:h-96">
                      <Image
                        src={value.image}
                        alt={value.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Floating stat badge */}
                      <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-xl">
                        <div className="text-2xl font-bold text-highlight">{value.stats.metric}</div>
                        <div className="text-xs text-gray-600 font-medium">{value.stats.label}</div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-highlight/10 p-3 rounded-xl">
                          <Icon className="w-8 h-8 text-highlight" />
                        </div>
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            {value.title}
                          </h3>
                          <p className="text-sm text-highlight font-semibold">{value.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6">
                        {value.description}
                      </p>

                      {/* Principles List */}
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          How We Live This Value
                        </p>
                        {value.principles.map((principle, i) => (
                          <div key={i} className="flex items-start gap-3 group">
                            <CheckCircle2 className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm text-gray-700">{principle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-12 lg:px-8 lg:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              See Our Values <span className="text-highlight font-normal">In Action</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Watch how we bring our core values to life every day
            </p>
          </motion.div>

          {/* Main Featured Video */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <video
                controls
                poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
                className="w-full aspect-video object-cover"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pointer-events-none">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Our Story: Building a Culture of Excellence
                </h3>
                <p className="text-white/90 text-sm">
                  Learn how Track Nexus transforms workforce management through innovation, integrity, and customer focus
                </p>
              </div>
            </div>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div
              variants={staggerItem}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <video
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play().catch(() => {})
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget
                    video.pause()
                    video.currentTime = 0
                  }}
                  poster="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
                  className="w-full aspect-video object-cover"
                >
                  <source src="https://player.vimeo.com/external/371433846.hd.mp4?s=4b1e9d7a0f47fbb0c82fc6a6c8e3b60b5bbd7b20&profile_id=174" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <h4 className="text-lg font-bold text-white mb-1">
                    Innovation in Every Sprint
                  </h4>
                  <p className="text-white/80 text-sm">
                    How our team collaborates to deliver cutting-edge AI solutions
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <video
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play().catch(() => {})
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget
                    video.pause()
                    video.currentTime = 0
                  }}
                  poster="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
                  className="w-full aspect-video object-cover"
                >
                  <source src="https://player.vimeo.com/external/373181637.hd.mp4?s=e317c5f3cc35c19b65945a03bc0e32a6e6fdcb75&profile_id=174" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <h4 className="text-lg font-bold text-white mb-1">
                    Customer Success at Our Core
                  </h4>
                  <p className="text-white/80 text-sm">
                    Meet the team dedicated to your success
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values in Action Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Real-World <span className="text-highlight font-normal">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Measurable results from living our values every day
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div
              variants={staggerItem}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-highlight/30 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Video Thumbnail */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <video
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play().catch(() => {})
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget
                    video.pause()
                    video.currentTime = 0
                  }}
                  poster="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  className="w-full h-48 object-cover"
                >
                  <source src="https://player.vimeo.com/external/445965468.hd.mp4?s=c32f38e23c3e767bd46a4db44f93fc1b8c9f8613&profile_id=174" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
              </div>

              <div className="bg-highlight/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-highlight" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customer Success Stories
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We've helped over 500 companies improve productivity by an average of 40% through
                personalized onboarding, dedicated support, and continuous product improvements
                based on their feedback.
              </p>
              <div className="text-sm text-highlight font-semibold cursor-pointer hover:underline">
                → Watch success stories
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-highlight/30 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Video Thumbnail */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <video
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play().catch(() => {})
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget
                    video.pause()
                    video.currentTime = 0
                  }}
                  poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
                  className="w-full h-48 object-cover"
                >
                  <source src="https://player.vimeo.com/external/392676852.hd.mp4?s=8c6fc2b0f5ee4c79e8480f9a7d3e05e57b2ad8e0&profile_id=174" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
              </div>

              <div className="bg-highlight/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-highlight" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation Lab
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our team dedicates 20% of their time to exploring new technologies and experimenting
                with innovative solutions. This investment has led to breakthrough AI features that
                set industry standards.
              </p>
              <div className="text-sm text-highlight font-semibold cursor-pointer hover:underline">
                → Explore innovations
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-highlight/30 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Video Thumbnail */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <video
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play().catch(() => {})
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget
                    video.pause()
                    video.currentTime = 0
                  }}
                  poster="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop"
                  className="w-full h-48 object-cover"
                >
                  <source src="https://player.vimeo.com/external/434045526.hd.mp4?s=2db5e3f6f97f8e1f8da2e49c8bdea91b50ee7e93&profile_id=174" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
              </div>

              <div className="bg-highlight/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-highlight" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Impact
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We've committed to carbon neutrality by 2025, support diversity initiatives with
                50% of our hiring, and donate 1% of profits to education programs in underserved
                communities worldwide.
              </p>
              <div className="text-sm text-highlight font-semibold cursor-pointer hover:underline">
                → View impact report
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonial Videos */}
      <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Hear From Our <span className="text-highlight font-normal">Customers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from companies that share and experience our values
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Testimonial Video 1 */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative">
                <video
                  controls
                  poster="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                  className="w-full aspect-video object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">CEO, TechCorp</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "Track Nexus doesn't just talk about customer success—they live it every day. Their dedication transformed our operations."
                </p>
              </div>
            </motion.div>

            {/* Testimonial Video 2 */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative">
                <video
                  controls
                  poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
                  className="w-full aspect-video object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                    alt="Michael Chen"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Michael Chen</h4>
                    <p className="text-sm text-gray-600">CTO, InnovateLabs</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "The innovation and agility we've experienced with Track Nexus is unmatched. They're always ahead of the curve."
                </p>
              </div>
            </motion.div>

            {/* Testimonial Video 3 */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative">
                <video
                  controls
                  poster="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop"
                  className="w-full aspect-video object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces"
                    alt="Emily Rodriguez"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-600">VP Operations, GlobalTech</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "Their integrity and transparency build trust. We knew Track Nexus was the right partner from day one."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-deloitte-black text-white px-4 py-12 lg:px-8 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl lg:text-5xl font-light mb-4"
            {...fadeInUp}
          >
            Share Our Values?{" "}
            <span className="text-highlight font-normal">Join Our Team</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're always looking for passionate individuals who align with our values
            and want to make a meaningful impact.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              className="bg-highlight hover:bg-highlight/90 text-white px-10 py-7 text-lg font-bold shadow-2xl"
            >
              Get in Touch
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/about")}
              className="bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 px-10 py-7 text-lg font-bold"
            >
              Meet the Team
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
