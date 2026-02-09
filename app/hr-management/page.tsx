"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Users, FileText, Calendar, Clock, DollarSign, Award } from "lucide-react"


const features = [
  {
    title: "Go Paperless with Smarter HR",
    description: "Empower your HR team with Track Nexus intelligent HR software. Eliminate manual processes and reduce paperwork by digitizing your core HR operations. Save valuable time and resources while boosting accuracy, transparency, and overall efficiency.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Master Time with Smart Tools",
    description: "Maximize team productivity by managing time more effectively. Track Nexus empowers your organization with intelligent tools that make every minute count—boosting efficiency, accuracy, and accountability across all teams.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Hassle-Free Leave Management",
    description: "Say goodbye to messy spreadsheets and manual leave tracking. With Track Nexus, managing time off is smooth, transparent, and stress-free so you can focus on your team. Track balances, approve requests, and maintain visibility.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Streamlined Payroll Management",
    description: "Manage employee salaries, reimbursements, and expenses all in one place. Track Nexus ensures timely payments and clear financial oversight for a stress-free payroll experience with full integration.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Users,
    title: "Employee Directory",
    description: "Manage employee details in one organized, searchable platform.",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Store, manage, and access all HR documents securely in one place.",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description: "Track leave balances, handle requests, and manage time off easily.",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    description: "Monitor attendance effortlessly with real-time, automated systems.",
  },
  {
    icon: DollarSign,
    title: "Payroll Integration",
    description: "Seamless payroll processing with accurate time and attendance data.",
  },
  {
    icon: Award,
    title: "Performance Tracking",
    description: "Build high-performing teams with recognition and feedback tools.",
  },
]

const stats = [
  { value: "All-in-One", label: "HR Platform" },
  { value: "Paperless", label: "Operations" },
  { value: "Auto", label: "Timesheets" },
  { value: "Integrated", label: "Payroll" },
]

const faqs = [
  {
    question: "What HR features are included?",
    answer: "Track Nexus includes employee directory, attendance tracking, leave management, document storage, payroll integration, and performance tracking—all in one platform.",
  },
  {
    question: "Can employees manage their own leave?",
    answer: "Yes, employees can submit leave requests, view balances, and track approvals through self-service portals. Managers can approve or decline with one click.",
  },
  {
    question: "Does it integrate with payroll systems?",
    answer: "Yes, Track Nexus integrates with popular payroll systems to ensure accurate time data flows seamlessly for payroll processing.",
  },
  {
    question: "How does attendance tracking work?",
    answer: "Attendance is tracked automatically through multiple methods including desktop apps, mobile check-in, facial recognition, or GPS-based clock-in.",
  },
]

export default function HRManagementPage() {
  return (
    <ProductPageLayout
      badge="HR Management"
      title="HR"
      titleHighlight="Management"
      subtitle="Complete HR management in one intelligent platform. Streamline employee data, attendance, leave, and payroll with Track Nexus."
      heroImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Users, FileText, Calendar, Clock]}
      features={features}
      benefitsTitle="Complete HR Features"
      benefitsSubtitle="Everything you need to manage your workforce efficiently"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to transform HR?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
