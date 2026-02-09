"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { FileText, BarChart3, Calendar, Download, Filter, Users } from "lucide-react"


const features = [
  {
    title: "AI-Generated Reports",
    description: "Track Nexus makes it simple to export detailed productivity reports in both PDF and CSV formats—perfect for sharing with clients, HR, or leadership teams. Each report is AI-generated, highlighting key metrics like active hours, app usage, task completion rates, and focus trends.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Team & Individual Summaries",
    description: "Track Nexus delivers detailed, AI-generated summaries that break down productivity and performance by both team and individual. These insights include time spent on tasks, active vs idle time, focus scores, and tool usage—making it easy to see how work is happening across your organization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Performance Heatmaps",
    description: "Track Nexus uses AI heatmaps to show when your team is most active—helping you align meetings, breaks, and workflows with peak focus times. Visualize productivity patterns and identify peak hours for optimal scheduling.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Customizable Filters",
    description: "Drill deep into your data with fully customizable filters. Segment productivity insights by user, team, role, date range, project, app usage, task type, and more. Tailor your view to focus on high performers or flag inefficiencies.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: FileText,
    title: "Exportable Reports",
    description: "Generate professional PDF and CSV reports for clients, HR, or leadership.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Color-coded heatmaps and charts make data easy to understand at a glance.",
  },
  {
    icon: Calendar,
    title: "Scheduled Reports",
    description: "Automate daily, weekly, or monthly report delivery to your inbox.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description: "Download comprehensive reports instantly in your preferred format.",
  },
  {
    icon: Filter,
    title: "Custom Filters",
    description: "Segment data by team, role, date range, project, or any custom criteria.",
  },
  {
    icon: Users,
    title: "Team Comparisons",
    description: "Compare performance across teams and individuals with side-by-side views.",
  },
]

const stats = [
  { value: "Auto", label: "Generated" },
  { value: "PDF/CSV", label: "Formats" },
  { value: "Daily", label: "Reports" },
  { value: "AI", label: "Powered" },
]

const faqs = [
  {
    question: "What data is included in reports?",
    answer: "Reports include active hours, app usage, task completion rates, focus scores, idle time, productivity trends, and customizable metrics based on your needs.",
  },
  {
    question: "Can I schedule automatic reports?",
    answer: "Yes, you can schedule reports to be generated and delivered automatically on a daily, weekly, or monthly basis to specified email addresses.",
  },
  {
    question: "What formats are available?",
    answer: "Reports can be exported in PDF format for presentations and sharing, or CSV format for further analysis in spreadsheet applications.",
  },
  {
    question: "Can I customize what appears in reports?",
    answer: "Absolutely. Use filters to include or exclude specific data, focus on particular teams or individuals, and customize the metrics shown in each report.",
  },
]

export default function ProductivityReportsPage() {
  return (
    <ProductPageLayout
      badge="Automated Reports"
      title="Productivity"
      titleHighlight="Reports"
      subtitle="AI-generated reports that track progress, spot trends, and improve performance. Export detailed insights in PDF or CSV formats."
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[FileText, BarChart3, Calendar, Download]}
      features={features}
      benefitsTitle="Comprehensive Reporting"
      benefitsSubtitle="Everything you need to track and share productivity insights"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for automated insights?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
