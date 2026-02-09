"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Users, Globe, Clock, TrendingUp, Shield, Zap } from "lucide-react"

const features = [
  {
    title: "Seamless Global Collaboration",
    description: "Track Nexus bridges time zones and locations, providing real-time insights into your distributed team's productivity. Monitor work hours across different regions, ensure accountability, and maintain team cohesion regardless of where your employees are located.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Flexible Time Tracking",
    description: "Automated time tracking adapts to each team member's schedule and location. Track productive hours, breaks, and availability across all time zones. Generate comprehensive reports that show when and how your remote team is working most effectively.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Remote Work Analytics",
    description: "Gain deep insights into remote work patterns with AI-powered analytics. Identify productivity trends, optimal working hours, and collaboration patterns. Understand how your distributed team operates and make data-driven decisions to improve efficiency.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Trust and Transparency",
    description: "Build trust with your remote team through transparent productivity tracking. Privacy-first monitoring ensures employee autonomy while providing managers with the insights they need. Create a culture of accountability without micromanagement.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Globe,
    title: "Global Workforce Management",
    description: "Manage teams across multiple time zones and locations effortlessly.",
  },
  {
    icon: Clock,
    title: "Asynchronous Tracking",
    description: "Track work hours that fit different schedules and time zones.",
  },
  {
    icon: TrendingUp,
    title: "Performance Insights",
    description: "Monitor remote team productivity with detailed analytics.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enhance remote collaboration with visibility into team activities.",
  },
  {
    icon: Shield,
    title: "Privacy-First Approach",
    description: "Respect employee privacy while maintaining accountability.",
  },
  {
    icon: Zap,
    title: "Instant Visibility",
    description: "Real-time dashboards showing remote team activity and status.",
  },
]

const stats = [
  { value: "24/7", label: "Global Coverage" },
  { value: "100+", label: "Countries" },
  { value: "50%", label: "Productivity Boost" },
  { value: "Real-time", label: "Insights" },
]

const faqs = [
  {
    question: "How does Track Nexus help manage remote teams?",
    answer: "Track Nexus provides comprehensive time tracking, activity monitoring, and productivity analytics specifically designed for distributed teams. It helps managers understand work patterns across time zones and ensures accountability without micromanagement.",
  },
  {
    question: "Can I track employees in different time zones?",
    answer: "Yes, Track Nexus automatically adjusts for time zones and provides unified reporting. You can see team activity in real-time regardless of where employees are located, with times displayed in local or standardized formats.",
  },
  {
    question: "Is remote employee monitoring privacy-compliant?",
    answer: "Absolutely. Track Nexus follows privacy-first principles with configurable settings for what is tracked. Employees have transparency into what's being monitored, and all tracking complies with international privacy regulations.",
  },
  {
    question: "How does it improve remote team productivity?",
    answer: "By providing visibility into work patterns, identifying bottlenecks, and highlighting productive hours. The insights help optimize workflows, improve communication, and ensure resources are allocated effectively across your distributed team.",
  },
]

export default function RemoteTeamsPage() {
  return (
    <ProductPageLayout
      badge="Remote Teams"
      title="Empower Your"
      titleHighlight="Distributed Workforce"
      subtitle="Complete visibility and management for remote teams across the globe. Track, manage, and optimize productivity for your distributed workforce with intelligent insights."
      heroImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Users, Globe, Clock, TrendingUp]}
      features={features}
      benefitsTitle="Built for Remote Work"
      benefitsSubtitle="Everything you need to manage distributed teams effectively"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to empower your remote team?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
