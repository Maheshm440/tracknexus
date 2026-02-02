"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { CheckSquare, Clock, Zap, Calendar, Users, TrendingUp } from "lucide-react"


const features = [
  {
    title: "AI Task Suggestions",
    description: "Track Nexus uses AI to recommend the right tasks to the right people at the right time. By analyzing team workload, skills, past performance, and current priorities, the system automatically suggests task assignments that boost efficiency and balance.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AI-Driven Task Timelines",
    description: "Smart timelines that adapt as your team works. AI continuously monitors task progress, interdependencies, and team capacity to auto-adjust timelines as things change. When delays occur, the system intelligently reschedules affected tasks.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AI-Optimized Collaboration",
    description: "Enhance teamwork with intelligent task coordination. From assigning tasks to sharing updates and managing deadlines, AI ensures the right people are always in sync. Get smart reminders, real-time suggestions, and automated follow-ups.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "AI-Backed Task Time Logs",
    description: "Accurate time tracking, auto-logged by intelligent systems. From start to completion, every second is captured—no manual entries required. AI identifies active work sessions, pauses, and multitasking patterns for precise records.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Create, assign, and track tasks with clear accountability and deadlines.",
  },
  {
    icon: Clock,
    title: "Time per Task",
    description: "See exactly how much time is spent on each task automatically.",
  },
  {
    icon: Zap,
    title: "AI Suggestions",
    description: "Get intelligent recommendations for task assignments and priorities.",
  },
  {
    icon: Calendar,
    title: "Smart Timelines",
    description: "Adaptive timelines that adjust automatically as work progresses.",
  },
  {
    icon: Users,
    title: "Team Coordination",
    description: "Keep everyone in sync with automated updates and reminders.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor task completion rates and team velocity in real-time.",
  },
]

const stats = [
  { value: "AI", label: "Powered" },
  { value: "Auto", label: "Time Logs" },
  { value: "Smart", label: "Scheduling" },
  { value: "100%", label: "Accuracy" },
]

const faqs = [
  {
    question: "How does AI task suggestion work?",
    answer: "Our AI analyzes team workload, skills, past performance, and priorities to recommend optimal task assignments. It considers availability, expertise, and deadlines to ensure balanced workloads.",
  },
  {
    question: "Is time logged automatically?",
    answer: "Yes, Track Nexus automatically tracks time spent on each task without manual input. It detects when you start and stop working on tasks and logs time accurately.",
  },
  {
    question: "Can I create recurring tasks?",
    answer: "Absolutely. Set up recurring tasks with intelligent scheduling. AI learns patterns and optimizes frequencies based on team capacity and changing priorities.",
  },
  {
    question: "How do smart timelines work?",
    answer: "Timelines adapt automatically based on task progress and dependencies. When delays occur, affected tasks are rescheduled intelligently to keep projects on track.",
  },
]

export default function TaskTrackingPage() {
  return (
    <ProductPageLayout
      badge="Task Tracking"
      title="Smart Task"
      titleHighlight="Tracking"
      subtitle="AI-powered task tracking that keeps your team aligned, accountable, and moving forward. Assign, monitor, and complete tasks with precision."
      heroImage="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[CheckSquare, Clock, Zap, Calendar]}
      features={features}
      benefitsTitle="Advanced Task Features"
      benefitsSubtitle="AI-enhanced features to simplify tracking and boost efficiency"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for smarter task tracking?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
