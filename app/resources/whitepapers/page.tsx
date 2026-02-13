"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FileText, Download, Calendar, BookOpen, Users, TrendingUp, Clock, Award, CheckCircle, Star, Shield, Zap, BarChart3, Globe, Target, Lightbulb, X, Mail, User, Building, ChevronRight, Eye } from "lucide-react"
import { useState } from "react"

const whitepapers = [
  {
    id: "future-of-remote-work",
    title: "The Future of Remote Work: 2026 Trends and Predictions",
    description: "Comprehensive analysis of remote work evolution, emerging technologies, and workforce management strategies for the next decade. Includes data from 1,000+ global organizations.",
    pages: "45 pages",
    readTime: "25 min read",
    date: "January 2026",
    author: "Dr. Sarah Mitchell",
    authorRole: "Chief Research Officer",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    topics: ["Remote Work", "Future Trends", "Technology"],
    downloads: "12.5K",
    featured: true,
    rating: 4.9,
    keyFindings: [
      "78% of companies will adopt hybrid-first policies by 2027",
      "AI-driven productivity tools increase output by 35%",
      "Remote teams report 22% higher job satisfaction",
    ],
  },
  {
    id: "productivity-metrics",
    title: "Measuring What Matters: Modern Productivity Metrics",
    description: "Data-driven insights into productivity measurement, KPIs, and performance tracking for distributed teams in the digital age. Based on 3 years of research across 200+ companies.",
    pages: "38 pages",
    readTime: "20 min read",
    date: "December 2025",
    author: "James Cooper",
    authorRole: "Head of Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    topics: ["Productivity", "Metrics", "Analytics"],
    downloads: "9.8K",
    featured: false,
    rating: 4.7,
    keyFindings: [
      "Output-based metrics outperform time-based by 3x",
      "Real-time dashboards improve manager decisions by 45%",
      "Teams using KPI frameworks hit goals 60% more often",
    ],
  },
  {
    id: "employee-privacy",
    title: "Balancing Privacy and Productivity: Best Practices Guide",
    description: "Navigate the complexities of employee monitoring with ethical frameworks, legal considerations, and transparency best practices across global jurisdictions.",
    pages: "52 pages",
    readTime: "30 min read",
    date: "November 2025",
    author: "Lisa Fernandez, JD",
    authorRole: "Legal & Compliance Lead",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
    topics: ["Privacy", "Ethics", "Compliance"],
    downloads: "8.2K",
    featured: false,
    rating: 4.8,
    keyFindings: [
      "92% of employees accept monitoring with transparency",
      "GDPR-compliant tools see 40% higher adoption rates",
      "Ethical frameworks reduce legal risk by 75%",
    ],
  },
  {
    id: "hybrid-workplace",
    title: "The Hybrid Workplace Revolution: Implementation Guide",
    description: "Complete roadmap for transitioning to hybrid work models, including technology requirements, policy frameworks, success metrics, and real-world case studies.",
    pages: "60 pages",
    readTime: "35 min read",
    date: "October 2025",
    author: "Michael Zhang",
    authorRole: "VP of Strategy",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    topics: ["Hybrid Work", "Strategy", "Implementation"],
    downloads: "11.3K",
    featured: true,
    rating: 4.9,
    keyFindings: [
      "Structured hybrid models boost retention by 34%",
      "Office-optional policies save $11K per employee yearly",
      "3-2 hybrid schedules are the most effective model",
    ],
  },
  {
    id: "ai-workforce-analytics",
    title: "AI in Workforce Analytics: Practical Applications",
    description: "Explore how artificial intelligence transforms workforce management with real-world use cases, implementation strategies, ROI analysis, and future roadmap.",
    pages: "48 pages",
    readTime: "28 min read",
    date: "September 2025",
    author: "Dr. Priya Sharma",
    authorRole: "AI Research Director",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    topics: ["AI", "Analytics", "Innovation"],
    downloads: "14.7K",
    featured: true,
    rating: 4.8,
    keyFindings: [
      "AI-powered scheduling reduces conflicts by 68%",
      "Predictive analytics cut employee turnover by 25%",
      "Automated reporting saves 12 hours per manager weekly",
    ],
  },
  {
    id: "time-tracking-roi",
    title: "The ROI of Time Tracking: Financial Impact Study",
    description: "Quantitative analysis of time tracking implementations across 500+ companies, including cost-benefit analysis, success factors, and industry benchmarks.",
    pages: "42 pages",
    readTime: "22 min read",
    date: "August 2025",
    author: "Robert Chen, CFA",
    authorRole: "Financial Analyst",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    topics: ["Time Tracking", "ROI", "Finance"],
    downloads: "7.6K",
    featured: false,
    rating: 4.6,
    keyFindings: [
      "Average ROI of 287% within first year of adoption",
      "Payroll errors decrease by 92% with automated tracking",
      "Companies recover 4.7 lost hours per employee weekly",
    ],
  },
  {
    id: "employee-engagement-2026",
    title: "Employee Engagement in the Digital Era: A Data-Driven Approach",
    description: "Research into how digital tools, feedback loops, and recognition systems impact employee engagement, well-being, and long-term retention across industries.",
    pages: "55 pages",
    readTime: "32 min read",
    date: "July 2025",
    author: "Dr. Amanda Torres",
    authorRole: "Organizational Psychologist",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    topics: ["Engagement", "Well-being", "Retention"],
    downloads: "10.1K",
    featured: false,
    rating: 4.7,
    keyFindings: [
      "Engaged employees are 21% more productive",
      "Real-time recognition increases retention by 31%",
      "Digital feedback loops improve satisfaction scores by 44%",
    ],
  },
  {
    id: "global-compliance-guide",
    title: "Global Workforce Compliance: Navigating International Regulations",
    description: "Essential guide to managing workforce compliance across 50+ countries, covering labor laws, data protection regulations, tax implications, and cross-border employment.",
    pages: "72 pages",
    readTime: "40 min read",
    date: "June 2025",
    author: "Victoria Okafor, LLM",
    authorRole: "International Compliance Director",
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=600&q=80",
    topics: ["Compliance", "Global", "Legal"],
    downloads: "6.9K",
    featured: false,
    rating: 4.5,
    keyFindings: [
      "82% of multinational companies face compliance gaps",
      "Automated compliance reduces violation risk by 90%",
      "Cross-border employment grew 58% since 2023",
    ],
  },
  {
    id: "burnout-prevention",
    title: "Preventing Burnout: Data-Backed Strategies for Modern Teams",
    description: "In-depth study on workplace burnout indicators, early detection systems, prevention strategies, and the role of technology in promoting sustainable work practices.",
    pages: "40 pages",
    readTime: "24 min read",
    date: "May 2025",
    author: "Dr. Kevin Park",
    authorRole: "Workplace Health Researcher",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80",
    topics: ["Burnout", "Well-being", "Prevention"],
    downloads: "13.2K",
    featured: true,
    rating: 4.9,
    keyFindings: [
      "67% of remote workers experience burnout symptoms",
      "Workload monitoring reduces burnout incidents by 48%",
      "Mandatory break alerts improve focus by 29%",
    ],
  },
]

const researchTeam = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Research Officer",
    specialization: "Future of Work & Remote Trends",
    papers: 12,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Dr. Priya Sharma",
    role: "AI Research Director",
    specialization: "AI & Machine Learning Applications",
    papers: 9,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "James Cooper",
    role: "Head of Analytics",
    specialization: "Productivity Metrics & Data Science",
    papers: 7,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Lisa Fernandez, JD",
    role: "Legal & Compliance Lead",
    specialization: "Privacy Law & Ethical Frameworks",
    papers: 6,
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=200&q=80",
  },
]

type DownloadPaper = typeof whitepapers[number] | null
type PreviewPaper = typeof whitepapers[number] | null

const allTopics = Array.from(new Set(whitepapers.flatMap(p => p.topics)))

export default function WhitepapersPage() {
  const [downloadPaper, setDownloadPaper] = useState<DownloadPaper>(null)
  const [previewPaper, setPreviewPaper] = useState<PreviewPaper>(null)
  const [selectedTopic, setSelectedTopic] = useState<string>("All")

  // Download form state
  const [downloadForm, setDownloadForm] = useState({ name: "", email: "", company: "", role: "" })
  const [downloadErrors, setDownloadErrors] = useState<Record<string, string>>({})
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)

  // Subscribe form state
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribeError, setSubscribeError] = useState("")
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  const [subscribeLoading, setSubscribeLoading] = useState(false)

  const featuredPaper = whitepapers.find(p => p.id === "future-of-remote-work")!

  const filteredPapers = selectedTopic === "All"
    ? whitepapers
    : whitepapers.filter(p => p.topics.includes(selectedTopic))

  // Download form handlers
  const validateDownloadForm = () => {
    const errors: Record<string, string> = {}
    if (!downloadForm.name.trim()) errors.name = "Name is required"
    if (!downloadForm.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(downloadForm.email)) errors.email = "Invalid email"
    if (!downloadForm.company.trim()) errors.company = "Company is required"
    setDownloadErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleDownload = () => {
    if (!validateDownloadForm()) return
    setDownloadLoading(true)
    setTimeout(() => {
      setDownloadLoading(false)
      setDownloadSuccess(true)
    }, 1500)
  }

  const closeDownloadModal = () => {
    setDownloadPaper(null)
    setDownloadSuccess(false)
    setDownloadForm({ name: "", email: "", company: "", role: "" })
    setDownloadErrors({})
  }

  // Subscribe form handlers
  const handleSubscribe = () => {
    if (!subscribeEmail.trim()) {
      setSubscribeError("Email is required")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscribeEmail)) {
      setSubscribeError("Invalid email address")
      return
    }
    setSubscribeLoading(true)
    setTimeout(() => {
      setSubscribeLoading(false)
      setSubscribeSuccess(true)
      setTimeout(() => { setSubscribeSuccess(false); setSubscribeEmail("") }, 4000)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-deloitte-black text-white px-4 py-12 lg:px-8 lg:py-16 overflow-hidden">
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
              <BookOpen className="w-5 h-5 text-highlight" />
              <span className="text-sm font-semibold text-highlight uppercase tracking-widest">Research & Insights</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              In-Depth{" "}
              <span className="text-deloitte-green font-normal">Whitepapers</span>
            </h1>
            <p className="text-lg lg:text-xl text-deloitte-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert research and actionable insights on workforce management, productivity, and the future of work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Stats */}
      <section className="bg-gray-50 px-4 py-10 lg:px-8 lg:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <FileText className="w-8 h-8 mx-auto mb-3 text-highlight" />
              <div className="text-3xl font-bold text-highlight mb-1">9</div>
              <div className="text-sm text-gray-600 font-medium">Published Papers</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <Download className="w-8 h-8 mx-auto mb-3 text-highlight" />
              <div className="text-3xl font-bold text-highlight mb-1">94K+</div>
              <div className="text-sm text-gray-600 font-medium">Total Downloads</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <Users className="w-8 h-8 mx-auto mb-3 text-highlight" />
              <div className="text-3xl font-bold text-highlight mb-1">750+</div>
              <div className="text-sm text-gray-600 font-medium">Companies Surveyed</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:border-highlight/30 hover:shadow-lg transition-all duration-300">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-highlight" />
              <div className="text-3xl font-bold text-highlight mb-1">452</div>
              <div className="text-sm text-gray-600 font-medium">Pages of Research</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topic Filters */}
      <section className="bg-white px-4 py-8 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTopic("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedTopic === "All"
                  ? "bg-highlight text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Topics
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-highlight text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Research Matters */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">Why It Matters</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Research That Drives Real Decisions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our whitepapers are built on rigorous methodology, real-world data, and actionable insights that leaders trust
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-highlight/5 to-highlight/10 border border-highlight/15 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-highlight/15 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Data-Driven</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Every finding backed by quantitative data from real organizations and validated surveys</p>
            </div>
            <div className="bg-gradient-to-br from-highlight/5 to-highlight/10 border border-highlight/15 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-highlight/15 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Global Perspective</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Research spanning 50+ countries with diverse industry representation and cross-cultural insights</p>
            </div>
            <div className="bg-gradient-to-br from-highlight/5 to-highlight/10 border border-highlight/15 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-highlight/15 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Practical recommendations you can implement immediately with step-by-step frameworks</p>
            </div>
            <div className="bg-gradient-to-br from-highlight/5 to-highlight/10 border border-highlight/15 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-highlight/15 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Peer-Reviewed</h3>
              <p className="text-sm text-gray-600 leading-relaxed">All research reviewed by industry experts and validated against established methodologies</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Whitepaper */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">Featured</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Research</h2>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                <Image
                  src={featuredPaper.image}
                  alt={featuredPaper.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50 hidden lg:block"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-highlight text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Featured
                  </span>
                  <span className="px-3 py-1.5 bg-white/90 text-gray-900 text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    {featuredPaper.rating}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center text-white">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredPaper.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    {featuredPaper.pages}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPaper.readTime}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                  {featuredPaper.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-5">
                  {featuredPaper.description}
                </p>

                {/* Key Findings */}
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-highlight uppercase tracking-wider mb-3">Key Findings</h4>
                  <div className="space-y-2">
                    {featuredPaper.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPaper.topics.map((topic) => (
                    <span key={topic} className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-highlight/20 flex items-center justify-center">
                      <span className="text-highlight font-bold text-sm">
                        {featuredPaper.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{featuredPaper.author}</div>
                      <div className="text-xs text-gray-400">{featuredPaper.authorRole}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {featuredPaper.downloads}
                    </span>
                    <button
                      onClick={() => setDownloadPaper(featuredPaper)}
                      className="flex items-center gap-2 px-6 py-3 bg-highlight hover:bg-highlight/90 text-white rounded-lg font-semibold transition-all shadow-lg cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Download Free
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Whitepapers Grid */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">Library</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {selectedTopic === "All" ? "All Whitepapers" : `${selectedTopic} Whitepapers`}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {filteredPapers.length} {filteredPapers.length === 1 ? "paper" : "papers"} available
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper, index) => (
              <motion.article
                key={paper.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-highlight/30 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setPreviewPaper(paper)}>
                  <Image
                    src={paper.image}
                    alt={paper.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <Eye className="w-6 h-6 text-highlight" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {paper.featured && (
                        <span className="px-2.5 py-1 bg-highlight text-white text-xs font-bold rounded-full shadow-lg">
                          Popular
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-white/90 text-gray-900 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {paper.rating}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {paper.pages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {paper.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm">
                      <Download className="w-3.5 h-3.5" />
                      {paper.downloads}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 text-highlight" />
                    <span>{paper.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-highlight transition-colors leading-snug cursor-pointer" onClick={() => setPreviewPaper(paper)}>
                    {paper.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                    {paper.description}
                  </p>

                  {/* Key Findings */}
                  <div className="mb-4 bg-gray-50 rounded-lg p-3">
                    <h4 className="text-xs font-bold text-highlight uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Key Findings
                    </h4>
                    <div className="space-y-1.5">
                      {paper.keyFindings.slice(0, 2).map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-highlight flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700 leading-snug">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {paper.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Author & Download */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-highlight/15 flex items-center justify-center">
                        <span className="text-highlight font-bold text-[10px]">
                          {paper.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">{paper.author}</div>
                        <div className="text-[10px] text-gray-500">{paper.authorRole}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDownloadPaper(paper)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-highlight hover:bg-highlight/90 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Research Team */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">Our Experts</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet the Research Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-leading researchers and analysts dedicated to uncovering insights that shape the future of work
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {researchTeam.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-highlight/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">{member.specialization}</p>
                  <div className="flex items-center gap-1.5 text-highlight">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-semibold">{member.papers} Published Papers</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Methodology */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">Our Process</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Research Methodology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every whitepaper follows our rigorous research process to ensure accuracy, relevance, and actionability
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { step: "01", title: "Problem Discovery", desc: "Identify key challenges facing modern workforce management through industry analysis", icon: Target },
              { step: "02", title: "Data Collection", desc: "Survey 500+ organizations with quantitative and qualitative research methods", icon: BarChart3 },
              { step: "03", title: "Expert Analysis", desc: "Our research team analyzes data with advanced statistical and AI-driven tools", icon: Zap },
              { step: "04", title: "Peer Review", desc: "Findings validated by independent industry experts and academic advisors", icon: Shield },
              { step: "05", title: "Publication", desc: "Actionable insights packaged into comprehensive, easy-to-implement guides", icon: FileText },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 hover:border-highlight/30 hover:shadow-lg transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 mx-auto mb-3 bg-highlight/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-highlight" />
                </div>
                <div className="text-xs font-bold text-highlight mb-1.5">STEP {item.step}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
                Stay Ahead with Our Research
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Subscribe to receive our latest whitepapers and industry insights directly to your inbox
              </p>
              <AnimatePresence mode="wait">
                {subscribeSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-6"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-xl font-semibold text-white">You&apos;re Subscribed!</p>
                    <p className="text-gray-400 text-sm mt-2">Check your inbox for our latest research.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-6">
                      <input
                        type="email"
                        value={subscribeEmail}
                        onChange={(e) => { setSubscribeEmail(e.target.value); setSubscribeError("") }}
                        placeholder="Enter your work email"
                        className={`flex-1 px-5 py-4 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight backdrop-blur-sm ${subscribeError ? "border-red-400" : "border-white/20"}`}
                      />
                      <button
                        onClick={handleSubscribe}
                        disabled={subscribeLoading}
                        className="px-8 py-4 bg-highlight hover:bg-highlight/90 text-white rounded-lg font-semibold text-lg transition-all shadow-lg cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {subscribeLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          "Subscribe"
                        )}
                      </button>
                    </div>
                    {subscribeError && <p className="text-red-400 text-sm mb-4">{subscribeError}</p>}
                    <p className="text-sm text-gray-500">No spam. Unsubscribe anytime. We respect your privacy.</p>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">15K+</div>
              <div className="text-sm text-gray-400">Subscribers</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">Monthly</div>
              <div className="text-sm text-gray-400">New Research</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">Free</div>
              <div className="text-sm text-gray-400">Always</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-highlight mb-1">4.8/5</div>
              <div className="text-sm text-gray-400">Reader Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== DOWNLOAD MODAL ========== */}
      <AnimatePresence>
        {downloadPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDownloadModal} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-2xl overflow-hidden">
                  <Image src={downloadPaper.image} alt={`${downloadPaper.title} whitepaper cover`} fill className="object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                </div>
                <button
                  onClick={closeDownloadModal}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-highlight text-xs font-semibold uppercase tracking-wide">{downloadPaper.topics[0]}</span>
                  <h3 className="text-lg font-bold text-white leading-tight">{downloadPaper.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {downloadSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Download Started!</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Your whitepaper is being downloaded. Check your downloads folder.
                      </p>
                      <button
                        onClick={closeDownloadModal}
                        className="px-6 py-2.5 bg-highlight text-white rounded-lg font-semibold hover:bg-highlight/90 transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex flex-wrap gap-2 mb-6 text-sm">
                        <span className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <FileText className="w-3.5 h-3.5" />
                          {downloadPaper.pages}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          {downloadPaper.readTime}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <Download className="w-3.5 h-3.5" />
                          {downloadPaper.downloads}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={downloadForm.name}
                              onChange={(e) => { setDownloadForm({ ...downloadForm, name: e.target.value }); setDownloadErrors({ ...downloadErrors, name: "" }) }}
                              placeholder="John Doe"
                              className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-highlight/50 ${downloadErrors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                            />
                          </div>
                          {downloadErrors.name && <p className="text-xs text-red-500 mt-1">{downloadErrors.name}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Work Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              value={downloadForm.email}
                              onChange={(e) => { setDownloadForm({ ...downloadForm, email: e.target.value }); setDownloadErrors({ ...downloadErrors, email: "" }) }}
                              placeholder="john@company.com"
                              className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-highlight/50 ${downloadErrors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                            />
                          </div>
                          {downloadErrors.email && <p className="text-xs text-red-500 mt-1">{downloadErrors.email}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Company *</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={downloadForm.company}
                              onChange={(e) => { setDownloadForm({ ...downloadForm, company: e.target.value }); setDownloadErrors({ ...downloadErrors, company: "" }) }}
                              placeholder="Your Company"
                              className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-highlight/50 ${downloadErrors.company ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                            />
                          </div>
                          {downloadErrors.company && <p className="text-xs text-red-500 mt-1">{downloadErrors.company}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">Job Title (Optional)</label>
                          <input
                            type="text"
                            value={downloadForm.role}
                            onChange={(e) => setDownloadForm({ ...downloadForm, role: e.target.value })}
                            placeholder="e.g. HR Manager"
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-highlight/50"
                          />
                        </div>

                        <button
                          onClick={handleDownload}
                          disabled={downloadLoading}
                          className="w-full px-6 py-3 bg-highlight text-white rounded-lg font-semibold hover:bg-highlight/90 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                          {downloadLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Preparing Download...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download PDF
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <p className="text-xs text-gray-400 text-center">By downloading, you agree to receive occasional research updates.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== PREVIEW MODAL ========== */}
      <AnimatePresence>
        {previewPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewPaper(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setPreviewPaper(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-64">
                <Image src={previewPaper.image} alt={previewPaper.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {previewPaper.featured && (
                      <span className="px-3 py-1 bg-highlight text-white text-xs font-bold rounded-full">Popular</span>
                    )}
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {previewPaper.rating}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold leading-tight">{previewPaper.title}</h2>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Calendar className="w-4 h-4 text-highlight" />
                    {previewPaper.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <FileText className="w-4 h-4 text-highlight" />
                    {previewPaper.pages}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-4 h-4 text-highlight" />
                    {previewPaper.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Download className="w-4 h-4 text-highlight" />
                    {previewPaper.downloads}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{previewPaper.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-highlight uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Key Findings
                  </h3>
                  <div className="space-y-2">
                    {previewPaper.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                        <CheckCircle className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {previewPaper.topics.map((topic) => (
                    <span key={topic} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-highlight/15 flex items-center justify-center">
                      <span className="text-highlight font-bold text-sm">
                        {previewPaper.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{previewPaper.author}</div>
                      <div className="text-xs text-gray-500">{previewPaper.authorRole}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setPreviewPaper(null); setDownloadPaper(previewPaper) }}
                    className="flex items-center gap-2 px-6 py-3 bg-highlight text-white rounded-lg font-semibold hover:bg-highlight/90 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
