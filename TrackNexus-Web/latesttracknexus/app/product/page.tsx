import type { Metadata } from "next"
import ProductsClientPage from "./ProductsClientPage"

export const metadata: Metadata = {
  title: "Products - Track Nexus | Complete Workforce Management Suite",
  description:
    "Explore Track Nexus products: Workforce Analytics, Productivity Monitoring, AI-Powered Intelligence, Work Management, Team Management, Reports & Analytics, Desktop App, Security & Compliance, and Configuration tools. Transform your workforce management today.",
  keywords: [
    "workforce analytics",
    "productivity monitoring",
    "AI productivity reports",
    "employee monitoring software",
    "time tracking",
    "attendance tracking",
    "screenshot monitoring",
    "team management",
    "work session tracking",
    "idle time detection",
    "activity insights",
    "role-based access",
    "desktop application",
    "data encryption",
    "workforce management",
  ].join(", "),
  openGraph: {
    title: "Track Nexus Products - Complete Workforce Management Suite",
    description:
      "Discover 40+ features across 9 categories for comprehensive workforce management. AI-powered analytics, productivity tracking, and more.",
    type: "website",
  },
}

export default function ProductsPage() {
  return <ProductsClientPage />
}
