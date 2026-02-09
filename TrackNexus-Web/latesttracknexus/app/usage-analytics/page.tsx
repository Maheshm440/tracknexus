"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { BarChart3, Monitor, TrendingUp, Clock, Zap, Shield } from "lucide-react"

const features = [
  {
    title: "AI-Driven Real-Time Tracking",
    description: "Track Nexus uses intelligent AI tracking to monitor app usage, website visits, and activity levels—giving you real-time visibility into how your team works, minute by minute. Understand which tools are being used, where time is spent, and how engaged your team is throughout the day.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Software Engagement Trends",
    description: "Monitor software engagement across daily, weekly, and monthly intervals—giving you a clear picture of how tools are being used over time. Spot usage drops, identify peak activity hours, and understand which apps are gaining or losing traction.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Burnout & Overload Detection",
    description: "Track Nexus leverages advanced AI to detect early signs of burnout by analyzing prolonged active hours, reduced focus, and irregular engagement patterns. Identify when employees are overextending before they verbalize stress.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Top-Performing Hours & Platforms",
    description: "Effortlessly identify the hours when your team is most productive and the platforms that contribute most to performance. Optimize schedules, assign tasks strategically, and ensure your team works at their most effective times.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Monitor,
    title: "App Monitoring",
    description: "Track usage of every application to understand work patterns.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Detailed analytics on how tools are being used across teams.",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Identify usage trends over time for better planning.",
  },
  {
    icon: Clock,
    title: "Time Insights",
    description: "See exactly how much time is spent on each application.",
  },
  {
    icon: Zap,
    title: "Focus Detection",
    description: "AI detects focus patterns and distraction triggers.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Track usage patterns without capturing personal content.",
  },
]

const stats = [
  { value: "Real-time", label: "Tracking" },
  { value: "AI", label: "Powered" },
  { value: "500+", label: "Apps Tracked" },
  { value: "100%", label: "Visibility" },
]

const faqs = [
  {
    question: "What applications are tracked?",
    answer: "Track Nexus monitors all applications used during work hours, including productivity tools, communication apps, browsers, and custom software. You can configure which apps to track or exclude.",
  },
  {
    question: "How does burnout detection work?",
    answer: "Our AI analyzes patterns like extended work hours, reduced focus periods, and irregular engagement to identify early signs of burnout, allowing managers to intervene proactively.",
  },
  {
    question: "Can I see usage trends over time?",
    answer: "Yes, view usage analytics by day, week, month, or custom date ranges. Identify trends, compare periods, and understand how app usage changes over time.",
  },
  {
    question: "Is personal app usage tracked?",
    answer: "You can configure tracking to exclude personal apps and non-work hours. Track Nexus focuses on work-related usage while respecting employee privacy.",
  },
]

export default function UsageAnalyticsPage() {
  return (
    <ProductPageLayout
      badge="Usage Analytics"
      title="App & Website"
      titleHighlight="Analytics"
      subtitle="AI-powered insights that reveal patterns, streamline work, and show team performance—clearly and smartly. Understand how your tools are being used."
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[BarChart3, Monitor, TrendingUp, Clock]}
      features={features}
      benefitsTitle="Complete Usage Insights"
      benefitsSubtitle="Everything you need to understand and optimize tool usage"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for usage insights?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
