import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('usage-analytics')

export default function UsageAnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
