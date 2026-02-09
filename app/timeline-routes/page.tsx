"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Route, Clock, MapPin, Activity, Eye, Zap } from "lucide-react"


const features = [
  {
    title: "Smart AI-Driven Timelines",
    description: "Track Nexus brings your team's daily work to life with Smart Timelines powered by AI. This feature automatically captures when tasks start, pause, resume, and finish. AI analyzes data to detect inefficiencies, bottlenecks, and time waste, helping managers understand how the day unfolds.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AI-Enhanced GPS Route Logs",
    description: "Track Nexus combines real-time GPS tracking with AI to give businesses full visibility into team movement and travel behavior. It automatically logs routes traveled, stop durations, distances covered, and time spent between locations.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AI-Based Idle Time Detection",
    description: "Track Nexus combines GPS tracking with AI to log and analyze your team's movement throughout the day. AI detects inefficiencies, flags unusual routes, and suggests smarter paths to improve accountability and reduce travel time.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Break and Task Visualization",
    description: "Track Nexus uses AI to visually map work sessions, break periods, and idle time. It automatically distinguishes between active tasks and downtime, showing exactly when work starts, pauses, and resumes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Route,
    title: "Route Tracking",
    description: "Visualize daily routes and travel patterns for field teams.",
  },
  {
    icon: Clock,
    title: "Visual Timelines",
    description: "See daily work patterns with clear, visual timeline views.",
  },
  {
    icon: MapPin,
    title: "Location History",
    description: "Review where team members have been throughout the day.",
  },
  {
    icon: Activity,
    title: "Activity Detection",
    description: "AI detects active work, breaks, and idle time automatically.",
  },
  {
    icon: Eye,
    title: "Pattern Analysis",
    description: "Identify productivity patterns and optimize workflows.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live visibility into team timelines and locations.",
  },
]

const stats = [
  { value: "AI", label: "Powered" },
  { value: "GPS", label: "Tracking" },
  { value: "Real-time", label: "Timelines" },
  { value: "100%", label: "Visibility" },
]

const faqs = [
  {
    question: "What are smart timelines?",
    answer: "Smart timelines automatically capture when tasks start, pause, resume, and finish throughout the day. AI analyzes this data to detect inefficiencies and suggest schedule improvements.",
  },
  {
    question: "How does GPS route tracking work?",
    answer: "Track Nexus logs routes traveled, stop durations, and distances covered using GPS. AI analyzes movement patterns to identify inefficiencies and suggest optimizations.",
  },
  {
    question: "Can I see historical route data?",
    answer: "Yes, review complete route history with detailed maps showing where team members traveled, how long they stayed at locations, and total distances covered.",
  },
  {
    question: "Does it work for hybrid teams?",
    answer: "Absolutely. Timeline and route tracking works for remote, field-based, and hybrid teams, providing visibility regardless of where work happens.",
  },
]

export default function TimelineRoutesPage() {
  return (
    <ProductPageLayout
      badge="Timelines & Routes"
      title="Timelines &"
      titleHighlight="Routes"
      subtitle="AI-powered view of your team's daily task flow and physical movement. Map where time is spent and track progress across locations."
      heroImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Route, Clock, MapPin, Activity]}
      features={features}
      benefitsTitle="Timeline & Route Features"
      benefitsSubtitle="Complete visibility into how and where work happens"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for timeline visibility?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
