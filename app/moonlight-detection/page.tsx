"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { AlertTriangle, Shield, Eye, Clock, Bell, BarChart3 } from "lucide-react"


const features = [
  {
    title: "Enhance Productivity Across Teams",
    description: "Track Nexus drives team efficiency with smart workload management and real-time performance insights. Tailor interactive dashboards to enable smooth collaboration whether your teams work remotely, in-office, or in hybrid environments. Gain visibility into task progress and identify bottlenecks early.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Intelligent Work Monitoring",
    description: "Track Nexus enables efficient hybrid and remote work through advanced productivity tracking, location analytics, and smart attendance monitoring. Boost focus, align team objectives, and streamline workflows with actionable, data-driven insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Project & Time Management",
    description: "Track Nexus simplifies project, task, and time management through real-time tracking, intelligent scheduling, and automated attendance. It boosts team productivity, ensures accurate payroll, and enables smarter decisions with live performance insights.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smarter Work Oversight",
    description: "Track Nexus delivers intelligent, real-time employee monitoring through activity tracking, screen insights, and location-aware data. Enhance productivity, ensure accountability, and maintain transparency across remote and hybrid teams.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: AlertTriangle,
    title: "Moonlight Detection",
    description: "Identify employees engaged in unauthorized side work during hours.",
  },
  {
    icon: Shield,
    title: "Policy Enforcement",
    description: "Ensure compliance with company policies and employment contracts.",
  },
  {
    icon: Eye,
    title: "Activity Monitoring",
    description: "Track application usage to detect potential dual employment.",
  },
  {
    icon: Clock,
    title: "Work Hour Analysis",
    description: "Analyze work patterns to identify unusual activity signatures.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified when suspicious patterns are detected.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Generate compliance reports for HR and management review.",
  },
]

const stats = [
  { value: "AI", label: "Detection" },
  { value: "Real-time", label: "Monitoring" },
  { value: "Custom", label: "Policies" },
  { value: "100%", label: "Compliance" },
]

const faqs = [
  {
    question: "How does moonlighting detection work?",
    answer: "Track Nexus analyzes work patterns, application usage, and activity signatures to identify signs of unauthorized side work. AI detects anomalies that may indicate dual employment.",
  },
  {
    question: "Is this monitoring transparent to employees?",
    answer: "Yes, employees are informed about monitoring policies. Transparent tracking builds trust while ensuring compliance with company policies.",
  },
  {
    question: "Can I customize detection rules?",
    answer: "Absolutely. Configure detection parameters to match your company policies, industry requirements, and specific compliance needs.",
  },
  {
    question: "What happens when moonlighting is detected?",
    answer: "Alerts are sent to designated managers with detailed reports. You decide the appropriate follow-up action based on your company policies.",
  },
]

export default function MoonlightDetectionPage() {
  return (
    <ProductPageLayout
      badge="Compliance"
      title="Moonlighting"
      titleHighlight="Detection"
      subtitle="Detect dual employment with ease. Identify employees involved in unauthorized side work and customize settings to match company policies."
      heroImage="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[AlertTriangle, Shield, Eye, Bell]}
      features={features}
      benefitsTitle="Compliance Features"
      benefitsSubtitle="Everything you need to ensure policy compliance"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for compliance monitoring?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
