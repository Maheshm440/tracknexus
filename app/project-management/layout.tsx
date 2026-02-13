import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('project-management')

export default function ProjectManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
