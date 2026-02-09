"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Clock, Zap, BarChart3, Shield, Users, Smartphone } from "lucide-react"


const features = [
  {
    title: "AI-Powered Automation",
    description: "Automate time logging with Track Nexus' AI-powered tracking that captures every task, break, and shift in real time—eliminating the need for manual entries. Whether your team is working remotely or in the office, the system intelligently monitors activity patterns, task durations, and engagement levels. Based on this data, it delivers personalized insights and suggestions to improve focus, reduce downtime, and streamline daily workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Real-Time Visibility",
    description: "Track Nexus gives you full real-time visibility into your team's workday, no matter where they are. From active tasks and time spent to app usage and productivity levels, every action is captured and displayed through intuitive dashboards. This live overview helps managers identify inefficiencies, monitor progress against goals, and take timely action when needed.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Precision Without Effort",
    description: "Track Nexus is designed to deliver highly accurate time and activity tracking without interrupting your team's flow. With intelligent AI working quietly in the background, it automatically records work hours, tracks application usage, and monitors task engagement—eliminating the need for manual inputs or guesswork.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Seamless Integrations",
    description: "Connect Track Nexus with your favorite tools and platforms. Our time tracking integrates seamlessly with project management tools, communication apps, and HR systems to create a unified workflow. Sync data automatically, eliminate duplicate entries, and keep your entire tech stack working together harmoniously.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Automatic Time Logging",
    description: "No more manual timesheets. Track Nexus automatically captures work hours, breaks, and overtime with precision.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Get real-time analytics on productivity patterns, helping you optimize workflows and boost team efficiency.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Generate comprehensive reports on time allocation, project progress, and team performance with one click.",
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "Employee privacy is protected with transparent tracking policies and configurable monitoring settings.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enhance team coordination with shared calendars, project timelines, and collaborative time tracking.",
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Track time on the go with our mobile apps. Perfect for remote teams and field workers.",
  },
]

const stats = [
  { value: "40%", label: "Time Saved" },
  { value: "99.9%", label: "Accuracy" },
  { value: "10K+", label: "Active Users" },
  { value: "4.9/5", label: "User Rating" },
]

const faqs = [
  {
    question: "How does automatic time tracking work?",
    answer: "Track Nexus uses AI to automatically detect when you start and stop working. It monitors active applications, tracks task duration, and logs time without any manual input required.",
  },
  {
    question: "Can employees see what's being tracked?",
    answer: "Yes, transparency is key. Employees have full visibility into what data is being collected and can access their own activity reports and time logs at any time.",
  },
  {
    question: "Does it work for remote teams?",
    answer: "Absolutely! Track Nexus is designed for modern distributed teams. It works across time zones, supports multiple devices, and provides real-time insights regardless of location.",
  },
  {
    question: "Can I integrate with other tools?",
    answer: "Yes, Track Nexus integrates with popular tools like Slack, Microsoft Teams, Jira, Asana, Trello, and many more HR and project management platforms.",
  },
]

export default function TimeTrackingPage() {
  return (
    <ProductPageLayout
      badge="AI-Powered Time Tracking"
      title="Track Time"
      titleHighlight="Automatically"
      subtitle="AI-powered time tracking that works in the background. Capture every minute accurately without disrupting your team's workflow."
      heroImage="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Clock, Zap, BarChart3, Shield]}
      features={features}
      benefitsTitle="Why Teams Love Track Nexus"
      benefitsSubtitle="Everything you need to track time effectively and boost productivity"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to automate your time tracking?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
