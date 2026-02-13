import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getPageMetadata('employee-productivity')

export default function EmployeeProductivityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
