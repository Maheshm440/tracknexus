"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DeloitteSectionProps {
  children: ReactNode
  variant?: "white" | "gray" | "black" | "green"
  className?: string
}

/**
 * Deloitte-style section wrapper with proper color schemes
 */
export function DeloitteSection({
  children,
  variant = "white",
  className
}: DeloitteSectionProps) {
  const variantStyles = {
    white: "bg-white text-gray-900",
    gray: "bg-deloitte-gray-50 text-gray-900",
    black: "bg-deloitte-black text-white",
    green: "bg-deloitte-green text-white",
  }

  return (
    <section className={cn(variantStyles[variant], "px-6 py-16 lg:px-8 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  )
}

interface DeloitteTitleProps {
  children: ReactNode
  subtitle?: string
  align?: "left" | "center"
  variant?: "dark" | "light"
  className?: string
}

/**
 * Deloitte-style section title
 */
export function DeloitteTitle({
  children,
  subtitle,
  align = "center",
  variant = "dark",
  className
}: DeloitteTitleProps) {
  const textColor = variant === "dark" ? "text-gray-900" : "text-white"
  const subtitleColor = variant === "dark" ? "text-deloitte-green" : "text-deloitte-green"
  const alignmentClass = align === "center" ? "text-center" : "text-left"

  return (
    <div className={cn(alignmentClass, "mb-12", className)}>
      {subtitle && (
        <p className={cn("text-sm font-semibold uppercase tracking-wider mb-4", subtitleColor)}>
          {subtitle}
        </p>
      )}
      <h2 className={cn("text-display font-light", textColor)}>
        {children}
      </h2>
    </div>
  )
}
