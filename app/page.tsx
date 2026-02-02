"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Info, Lightbulb, Target, Zap, Users, CheckCircle } from "lucide-react";
import { FormContext } from "@/components/contact-popup";
import Link from "next/link";

// Dynamic imports for below-fold sections to improve initial load
const AIPoweredAnalyticsSection = dynamic(
  () => import("@/components/premium-home-sections").then((m) => m.AIPoweredAnalyticsSection),
  { ssr: true }
);

const PremiumFeatureShowcase = dynamic(
  () => import("@/components/premium-home-sections").then((m) => m.FeatureShowcaseSection),
  { ssr: true }
);

const MultiPlatformSection = dynamic(
  () => import("@/components/premium-home-sections").then((m) => m.MultiPlatformSection),
  { ssr: true }
);

const SecuritySection = dynamic(
  () => import("@/components/premium-home-sections").then((m) => m.SecuritySection),
  { ssr: true }
);

const InteractiveStatsSection = dynamic(
  () => import("@/components/premium-home-sections").then((m) => m.InteractiveStatsSection),
  { ssr: true }
);

const FinalCTASection = dynamic(
  () => import("@/components/premium-home-sections").then((m) => m.FinalCTASection),
  { ssr: true }
);

const PremiumFAQSection = dynamic(
  () => import("@/components/premium-faq-section").then((m) => m.PremiumFAQSection),
  { ssr: true }
);

const PremiumTestimonialsSection = dynamic(
  () => import("@/components/premium-testimonials-section").then((m) => m.PremiumTestimonialsSection),
  { ssr: true }
);

// Lazy load ContactPopup since it's only needed on interaction
const ContactPopup = dynamic(
  () => import("@/components/contact-popup").then((m) => m.ContactPopup),
  { ssr: false }
);

export default function HomePage() {
  const heroRef = useRef(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isHeroPopupOpen, setIsHeroPopupOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({ type: "demo" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end end"],
  });

  // ESC key handler for hero popup
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsHeroPopupOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isHeroPopupOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isHeroPopupOpen, handleEscKey])

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Full Width Video Background (Deloitte Style) */}
      <section
        className="relative w-full h-screen min-h-screen overflow-hidden"
        ref={heroRef}
      >
        {/* Full Screen Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            className="w-full h-full object-cover scale-105"
            aria-label="Track Nexus - AI-Powered Time Tracking"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50"></div>

          {/* Additional Overlay for Better Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

          {/* Dot Pattern Overlay (Deloitte Style) */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 2px, transparent 2px)',
            backgroundSize: '40px 40px',
            opacity: 0.3
          }}></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="w-full max-w-3xl">
            <div>
              {/* Main Heading - Left Aligned */}
              <h1 className="text-white font-light mb-8 leading-[1.25] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.01em' }}>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 15
                  }}
                >
                  <span
                    onClick={() => setIsHeroPopupOpen(true)}
                    className="relative cursor-pointer hover:text-cyan-300 transition-colors group inline-block"
                  >
                    Connecting Success
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>.
                </motion.span>

                <motion.span
                  className="block mt-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 80,
                    damping: 15
                  }}
                >
                  That&apos;s how{" "}
                  <motion.span
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 12
                    }}
                  >
                    Track Nexus
                  </motion.span>
                </motion.span>

                <motion.span
                  className="block mt-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.8,
                    type: "spring",
                    stiffness: 80,
                    damping: 15
                  }}
                >
                  works.
                </motion.span>
              </h1>

              {/* Descriptive Text */}
              <motion.div
                className="mb-10 max-w-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.0,
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
              >
                <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
                  At Track Nexus, we&apos;ve always believed progress starts when people connect.
                  By working together and thinking differently, we are building smarter time tracking
                  solutions that drive real productivity. One insight at a time.
                </p>
              </motion.div>

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
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 h-14 text-base font-semibold rounded-md transition-all duration-300 shadow-lg flex items-center justify-center"
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
                    <Button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 h-14 text-base font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
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
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-white/80 font-medium tracking-wide">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* AI-Powered Analytics Section */}
      <AIPoweredAnalyticsSection />

      {/* Premium Feature Showcase */}
      <PremiumFeatureShowcase />

      {/* Interactive Stats */}
      <InteractiveStatsSection />

      {/* Multi-Platform Section */}
      <MultiPlatformSection />

      {/* Security Section */}
      <SecuritySection />

      {/* Premium Testimonials & Trust Section */}
      <PremiumTestimonialsSection />

      {/* Premium Final CTA with Video Background */}
      <FinalCTASection />

      {/* Premium FAQ Section */}
      <PremiumFAQSection />

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

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        context={formContext}
      />
    </div>
  );
}
