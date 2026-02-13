"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { motion } from "framer-motion"
import {
  Home,
  Building,
  Users,
  Calendar,
  BarChart,
  CheckCircle,
  Monitor,
  Wifi,
  MapPin,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Laptop,
  Building2,
  Globe,
} from "lucide-react"

const features = [
  {
    title: "Flexible Work Model Support",
    description:
      "Track Nexus seamlessly adapts to hybrid work environments where employees split time between office and home. Automatically detect work location, track productivity across both environments, and provide unified insights regardless of where work happens.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Office vs Remote Analytics",
    description:
      "Compare productivity patterns between office and remote work days. Understand which tasks are completed more efficiently in each environment. Use data-driven insights to optimize your hybrid work policy and improve team performance.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Scheduling & Attendance",
    description:
      "Manage hybrid schedules with intelligent attendance tracking. Know who's in the office and who's remote in real-time. Coordinate team collaboration days, track desk bookings, and ensure effective resource allocation across both environments.",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Unified Communication Tracking",
    description:
      "Monitor communication and collaboration patterns across in-office and remote workers. Ensure no one is left out regardless of location. Track meeting effectiveness, response times, and team engagement to maintain strong hybrid culture.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Real-Time Location Awareness",
    description:
      "Get instant visibility into your team's work locations. See at a glance who is working from the office, home, or a co-working space. Enable managers to plan in-person meetings, allocate resources, and ensure the right people are in the right place at the right time.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Automated Compliance & Reporting",
    description:
      "Generate audit-ready reports on hybrid work patterns, overtime, and attendance compliance. Automatically track labor law requirements across regions, ensure fair work distribution between office and remote days, and maintain complete records for HR and legal teams.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Home,
    title: "Remote Work Tracking",
    description:
      "Comprehensive monitoring for work-from-home days with activity logs, app usage, and productivity scores.",
  },
  {
    icon: Building,
    title: "Office Presence",
    description:
      "Track in-office attendance, desk utilization, and meeting room bookings in real-time.",
  },
  {
    icon: Calendar,
    title: "Schedule Management",
    description:
      "Coordinate hybrid schedules, team collaboration days, and ensure balanced office rotation.",
  },
  {
    icon: Users,
    title: "Team Visibility",
    description:
      "Know who's where in real-time for better collaboration, planning, and resource allocation.",
  },
  {
    icon: BarChart,
    title: "Productivity Comparison",
    description:
      "Analyze performance across office vs remote environments with side-by-side dashboards.",
  },
  {
    icon: CheckCircle,
    title: "Policy Compliance",
    description:
      "Ensure adherence to hybrid work policies, minimum office days, and scheduling rules.",
  },
  {
    icon: Monitor,
    title: "Device-Agnostic Tracking",
    description:
      "Works seamlessly across desktops, laptops, and mobile devices regardless of location.",
  },
  {
    icon: Wifi,
    title: "Network Detection",
    description:
      "Automatically detect if employees are on office Wi-Fi or working remotely for accurate reporting.",
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description:
      "Configurable monitoring levels that respect employee privacy while ensuring accountability.",
  },
]

const stats = [
  { value: "74%", label: "Companies Adopting Hybrid" },
  { value: "35%", label: "Cost Savings on Office Space" },
  { value: "87%", label: "Employee Satisfaction Rate" },
  { value: "2.5X", label: "Faster Schedule Planning" },
]

const faqs = [
  {
    question: "How does Track Nexus support hybrid work models?",
    answer:
      "Track Nexus automatically adapts to hybrid environments by tracking productivity and attendance whether employees are in the office or working remotely. It provides unified analytics, helps managers coordinate schedules, and offers real-time visibility into team locations and activities.",
  },
  {
    question: "Can I compare office vs remote productivity?",
    answer:
      "Yes, Track Nexus provides detailed side-by-side analytics comparing productivity, collaboration, and work patterns between office and remote environments. This data helps you optimize your hybrid policy, identify which tasks benefit from in-person collaboration, and make informed decisions.",
  },
  {
    question: "How do I manage hybrid schedules?",
    answer:
      "Track Nexus includes intelligent schedule management features that let you track who's in the office each day, coordinate team collaboration days, manage desk bookings, set minimum office-day requirements, and send automated reminders. Real-time dashboards provide instant visibility.",
  },
  {
    question: "Does it work with hot-desking and shared spaces?",
    answer:
      "Absolutely. Track Nexus supports hot-desking environments with desk booking integration, space utilization tracking, and location-based check-ins. It helps optimize office space usage and ensures resources are allocated efficiently across flexible work arrangements.",
  },
  {
    question: "How does Track Nexus detect work location?",
    answer:
      "Track Nexus uses a combination of network detection (office Wi-Fi), GPS-based check-ins, and manual location settings to accurately determine whether an employee is working from the office, home, or another location. This ensures accurate reporting without manual effort.",
  },
  {
    question: "Is Track Nexus compliant with labor laws for hybrid workers?",
    answer:
      "Yes, Track Nexus helps you stay compliant with labor regulations by automatically tracking work hours, overtime, and breaks regardless of location. It generates audit-ready reports and can be configured to enforce policies specific to your region and industry.",
  },
  {
    question: "Can managers set minimum in-office day requirements?",
    answer:
      "Yes, managers can set policies requiring a minimum number of office days per week or month. Track Nexus monitors compliance, sends reminders to employees, and provides reports showing policy adherence across teams and departments.",
  },
  {
    question: "How does it help with team collaboration in hybrid setups?",
    answer:
      "Track Nexus identifies collaboration patterns, shows when team members overlap in the office, and helps schedule in-person meetings when the right people are on-site. It ensures remote workers stay connected through communication tracking and engagement metrics.",
  },
]

// How It Works steps
const howItWorksSteps = [
  {
    step: "01",
    icon: Laptop,
    title: "Install & Configure",
    description:
      "Deploy the lightweight Track Nexus agent on employee devices. Configure hybrid policies, office locations, and monitoring preferences in minutes.",
  },
  {
    step: "02",
    icon: MapPin,
    title: "Auto-Detect Location",
    description:
      "Track Nexus automatically detects whether employees are working from the office, home, or elsewhere using network and location signals.",
  },
  {
    step: "03",
    icon: BarChart,
    title: "Track & Analyze",
    description:
      "Productivity data flows into unified dashboards. Compare office vs remote performance, identify patterns, and generate comprehensive reports.",
  },
  {
    step: "04",
    icon: Zap,
    title: "Optimize & Scale",
    description:
      "Use AI-driven insights to refine your hybrid policy, improve team coordination, and scale your flexible work model with confidence.",
  },
]

// Use cases
const useCases = [
  {
    icon: Building2,
    title: "Corporate Enterprises",
    description:
      "Manage thousands of hybrid employees across multiple offices and regions with centralized dashboards and policy enforcement.",
    highlights: ["Multi-office support", "Department-level policies", "Executive reporting"],
  },
  {
    icon: Users,
    title: "Growing Startups",
    description:
      "Scale your hybrid work model as your team grows, without losing visibility or culture. Perfect for teams of 10 to 500.",
    highlights: ["Easy onboarding", "Flexible policies", "Cost-effective"],
  },
  {
    icon: Globe,
    title: "Distributed Teams",
    description:
      "Coordinate teams across time zones with smart scheduling, async collaboration tracking, and location-aware analytics.",
    highlights: ["Time zone support", "Async workflows", "Global compliance"],
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function HybridWorkforcePage() {
  return (
    <ProductPageLayout
      badge="Hybrid Workforce"
      title="Optimize Your"
      titleHighlight="Flexible Work Model"
      subtitle="Seamlessly manage teams working from home, office, or anywhere. Get unified insights and productivity analytics across all work environments."
      heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Home, Building, Users, Calendar]}
      features={features}
      benefitsTitle="Perfect for Hybrid Teams"
      benefitsSubtitle="Everything needed to thrive in flexible work environments"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to optimize your hybrid workforce?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    >
      {/* How It Works Section */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-10" {...fadeIn}>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-cyan-50 border border-cyan-200 rounded-full text-cyan-700">
              How It Works
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Get Started in <span className="text-cyan-600">4 Simple Steps</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              From installation to optimization, Track Nexus makes managing hybrid teams effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="text-5xl font-black text-gray-100 group-hover:text-cyan-100 transition-colors absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-cyan-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-cyan-400" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-10" {...fadeIn}>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Built for <span className="text-cyan-400">Every Team Size</span>
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Whether you&apos;re a startup or enterprise, Track Nexus adapts to your hybrid work needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Hybrid Work Section */}
      <section className="bg-cyan-50 px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-5xl">
          <motion.div className="text-center mb-8" {...fadeIn}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Why Companies Choose <span className="text-cyan-600">Hybrid Work</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Clock,
                title: "Save 40 Minutes Daily",
                description:
                  "Employees save an average of 40 minutes per day on commuting during remote work days, boosting overall productivity and work-life balance.",
              },
              {
                icon: Building,
                title: "Reduce Office Costs by 30%",
                description:
                  "Companies implementing hybrid models report up to 30% reduction in real estate and operational costs through optimized space utilization.",
              },
              {
                icon: Users,
                title: "Attract Top Talent",
                description:
                  "83% of job seekers prefer companies offering flexible work options. Hybrid models help you recruit and retain the best talent in your industry.",
              },
              {
                icon: BarChart,
                title: "Boost Engagement by 25%",
                description:
                  "Hybrid workers report 25% higher engagement scores compared to fully in-office counterparts, leading to better retention and output.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  className="flex gap-4 bg-white rounded-xl p-5 shadow-sm border border-cyan-100 hover:shadow-md transition-all"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </ProductPageLayout>
  )
}
