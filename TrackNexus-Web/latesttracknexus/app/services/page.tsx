"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Clock, Users, BarChart3, Smartphone, MapPin, Shield } from "lucide-react"


const features = [
  {
    title: "Time Tracking & Automation",
    description: "Accurate time tracking with automated timesheets, break management, and productivity insights. Our AI-powered system captures every minute automatically, eliminating manual entries and ensuring precise records for billing and payroll.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Employee Management",
    description: "Complete employee monitoring and management solutions for teams of all sizes. Track attendance, monitor performance, and enhance team collaboration with our comprehensive suite of management tools.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Analytics & Reporting",
    description: "Detailed reports and analytics to help you make data-driven decisions. Real-time dashboards, custom reports, and productivity analytics give you complete visibility into team performance and project progress.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Mobile & Location Tracking",
    description: "Track time and manage tasks on the go with our mobile applications. GPS-based location tracking for field employees and remote workers ensures accurate time records regardless of where work happens.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Automatic time logging, manual time entry, break tracking, and overtime calculation.",
  },
  {
    icon: Users,
    title: "Employee Management",
    description: "Employee profiles, attendance tracking, performance monitoring, and team collaboration.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Real-time dashboards, custom reports, productivity analytics, and export capabilities.",
  },
  {
    icon: Smartphone,
    title: "Mobile Tracking",
    description: "iOS & Android apps, offline tracking, GPS integration, and push notifications.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Real-time location, geofencing, route tracking, and location history.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Data encryption, secure cloud storage, access controls, and compliance support.",
  },
]

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Companies" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]

const faqs = [
  {
    question: "What services does Track Nexus offer?",
    answer: "Track Nexus provides comprehensive time tracking, employee monitoring, productivity analytics, mobile tracking, location services, and enterprise-grade security—all in one platform.",
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes, our enterprise plans include custom integrations, dedicated support, and tailored solutions to meet your specific business requirements.",
  },
  {
    question: "Is there training available?",
    answer: "We provide comprehensive onboarding, training resources, and dedicated support to ensure your team gets the most out of Track Nexus.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer 24/7 email support, live chat during business hours, and dedicated account managers for enterprise clients.",
  },
]

export default function ServicesPage() {
  return (
    <ProductPageLayout
      badge="Our Services"
      title="Everything You Need to"
      titleHighlight="Track & Manage"
      subtitle="Comprehensive time tracking and employee management solutions designed to boost your team's productivity and streamline your business operations."
      heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Clock, Users, BarChart3, Shield]}
      features={features}
      benefitsTitle="Complete Suite of Services"
      benefitsSubtitle="From basic time tracking to advanced analytics, we provide all the tools your business needs"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to transform your time management?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
