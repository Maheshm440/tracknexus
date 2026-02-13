import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('office-tv')

export default function OfficeTvLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
