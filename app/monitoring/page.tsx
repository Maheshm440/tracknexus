"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Monitor, Eye, Camera, Activity, Shield, BarChart3 } from "lucide-react"


const features = [
  {
    title: "Real-Time Screen Monitoring",
    description: "Get live visibility into employee screens with periodic screenshots and real-time activity feeds. Understand exactly how work hours are spent without invasive surveillance—our transparent approach keeps teams accountable while respecting privacy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Application & Website Tracking",
    description: "Automatically track which applications and websites employees use during work hours. Categorize activities as productive, neutral, or unproductive to get clear insights into work patterns and identify opportunities for improvement.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Activity Level Detection",
    description: "Monitor keyboard and mouse activity to understand engagement levels throughout the day. Identify peak productivity hours, detect idle time, and ensure accurate time tracking based on actual work activity.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Productivity Analytics",
    description: "Transform raw monitoring data into actionable insights. Our AI-powered analytics identify productivity trends, highlight top performers, and surface areas where teams can improve their efficiency and focus.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Monitor,
    title: "Screen Capture",
    description: "Periodic screenshots provide visual proof of work without constant surveillance.",
  },
  {
    icon: Eye,
    title: "Live View",
    description: "See employee screens in real-time when needed for support or verification.",
  },
  {
    icon: Activity,
    title: "Activity Tracking",
    description: "Monitor keyboard, mouse, and application activity to measure engagement.",
  },
  {
    icon: Camera,
    title: "Video Recording",
    description: "Optional screen recording for compliance-sensitive industries.",
  },
  {
    icon: Shield,
    title: "Privacy Controls",
    description: "Configurable monitoring levels and transparent policies for employee trust.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Comprehensive analytics on productivity, activity, and time utilization.",
  },
]

const stats = [
  { value: "35%", label: "Productivity Boost" },
  { value: "50%", label: "Less Idle Time" },
  { value: "100%", label: "Transparency" },
  { value: "24/7", label: "Monitoring" },
]

const faqs = [
  {
    question: "Is employee monitoring legal?",
    answer: "Yes, employee monitoring is legal in most jurisdictions when employees are informed and consent is obtained. Track Nexus provides tools for transparent policies and employee acknowledgment.",
  },
  {
    question: "Can employees see what's being monitored?",
    answer: "Yes, we recommend transparent monitoring. Employees can view their own activity data and understand exactly what information is being collected.",
  },
  {
    question: "How often are screenshots taken?",
    answer: "Screenshot frequency is fully customizable—from every few minutes to hourly. You can also set different frequencies for different teams or roles.",
  },
  {
    question: "Does monitoring affect computer performance?",
    answer: "No, Track Nexus is designed to be lightweight and runs silently in the background without impacting system performance or employee workflows.",
  },
]

export default function MonitoringPage() {
  return (
    <ProductPageLayout
      badge="Employee Monitoring"
      title="Smart Employee"
      titleHighlight="Monitoring"
      subtitle="Transparent, ethical monitoring that boosts productivity without micromanaging. Get real insights into how work gets done."
      heroImage="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Monitor, Eye, Activity, Shield]}
      features={features}
      benefitsTitle="Comprehensive Monitoring Features"
      benefitsSubtitle="Everything you need to understand and improve team productivity"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for transparent monitoring?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
