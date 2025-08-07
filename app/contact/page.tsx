"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, User, MessageSquare } from "lucide-react"
import { ContactPopup, FormContext } from "@/components/contact-popup"

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [formContext, setFormContext] = useState<FormContext>({ type: 'demo' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const handleDemoClick = () => {
    setFormContext({ type: 'demo' })
    setIsContactPopupOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark with floating icons */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white px-4 py-20 lg:px-8 lg:py-32">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/contact/banner.mp4" type="video/mp4" />
          </video>
          {/* Video overlay to maintain text readability */}
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        {/* Floating Tech Icons Background */}
        <div className="absolute inset-0 opacity-20 z-10">
          {/* Animated floating icons */}
          <motion.div
            className="absolute top-20 left-10 w-8 h-8 text-blue-400"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <User className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute top-40 right-20 w-6 h-6 text-cyan-400"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Phone className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-1/4 w-7 h-7 text-green-400"
            animate={{
              y: [0, -25, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <MessageSquare className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute top-60 left-1/2 w-5 h-5 text-purple-400"
            animate={{
              y: [0, -30, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Mail className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-1/3 w-6 h-6 text-yellow-400"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <MapPin className="w-full h-full" />
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center z-20">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-wider">Contact Track Nexus</h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get in Touch with Our Team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Buttons Section */}
      {/* <section className="bg-white px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to see <span className="text-highlight">Track Nexus</span> in action?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Schedule a personalized demo and discover how Track Nexus can transform your team's productivity
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDemoClick}
                  className="bg-highlight hover:bg-highlight/90 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Demo
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDemoClick}
                  variant="outline"
                  className="border-highlight text-highlight hover:bg-highlight hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Book Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Contact Form Section */}
      <section className="bg-gray-50 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left - Contact Form */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col"
              {...fadeInLeft}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Let&apos;s get started</h2>
                <p className="text-gray-600">Start free — no setup fees, no credit card needed</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name*
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Your Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email*
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      placeholder="Enter Your Email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      />
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex-1">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative h-full">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any quick notes for us"
                      className="w-full h-32 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                  <Button
                    type="submit"
                    className="w-full bg-[#096EB6] hover:bg-[#096EB6]/80 text-white py-3 text-lg font-semibold rounded-lg transition-colors"
                  >
                    Submit
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Right - Video */}
            <motion.div className="relative h-full" {...fadeInRight} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-full flex items-center justify-center">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                >
                  <source src="/images/contact/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left - World Map */}
            <motion.div className="relative h-full" {...fadeInLeft} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl p-4 overflow-hidden h-full flex items-center justify-center border-2 border-gray-200 shadow-lg">
                <Image
                  src="/images/contact/world-map.png"
                  alt="World map showing office locations"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Right - Company Details */}
            <motion.div className="h-full flex flex-col justify-start" {...fadeInRight} viewport={{ once: true }}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">APPIT SOFTWARE SOLUTIONS PVT LTD</h2>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-highlight" />
                    <h3 className="text-lg font-semibold text-highlight">Email Support</h3>
                  </div>
                  <p className="text-gray-700 font-medium underline">Support@tracknextus.in</p>
                </div>

                {/* Addresses */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-highlight" />
                    <h3 className="text-lg font-semibold text-highlight">Address</h3>
                  </div>

                  <div className="space-y-4">
                    {/* India Office */}
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">IND:</p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        PSR Prime Towers, 704 C, 7th Floor, Adjacent to DLF Cyber City, Gachibowli, Hyderabad,
                        Telangana, India-500032.
                      </p>
                    </div>

                    {/* Saudi Office */}
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">SAUDI:</p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Futuro Tower, King Saud Rd, Office # 703, 7th floor, Riyadh 11564, Saudi Arabia.
                      </p>
                    </div>

                    {/* USA Office */}
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">USA:</p>
                      <p className="text-gray-700 text-sm leading-relaxed">16192 Coastal Highway, Lewes, DE 19958, USA.</p>
                    </div>

                    {/* UAE Office */}
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">UAE:</p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        IFZA Business Park, DDP, Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
        context={formContext}
      />
    </div>
  )
}
