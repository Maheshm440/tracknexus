"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Calendar, Clock, PieChart, FileText, CheckCircle, BarChart3 } from "lucide-react"


const features = [
  {
    title: "Real-Time Leave Balance Tracking",
    description: "Track Nexus provides instant visibility into every employee's leave balance. View accrued time, used days, and remaining balances in real-time. Employees can check their own balances while managers get a complete team overview with smart filtering and search capabilities.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Streamlined Leave Requests",
    description: "Simplify the entire leave request process from submission to approval. Employees submit requests in seconds, managers approve with one click, and everyone stays informed with automatic notifications. Configure custom approval workflows that match your organization's policies.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Comprehensive Leave Reports",
    description: "Generate detailed leave reports with just a few clicks. Analyze leave patterns, track trends over time, and export data for payroll integration. Custom reports help you understand utilization rates and plan resources effectively.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Leave Policies",
    description: "Configure flexible leave policies that match your organization's needs. Set up different leave types, accrual rules, carryover limits, and approval hierarchies. Track Nexus automatically applies the right policies to the right employees.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Calendar,
    title: "Leave Calendar",
    description: "View team availability with an integrated leave calendar.",
  },
  {
    icon: Clock,
    title: "Accrual Tracking",
    description: "Automatically track leave accruals based on your policies.",
  },
  {
    icon: PieChart,
    title: "Usage Analytics",
    description: "Analyze leave patterns and utilization across teams.",
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description: "Generate detailed reports for payroll and compliance.",
  },
  {
    icon: CheckCircle,
    title: "Quick Approvals",
    description: "One-click approvals with automatic notifications.",
  },
  {
    icon: BarChart3,
    title: "Trend Analysis",
    description: "Identify trends and plan resources proactively.",
  },
]

const stats = [
  { value: "Real-time", label: "Balances" },
  { value: "Auto", label: "Accruals" },
  { value: "Custom", label: "Policies" },
  { value: "Instant", label: "Reports" },
]

const faqs = [
  {
    question: "How does leave balance tracking work?",
    answer: "Track Nexus automatically calculates leave balances based on your configured accrual policies. Employees see their current balance, and the system updates in real-time as leave is requested, approved, or taken.",
  },
  {
    question: "Can I set up different leave types?",
    answer: "Yes, configure unlimited leave types such as vacation, sick leave, personal days, and custom categories. Each type can have its own accrual rules, approval workflow, and carryover policies.",
  },
  {
    question: "How do employees request leave?",
    answer: "Employees can submit leave requests through the web portal or mobile app. They select dates, leave type, and add notes. Managers receive instant notifications and can approve or decline with one click.",
  },
  {
    question: "What reports are available?",
    answer: "Generate reports on leave balances, utilization rates, trends over time, team calendars, and payroll exports. All reports can be filtered by date range, department, or employee and exported to Excel or PDF.",
  },
]

export default function LeaveBalanceReportsPage() {
  return (
    <ProductPageLayout
      badge="Leave Management"
      title="Leave Balance"
      titleHighlight="& Reports"
      subtitle="Effortless leave tracking and management. Monitor balances, streamline approvals, and generate comprehensive reports with Track Nexus."
      heroImage="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Calendar, Clock, PieChart, FileText]}
      features={features}
      benefitsTitle="Complete Leave Management"
      benefitsSubtitle="Everything you need to manage time off efficiently"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to simplify leave management?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
