"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"

export function HeaderWrapper() {
  const pathname = usePathname()

  // Hide header on dashboard routes - dashboard has its own layout
  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  return <Header />
}
