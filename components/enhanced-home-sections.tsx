"use client";

import React, { useRef } from "react";
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
  Play,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  Rocket,
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Hero Features Section
export function HeroFeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Smart Time Tracking",
      description: "AI-powered automatic time capture with intelligent suggestions",
      color: "from-cyan-500 to-blue-600",
      delay: 0.1,
    },
    {
      icon: Users,
      title: "Team Analytics",
      description: "Real-time insights into team productivity and performance",
      color: "from-emerald-500 to-teal-600",
      delay: 0.2,
    },
    {
      icon: BarChart3,
      title: "Advanced Reports",
      description: "Beautiful visualizations and exportable detailed reports",
      color: "from-purple-500 to-pink-600",
      delay: 0.3,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance certifications",
      color: "from-orange-500 to-red-600",
      delay: 0.4,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full mb-6 border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              WHY CHOOSE TRACK NEXUS
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block mt-2 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Track Time Smarter
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed for modern teams who want to work smarter, not harder
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
                style={{ background: `linear-gradient(135deg, ${feature.color.split(' ')[0].replace('from-', '')}20, ${feature.color.split(' ')[1].replace('to-', '')}20)` }}
              />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-6 flex items-center text-cyan-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section with Animated Counters
export function StatsSection() {
  const stats = [
    { value: 500, suffix: "+", label: "Companies Trust Us", icon: Award },
    { value: 50, suffix: "K+", label: "Active Users", icon: Users },
    { value: 99, suffix: ".9%", label: "Uptime Guarantee", icon: Zap },
    { value: 4, suffix: ".9", label: "User Rating", icon: Target },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-cyan-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Video Showcase Section
export function VideoShowcaseSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                See It In Action
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                Workflow Today
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Watch how Track Nexus revolutionizes time management for teams worldwide.
              Experience the power of AI-driven insights and seamless integrations.
            </p>

            <div className="space-y-4">
              {[
                "Automatic time capture across all devices",
                "Real-time team collaboration features",
                "Intelligent reporting and analytics",
                "Seamless integration with 100+ apps",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Video Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-20" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/videos/14840858_3840_2160_30fps (1).mp4" type="video/mp4" />
              </video>
              {/* Play overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-emerald-600 ml-1" />
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">96%</div>
                  <div className="text-sm text-gray-600">Productivity Boost</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">150+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Feature Comparison Section
export function FeatureComparisonSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">Everyone</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a freelancer, startup, or enterprise - Track Nexus scales with your needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "For Individuals",
              subtitle: "Freelancers & Consultants",
              features: ["Personal time tracking", "Invoice generation", "Client reports", "Mobile app access"],
              color: "from-cyan-500 to-blue-600",
              popular: false,
            },
            {
              title: "For Teams",
              subtitle: "Startups & SMBs",
              features: ["Team collaboration", "Project management", "Advanced analytics", "Unlimited integrations"],
              color: "from-emerald-500 to-teal-600",
              popular: true,
            },
            {
              title: "For Enterprise",
              subtitle: "Large Organizations",
              features: ["Custom deployment", "SSO & SAML", "Dedicated support", "SLA guarantee"],
              color: "from-purple-500 to-pink-600",
              popular: false,
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border ${plan.popular ? "border-emerald-500" : "border-gray-100"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6`}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
              <p className="text-gray-600 mb-6">{plan.subtitle}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.popular ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Track Nexus transformed how our team manages time. We've seen a 40% increase in productivity since implementation.",
      author: "Sarah Chen",
      role: "COO, TechStart Inc.",
      avatar: "/images/landingpage/1.jpg",
    },
    {
      quote: "The AI-powered insights are game-changing. We finally have visibility into where our time goes.",
      author: "Michael Ross",
      role: "Project Manager, Design Co.",
      avatar: "/images/landingpage/2.jpg",
    },
    {
      quote: "Best investment we've made for our remote team. The integrations are seamless.",
      author: "Emma Davis",
      role: "HR Director, Global Corp",
      avatar: "/images/landingpage/3.jpg",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Loved by Teams <span className="text-cyan-400">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of companies who trust Track Nexus for their time management
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <div className="text-cyan-400 text-5xl font-serif mb-4">"</div>
              <p className="text-white text-lg mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join over 50,000 teams already using Track Nexus to work smarter. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
