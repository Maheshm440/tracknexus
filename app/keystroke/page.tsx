"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Keyboard, Shield, BarChart3, FileText, Activity, Zap } from "lucide-react"


const features = [
  {
    title: "AI-Powered Typing Analytics",
    description: "It's not just about how much your team types—it's about when, where, and how efficiently. Track Nexus monitors typing speed and idle time to provide a clear view of productivity—without capturing personal content. It helps teams stay focused and manage work patterns more effectively.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Privacy-Centered Approach",
    description: "Track Nexus captures typing frequency—not content. No personal data, no keylogging, just ethical analytics. We track only typing activity—not content—ensuring full transparency and team trust while providing actionable productivity insights.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Productivity Insights from Keystrokes",
    description: "Typing trends reveal more than effort—they reveal workflow health. Track Nexus uses AI to reveal deeper work patterns from typing behavior, helping identify signs of burnout, focus time, and team-wide typing efficiency—all without invading privacy.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Billing & Timesheet Integration",
    description: "Use keystroke activity to validate logged hours and support client billing—without manual effort. Track Nexus uses typing data to auto-fill timesheets and validate active work hours—making billing accurate and transparent.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Keyboard,
    title: "Typing Speed Tracking",
    description: "Track words per minute to measure engagement and identify productivity patterns.",
  },
  {
    icon: Activity,
    title: "Idle Detection",
    description: "Identify pauses and break times through inactivity monitoring.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Only logs typing count and time, never what's typed. Built for compliance.",
  },
  {
    icon: BarChart3,
    title: "Team Dashboards",
    description: "Compare team-wide activity for balanced coaching and performance insights.",
  },
  {
    icon: FileText,
    title: "Export-Ready Reports",
    description: "Generate exportable, client-friendly reports in XLS, PDF, or CSV formats.",
  },
  {
    icon: Zap,
    title: "Real-Time Insights",
    description: "Get instant visibility into work patterns and productivity levels.",
  },
]

const stats = [
  { value: "100%", label: "Privacy Focused" },
  { value: "0", label: "Content Captured" },
  { value: "50%", label: "More Accurate" },
  { value: "24/7", label: "Monitoring" },
]

const faqs = [
  {
    question: "Does keystroke monitoring capture what I type?",
    answer: "No. Track Nexus only tracks typing frequency and patterns—never the actual content. We focus on productivity metrics like words per minute and active/idle time, not personal data.",
  },
  {
    question: "Is keystroke monitoring legal?",
    answer: "Yes, when employees are informed and consent is obtained. Track Nexus provides transparent policies and focuses only on productivity metrics, not personal content.",
  },
  {
    question: "How does it help with billing?",
    answer: "Keystroke activity validates logged work hours, providing proof of active work time that can be used for client billing and timesheet verification.",
  },
  {
    question: "Can it detect burnout?",
    answer: "Yes, our AI analyzes typing patterns to identify signs of fatigue, erratic rhythms, and potential burnout, helping managers support their teams proactively.",
  },
]

export default function KeystrokePage() {
  return (
    <ProductPageLayout
      badge="Keystroke Analytics"
      title="Smart Keystroke"
      titleHighlight="Monitoring"
      subtitle="Privacy-first keyboard analytics that track productivity patterns without capturing content. Understand work habits with ethical monitoring."
      heroImage="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Keyboard, Activity, Shield, BarChart3]}
      features={features}
      benefitsTitle="Ethical Keystroke Analytics"
      benefitsSubtitle="Privacy-focused monitoring that delivers real productivity insights"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for ethical productivity tracking?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
