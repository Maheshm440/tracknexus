import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Track Nexus Pricing | Flexible Plans for Every Team Size",
  description: "Explore Track Nexus transparent and affordable pricing plans designed for startups, small businesses, and large enterprises. Choose the right strategy to track time, boost productivity, and scale with confidence.",
  keywords: "Time tracking software pricing, Employee time tracking cost, Productivity software pricing, Time tracking tool pricing comparison, Time tracking pricing plans, Cost of the time tracking app",
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 