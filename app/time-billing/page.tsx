"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Receipt, DollarSign, Clock, FileText, Zap, Settings } from "lucide-react"


const features = [
  {
    title: "Auto-Generated Client Invoices",
    description: "Track Nexus uses advanced AI to automatically generate client invoices from real-time tracked hours, assigned tasks, and user-specific billing rates. It intelligently pulls data from daily logs, applies custom pricing rules, and compiles everything into a clean, professional invoice—ready to send in seconds.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Billable vs. Non-Billable Classification",
    description: "Track Nexus uses AI to automatically categorize tracked hours as billable or non-billable based on task types, user roles, and project-specific billing rules. This intelligent classification eliminates guesswork and ensures every minute is properly accounted for.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Accounting Integration",
    description: "Track Nexus integrates seamlessly with QuickBooks, Xero, and other accounting platforms. Tracked hours, categorized by project and billing type, are automatically pushed into your accounting system—ready for payroll, invoicing, and reporting.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Project-Based Rate Application",
    description: "Track Nexus uses AI to automatically apply the correct billing rates based on project type, client, or team roles. Whether hourly, task-based, or flat-rate, it ensures accurate billing with no manual setup.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Receipt,
    title: "Auto Invoicing",
    description: "Generate professional invoices automatically from tracked time.",
  },
  {
    icon: DollarSign,
    title: "Billable Hours",
    description: "AI automatically categorizes time as billable or non-billable.",
  },
  {
    icon: Clock,
    title: "Time to Invoice",
    description: "Convert tracked time directly to invoices in seconds.",
  },
  {
    icon: FileText,
    title: "Custom Rates",
    description: "Apply different rates by project, client, or team role.",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    description: "Push billing data to QuickBooks, Xero, and more.",
  },
  {
    icon: Settings,
    title: "Flexible Rules",
    description: "Set up custom billing rules for any scenario.",
  },
]

const stats = [
  { value: "Auto", label: "Invoicing" },
  { value: "AI", label: "Classification" },
  { value: "Zero", label: "Manual Entry" },
  { value: "100%", label: "Accuracy" },
]

const faqs = [
  {
    question: "How does auto-invoicing work?",
    answer: "Track Nexus automatically generates invoices from tracked time data. Set up your billing rates, and invoices are compiled with accurate hours, task descriptions, and pricing—ready to send to clients.",
  },
  {
    question: "What accounting tools does it integrate with?",
    answer: "Track Nexus integrates with QuickBooks, Xero, FreshBooks, and other major accounting platforms. Billing data syncs automatically for seamless financial workflows.",
  },
  {
    question: "Can I set different rates for different projects?",
    answer: "Yes, apply custom billing rates by project, client, team, or individual. Support for hourly, task-based, and flat-rate billing structures.",
  },
  {
    question: "How does billable vs non-billable classification work?",
    answer: "AI automatically categorizes time based on task types, project rules, and your custom settings. Billable hours are invoice-ready while non-billable time is tracked for internal analysis.",
  },
]

export default function TimeBillingPage() {
  return (
    <ProductPageLayout
      badge="Time Billing"
      title="Time to"
      titleHighlight="Invoice"
      subtitle="Smarter time tracking with AI-driven billing. Automate invoicing, ensure accurate logs, and get paid faster with Track Nexus."
      heroImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Receipt, DollarSign, Clock, FileText]}
      features={features}
      benefitsTitle="Automated Billing Features"
      benefitsSubtitle="Everything you need to convert time to revenue"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for automated billing?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
