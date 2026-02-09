"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { LayoutDashboard, BarChart3, TrendingUp, Eye, Zap, Settings } from "lucide-react"


const features = [
  {
    title: "Live Work Analytics",
    description: "Track Nexus captures live activity data and transforms it into clear, actionable visualizations. Monitor real-time workflows, app usage, and focus time without disrupting your team. Instantly spot bottlenecks, idle time, or unproductive patterns.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AI-Powered Performance Trends",
    description: "Track Nexus uses AI to reveal top performers, key tools, and peak productivity hours. Identify top-performing time slots, discover hidden burnout signals, and spot the most effective platforms effortlessly.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Customizable Views",
    description: "Segment insights by team, role, or user. Create personalized dashboard views that focus on the metrics that matter most to you. Drill down into specific data points or zoom out for a high-level overview.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Exportable Billing Dashboards",
    description: "AI-enhanced billing dashboards that track billable hours, project costs, and profitability. Export detailed reports for client invoicing and financial planning with full transparency.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboards",
    description: "Live updates showing team activity, productivity, and work patterns.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful charts and graphs that make complex data easy to understand.",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "AI-powered insights reveal patterns and trends over time.",
  },
  {
    icon: Eye,
    title: "Full Visibility",
    description: "See everything from high-level overviews to granular details.",
  },
  {
    icon: Settings,
    title: "Customizable",
    description: "Create personalized views focused on your specific needs.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Get actionable intelligence without waiting for reports.",
  },
]

const stats = [
  { value: "Real-time", label: "Updates" },
  { value: "AI", label: "Powered" },
  { value: "100%", label: "Customizable" },
  { value: "24/7", label: "Access" },
]

const faqs = [
  {
    question: "What data do the dashboards show?",
    answer: "Dashboards display real-time activity data including app usage, website visits, active/idle time, productivity scores, team performance, and project progress—all visualized in easy-to-understand charts and graphs.",
  },
  {
    question: "Can I customize my dashboard view?",
    answer: "Yes, dashboards are fully customizable. You can choose which metrics to display, create different views for different purposes, and set up role-based access to specific data.",
  },
  {
    question: "How often is data updated?",
    answer: "Dashboard data is updated in real-time. As activity is tracked, it appears on your dashboard immediately, giving you live visibility into team performance.",
  },
  {
    question: "Can I share dashboards with my team?",
    answer: "Yes, you can share dashboard views with team members, clients, or stakeholders. Set permissions to control who sees what data and export snapshots for presentations.",
  },
]

export default function InsightDashboardPage() {
  return (
    <ProductPageLayout
      badge="Analytics Dashboards"
      title="Insight"
      titleHighlight="Dashboards"
      subtitle="AI-powered dashboards that reveal patterns, streamline work, and show team performance—clearly and smartly. Get instant visibility into productivity."
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[LayoutDashboard, BarChart3, TrendingUp, Eye]}
      features={features}
      benefitsTitle="Powerful Dashboard Features"
      benefitsSubtitle="Everything you need to visualize and understand team productivity"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for real-time insights?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
