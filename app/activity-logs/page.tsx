"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { FileText, Clock, Activity, BarChart3, Monitor, Zap } from "lucide-react"


const features = [
  {
    title: "Auto-logged App & Website Usage",
    description: "Track Nexus automatically logs time spent on each app to measure focus and productivity. It tracks websites visited and highlights usage patterns with AI-powered insights, giving you complete visibility into how work time is spent.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Categorized Activity Tracking",
    description: "Track Nexus uses AI to automatically label activities as productive, neutral, or unproductive. Quickly understand how time is spent across tools, tasks, and websites—no manual sorting needed. Get instant clarity on productivity patterns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Real-Time Session Tracking",
    description: "View active sessions as they happen, with real-time visibility into ongoing work. Get immediate data on activity levels, tools in use, and session duration—powered by AI for instant insights into team productivity.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Daily Timelines & Reports",
    description: "Track Nexus maps each user's day into a clear, color-coded timeline based on activity type, status, and focus level. Dive into detailed sessions or get instant high-level summaries—all in one click.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: FileText,
    title: "Complete History",
    description: "Access detailed logs of all employee activities, applications, and websites visited.",
  },
  {
    icon: Clock,
    title: "Timeline View",
    description: "Visualize work patterns with color-coded daily timelines showing activity types.",
  },
  {
    icon: Activity,
    title: "Activity Categories",
    description: "AI automatically categorizes activities as productive, neutral, or unproductive.",
  },
  {
    icon: BarChart3,
    title: "Trend Analysis",
    description: "Identify productivity patterns and trends over time with smart analytics.",
  },
  {
    icon: Monitor,
    title: "App & Web Tracking",
    description: "Track application and website usage to understand work habits.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "See live activity as it happens with instant session tracking.",
  },
]

const stats = [
  { value: "100%", label: "Activity Captured" },
  { value: "Real-time", label: "Updates" },
  { value: "AI", label: "Categorization" },
  { value: "30 days", label: "History" },
]

const faqs = [
  {
    question: "What activities are logged?",
    answer: "Track Nexus logs application usage, website visits, active/idle time, and session durations. All activities are automatically categorized by our AI as productive, neutral, or unproductive.",
  },
  {
    question: "How long is activity data stored?",
    answer: "Activity data retention depends on your plan. Starter plans include 30-day retention, while Premium plans offer unlimited history. You can also export data at any time.",
  },
  {
    question: "Can employees view their own activity logs?",
    answer: "Yes, employees can access their own activity logs and timelines, promoting transparency and self-improvement.",
  },
  {
    question: "How does AI categorization work?",
    answer: "Our AI analyzes app and website usage patterns to automatically label activities. You can also customize categories based on your business needs.",
  },
]

export default function ActivityLogsPage() {
  return (
    <ProductPageLayout
      badge="Activity Tracking"
      title="Complete Activity"
      titleHighlight="Logs"
      subtitle="AI-powered activity logging that captures, analyzes, and visualizes every action your team takes for smarter oversight."
      heroImage="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[FileText, Clock, Activity, BarChart3]}
      features={features}
      benefitsTitle="Comprehensive Activity Tracking"
      benefitsSubtitle="Everything you need to understand how work gets done"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for complete activity visibility?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
