"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Globe, Monitor, BarChart3, Shield, Zap, Filter } from "lucide-react"


const features = [
  {
    title: "Boost Team Performance",
    description: "Track Nexus boosts team productivity with real-time performance insights and intelligent workload management. Customize dashboards to support seamless collaboration across remote, hybrid, or in-office setups.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Work Monitoring",
    description: "Track Nexus supports smart hybrid and remote work with productivity tracking, location insights, and attendance monitoring. Improve focus, align goals, and optimize workflows through intelligent work monitoring and data-driven decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Tech Stack Analytics",
    description: "Track Nexus offers real-time insights into app usage, helping you boost efficiency, reduce digital clutter, and cut unnecessary software costs. Identify underused tools, reallocate resources, and optimize workflows with smart usage tracking.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Intelligent Employee Monitoring",
    description: "Track Nexus offers real-time employee monitoring with activity tracking, screen views, and smart location data to boost focus and accountability. Get full visibility, set alerts for idle or suspicious activity, and streamline oversight for hybrid teams.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Globe,
    title: "Website Tracking",
    description: "Monitor which websites employees visit and for how long during work hours.",
  },
  {
    icon: Monitor,
    title: "App Usage",
    description: "Track time spent on each application to measure focus and productivity.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Get detailed insights into tool usage patterns across your organization.",
  },
  {
    icon: Filter,
    title: "Category Filters",
    description: "Classify apps and websites as productive, neutral, or unproductive.",
  },
  {
    icon: Shield,
    title: "Block Distractions",
    description: "Set policies to block or limit access to unproductive sites.",
  },
  {
    icon: Zap,
    title: "Real-Time Alerts",
    description: "Get notified when employees access blocked or flagged content.",
  },
]

const stats = [
  { value: "100%", label: "Visibility" },
  { value: "Real-time", label: "Tracking" },
  { value: "AI", label: "Categorization" },
  { value: "500+", label: "Apps Tracked" },
]

const faqs = [
  {
    question: "What apps and websites are tracked?",
    answer: "Track Nexus monitors all applications and websites accessed during work hours. You can customize what's tracked and set up categories for productive, neutral, and unproductive activities.",
  },
  {
    question: "Can I block certain websites?",
    answer: "Yes, you can set policies to block or limit access to specific websites or categories of sites. Employees can be notified when they attempt to access blocked content.",
  },
  {
    question: "How does categorization work?",
    answer: "Our AI automatically categorizes apps and websites based on their purpose. You can also manually categorize tools specific to your business to ensure accurate productivity tracking.",
  },
  {
    question: "Is personal browsing tracked?",
    answer: "Tracking is configurable. You can exclude personal time, breaks, or specific hours from monitoring to respect employee privacy while maintaining productivity insights.",
  },
]

export default function AppsWebsitePage() {
  return (
    <ProductPageLayout
      badge="App & Website Tracking"
      title="Track Apps &"
      titleHighlight="Websites"
      subtitle="Monitor application and website usage to understand how work time is spent. Optimize productivity with intelligent categorization and real-time insights."
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Globe, Monitor, BarChart3, Shield]}
      features={features}
      benefitsTitle="Complete Digital Activity Tracking"
      benefitsSubtitle="Understand and optimize how your team uses technology"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to optimize app usage?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
