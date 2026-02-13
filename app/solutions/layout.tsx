import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions for Every Team | Track Nexus",
  description: "Discover Track Nexus solutions for enterprises, startups, remote teams, and hybrid workforces. Tailored employee monitoring and time tracking for your specific needs.",
  keywords: "employee monitoring solutions, time tracking for enterprises, remote team tracking, hybrid workforce management",
  alternates: { canonical: "https://tracknexus.com/solutions" },
  openGraph: {
    title: "Solutions for Every Team | Track Nexus",
    description: "Tailored employee monitoring and time tracking solutions for your specific needs.",
    url: "https://tracknexus.com/solutions",
  },
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
