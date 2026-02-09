"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Phone,
  Mail,
  MapPin,
  User,
  MessageSquare,
  Calendar,
  Building2,
  HelpCircle,
  Send,
  Sparkles,
} from "lucide-react"
import { ContactPopup, FormContext } from "@/components/contact-popup"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    action: "support@tracknexus.in",
    color: "bg-highlight",
  },
  {
    icon: Calendar,
    title: "Schedule Demo",
    description: "See Track Nexus in action",
    action: "Book a Call",
    color: "bg-highlight",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm",
    action: "+91 40 1234 5678",
    color: "bg-highlight",
  },
  {
    icon: Building2,
    title: "Visit Office",
    description: "Come say hello at our HQ",
    action: "Get Directions",
    color: "bg-highlight",
  },
]

const offices = [
  {
    country: "India",
    flag: "IN",
    city: "Hyderabad",
    address: "PSR Prime Towers, 704 C, 7th Floor, Adjacent to DLF Cyber City, Gachibowli, Hyderabad, Telangana, India-500032.",
  },
  {
    country: "Saudi Arabia",
    flag: "SA",
    city: "Riyadh",
    address: "Futuro Tower, King Saud Rd, Office # 703, 7th floor, Riyadh 11564, Saudi Arabia.",
  },
  {
    country: "United States",
    flag: "US",
    city: "Delaware",
    address: "16192 Coastal Highway, Lewes, DE 19958, USA.",
  },
  {
    country: "UAE",
    flag: "AE",
    city: "Dubai",
    address: "IFZA Business Park, DDP, Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates.",
  },
]

const faqs = [
  {
    question: "What is Track Nexus and how does it help my team?",
    answer: "Track Nexus is an AI-powered employee productivity and time tracking solution. It helps teams monitor work hours, track application usage, capture periodic screenshots, and generate insightful reports to boost productivity and ensure accountability.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can explore the platform and see how it fits your team's needs before committing.",
  },
  {
    question: "How does Track Nexus protect employee privacy?",
    answer: "We take privacy seriously. Track Nexus offers configurable monitoring settings, blur options for sensitive content, and transparent tracking policies. Employees are always aware when monitoring is active, and admins can customize what data is collected.",
  },
  {
    question: "Can I integrate Track Nexus with other tools?",
    answer: "Absolutely! Track Nexus integrates seamlessly with popular project management tools, communication platforms, and HR systems. We support integrations with Slack, Microsoft Teams, Jira, Asana, and many more.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 email support, live chat during business hours, and dedicated account managers for enterprise clients. Our support team typically responds within 2-4 hours for priority issues.",
  },
  {
    question: "Is Track Nexus suitable for remote teams?",
    answer: "Track Nexus is specifically designed for remote and hybrid teams. It works across time zones, supports multiple devices, and provides real-time insights regardless of where your team members are located.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [formContext, setFormContext] = useState<FormContext>({ type: 'demo' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Reset form
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  const handleDemoClick = () => {
    setFormContext({ type: 'demo' })
    setIsContactPopupOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-deloitte-black text-white px-4 py-24 lg:px-8 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2]" />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-highlight/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating Animated Icons */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <motion.div
            className="absolute top-20 left-[10%] w-12 h-12 text-highlight/30"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mail className="w-full h-full" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-[15%] w-10 h-10 text-highlight/30"
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Phone className="w-full h-full" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-[20%] w-14 h-14 text-highlight/30"
            animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <MessageSquare className="w-full h-full" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-[25%] w-8 h-8 text-highlight/30"
            animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-4xl text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-highlight/20 border border-highlight/30 rounded-full text-highlight backdrop-blur-sm">
              We&apos;re here to help
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
              Get in Touch with{" "}
              <span className="text-highlight font-normal">Track Nexus</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have questions about our platform? Our team is ready to help you boost your team&apos;s productivity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="relative z-10 -mt-16 px-4 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            {...staggerContainer}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-highlight/30 overflow-hidden"
                {...staggerItem}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-highlight/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`inline-flex p-3 rounded-xl ${method.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-highlight transition-colors duration-300">{method.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{method.description}</p>
                <p className="text-sm font-semibold text-highlight">{method.action}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Free Trial & Demo CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Get Started with <span className="text-highlight font-normal">Track Nexus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose how you'd like to experience the power of Track Nexus. Start your free trial or schedule a personalized demo.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Trial Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              {...fadeInUp}
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Start Free Trial</h3>
                    <p className="text-white/80 text-sm">14 days free, no card required</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">All features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">No setup fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Full support</span>
                  </div>
                </div>

                <form onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
                  const originalText = submitBtn.innerHTML
                  submitBtn.disabled = true
                  submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Submitting...</span>'

                  const formDataObj = new FormData(form)
                  const data = Object.fromEntries(formDataObj)

                  try {
                    const response = await fetch('/api/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: data.name,
                        companyName: data.company,
                        companyEmail: data.email,
                        companySize: '10-50',
                        mobileNumber: '',
                        message: 'Free Trial Request from Contact Page',
                        formType: 'free-trial',
                        source: '/contact'
                      })
                    })

                    if (response.ok) {
                      alert(`Free Trial Started!\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\n\nWe will contact you shortly.`)
                      form.reset()
                    } else {
                      alert('Failed to submit. Please try again.')
                    }
                  } catch (error) {
                    console.error('Error:', error)
                    alert('Failed to submit. Please try again.')
                  } finally {
                    submitBtn.disabled = false
                    submitBtn.innerHTML = originalText
                  }
                }} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Start Free Trial
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Schedule Demo Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              {...fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Schedule Demo</h3>
                    <p className="text-white/80 text-sm">30-min personalized tour</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Live demo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Q&A included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Setup guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Free consult</span>
                  </div>
                </div>

                <form onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
                  const originalText = submitBtn.innerHTML
                  submitBtn.disabled = true
                  submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Submitting...</span>'

                  const formDataObj = new FormData(form)
                  const data = Object.fromEntries(formDataObj)

                  try {
                    const response = await fetch('/api/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: data.name,
                        companyName: '',
                        companyEmail: data.email,
                        companySize: '10-50',
                        mobileNumber: '',
                        message: `Demo Request - Preferred Time: ${data.time}`,
                        formType: 'demo',
                        preferredTime: data.time,
                        source: '/contact'
                      })
                    })

                    if (response.ok) {
                      alert(`Demo Scheduled!\n\nName: ${data.name}\nEmail: ${data.email}\nTime: ${data.time}\n\nWe will contact you shortly.`)
                      form.reset()
                    } else {
                      alert('Failed to submit. Please try again.')
                    }
                  } catch (error) {
                    console.error('Error:', error)
                    alert('Failed to submit. Please try again.')
                  } finally {
                    submitBtn.disabled = false
                    submitBtn.innerHTML = originalText
                  }
                }} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    name="time"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                  >
                    <option value="">Select Preferred Time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 7PM)</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Schedule Demo
                    <Calendar className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 px-4 py-6 lg:px-6 lg:py-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-center">
            {/* Left - Contact Form */}
            <motion.div
              className="bg-white rounded-xl p-4 lg:p-5 shadow-md border border-gray-100"
              {...fadeInUp}
            >
              <div className="mb-3">
                <h2 className="text-lg lg:text-xl font-medium text-gray-900 mb-1">
                  Let&apos;s start a <span className="text-highlight font-medium">conversation</span>
                </h2>
                <p className="text-xs text-gray-600">
                  Fill out the form and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-highlight focus:border-transparent focus:bg-white transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-highlight focus:border-transparent focus:bg-white transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-highlight focus:border-transparent focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your needs..."
                      rows={2}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-highlight hover:bg-highlight/90 text-white py-2 text-sm font-semibold rounded-md transition-all duration-300 shadow-md shadow-highlight/25 hover:shadow-highlight/40 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="relative h-[250px] lg:h-full min-h-[220px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />

              {/* Floating Card */}
              <motion.div
                className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg p-2.5 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center text-white font-medium text-[10px] border border-white">JD</div>
                    <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center text-white font-medium text-[10px] border border-white">SK</div>
                    <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center text-white font-medium text-[10px] border border-white">MR</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Join 500+ companies</p>
                    <p className="text-[10px] text-gray-500">Already using Track Nexus</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="bg-white px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center mb-14" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Our <span className="text-highlight font-normal">Global Offices</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              With offices across the globe, we&apos;re always close to you. Visit us or get in touch with your nearest office.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            {...staggerContainer}
          >
            {offices.map((office, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-highlight/30 hover:shadow-lg transition-all duration-300"
                {...staggerItem}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-highlight flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-highlight transition-colors duration-300">{office.country}</h3>
                    <p className="text-sm text-gray-500">{office.city}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{office.address}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <motion.div className="text-center mb-14" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-highlight/10 border border-highlight/30 rounded-full">
              <HelpCircle className="w-4 h-4 text-highlight" />
              <span className="text-sm font-semibold text-highlight">FAQ</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Frequently Asked <span className="text-highlight font-normal">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Track Nexus
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-highlight py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA after FAQ */}
          <motion.div
            className="text-center mt-12 p-8 bg-deloitte-black rounded-3xl shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-white/[0.2]" />
            </div>
            <div className="relative">
              <h3 className="text-2xl font-light text-white mb-3">
                Still have <span className="text-highlight font-normal">questions</span>?
              </h3>
              <p className="text-gray-300 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDemoClick}
                  className="bg-highlight hover:bg-highlight/90 text-white px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg shadow-highlight/30"
                >
                  Book a Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
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
