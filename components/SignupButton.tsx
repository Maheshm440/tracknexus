"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

// SignupButton now redirects to MFA login
export function SignupButton({ variant = "primary", size = "default", className = "" }) {
  const baseClasses = "font-medium transition-all duration-200 inline-flex items-center justify-center gap-2";

  const variants: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
    outline: "border-2 border-gray-300 hover:border-gray-400 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300"
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <Link
      href="/login"
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <Lock className="w-4 h-4" />
      Sign In
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

export default SignupButton;
