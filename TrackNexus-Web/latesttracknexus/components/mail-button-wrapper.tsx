"use client"

import { usePathname } from "next/navigation"
import { MailIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function MailButtonWrapper() {
  const pathname = usePathname()

  // Hide mail button on dashboard routes - dashboard has its own UI
  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="mailto:support@tracknexus.com"
            className="fixed bottom-6 right-6 z-50 bg-highlight text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 transform hover:scale-110"
          >
            <MailIcon className="w-6 h-6" />
            <span className="sr-only">Mail Us</span>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mail Us</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
