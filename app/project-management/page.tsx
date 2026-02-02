"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { FolderKanban, Target, Users, Clock, Bug, Calendar } from "lucide-react"


const features = [
  {
    title: "Set Clear Goals & Stay Focused",
    description: "Gain a specific objective for your project and align your team's efforts to achieve it efficiently. Stay on track, maintain clarity, and meet your deadlines with confidence. Break down complex goals into actionable steps to ensure steady progress.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Efficient Sprint Planning & Tracking",
    description: "Easily add your project title, set estimated timelines, and plan each sprint within a defined time frame. Stay organized by tracking daily progress and viewing the exact number of days left to complete each project.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Smart Resource Allocation",
    description: "Track Nexus simplifies resource management by enabling managers to assign the right resources to the right people accurately. Ensure optimal team performance with error-free, timely allocation that keeps projects running smoothly.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Streamlined Bug Tracking",
    description: "Track and manage bugs throughout your project. Open any work item, verify its status, and leave detailed comments. Ensure faster resolutions and better product quality with transparent, real-time issue tracking.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: FolderKanban,
    title: "Project Boards",
    description: "Visualize projects with kanban boards, lists, and timeline views.",
  },
  {
    icon: Target,
    title: "Milestone Tracking",
    description: "Set and track project milestones to ensure timely delivery.",
  },
  {
    icon: Users,
    title: "Team Assignments",
    description: "Assign tasks and resources to team members with clear accountability.",
  },
  {
    icon: Clock,
    title: "Time by Project",
    description: "Track time spent on each project for accurate billing and planning.",
  },
  {
    icon: Bug,
    title: "Bug Tracking",
    description: "Report, track, and resolve bugs with integrated issue management.",
  },
  {
    icon: Calendar,
    title: "Sprint Planning",
    description: "Plan and manage sprints with clear timelines and deliverables.",
  },
]

const stats = [
  { value: "100%", label: "On-Time Delivery" },
  { value: "Kanban", label: "Boards" },
  { value: "Sprint", label: "Planning" },
  { value: "Team", label: "Collaboration" },
]

const faqs = [
  {
    question: "Can I track time by project?",
    answer: "Yes, Track Nexus automatically associates time tracked with specific projects. You can see exactly how much time each team member spends on each project.",
  },
  {
    question: "How does sprint planning work?",
    answer: "Create sprints with defined start and end dates, add tasks with estimates, and track daily progress. See completion percentages and days remaining at a glance.",
  },
  {
    question: "Can I manage multiple projects?",
    answer: "Absolutely. Manage unlimited projects with separate boards, teams, and budgets. Switch between projects easily and get a portfolio view of all active work.",
  },
  {
    question: "Is there budget tracking?",
    answer: "Yes, set budgets for projects based on hours or costs. Track spending against budget in real-time and get alerts when approaching limits.",
  },
]

export default function ProjectManagementPage() {
  return (
    <ProductPageLayout
      badge="Project Management"
      title="Project"
      titleHighlight="Management"
      subtitle="Where your journey to project excellence begins. Elevate your project management experience with Track Nexus and deliver on time, every time."
      heroImage="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[FolderKanban, Target, Users, Clock]}
      features={features}
      benefitsTitle="Complete Project Tools"
      benefitsSubtitle="Everything you need to plan, track, and deliver successful projects"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to manage projects better?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
