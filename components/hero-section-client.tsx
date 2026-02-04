"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, Target, Zap, Users, CheckCircle, ArrowRight } from "lucide-react";
import { FormContext } from "@/components/contact-popup";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load ContactPopup since it's only needed on interaction
const ContactPopup = dynamic(
  () => import("@/components/contact-popup").then((m) => m.ContactPopup),
  { ssr: false }
);

export function HeroSectionClient() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isHeroPopupOpen, setIsHeroPopupOpen] = useState(false);
  const [isTrackNexusPopupOpen, setIsTrackNexusPopupOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({ type: "demo" });
  const [textIndex, setTextIndex] = useState(0);

  // Text rotation data
  const textVariations = [
    {
      line1: "Connecting Success",
      line2: { prefix: "That's how ", highlight: "Track Nexus", suffix: "" },
      line3: "works."
    },
    {
      line1: "Empower Your Team",
      line2: { prefix: "Boost ", highlight: "Productivity", suffix: "" },
      line3: "Manage with confidence."
    },
    {
      line1: "Drive Results",
      line2: { prefix: "With ", highlight: "Real-Time Insights", suffix: "" },
      line3: "Transform your workflow."
    }
  ];

  // ESC key handler for popups
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsHeroPopupOpen(false);
      setIsTrackNexusPopupOpen(false);
    }
  }, [])

  useEffect(() => {
    if (isHeroPopupOpen || isTrackNexusPopupOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isHeroPopupOpen, isTrackNexusPopupOpen, handleEscKey]);

  // Ensure video plays on mount and handles autoplay restrictions
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.5; // Play video at 1.5x speed
      video.play().catch(() => {
        // Autoplay was prevented, video will play on user interaction
      });
    }
  }, []);

  // Rotate text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textVariations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [textVariations.length]);

  return (
    <>
      {/* Hero Section - Full Width Video Background */}
      <section
        className="relative w-full h-screen min-h-screen overflow-hidden"
        ref={heroRef}
      >
        {/* Full Screen Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent"></div>

        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="w-full max-w-2xl">
            <div>
              {/* SEO-Optimized H1 - Screen reader accessible, visually hidden */}
              <h1 className="sr-only">
                Track Nexus - AI-Powered Time Tracking Software for Remote and Hybrid Teams
              </h1>

              {/* Visual Heading - Animated presentation */}
              <div
                className="text-white font-semibold mb-6 leading-[1.25] tracking-tight"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  letterSpacing: '-0.01em',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5)'
                }}
                aria-hidden="true"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`line1-${textIndex}`}
                    className="block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 80,
                      damping: 15
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsHeroPopupOpen(true)}
                      className="relative cursor-pointer hover:text-cyan-300 transition-all duration-300 group inline-block text-left hover:scale-105"
                      aria-label="Learn more"
                      style={{
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {textVariations[textIndex].line1}
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-lg shadow-cyan-500/50"></span>
                    </button>.
                  </motion.span>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={`line2-${textIndex}`}
                    className="block mt-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 80,
                      damping: 15
                    }}
                  >
                    {textVariations[textIndex].line2.prefix}
                    <motion.button
                      type="button"
                      onClick={() => setIsTrackNexusPopupOpen(true)}
                      className="relative inline-block text-cyan-400 font-bold cursor-pointer hover:text-cyan-300 transition-colors duration-300 group"
                      style={{
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 211, 238, 0.4)',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        font: 'inherit'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {textVariations[textIndex].line2.highlight}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-lg shadow-cyan-500/50"></span>
                    </motion.button>
                    {textVariations[textIndex].line2.suffix}
                  </motion.span>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={`line3-${textIndex}`}
                    className="block mt-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      delay: 0.8,
                      type: "spring",
                      stiffness: 80,
                      damping: 15
                    }}
                  >
                    {textVariations[textIndex].line3}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 h-11 text-sm font-semibold rounded-md transition-all duration-300 shadow-xl hover:shadow-cyan-500/50 flex items-center justify-center"
                    onClick={() => {
                      setFormContext({ type: "free-trial" });
                      setIsContactPopupOpen(true);
                    }}
                  >
                    Start Free Trial
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/product">
                    <Button className="bg-gray-800 border-2 border-gray-700 hover:bg-gray-900 text-white px-6 h-11 text-sm font-semibold rounded-md transition-all duration-300 flex items-center justify-center shadow-xl">
                      Explore Features
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-xs text-white font-semibold tracking-wide"
              style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)' }}
            >
              Scroll to explore
            </p>
            <div className="w-5 h-8 border-2 border-white rounded-full flex items-start justify-center p-1.5 bg-black/20 backdrop-blur-sm shadow-xl">
              <motion.div
                className="w-1 h-1.5 bg-white rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Hero Popup - Connecting Success */}
      <AnimatePresence>
        {isHeroPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsHeroPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-popup-title"
          >
            {/* Dark Background */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Border Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-60 blur-[2px]" />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsHeroPopupOpen(false)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* Header */}
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                    >
                      <Lightbulb className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 id="hero-popup-title" className="text-lg font-bold text-white">
                        Connecting Success
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                        Building Smarter Solutions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  {/* Quote */}
                  <motion.p
                    className="text-sm text-gray-300 leading-relaxed mb-4 pl-3 border-l-2 border-cyan-500/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    We believe <span className="text-cyan-400 font-medium">progress starts when people connect</span>. Build smarter time tracking that drives productivity.
                  </motion.p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: Target, title: "Unified Vision" },
                      { icon: Users, title: "Team Collaboration" },
                      { icon: Zap, title: "Smart Insights" },
                      { icon: CheckCircle, title: "Real Results" },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
                        >
                          <div className="w-7 h-7 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <span className="text-xs font-medium text-white">{item.title}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Mini Stats */}
                  <motion.div
                    className="flex justify-between items-center px-3 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/5 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[
                      { value: '500+', label: 'Companies' },
                      { value: '50K+', label: 'Teams' },
                      { value: '1M+', label: 'Users' },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <p className="text-sm font-bold text-white">{stat.value}</p>
                        <p className="text-[10px] text-cyan-300/70 uppercase">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsHeroPopupOpen(false)
                      setFormContext({ type: "free-trial" })
                      setIsContactPopupOpen(true)
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track Nexus Popup */}
      <AnimatePresence>
        {isTrackNexusPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsTrackNexusPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="track-nexus-popup-title"
          >
            {/* Dark Background */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Border Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-60 blur-[2px]" />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsTrackNexusPopupOpen(false)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* Header */}
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 id="track-nexus-popup-title" className="text-lg font-bold text-white">
                        Track Nexus
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                        AI-Powered Time Tracking
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  {/* Description */}
                  <motion.p
                    className="text-sm text-gray-300 leading-relaxed mb-4 pl-3 border-l-2 border-cyan-500/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Experience <span className="text-cyan-400 font-medium">intelligent time tracking</span> designed for modern teams. Get real-time insights and boost productivity effortlessly.
                  </motion.p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: Target, title: "Real-Time Tracking" },
                      { icon: Zap, title: "Smart Insights" },
                      { icon: CheckCircle, title: "Accurate Reports" },
                      { icon: Users, title: "Team Analytics" },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
                        >
                          <div className="w-7 h-7 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <span className="text-xs font-medium text-white">{item.title}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsTrackNexusPopupOpen(false)
                      setFormContext({ type: "free-trial" })
                      setIsContactPopupOpen(true)
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        context={formContext}
      />
    </>
  );
}
