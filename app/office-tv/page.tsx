"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Monitor, Trophy, Users, Activity, Zap, Eye } from "lucide-react"


const features = [
  {
    title: "Live Productivity Dashboards",
    description: "Transform any office screen into a powerful productivity display. Track Nexus Office TV shows real-time team metrics, active projects, and performance indicators. Keep everyone informed and motivated with beautiful, auto-updating dashboards that cycle through key insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Team Leaderboards & Recognition",
    description: "Celebrate top performers with dynamic leaderboards. Display daily, weekly, or monthly rankings based on productivity metrics, completed tasks, or custom KPIs. Gamify work and boost motivation with real-time recognition that keeps your team engaged and competitive.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Live Activity Monitoring",
    description: "View real-time activity snapshots across your entire team. See who's online, what projects are active, and monitor productivity levels at a glance. Perfect for managers who want instant visibility without interrupting their team's workflow.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Custom Display Layouts",
    description: "Design the perfect dashboard for your office. Choose from pre-built layouts or create custom displays that show exactly what matters to your team. Rotate between different views, highlight announcements, and customize colors to match your brand.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Monitor,
    title: "Any Screen Display",
    description: "Turn any TV or monitor into a productivity dashboard.",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Motivate teams with gamified performance rankings.",
  },
  {
    icon: Users,
    title: "Team Visibility",
    description: "See who's online and what everyone is working on.",
  },
  {
    icon: Activity,
    title: "Live Metrics",
    description: "Real-time updates on productivity and project progress.",
  },
  {
    icon: Zap,
    title: "Auto Refresh",
    description: "Dashboards update automatically with latest data.",
  },
  {
    icon: Eye,
    title: "Custom Views",
    description: "Create and rotate multiple dashboard layouts.",
  },
]

const stats = [
  { value: "Live", label: "Updates" },
  { value: "Custom", label: "Layouts" },
  { value: "Team", label: "Rankings" },
  { value: "24/7", label: "Display" },
]

const faqs = [
  {
    question: "How do I set up Office TV?",
    answer: "Simply connect any smart TV or computer to a display, open the Track Nexus Office TV web app, and log in with your admin credentials. Select your preferred dashboard layout and the display will automatically update with live data.",
  },
  {
    question: "Can I customize what's shown on the display?",
    answer: "Yes, fully customize your dashboard with different widgets, metrics, and layouts. Choose which teams to display, what metrics matter most, and how often to rotate between views. Brand it with your company colors and logo.",
  },
  {
    question: "Does it work with any screen?",
    answer: "Office TV works with any device that has a web browser—smart TVs, computer monitors, tablets, or dedicated display hardware. No special software installation required.",
  },
  {
    question: "Can employees see the leaderboard from their desks?",
    answer: "Yes, the same dashboard can be accessed from any device. Employees can view leaderboards and metrics from their computers or phones, not just the office display.",
  },
]

export default function OfficeTvPage() {
  return (
    <ProductPageLayout
      badge="Office Display"
      title="Office TV"
      titleHighlight="Dashboard"
      subtitle="Transform your office screens into powerful productivity displays. Live metrics, team leaderboards, and real-time visibility that motivates."
      heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Monitor, Trophy, Users, Activity]}
      features={features}
      benefitsTitle="Office Display Features"
      benefitsSubtitle="Everything you need for an engaging workplace display"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to energize your office?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
