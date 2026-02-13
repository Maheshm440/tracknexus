import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('location-activity')

export default function LocationActivityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
