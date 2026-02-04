"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Rocket,
  Coffee,
  Home,
  GraduationCap,
  Umbrella,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

// Animation variants
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

// Job openings data
const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote (US, EU)",
    type: "Full-time",
    salary: "$120k - $180k",
    description: "Build scalable web applications using React, Node.js, and cloud technologies. Lead technical decisions and mentor junior developers.",
    requirements: ["5+ years experience", "React & Node.js expert", "AWS/Azure knowledge", "Strong system design skills"]
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time",
    salary: "$100k - $150k",
    description: "Create intuitive user experiences and beautiful interfaces. Work closely with engineering and product teams to ship features.",
    requirements: ["4+ years UI/UX experience", "Figma mastery", "Design systems knowledge", "Portfolio required"]
  },
  {
    id: 3,
    title: "Data Scientist",
    department: "AI/ML",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$130k - $190k",
    description: "Develop machine learning models for workforce analytics. Turn data into actionable insights for our customers.",
    requirements: ["PhD or 5+ years experience", "Python & ML frameworks", "Statistical analysis", "Big data experience"]
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$80k - $120k",
    description: "Build strong relationships with enterprise customers. Ensure they achieve their goals and maximize value from Track Nexus.",
    requirements: ["3+ years CS experience", "SaaS background", "Excellent communication", "Data-driven mindset"]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote (Global)",
    type: "Full-time",
    salary: "$110k - $160k",
    description: "Build and maintain our cloud infrastructure. Automate deployments and ensure 99.9% uptime for our platform.",
    requirements: ["4+ years DevOps", "Kubernetes & Docker", "CI/CD pipelines", "Monitoring & observability"]
  },
  {
    id: 6,
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Create compelling content that drives awareness and engagement. Lead our blog, social media, and content strategy.",
    requirements: ["3+ years content marketing", "B2B SaaS experience", "SEO knowledge", "Strong writing skills"]
  },
]

// Benefits data
const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Salary",
    description: "Industry-leading compensation with equity options for all employees",
    color: "bg-green-500"
  },
  {
    icon: Umbrella,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance for you and family",
    color: "bg-blue-500"
  },
  {
    icon: Home,
    title: "Remote-First",
    description: "Work from anywhere with flexible hours and home office stipend",
    color: "bg-purple-500"
  },
  {
    icon: Coffee,
    title: "Unlimited PTO",
    description: "Take time off when you need it with no tracking or limits",
    color: "bg-orange-500"
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "$2,000 annual budget for courses, conferences, and books",
    color: "bg-cyan-500"
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description: "Clear advancement paths with mentorship and leadership opportunities",
    color: "bg-pink-500"
  },
]

// Company values for culture section
const cultureValues = [
  {
    title: "Work-Life Balance",
    description: "We believe in sustainable productivity. No late nights or weekend work expected.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    stats: "40 hrs/week average"
  },
  {
    title: "Diversity & Inclusion",
    description: "Building a team that represents the world. 50% diverse hiring commitment.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
    stats: "50+ countries represented"
  },
  {
    title: "Innovation Culture",
    description: "20% time for side projects. Regular hackathons and innovation challenges.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    stats: "Monthly hackathons"
  },
]

export default function CareersPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Video */}
      <section className="relative overflow-hidden bg-deloitte-black text-white px-4 py-16 lg:px-8 lg:py-24">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
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
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-highlight/20 backdrop-blur-sm border border-highlight/30 rounded-full px-6 py-2 inline-flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-highlight" />
                <span className="text-sm font-semibold text-highlight">Join Our Team</span>
              </div>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
              Build the Team Behind{" "}
              <span className="text-highlight font-normal">Track Nexus</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the team creating Track Nexus, the leading employee monitoring and workforce management system.
              Remote-first, competitive compensation, and meaningful work.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-highlight hover:bg-highlight/90 text-white px-8 py-6 text-base font-bold"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => router.push("/about")}
                variant="outline"
                className="bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 px-8 py-6 text-base font-bold"
              >
                Learn About Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
              <div className="text-4xl font-bold text-highlight mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Team Members</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">15+</div>
              <div className="text-sm text-gray-600 font-medium">Countries</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">100%</div>
              <div className="text-sm text-gray-600 font-medium">Remote Friendly</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">4.8/5</div>
              <div className="text-sm text-gray-600 font-medium">Glassdoor Rating</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="px-4 py-12 lg:px-8 lg:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Our <span className="text-highlight font-normal">Culture</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Building Track Nexus means building a place where talented people thrive
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-highlight/90 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">
                      {value.stats}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Benefits & <span className="text-highlight font-normal">Perks</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We invest in our team's success, health, and happiness
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-highlight/30 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Open <span className="text-highlight font-normal">Positions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {jobOpenings.length} opportunities to make an impact
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {jobOpenings.map((job) => (
              <motion.div
                key={job.id}
                variants={staggerItem}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-highlight/30 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-highlight transition-colors duration-300">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-highlight" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-highlight" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-highlight" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-highlight">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push("/contact")}
                    className="bg-highlight hover:bg-highlight/90 text-white px-6 font-bold whitespace-nowrap"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {job.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {job.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 mb-3">
              Don't see the perfect role? We're always looking for talented people.
            </p>
            <Button
              onClick={() => router.push("/contact")}
              variant="outline"
              className="border-2 border-highlight text-highlight hover:bg-highlight/10"
            >
              Send Us Your Resume
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            {...fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Our <span className="text-highlight font-normal">Hiring Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparent, respectful, and designed to find the best mutual fit
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { step: "1", title: "Apply", description: "Submit your application and we'll review it within 3 days", icon: "📝" },
              { step: "2", title: "Screening", description: "30-minute call to discuss your background and role fit", icon: "📞" },
              { step: "3", title: "Interview", description: "Technical or role-specific interview with the team", icon: "💻" },
              { step: "4", title: "Offer", description: "Receive offer within 48 hours and join the team!", icon: "🎉" },
            ].map((stage, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    {stage.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-highlight rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {stage.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{stage.description}</p>
              </motion.div>
            ))}
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
            Ready to Make an{" "}
            <span className="text-highlight font-normal">Impact</span>?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the team building Track Nexus and transforming how companies manage their workforce.
            Your next career move starts here.
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
              onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-highlight hover:bg-highlight/90 text-white px-10 py-7 text-lg font-bold shadow-2xl"
            >
              View All Positions
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              className="bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 px-10 py-7 text-lg font-bold"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
