"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, Lightbulb, Target, Zap, Users, CheckCircle, ArrowRight } from "lucide-react";
import { FormContext } from "@/components/contact-popup";
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
  // Text phase: 0 = hidden, 1 = "Connecting Success", 2 = "That's how Track Nexus works"
  const [textPhase, setTextPhase] = useState(0);
  const lastVideoTime = useRef(0);
  const textTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textTimer2Ref = useRef<NodeJS.Timeout | null>(null);
  const textTimer3Ref = useRef<NodeJS.Timeout | null>(null);
  const isSequenceRunning = useRef(false);

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (textTimerRef.current) clearTimeout(textTimerRef.current);
    if (textTimer2Ref.current) clearTimeout(textTimer2Ref.current);
    if (textTimer3Ref.current) clearTimeout(textTimer3Ref.current);
  }, []);

  // Show text sequence: Phase 1 (2.5s) -> Hidden (4s) -> Phase 2 (2.3s) -> Hidden
  const startTextSequence = useCallback(() => {
    // Don't restart if sequence is already running
    if (isSequenceRunning.current) return;
    isSequenceRunning.current = true;
    clearAllTimers();

    // Phase 1: Show first text for 2.5 seconds
    setTextPhase(1);

    // After 2.5 seconds, hide first text
    textTimerRef.current = setTimeout(() => {
      setTextPhase(0);

      // After 4 seconds gap, show second text
      textTimer2Ref.current = setTimeout(() => {
        setTextPhase(2);

        // After 2.3 seconds, hide second text
        textTimer3Ref.current = setTimeout(() => {
          setTextPhase(0);
          isSequenceRunning.current = false;
        }, 2300);
      }, 4000);
    }, 2500);
  }, [clearAllTimers]);

  // Sync text with video - start when video plays and on every loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      // Fallback if video not ready
      startTextSequence();
      return () => clearAllTimers();
    }

    let loopIntervalId: NodeJS.Timeout | null = null;
    let hasStarted = false;

    // More aggressive loop detection with lower threshold
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const previousTime = lastVideoTime.current;

      // Detect loop: if time jumps backwards significantly
      if (previousTime > 0.5 && currentTime < previousTime - 0.5) {
        console.log('Loop detected via timeupdate:', { previousTime, currentTime });
        startTextSequence();
      }

      lastVideoTime.current = currentTime;
    };

    // Start text and set up interval timer based on video duration
    const handleLoadedMetadata = () => {
      const duration = video.duration;
      if (duration && !hasStarted) {
        hasStarted = true;
        console.log('Video duration:', duration);

        // Start initial text sequence
        startTextSequence();

        // Set up interval to restart text on each loop
        // Use video duration to trigger text restart
        loopIntervalId = setInterval(() => {
          console.log('Loop interval trigger at:', video.currentTime);
          startTextSequence();
        }, duration * 1000);
      }
    };

    // Backup: detect when video seeks to beginning
    const handleSeeked = () => {
      const currentTime = video.currentTime;
      if (currentTime < 0.5) {
        console.log('Seeked to beginning:', currentTime);
        startTextSequence();
      }
    };

    // Start text when video plays
    const handlePlay = () => {
      console.log('Video play event');
      if (!hasStarted) {
        hasStarted = true;
        startTextSequence();

        // If duration already available, set up interval
        if (video.duration) {
          loopIntervalId = setInterval(() => {
            console.log('Loop interval trigger at:', video.currentTime);
            startTextSequence();
          }, video.duration * 1000);
        }
      }
    };

    // Initialize
    if (video.duration && !video.paused) {
      hasStarted = true;
      startTextSequence();
      loopIntervalId = setInterval(() => {
        console.log('Loop interval trigger at:', video.currentTime);
        startTextSequence();
      }, video.duration * 1000);
    } else {
      startTextSequence();
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('play', handlePlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (loopIntervalId) clearInterval(loopIntervalId);
      clearAllTimers();
    };
  }, [startTextSequence, clearAllTimers]);

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
      video.playbackRate = 0.8; // Play video at 0.8x speed

      // Add error handler
      const handleError = () => {
        console.error('Video failed to load:', video.error);
      };

      video.addEventListener('error', handleError);

      video.play().catch((error) => {
        console.log('Autoplay was prevented:', error);
      });

      return () => {
        video.removeEventListener('error', handleError);
      };
    }
  }, []);


  return (
    <>
      {/* Hero Section - Full Width Video Background */}
      <section
        className="relative w-full h-screen min-h-screen overflow-hidden"
        ref={heroRef}
      >
        {/* Full Screen Video Background */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.error('Video error:', e);
            }}
            onLoadedData={() => {
              console.log('Video loaded successfully');
            }}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="w-full max-w-2xl">
            <div>
              {/* SEO-Optimized H1 - Screen reader accessible, visually hidden */}
              <h1 className="sr-only">
                Track Nexus - AI-Powered Time Tracking Software for Remote and Hybrid Teams
              </h1>

              {/* Visual Heading - Phase 1 -> Phase 2 */}
              <div className="flex items-center justify-center md:justify-start min-h-[120px]">
                <AnimatePresence mode="wait">
                  {textPhase === 1 && (
                    <motion.div
                      key="phase1"
                      className="text-center md:text-left"
                      aria-hidden="true"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                      <h2
                        className="text-white font-bold leading-tight"
                        style={{
                          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                          textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 15px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        {"Empower Your Team with Smarter Workforce Management".split("").map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.02,
                              delay: index * 0.025,
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                        <motion.span
                          className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                      </h2>
                    </motion.div>
                  )}

                  {textPhase === 2 && (
                    <motion.div
                      key="phase2"
                      className="text-center md:text-left"
                      aria-hidden="true"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                      <h2
                        className="text-white font-bold leading-tight"
                        style={{
                          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                          textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 15px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        {"Transform Your Workplace with Intelligent Time Tracking".split("").map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.02,
                              delay: index * 0.025,
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                        <motion.span
                          className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                      </h2>
                    </motion.div>
                  )}

                </AnimatePresence>
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
