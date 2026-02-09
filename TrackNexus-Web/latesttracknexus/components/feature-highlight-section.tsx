"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, Target, Zap, Users, CheckCircle, ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function FeatureHighlightSection() {
  const [isFeaturePopupOpen, setIsFeaturePopupOpen] = useState(false);
  const [isProductivityPopupOpen, setIsProductivityPopupOpen] = useState(false);

  // ESC key handler
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsFeaturePopupOpen(false);
      setIsProductivityPopupOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isFeaturePopupOpen || isProductivityPopupOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isFeaturePopupOpen, isProductivityPopupOpen, handleEscKey]);

  return (
    <>
      {/* Feature Highlight Section */}
      <section className="relative w-full py-20 px-6 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <div>
            {/* Visual Heading - Animated presentation */}
            <div
              className="text-white font-semibold mb-8 leading-[1.25] tracking-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                letterSpacing: '-0.01em',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 80,
                  damping: 15
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsFeaturePopupOpen(true)}
                  className="relative cursor-pointer hover:text-cyan-300 transition-all duration-300 group inline-block text-left hover:scale-105"
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Empower Your Team.
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-lg shadow-cyan-500/50"></span>
                </button>
              </motion.span>

              <motion.span
                className="block mt-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 80,
                  damping: 15
                }}
              >
                Boost{" "}
                <motion.span
                  className="inline-block text-cyan-400 font-bold"
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 211, 238, 0.4)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsProductivityPopupOpen(true)}
                    className="relative cursor-pointer hover:text-cyan-300 transition-colors duration-300 group"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 211, 238, 0.4)'
                    }}
                  >
                    Productivity.
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-lg shadow-cyan-500/50"></span>
                  </button>
                </motion.span>
              </motion.span>

              <motion.span
                className="block mt-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 80,
                  damping: 15
                }}
              >
                Manage with confidence.
              </motion.span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 1.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 h-11 text-sm font-semibold rounded-md transition-all duration-300 shadow-xl hover:shadow-cyan-500/50 flex items-center justify-center">
                  Get Started Now
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 1.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-gray-700 border-2 border-gray-600 hover:bg-gray-800 text-white px-6 h-11 text-sm font-semibold rounded-md transition-all duration-300 flex items-center justify-center shadow-xl">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Empower Your Team Popup */}
      <AnimatePresence>
        {isFeaturePopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsFeaturePopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-popup-title"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-60 blur-[2px]" />

              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                <motion.button
                  onClick={() => setIsFeaturePopupOpen(false)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </motion.button>

                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 id="feature-popup-title" className="text-lg font-bold text-white">
                        Empower Your Team
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                        Team Management
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <motion.p
                    className="text-sm text-gray-300 leading-relaxed mb-4 pl-3 border-l-2 border-cyan-500/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Give your team the <span className="text-cyan-400 font-medium">tools and visibility</span> they need to succeed. Foster collaboration and accountability.
                  </motion.p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: Users, title: "Team Collaboration" },
                      { icon: Target, title: "Clear Goals" },
                      { icon: CheckCircle, title: "Performance Tracking" },
                      { icon: Zap, title: "Fast Results" },
                    ].map((item, index) => {
                      const Icon = item.icon;
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
                      );
                    })}
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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

      {/* Boost Productivity Popup */}
      <AnimatePresence>
        {isProductivityPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsProductivityPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="productivity-popup-title"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-60 blur-[2px]" />

              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                <motion.button
                  onClick={() => setIsProductivityPopupOpen(false)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </motion.button>

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
                      <h3 id="productivity-popup-title" className="text-lg font-bold text-white">
                        Boost Productivity
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                        Performance Optimization
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <motion.p
                    className="text-sm text-gray-300 leading-relaxed mb-4 pl-3 border-l-2 border-cyan-500/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Unlock <span className="text-cyan-400 font-medium">hidden productivity potential</span> with AI-driven insights and smart automation.
                  </motion.p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: Zap, title: "Fast Automation" },
                      { icon: Target, title: "Smart Goals" },
                      { icon: Lightbulb, title: "AI Insights" },
                      { icon: CheckCircle, title: "Results Tracking" },
                    ].map((item, index) => {
                      const Icon = item.icon;
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
                      );
                    })}
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
    </>
  );
}
