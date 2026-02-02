"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Rocket, DollarSign, Clock, TrendingUp, Zap, Users } from "lucide-react"

const features = [
  {
    title: "Quick Setup, Instant Impact",
    description: "Get started in minutes, not weeks. Track Nexus is designed for rapid deployment with intuitive interfaces that require minimal training. Start tracking productivity from day one with pre-configured templates and smart defaults that work out of the box.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Affordable Growth-Ready Pricing",
    description: "Transparent pricing that scales with your business. Start with what you need and expand as you grow. No hidden fees, no long-term commitments. Pay only for active users with pricing designed specifically for startups and small businesses.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Essential Productivity Tools",
    description: "Everything growing teams need without unnecessary complexity. Time tracking, activity monitoring, project management, and reporting—all integrated in one platform. Focus on building your business while Track Nexus handles workforce visibility.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Scale as You Grow",
    description: "Built to grow with you from 5 to 500 employees. Add users, features, and integrations as your needs evolve. Track Nexus adapts to your changing requirements without expensive migrations or complex configurations.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Rocket,
    title: "Fast Implementation",
    description: "Set up in minutes with guided onboarding and templates.",
  },
  {
    icon: DollarSign,
    title: "Budget-Friendly",
    description: "Affordable pricing that fits startup and SMB budgets.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Simple yet powerful time tracking for billable hours.",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description: "Insights that help you scale efficiently and smartly.",
  },
  {
    icon: Zap,
    title: "Easy to Use",
    description: "Intuitive interface that your team will love from day one.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Keep small teams aligned and productive.",
  },
]

const stats = [
  { value: "5 min", label: "Setup Time" },
  { value: "$10/user", label: "Starting Price" },
  { value: "14 days", label: "Free Trial" },
  { value: "No CC", label: "Required" },
]

const faqs = [
  {
    question: "Why is Track Nexus ideal for startups and SMBs?",
    answer: "Track Nexus combines affordability, ease of use, and quick setup with powerful features that growing businesses need. You get enterprise-level productivity tracking without the complexity or cost, with pricing that scales as you grow.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Most teams are up and running within 5-10 minutes. Our guided onboarding walks you through setup, and pre-configured templates mean you can start tracking immediately. No IT support or complex configuration needed.",
  },
  {
    question: "What's included in the startup pricing?",
    answer: "Startup plans include core time tracking, productivity monitoring, project management, basic reporting, and standard integrations. You can add advanced features like AI insights or API access as you scale.",
  },
  {
    question: "Can we switch plans as we grow?",
    answer: "Absolutely. Track Nexus is designed to grow with you. Upgrade or downgrade anytime, add or remove users as needed, and access more features when your business requires them. No penalties or migration hassles.",
  },
]

export default function StartupsPage() {
  return (
    <ProductPageLayout
      badge="Startups & SMBs"
      title="Built for"
      titleHighlight="Growing Businesses"
      subtitle="Affordable, easy-to-use workforce management for startups and small businesses. Get enterprise features at startup-friendly prices with setup that takes minutes, not weeks."
      heroImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Rocket, DollarSign, TrendingUp, Zap]}
      features={features}
      benefitsTitle="Perfect for Growing Teams"
      benefitsSubtitle="Everything startups and SMBs need to scale efficiently"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready to accelerate your growth?"
      ctaSubtitle="Start your 14-day free trial today. No credit card required."
    />
  )
}
