import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Meet the Team Behind Track Nexus Productivity Revolution",
  description: "Learn about the vision, mission, and people driving Track Nexus. We're passionate about helping businesses work smarter with cutting-edge time tracking and employee productivity solutions.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 