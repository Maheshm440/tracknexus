import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Meet the Team Behind Track Nexus Productivity Revolution",
  description: "Learn about the vision, mission, and people driving Track Nexus. We're passionate about helping businesses work smarter with cutting-edge time tracking and employee productivity solutions.",
  keywords: "about track nexus, employee tracking company, time tracking team, productivity software company",
  alternates: { canonical: "https://tracknexus.com/about" },
  openGraph: {
    title: "About Us | Track Nexus",
    description: "Learn about the vision, mission, and people driving Track Nexus.",
    url: "https://tracknexus.com/about",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 