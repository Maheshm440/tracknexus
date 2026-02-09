"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Home, Building, Users, Calendar, BarChart, CheckCircle } from "lucide-react"

const features = [
  {
    title: "Flexible Work Model Support",
    description: "Track Nexus seamlessly adapts to hybrid work environments where employees split time between office and home. Automatically detect work location, track productivity across both environments, and provide unified insights regardless of where work happens.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Office vs Remote Analytics",
    description: "Compare productivity patterns between office and remote work days. Understand which tasks are completed more efficiently in each environment. Use data-driven insights to optimize your hybrid work policy and improve team performance.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Scheduling & Attendance",
    description: "Manage hybrid schedules with intelligent attendance tracking. Know who's in the office and who's remote in real-time. Coordinate team collaboration days, track desk bookings, and ensure effective resource allocation across both environments.",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Unified Communication Tracking",
    description: "Monitor communication and collaboration patterns across in-office and remote workers. Ensure no one is left out regardless of location. Track meeting effectiveness, response times, and team engagement to maintain strong hybrid culture.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Home,
    title: "Remote Work Tracking",
    description: "Comprehensive monitoring for work-from-home days.",
  },
  {
    icon: Building,
    title: "Office Presence",
    description: "Track in-office attendance and desk utilization.",
  },
  {
    icon: Calendar,
    title: "Schedule Management",
    description: "Coordinate hybrid schedules and team collaboration days.",
  },
  {
    icon: Users,
    title: "Team Visibility",
    description: "Know who's where in real-time for better collaboration.",
  },
  {
    icon: BarChart,
    title: "Productivity Comparison",
    description: "Analyze performance across different work environments.",
  },
  {
    icon: CheckCircle,
    title: "Policy Compliance",
    description: "Ensure adherence to hybrid work policies and schedules.",
  },
]

const stats = [
  { value: "2X", label: "Flexibility" },
  { value: "30%", label: "Cost Savings" },
  { value: "95%", label: "Employee Satisfaction" },
  { value: "Seamless", label: "Integration" },
]

const faqs = [
  {
    question: "How does Track Nexus support hybrid work models?",
    answer: "Track Nexus automatically adapts to hybrid environments by tracking productivity and attendance whether employees are in the office or working remotely. It provides unified analytics and helps managers coordinate schedules effectively.",
  },
  {
    question: "Can I compare office vs remote productivity?",
    answer: "Yes, Track Nexus provides detailed analytics comparing productivity, collaboration, and work patterns between office and remote environments. This helps optimize your hybrid policy based on actual data.",
  },
  {
    question: "How do I manage hybrid schedules?",
    answer: "Track Nexus includes schedule management features that let you track who's in the office each day, coordinate collaboration days, and manage desk bookings. Real-time visibility helps teams plan effectively.",
  },
  {
    question: "Does it work with hot-desking?",
    answer: "Absolutely. Track Nexus supports hot-desking environments with desk booking integration and location tracking. It helps optimize office space utilization and ensures resources are allocated efficiently.",
  },
]

export default function HybridWorkforcePage() {
  return (
    <ProductPageLayout
      badge="Hybrid Workforce"
      title="Optimize Your"
      titleHighlight="Flexible Work Model"
      subtitle="Seamlessly manage teams working from home, office, or anywhere. Get unified insights and productivity analytics across all work environments."
      heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Home, Building, Users, Calendar]}
      features={features}
      benefitsTitle="Perfect for Hybrid Teams"
      benefitsSubtitle="Everything needed to thrive in flexible work environments"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to optimize your hybrid workforce?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
