import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('insight-dashboards')

export default function InsightDashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
