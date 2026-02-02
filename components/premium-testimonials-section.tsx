"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  metric: string;
  metricValue: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Operations Director",
    company: "TechFlow Solutions",
    avatar: "SM",
    quote: "Track Nexus transformed how we manage our distributed team. Real-time insights and automated timesheets saved us 15+ hours weekly. The AI-powered analytics help us make data-driven decisions instantly.",
    rating: 5,
    metric: "Time Saved",
    metricValue: "15+ hrs/week",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "InnovatePro Inc",
    avatar: "MC",
    quote: "Billable hours used to be a challenge until we started using Track Nexus. Now our invoicing is 100% accurate, and we've increased revenue by 23% just from better time capture.",
    rating: 5,
    metric: "Revenue Increase",
    metricValue: "+23%",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "HR Manager",
    company: "GlobalEdge Corp",
    avatar: "ER",
    quote: "The employee engagement features are incredible. Our team actually enjoys using Track Nexus, and we've seen a 40% improvement in productivity tracking compliance.",
    rating: 5,
    metric: "Compliance",
    metricValue: "+40%",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    name: "David Park",
    role: "Project Manager",
    company: "Apex Digital",
    avatar: "DP",
    quote: "Managing multiple projects across time zones was a nightmare. Track Nexus unified everything into one dashboard. Now I have complete visibility into every team member's progress.",
    rating: 5,
    metric: "Projects Managed",
    metricValue: "50+ active",
    gradient: "from-orange-500 to-red-600",
  },
];

const trustBadges = [
  { name: "SOC 2 Certified", icon: Shield },
  { name: "GDPR Compliant", icon: CheckCircle },
  { name: "99.9% Uptime", icon: TrendingUp },
  { name: "24/7 Support", icon: Users },
  { name: "Award Winning", icon: Award },
];

// Company logos with inline SVG paths for reliable display
const companyLogos = [
  {
    name: "CloudTech Solutions",
    color: "#00A4EF",
    svg: "M6 12c-2.2 0-4-1.8-4-4s1.8-4 4-4c.8-2.2 2.8-4 5-4 3.3 0 6 2.7 6 6 2.2 0 4 1.8 4 4s-1.8 4-4 4H6z" // Cloud
  },
  {
    name: "DataFlow Systems",
    color: "#4285F4",
    svg: "M4 8h4v4H4zm6-2h4v4h-4zm6 2h4v4h-4zM4 14h4v4H4zm6-2h4v4h-4z M8 8v8m4-8v8m4-8v8" // Data grid with flow
  },
  {
    name: "InnovatePro",
    color: "#FF9900",
    svg: "M12 2C11.5 2 11 2.2 10.6 2.6L2.6 10.6C1.8 11.4 1.8 12.6 2.6 13.4L10.6 21.4C11.4 22.2 12.6 22.2 13.4 21.4L21.4 13.4C22.2 12.6 22.2 11.4 21.4 10.6L13.4 2.6C13 2.2 12.5 2 12 2Z M12 8L14 12L12 16L10 12L12 8Z" // Lightbulb/idea
  },
  {
    name: "TechVision Corp",
    color: "#0668E1",
    svg: "M12 4C7.6 4 4 7.6 4 12c0 .8.1 1.6.3 2.3L2.5 16c-.3.3 0 .8.4.8h2.8l1.6 1.6c1 .6 2.1 1 3.2 1.2.8.1 1.6.3 2.5.3 4.4 0 8-3.6 8-8s-3.6-8-8-8z" // Eye/vision
  },
  {
    name: "FutureWave",
    color: "#555555",
    svg: "M2 12C2 12 4 8 8 8C12 8 12 16 16 16C20 16 22 12 22 12M2 16C2 16 4 12 8 12C12 12 12 20 16 20C20 20 22 16 22 16" // Wave
  },
  {
    name: "ByteForce",
    color: "#E50914",
    svg: "M3 6h4v4H3zm5 0h4v4H8zm5 0h4v4h-4zM3 11h4v4H3zm5 0h4v4H8zm5 0h4v4h-4zM3 16h4v4H3zm5 0h4v4H8zm5 0h4v4h-4z" // Binary/bytes grid
  },
  {
    name: "PulseStream",
    color: "#1DB954",
    svg: "M2 12h3v-2h2v4h2v-1h2v3h2v-4h2v2h3M2 12L4 10L7 14L10 8L14 16L18 10L22 12" // Pulse wave
  },
  {
    name: "ZenTech",
    color: "#FF5A5F",
    svg: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM6 12c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm6 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" // Zen circles
  },
  {
    name: "VortexAI",
    color: "#000000",
    svg: "M12 2C6.5 2 2 6.5 2 12c0 5.2 4.3 9.5 9.5 9.9V2zM12 22c5.5 0 10-4.5 10-10S17.5 2 12 2v20z M12 8C9.2 8 7 10.2 7 13s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" // Vortex/spiral
  },
  {
    name: "NexusHub",
    color: "#4A154B",
    svg: "M12 4C8 4 5 7 5 11C5 14 7 17 10 18V20C10 21 11 22 12 22S14 21 14 20V18C17 17 19 14 19 11C19 7 16 4 12 4M12 8C10.3 8 9 9.3 9 11S10.3 14 12 14S15 12.7 15 11S13.7 8 12 8" // Connected nodes/hub
  },
];

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="font-black"
    >
      {value}{suffix}
    </motion.span>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.85,
        y: 0,
        filter: isActive ? "blur(0px)" : "blur(2px)"
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500 ${
        isActive ? "z-20" : "z-10"
      }`}
    >
      {/* Gradient Top Border */}
      <div className={`h-2 bg-gradient-to-r ${testimonial.gradient}`} />

      <div className="p-4 lg:p-6">
        {/* Quote Icon */}
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center mb-3 shadow-md`}
        >
          <Quote className="w-4 h-4 text-white" />
        </motion.div>

        {/* Quote Text */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
          "{testimonial.quote}"
        </p>

        {/* Rating Stars */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-base">
              {testimonial.avatar}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">{testimonial.name}</h4>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
              <p className={`text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient} font-semibold text-sm`}>
                {testimonial.company}
              </p>
            </div>
          </div>

          {/* Metric Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100"
          >
            <p className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient}`}>
              {testimonial.metricValue}
            </p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              {testimonial.metric}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function PremiumTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-cyan-50/30" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
        />

        {/* Floating Particles - using deterministic positions */}
        {[...Array(20)].map((_, i) => {
          // Deterministic positions based on index to avoid hydration mismatch
          const left = ((i * 17 + 5) % 100);
          const top = ((i * 23 + 10) % 100);
          const duration = 3 + (i % 3);
          const delay = (i % 5) * 0.4;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-500/20 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mb-6 border border-cyan-500/20"
          >
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
              Customer Stories
            </span>
          </motion.div>

        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
            Thousands
          </span>
          <span className="block mt-2">of Growing Teams</span>
        </h2>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Join industry leaders who have transformed their productivity with Track Nexus.
          See how our platform delivers real, measurable results.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {[
          { value: "10K+", label: "Active Companies", icon: Users },
          { value: "98%", label: "Satisfaction Rate", icon: Star },
          { value: "4.9", label: "Average Rating", icon: Award },
          { value: "150+", label: "Countries", icon: TrendingUp },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-cyan-300 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <stat.icon className="w-6 h-6 text-cyan-600" />
            </div>
            <p className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-1">
              <AnimatedCounter value={stat.value} />
            </p>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials Carousel */}
      <div className="relative mb-16">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[activeIndex].id}
              testimonial={testimonials[activeIndex]}
              isActive={true}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 transition-colors pointer-events-auto border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 transition-colors pointer-events-auto border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-10 bg-gradient-to-r from-cyan-500 to-blue-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-xl p-4 lg:p-6 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-8">
                Enterprise-Grade Security & Compliance
              </h3>

              <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 hover:bg-white/15 transition-all"
                  >
                    <badge.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-medium text-sm">{badge.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">
            Trusted by teams at leading companies worldwide
          </p>

          <div className="relative overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Scrolling Logos */}
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 items-center"
            >
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 px-6 py-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-105 flex flex-col items-center justify-center gap-3"
                >
                  <div className="h-12 w-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill={company.color}
                    >
                      <path d={company.svg} />
                    </svg>
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-700 w-full truncate">{company.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
