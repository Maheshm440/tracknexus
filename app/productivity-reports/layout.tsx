import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('productivity-reports')

export default function ProductivityReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
