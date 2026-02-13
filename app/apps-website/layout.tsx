import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('apps-website')

export default function AppsWebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
