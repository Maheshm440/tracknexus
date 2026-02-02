"use client"

import { Clock } from "lucide-react"
import { AppitDropdown } from "./appit-dropdown"

// Logo without the AppitDropdown - to be used when dropdown needs to be a sibling
export function LogoWithoutDropdown({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {/* Clock Icon */}
      <div className="relative">
        <Clock className={`w-7 h-7 ${dark ? 'text-gray-800' : 'text-white'}`} strokeWidth={2} />
      </div>

      {/* Track Nexus Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-0.5">
          <span className={`${dark ? 'text-gray-900' : 'text-white'} font-bold text-lg tracking-tight`}>Track</span>
          <span className="text-highlight font-bold text-lg tracking-tight">Nexus</span>
        </div>
        <div className={`${dark ? 'text-gray-500' : 'text-white'} text-[7px] leading-tight -mt-0.5`}>
          Smart Monitoring for Smarter Teams
        </div>
      </div>
    </div>
  )
}

// Full logo with AppitDropdown included
export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoWithoutDropdown />
      {/* appit dropdown */}
      <AppitDropdown />
    </div>
  )
}
