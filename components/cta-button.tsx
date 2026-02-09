"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: "arrow" | "chevron" | "none"
  className?: string
  onClick?: () => void
  href?: string
  fullWidth?: boolean
}

export function CTAButton({
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  className,
  onClick,
  fullWidth = false,
  ...props
}: CTAButtonProps) {
  const baseStyles = "font-semibold transition-all duration-300 group relative overflow-hidden"

  const variantStyles = {
    primary: "bg-deloitte-green hover:bg-deloitte-green-dark text-white shadow-md hover:shadow-lg",
    secondary: "bg-deloitte-black hover:bg-deloitte-gray-900 text-white shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-deloitte-black hover:bg-deloitte-black text-deloitte-black hover:text-white",
    ghost: "bg-transparent hover:bg-deloitte-gray-100 text-deloitte-gray-900"
  }

  const sizeStyles = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 h-14 text-base",
    lg: "px-10 py-4 text-lg"
  }

  const IconComponent = icon === "arrow" ? ArrowRight : icon === "chevron" ? ChevronRight : null

  return (
    <Button
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        "flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {IconComponent && (
        <IconComponent className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </Button>
  )
}
