"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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

const teamMembers = [
  {
    name: "Aravind Gajjela",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in enterprise software, passionate about transforming workforce management through AI",
    expertise: "Strategy, Product Vision, Enterprise Growth",
    achievement: "Led 3 successful SaaS exits",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Sri Lakshmi",
    role: "Co-Founder & COO",
    bio: "Operations expert driving global expansion with expertise in scaling distributed teams across 10+ countries",
    expertise: "Operations, Team Building, Global Expansion",
    achievement: "Scaled operations to 50K+ users",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Vikram Sharma",
    role: "CTO",
    bio: "AI & ML expert building intelligent systems that power productivity insights for thousands of organizations",
    expertise: "AI/ML, System Architecture, Cloud Infrastructure",
    achievement: "Built AI engine processing 1B+ events/day",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    bio: "User-centric design advocate committed to creating intuitive experiences that delight users and drive adoption",
    expertise: "Product Strategy, UX Design, Analytics",
    achievement: "Achieved 95% user satisfaction score",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Rahul Menon",
    role: "Head of Engineering",
    bio: "Scalability and performance specialist ensuring 99.9% uptime while managing complex distributed systems",
    expertise: "Distributed Systems, DevOps, Performance",
    achievement: "Maintained 99.99% uptime for 2 years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Ananya Singh",
    role: "Head of Customer Success",
    bio: "Dedicated to client satisfaction and ensuring every customer achieves their productivity goals with Track Nexus",
    expertise: "Customer Success, Onboarding, Support",
    achievement: "98% customer retention rate",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Karthik Reddy",
    role: "Lead Data Scientist",
    bio: "Transforming complex data into actionable insights that help teams work smarter and achieve more",
    expertise: "Machine Learning, Predictive Analytics, Data Engineering",
    achievement: "Developed 40% accuracy improvement in predictions",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Meera Nair",
    role: "Head of Marketing",
    bio: "Building the Track Nexus brand globally through authentic storytelling and customer-first campaigns",
    expertise: "Brand Strategy, Content Marketing, Growth",
    achievement: "Grew brand awareness by 300% in 18 months",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces",
  },
]

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

      {/* Leadership Team */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-8"
            {...fadeInUp}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-4">
              Leadership Team
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experienced Leaders Driving Innovation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in enterprise software, AI, operations, and customer success.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-highlight/30"
                variants={staggerItem}
                whileHover={{ y: -8 }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Achievement Badge */}
                  <div className="absolute top-4 right-4 bg-highlight text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ⭐ Top Performer
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Name & Role */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-highlight transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-highlight font-semibold mb-3">{member.role}</p>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.split(', ').slice(0, 2).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Key Achievement</p>
                    <p className="text-sm font-medium text-gray-900">{member.achievement}</p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-highlight rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
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
