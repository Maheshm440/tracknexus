"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { TrendingUp, BarChart3, Clock, Target, Bell, Shield } from "lucide-react"


const features = [
  {
    title: "AI-Driven Real-Time Tracking",
    description: "Track Nexus uses intelligent AI tracking to monitor app usage, website visits, and activity levels—giving you real-time visibility into how your team works, minute by minute. Understand which tools are being used, where time is spent, and how engaged your team is throughout the day.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Performance Heatmaps",
    description: "Track Nexus uses AI heatmaps to show when your team is most active—helping you align meetings, breaks, and workflows with peak focus times. Visualize productivity patterns and identify opportunities to optimize schedules.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Productivity Benchmarks & Alerts",
    description: "Track Nexus uses AI to set performance baselines and instantly notifies you of dips or unusual activity. Get real-time alerts when productivity drops so you can act fast and support your team proactively.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Daily & Weekly Reports",
    description: "Automated insights that help you track progress, spot trends, and improve performance—every day, every week. Export detailed reports in PDF or CSV formats for sharing with leadership or HR teams.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Focus Scores",
    description: "AI analyzes attention levels to assign focus scores for each task and employee.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Comprehensive dashboards showing productivity trends across teams.",
  },
  {
    icon: Clock,
    title: "Active vs Idle Time",
    description: "Accurately detect when users are actively working versus idle.",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and monitor productivity goals for individuals and teams.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified when productivity drops below defined benchmarks.",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "Ethical monitoring that respects employee privacy and builds trust.",
  },
]

const stats = [
  { value: "35%", label: "Productivity Boost" },
  { value: "AI", label: "Powered Insights" },
  { value: "Real-time", label: "Monitoring" },
  { value: "100%", label: "Visibility" },
]

const faqs = [
  {
    question: "How does productivity tracking work?",
    answer: "Track Nexus monitors application usage, website visits, and activity levels (keyboard/mouse) to calculate productivity scores. Our AI categorizes activities and provides insights on focus time and work patterns.",
  },
  {
    question: "What is a focus score?",
    answer: "Focus score is an AI-calculated metric that measures how engaged an employee is with their work tasks. It considers factors like app usage continuity, task completion, and distraction-free work periods.",
  },
  {
    question: "Can employees see their own productivity data?",
    answer: "Yes, employees have access to their own productivity dashboards, promoting transparency and self-improvement. This builds trust and encourages personal accountability.",
  },
  {
    question: "How does this help with remote teams?",
    answer: "Track Nexus provides complete visibility into remote team productivity, helping managers understand work patterns, identify challenges, and support team members regardless of location.",
  },
]

export default function EmployeeProductivityPage() {
  return (
    <ProductPageLayout
      badge="AI Productivity Tracking"
      title="Employee"
      titleHighlight="Productivity"
      subtitle="AI-powered insights that reveal patterns, streamline work, and show team performance—clearly and smartly. Boost productivity with intelligent analytics."
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[TrendingUp, BarChart3, Clock, Target]}
      features={features}
      benefitsTitle="Smarter Productivity Insights"
      benefitsSubtitle="AI-powered analytics to understand and improve team performance"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to boost team productivity?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
