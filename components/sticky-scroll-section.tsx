"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StickyScrollSectionProps {
  children: ReactNode;
  className?: string;
  animationDelay?: number;
  animationType?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight";
}

export function StickyScrollSection({
  children,
  className = "",
  animationDelay = 0,
  animationType = "fadeUp",
}: StickyScrollSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // Animation triggers every time it comes into view
    margin: "-100px", // Trigger animation 100px before reaching viewport
  });

  // Animation variants
  const variants: Record<string, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: animationDelay,
          ease: [0.25, 0.4, 0.25, 1] as const,
        },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: animationDelay,
          ease: "easeOut",
        },
      },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          delay: animationDelay,
          ease: [0.25, 0.4, 0.25, 1] as const,
        },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          delay: animationDelay,
          ease: [0.25, 0.4, 0.25, 1] as const,
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animationType]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Sticky container component
interface StickyContainerProps {
  children: ReactNode;
  className?: string;
  stickyHeight?: string;
}

export function StickyContainer({
  children,
  className = "",
  stickyHeight = "100vh",
}: StickyContainerProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ minHeight: stickyHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
