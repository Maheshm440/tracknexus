"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  Rocket,
  Timer,
  LineChart,
  Cpu,
  Layers,
  Database,
  Monitor,
  Smartphone,
  Cloud,
  Lock,
  Eye,
  Activity,
  LayoutDashboard,
  FileText,
  MapPin,
  User,
} from "lucide-react";

// ============================================
// SECTION 1: AI-Powered Analytics Section
// ============================================
export function AIPoweredAnalyticsSection() {
  const containerRef = useRef(null);

  const features = [
    {
      icon: Cpu,
      title: "AI-Driven Insights",
      description: "Machine learning algorithms analyze patterns to predict productivity trends",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: LineChart,
      title: "Real-time Analytics",
      description: "Live dashboards with instant updates on team performance metrics",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Target,
      title: "Smart Forecasting",
      description: "Predict project timelines and resource needs with 95% accuracy",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section ref={containerRef} className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Static Background - No animations for better performance */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                AI-Powered Platform
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Intelligent
              <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Workforce Analytics
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Harness the power of artificial intelligence to transform raw time data into actionable business intelligence that drives growth.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Dashboard Preview Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-3xl blur-lg opacity-30" />
              <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-white/10 p-6">
                <div className="space-y-4">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">Analytics Dashboard</div>
                        <div className="text-gray-400 text-xs">Real-time insights</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "98%", label: "Accuracy", color: "from-emerald-500 to-teal-500" },
                      { value: "2.5x", label: "Faster", color: "from-cyan-500 to-blue-500" },
                      { value: "150+", label: "Integrations", color: "from-violet-500 to-purple-500" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                      >
                        <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Mockup */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-end justify-between h-32 gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ delay: i * 0.02, duration: 0.3 }}
                          className="flex-1 bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Floating Elements - No infinite animations */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">+45%</div>
                  <div className="text-xs text-gray-500">Productivity</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-white" />
                <div>
                  <div className="text-lg font-bold text-white">Live</div>
                  <div className="text-xs text-white/70">Real-time sync</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 2: Feature Showcase with Video
// ============================================
export function FeatureShowcaseSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      icon: Timer,
      title: "Smart Time Capture",
      description: "Automatically detect and log work activities with AI-powered tracking that learns your patterns",
      stats: { value: "3hrs", label: "Saved weekly" },
      gradient: "from-cyan-500 to-blue-600",
      image: "/images/time-billing/3.png",
    },
    {
      id: 1,
      icon: LayoutDashboard,
      title: "Unified Dashboard",
      description: "Get a 360° view of your team's productivity with customizable widgets and real-time metrics",
      stats: { value: "100%", label: "Visibility" },
      gradient: "from-emerald-500 to-teal-600",
      image: "/images/product/laptop.png",
    },
    {
      id: 2,
      icon: FileText,
      title: "Auto Reports",
      description: "Generate beautiful, detailed reports instantly for clients, payroll, or compliance",
      stats: { value: "1-click", label: "Export" },
      gradient: "from-violet-500 to-purple-600",
      image: "/images/productivity-reports/4.png",
    },
    {
      id: 3,
      icon: MapPin,
      title: "GPS & Geofencing",
      description: "Track field team locations with precision geofencing and automatic clock-in/out",
      stats: { value: "99.9%", label: "Accuracy" },
      gradient: "from-orange-500 to-red-600",
      image: "/images/location-activity/5.png",
    },
  ];

  return (
    <section className="py-12 lg:py-14 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-500/10 rounded-full mb-5">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-5">
            Everything You Need
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
              In One Platform
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From automatic time capture to intelligent reporting, discover the features that make Track Nexus the choice of 50,000+ teams
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <div className="grid lg:grid-cols-2 gap-7 items-center">
          {/* Feature List */}
          <div className="space-y-3.5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                onMouseEnter={() => setActiveFeature(index)}
                className={`cursor-pointer p-3.5 rounded-lg border-2 transition-all duration-300 ${
                  activeFeature === index
                    ? "bg-gradient-to-r from-emerald-50 to-cyan-50 border-emerald-500 shadow-md"
                    : "bg-white border-gray-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    activeFeature === index
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                      : "bg-gray-100"
                  }`}>
                    <feature.icon className={`w-5 h-5 ${activeFeature === index ? "text-white" : "text-gray-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold mb-1 ${activeFeature === index ? "text-emerald-700" : "text-gray-900"}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{feature.description}</p>
                    {activeFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 inline-flex items-center gap-2 text-emerald-600 font-semibold"
                      >
                        <span className="text-xl font-bold">{feature.stats.value}</span>
                        <span className="text-sm">{feature.stats.label}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Preview */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`absolute -inset-2 bg-gradient-to-r ${features[activeFeature].gradient} rounded-2xl blur-xl opacity-20`} />
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
              {/* Feature Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                className="absolute inset-0 w-full h-full object-cover z-10"
                onError={(e) => {
                  console.error('Image failed to load:', features[activeFeature].image);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => console.log('Image loaded:', features[activeFeature].image)}
              />

              {/* Overlay with Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center shadow-lg`}
                    >
                      {React.createElement(features[activeFeature].icon, { className: "w-6 h-6 text-white" })}
                    </motion.div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-gray-300 text-sm">Track Nexus Feature</p>
                    </div>
                  </div>

                  {/* Stats Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${features[activeFeature].gradient} shadow-md`}
                  >
                    <span className="text-xl font-black text-white">{features[activeFeature].stats.value}</span>
                    <span className="text-white/80 ml-1.5 text-sm">{features[activeFeature].stats.label}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 3: Multi-Platform Section
// ============================================
export function MultiPlatformSection() {
  const platforms = [
    { icon: Monitor, name: "Desktop", description: "Windows & Mac apps" },
    { icon: Smartphone, name: "Mobile", description: "iOS & Android" },
    { icon: Globe, name: "Web", description: "Browser access" },
    { icon: Cloud, name: "Cloud", description: "Sync everywhere" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Device Mockups */}
              <Image
                src="/images/landingpage/left1.jpg"
                alt="Multi-platform interface"
                width={400}
                height={300}
                className="rounded-xl shadow-xl"
                unoptimized
              />

              {/* Static device cards - No infinite animations */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-medium text-gray-700">Mobile App</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium text-white">Cloud Sync</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full mb-6">
              <Layers className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
                Multi-Platform
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Track Time
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                {" "}Anywhere, Anytime
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're at your desk, in the field, or working remotely, Track Nexus keeps your time data synchronized across all devices.
            </p>

            {/* Platform Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="bg-white rounded-lg p-3 shadow-md border border-gray-100 hover:border-cyan-300 hover:-translate-y-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center mb-3">
                    <platform.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{platform.name}</h3>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
            >
              Download Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: Security & Compliance
// ============================================
export function SecuritySection() {
  const securityFeatures = [
    { icon: Lock, title: "256-bit Encryption", description: "Bank-grade security for all data" },
    { icon: Shield, title: "SOC 2 Certified", description: "Enterprise compliance standards" },
    { icon: Database, title: "GDPR Compliant", description: "Full data privacy protection" },
    { icon: Eye, title: "Access Controls", description: "Role-based permissions" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6 border border-blue-500/30">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Enterprise Security
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Your Data is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                100% Protected
              </span>
            </h2>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We take security seriously. Track Nexus employs the same encryption and security protocols used by leading financial institutions.
            </p>

            {/* Security Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-blue-500/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/images/landingpage/3.jpg"
                alt="Security visualization"
                width={400}
                height={300}
                className="rounded-2xl shadow-xl"
                unoptimized
              />

              {/* Security Badge Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex items-end p-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">99.99% Uptime</div>
                    <div className="text-gray-300">Enterprise SLA Guarantee</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Trust Badge - No infinite animations */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                <span className="font-bold text-gray-900">SOC 2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 5: Interactive Stats Section
// ============================================
export function InteractiveStatsSection() {
  const stats = [
    { value: 500, suffix: "+", label: "Companies Trust Us", icon: Award, color: "from-violet-500 to-purple-600" },
    { value: 50, suffix: "K+", label: "Active Users", icon: Users, color: "from-cyan-500 to-blue-600" },
    { value: 10, suffix: "M+", label: "Hours Tracked", icon: Clock, color: "from-emerald-500 to-teal-600" },
    { value: 150, suffix: "+", label: "Countries", icon: Globe, color: "from-orange-500 to-red-600" },
  ];

  const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    React.useEffect(() => {
      if (isInView) {
        let current = 0;
        const increment = value / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 30);
        return () => clearInterval(timer);
      }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" />

      {/* Static Wave Background - No animation for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="rgba(6, 182, 212, 0.1)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="text-center group hover:-translate-y-2 transition-transform"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-cyan-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 6: Final CTA with Gradient Background
// ============================================
export function FinalCTASection() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Gradient Background - Static orbs for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
            <Rocket className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-semibold">Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
              Your Productivity?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join 50,000+ teams who have revolutionized their time management with Track Nexus. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/signup'}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/signup'}
            >
              <User className="w-5 h-5" />
              Sign Up Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/login'}
            >
              <Lock className="w-5 h-5" />
              Login
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {["No Credit Card", "14-Day Free Trial", "Cancel Anytime"].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
