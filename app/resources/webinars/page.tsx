"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Video, Calendar, Clock, Users, Play, ArrowRight, Star, BookOpen, BarChart3, Shield, Zap, Globe, CheckCircle, Mail, X, User, Building, ChevronRight, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { useState, useRef } from "react"

const upcomingWebinars = [
  {
    id: "future-hybrid-work",
    title: "The Future of Hybrid Work: Trends & Strategies",
    description: "Join industry experts as they explore emerging trends in hybrid work and share proven strategies for building successful flexible work models.",
    date: "February 15, 2026",
    time: "2:00 PM EST",
    duration: "60 min",
    speakers: ["Dr. Sarah Chen", "Mark Rodriguez"],
    attendees: "245 registered",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    status: "upcoming",
    category: "Workforce Management",
  },
  {
    id: "ai-workforce-analytics",
    title: "AI-Powered Workforce Analytics: Practical Applications",
    description: "Discover how leading companies leverage AI to transform workforce management and drive data-driven decisions.",
    date: "February 22, 2026",
    time: "1:00 PM EST",
    duration: "45 min",
    speakers: ["Lisa Wang", "James Wilson"],
    attendees: "198 registered",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    status: "upcoming",
    category: "AI & Analytics",
  },
  {
    id: "compliance-data-privacy",
    title: "Compliance & Data Privacy in Employee Monitoring",
    description: "Navigate the complex landscape of data privacy regulations and ensure your monitoring practices stay compliant across regions.",
    date: "March 5, 2026",
    time: "11:00 AM EST",
    duration: "50 min",
    speakers: ["Rachel Foster, JD", "David Kim"],
    attendees: "312 registered",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    status: "upcoming",
    category: "Compliance",
  },
  {
    id: "scaling-remote-teams",
    title: "Scaling Remote Teams: From 50 to 5,000 Employees",
    description: "Real-world case studies from companies that successfully scaled their remote workforce while maintaining culture and productivity.",
    date: "March 18, 2026",
    time: "3:00 PM EST",
    duration: "55 min",
    speakers: ["Amanda Torres", "Ryan Mitchell"],
    attendees: "176 registered",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    status: "upcoming",
    category: "Remote Work",
  },
]

const onDemandWebinars = [
  {
    id: "remote-productivity",
    title: "Mastering Remote Team Productivity",
    description: "Learn actionable strategies to boost productivity and engagement across distributed teams.",
    date: "January 15, 2026",
    duration: "55 min",
    views: "1,234 views",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "Productivity",
    rating: 4.8,
  },
  {
    id: "time-tracking-best-practices",
    title: "Time Tracking Best Practices for Modern Teams",
    description: "Essential tips and tricks for implementing effective time tracking in your organization.",
    date: "December 20, 2025",
    duration: "50 min",
    views: "2,156 views",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
    category: "Time Tracking",
    rating: 4.9,
  },
  {
    id: "employee-monitoring-ethics",
    title: "Employee Monitoring: Balancing Privacy and Productivity",
    description: "Navigate the ethical considerations of workplace monitoring with expert guidance.",
    date: "November 28, 2025",
    duration: "45 min",
    views: "1,890 views",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
    category: "Compliance",
    rating: 4.7,
  },
  {
    id: "building-trust-remote",
    title: "Building Trust in Remote-First Organizations",
    description: "Explore frameworks for creating a culture of trust that drives accountability without micromanagement.",
    date: "November 10, 2025",
    duration: "48 min",
    views: "3,421 views",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    category: "Remote Work",
    rating: 4.9,
  },
  {
    id: "workforce-planning-2026",
    title: "Strategic Workforce Planning for 2026",
    description: "Data-driven approaches to forecast workforce needs and align talent strategy with business goals.",
    date: "October 25, 2025",
    duration: "60 min",
    views: "2,789 views",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    category: "Workforce Management",
    rating: 4.6,
  },
  {
    id: "automation-hr-processes",
    title: "Automating HR Processes with Smart Technology",
    description: "Discover how automation tools can streamline repetitive HR tasks and free up time for strategic initiatives.",
    date: "October 8, 2025",
    duration: "42 min",
    views: "1,567 views",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
    category: "AI & Analytics",
    rating: 4.5,
  },
]

const categories = [
  { name: "All Topics", icon: BookOpen },
  { name: "Workforce Management", icon: Users },
  { name: "AI & Analytics", icon: BarChart3 },
  { name: "Remote Work", icon: Globe },
  { name: "Compliance", icon: Shield },
  { name: "Productivity", icon: Zap },
  { name: "Time Tracking", icon: Clock },
]

const featuredSpeakers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief People Officer, TechForward Inc.",
    expertise: "Hybrid Work Strategy",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    webinarsCount: 8,
  },
  {
    name: "Lisa Wang",
    role: "VP of AI Research, DataCore Systems",
    expertise: "AI & Workforce Analytics",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    webinarsCount: 5,
  },
  {
    name: "Rachel Foster, JD",
    role: "Partner, Foster & Associates Legal",
    expertise: "Employment Law & Compliance",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    webinarsCount: 6,
  },
  {
    name: "Mark Rodriguez",
    role: "Director of Remote Operations, ScaleUp",
    expertise: "Remote Team Building",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    webinarsCount: 4,
  },
]

const stats = [
  { value: "50+", label: "Webinars Hosted" },
  { value: "12K+", label: "Total Attendees" },
  { value: "4.8", label: "Avg. Rating" },
  { value: "30+", label: "Expert Speakers" },
]

type RegistrationWebinar = typeof upcomingWebinars[number] | null
type PlayingWebinar = typeof onDemandWebinars[number] | null

export default function WebinarsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Topics")
  const [registerWebinar, setRegisterWebinar] = useState<RegistrationWebinar>(null)
  const [playingWebinar, setPlayingWebinar] = useState<PlayingWebinar>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Registration form state
  const [regForm, setRegForm] = useState({ firstName: "", lastName: "", email: "", company: "", role: "" })
  const [regErrors, setRegErrors] = useState<Record<string, string>>({})
  const [regSuccess, setRegSuccess] = useState(false)
  const [regLoading, setRegLoading] = useState(false)

  // Subscribe form state
  const [subForm, setSubForm] = useState({ name: "", email: "" })
  const [subErrors, setSubErrors] = useState<Record<string, string>>({})
  const [subSuccess, setSubSuccess] = useState(false)
  const [subLoading, setSubLoading] = useState(false)

  const upcomingRef = useRef<HTMLDivElement>(null)
  const onDemandRef = useRef<HTMLDivElement>(null)

  const filteredOnDemand = selectedCategory === "All Topics"
    ? onDemandWebinars
    : onDemandWebinars.filter(w => w.category === selectedCategory)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Registration form handlers
  const validateRegForm = () => {
    const errors: Record<string, string> = {}
    if (!regForm.firstName.trim()) errors.firstName = "First name is required"
    if (!regForm.lastName.trim()) errors.lastName = "Last name is required"
    if (!regForm.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) errors.email = "Invalid email address"
    if (!regForm.company.trim()) errors.company = "Company is required"
    setRegErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleRegister = () => {
    if (!validateRegForm()) return
    setRegLoading(true)
    setTimeout(() => {
      setRegLoading(false)
      setRegSuccess(true)
    }, 1500)
  }

  const closeRegModal = () => {
    setRegisterWebinar(null)
    setRegSuccess(false)
    setRegForm({ firstName: "", lastName: "", email: "", company: "", role: "" })
    setRegErrors({})
  }

  // Subscribe form handlers
  const validateSubForm = () => {
    const errors: Record<string, string> = {}
    if (!subForm.name.trim()) errors.name = "Name is required"
    if (!subForm.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subForm.email)) errors.email = "Invalid email address"
    setSubErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubscribe = () => {
    if (!validateSubForm()) return
    setSubLoading(true)
    setTimeout(() => {
      setSubLoading(false)
      setSubSuccess(true)
      setTimeout(() => setSubSuccess(false), 4000)
    }, 1200)
  }

  const closePlayerModal = () => {
    setPlayingWebinar(null)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-deloitte-green rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-deloitte-green/20 border border-deloitte-green/30 rounded-full mb-6">
              <Video className="w-4 h-4 text-deloitte-green" />
              <span className="text-sm font-semibold text-deloitte-green uppercase tracking-wide">
                Live & On-Demand
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Educational{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-deloitte-green to-cyan-400">Webinars</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Learn from industry experts and discover best practices for workforce management, remote work, and AI-driven analytics
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollTo(upcomingRef)}
                className="px-8 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green/90 transition-colors flex items-center gap-2 cursor-pointer"
              >
                Browse Upcoming Events
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo(onDemandRef)}
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
              >
                Watch On-Demand
              </button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars - Featured */}
      <section ref={upcomingRef} id="upcoming" className="py-12 lg:py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Webinars</h2>
              <p className="text-gray-500 mt-1">Register now to save your spot</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {upcomingWebinars.length} upcoming
            </span>
          </div>

          {/* Featured (first) webinar - large card */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img src={upcomingWebinars[0].image} alt={upcomingWebinars[0].title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    FEATURED
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-deloitte-green text-sm font-semibold uppercase tracking-wide mb-2">
                  {upcomingWebinars[0].category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{upcomingWebinars[0].title}</h3>
                <p className="text-gray-300 mb-6">{upcomingWebinars[0].description}</p>
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-deloitte-green" />
                    <span>{upcomingWebinars[0].date} at {upcomingWebinars[0].time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-deloitte-green" />
                    <span>{upcomingWebinars[0].duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4 text-deloitte-green" />
                    <span>{upcomingWebinars[0].attendees}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gray-400 text-sm">Speakers:</span>
                  {upcomingWebinars[0].speakers.map((speaker) => (
                    <span key={speaker} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">{speaker}</span>
                  ))}
                </div>
                <button
                  onClick={() => setRegisterWebinar(upcomingWebinars[0])}
                  className="w-fit px-8 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green/90 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>

          {/* Remaining upcoming webinars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingWebinars.slice(1).map((webinar, index) => (
              <motion.article
                key={webinar.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-deloitte-green/50 transition-all group"
              >
                <div className="relative h-44">
                  <img src={webinar.image} alt={webinar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                      {webinar.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{webinar.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{webinar.description}</p>

                  <div className="space-y-1.5 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-deloitte-green" />
                      <span>{webinar.date} at {webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-3.5 h-3.5 text-deloitte-green" />
                      <span>{webinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-3.5 h-3.5 text-deloitte-green" />
                      <span>{webinar.attendees}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setRegisterWebinar(webinar)}
                    className="w-full px-4 py-2.5 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green/90 transition-colors text-sm cursor-pointer"
                  >
                    Register Now
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* On-Demand Webinars with Category Filter */}
      <section ref={onDemandRef} id="on-demand" className="py-12 lg:py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Watch On-Demand</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Catch up on past webinars at your own pace. Filter by topic to find exactly what you need.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.name
                      ? "bg-deloitte-green text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-deloitte-green/50 hover:text-deloitte-green"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOnDemand.map((webinar, index) => (
              <motion.article
                key={webinar.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => { setPlayingWebinar(webinar); setIsPlaying(true) }}
                className="group bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden cursor-pointer"
              >
                <div className="relative h-44">
                  <img src={webinar.image} alt={webinar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-deloitte-green ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                      {webinar.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs rounded">
                    {webinar.duration}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-deloitte-green transition-colors">{webinar.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{webinar.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{webinar.views}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{webinar.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredOnDemand.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No webinars found for this topic</p>
              <p className="text-sm mt-1">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Speakers</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Learn from recognized industry leaders and subject matter experts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg hover:border-deloitte-green/30 transition-all group"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-deloitte-green/30 transition-all">
                  <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{speaker.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{speaker.role}</p>
                <span className="inline-block px-3 py-1 bg-deloitte-green/10 text-deloitte-green text-xs font-medium rounded-full mb-3">
                  {speaker.expertise}
                </span>
                <p className="text-xs text-gray-400">{speaker.webinarsCount} webinars hosted</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Attend Our Webinars?</h2>
              <p className="text-gray-600 mb-8">
                Our webinars are designed to provide actionable insights that you can apply immediately to improve your workforce management strategy.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Expert-Led Sessions", desc: "Learn from practitioners with years of hands-on experience in workforce management." },
                  { title: "Interactive Q&A", desc: "Get your specific questions answered live during dedicated Q&A segments." },
                  { title: "Actionable Takeaways", desc: "Every session includes frameworks, templates, and tools you can use right away." },
                  { title: "Free Access", desc: "All webinars are completely free. Register once and access on-demand recordings anytime." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-deloitte-green mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe Form */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <AnimatePresence mode="wait">
                {subSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Subscribed!</h3>
                    <p className="text-sm text-gray-500">We&apos;ll notify you about upcoming webinars and send exclusive content to your inbox.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 bg-deloitte-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-7 h-7 text-deloitte-green" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Never Miss a Webinar</h3>
                      <p className="text-sm text-gray-500">Subscribe to get notified about upcoming webinars and receive exclusive content.</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={subForm.name}
                          onChange={(e) => { setSubForm({ ...subForm, name: e.target.value }); setSubErrors({ ...subErrors, name: "" }) }}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50 focus:border-deloitte-green ${subErrors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                        />
                        {subErrors.name && <p className="text-xs text-red-500 mt-1">{subErrors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          value={subForm.email}
                          onChange={(e) => { setSubForm({ ...subForm, email: e.target.value }); setSubErrors({ ...subErrors, email: "" }) }}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50 focus:border-deloitte-green ${subErrors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                        />
                        {subErrors.email && <p className="text-xs text-red-500 mt-1">{subErrors.email}</p>}
                      </div>
                      <button
                        onClick={handleSubscribe}
                        disabled={subLoading}
                        className="w-full px-6 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green/90 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {subLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          "Subscribe to Updates"
                        )}
                      </button>
                      <p className="text-xs text-gray-400 text-center">No spam, unsubscribe anytime. We respect your privacy.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REGISTRATION MODAL ========== */}
      <AnimatePresence>
        {registerWebinar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeRegModal} />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-2xl overflow-hidden">
                  <img src={registerWebinar.image} alt="" className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                </div>
                <button
                  onClick={closeRegModal}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-deloitte-green text-xs font-semibold uppercase tracking-wide">{registerWebinar.category}</span>
                  <h3 className="text-lg font-bold text-white leading-tight">{registerWebinar.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {regSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Confirmed!</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        You&apos;re registered for <span className="font-medium text-gray-700">{registerWebinar.title}</span>
                      </p>
                      <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-left">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Calendar className="w-4 h-4 text-deloitte-green" />
                          <span>{registerWebinar.date} at {registerWebinar.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-deloitte-green" />
                          <span>{registerWebinar.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">A confirmation email with the webinar link has been sent to your inbox.</p>
                      <button
                        onClick={closeRegModal}
                        className="px-6 py-2.5 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green/90 transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Webinar info */}
                      <div className="flex flex-wrap gap-3 mb-6 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{registerWebinar.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{registerWebinar.time} · {registerWebinar.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <Users className="w-3.5 h-3.5" />
                          <span>{registerWebinar.attendees}</span>
                        </div>
                      </div>

                      {/* Form */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700 mb-1 block">First Name *</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                value={regForm.firstName}
                                onChange={(e) => { setRegForm({ ...regForm, firstName: e.target.value }); setRegErrors({ ...regErrors, firstName: "" }) }}
                                placeholder="John"
                                className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50 ${regErrors.firstName ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                              />
                            </div>
                            {regErrors.firstName && <p className="text-xs text-red-500 mt-1">{regErrors.firstName}</p>}
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 mb-1 block">Last Name *</label>
                            <input
                              type="text"
                              value={regForm.lastName}
                              onChange={(e) => { setRegForm({ ...regForm, lastName: e.target.value }); setRegErrors({ ...regErrors, lastName: "" }) }}
                              placeholder="Doe"
                              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50 ${regErrors.lastName ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                            />
                            {regErrors.lastName && <p className="text-xs text-red-500 mt-1">{regErrors.lastName}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Work Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              value={regForm.email}
                              onChange={(e) => { setRegForm({ ...regForm, email: e.target.value }); setRegErrors({ ...regErrors, email: "" }) }}
                              placeholder="john@company.com"
                              className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50 ${regErrors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                            />
                          </div>
                          {regErrors.email && <p className="text-xs text-red-500 mt-1">{regErrors.email}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Company *</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={regForm.company}
                              onChange={(e) => { setRegForm({ ...regForm, company: e.target.value }); setRegErrors({ ...regErrors, company: "" }) }}
                              placeholder="Your Company"
                              className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50 ${regErrors.company ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                            />
                          </div>
                          {regErrors.company && <p className="text-xs text-red-500 mt-1">{regErrors.company}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Job Title (Optional)</label>
                          <input
                            type="text"
                            value={regForm.role}
                            onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                            placeholder="e.g. HR Manager"
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deloitte-green/50"
                          />
                        </div>

                        <button
                          onClick={handleRegister}
                          disabled={regLoading}
                          className="w-full px-6 py-3 bg-deloitte-green text-white rounded-lg font-semibold hover:bg-deloitte-green/90 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                          {regLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Registering...
                            </>
                          ) : (
                            <>
                              Confirm Registration
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <p className="text-xs text-gray-400 text-center">By registering, you agree to receive webinar-related communications.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== VIDEO PLAYER MODAL ========== */}
      <AnimatePresence>
        {playingWebinar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closePlayerModal} />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={closePlayerModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Video area */}
              <div className="relative aspect-video bg-black">
                <img
                  src={playingWebinar.image}
                  alt={playingWebinar.title}
                  className="w-full h-full object-cover opacity-60"
                />

                {/* Play/Pause overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <AnimatePresence mode="wait">
                    {!isPlaying ? (
                      <motion.div
                        key="play"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Play className="w-10 h-10 text-deloitte-green ml-1" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pause"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Pause className="w-10 h-10 text-gray-800" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated progress bar */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-1 bg-white/20">
                    {isPlaying && (
                      <motion.div
                        className="h-full bg-deloitte-green"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 30, ease: "linear" }}
                      />
                    )}
                  </div>

                  {/* Controls bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying) }}
                        className="text-white hover:text-deloitte-green transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <span className="text-white/70 text-xs">{isPlaying ? "0:15" : "0:00"} / {playingWebinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted) }}
                        className="text-white hover:text-deloitte-green transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:text-deloitte-green transition-colors cursor-pointer"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-deloitte-green text-xs font-semibold uppercase tracking-wide">{playingWebinar.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{playingWebinar.title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{playingWebinar.description}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 bg-white/10 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium text-sm">{playingWebinar.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                  <span>{playingWebinar.views}</span>
                  <span>·</span>
                  <span>{playingWebinar.date}</span>
                  <span>·</span>
                  <span>{playingWebinar.duration}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
