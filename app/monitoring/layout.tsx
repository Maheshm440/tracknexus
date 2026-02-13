import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('monitoring')

export default function MonitoringLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
