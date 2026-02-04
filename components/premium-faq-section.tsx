"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Shield,
  Clock,
  Settings,
  Zap,
  Globe,
  BarChart3,
} from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const faqData: FAQ[] = [
  {
    id: 1,
    question: "What is Track Nexus used for?",
    answer: "Track Nexus is a comprehensive time tracking and productivity management platform designed to help businesses monitor employee performance, manage work hours, and gain real-time insights into team activities. It helps improve efficiency, reduce time wastage, and boost overall productivity with AI-powered analytics.",
    icon: HelpCircle,
    category: "General",
  },
  {
    id: 2,
    question: "How does Track Nexus track employee time?",
    answer: "Track Nexus automatically records employee work hours through its desktop, mobile, or web application. It tracks active and idle time, login and logout hours, and app/website usage. The platform provides managers with a clear, real-time view of how time is spent during the workday, with detailed breakdowns and visual reports.",
    icon: Clock,
    category: "Features",
  },
  {
    id: 3,
    question: "Can Track Nexus be used for remote teams?",
    answer: "Absolutely! Track Nexus is designed for remote, hybrid, and in-office teams. It provides real-time visibility into employee performance regardless of location, with features like GPS tracking, geofencing, and cloud sync that help organizations effectively manage distributed teams across multiple time zones.",
    icon: Globe,
    category: "Teams",
  },
  {
    id: 4,
    question: "Is employee data secure with Track Nexus?",
    answer: "Security is our top priority. Track Nexus uses 256-bit AES encryption, SOC 2 Type II certification, and GDPR-compliant data handling. All data is stored on secure servers with multi-factor authentication, role-based access controls, and regular security audits to protect sensitive information.",
    icon: Shield,
    category: "Security",
  },
  {
    id: 5,
    question: "Can Track Nexus help with performance reviews?",
    answer: "Yes! Track Nexus provides detailed analytics and reports on each employee's productivity trends, attendance patterns, and activity metrics. This data-driven approach supports fair, objective performance reviews with historical insights, goal tracking, and customizable reporting dashboards.",
    icon: BarChart3,
    category: "Analytics",
  },
  {
    id: 6,
    question: "Does Track Nexus integrate with other tools?",
    answer: "Track Nexus offers 150+ integrations with popular tools including project management platforms (Asana, Jira, Monday), communication apps (Slack, Teams), accounting software (QuickBooks, Xero), and HR systems. This seamless connectivity keeps all your productivity tools synchronized.",
    icon: Settings,
    category: "Integrations",
  },
  {
    id: 7,
    question: "Is Track Nexus easy to set up?",
    answer: "Track Nexus is designed for quick deployment with an intuitive interface. Most teams are up and running within minutes. We provide step-by-step onboarding, video tutorials, and dedicated customer success managers for enterprise clients. No technical expertise required!",
    icon: Zap,
    category: "Setup",
  },
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div
        onClick={onToggle}
        className={`cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden group relative ${
          isOpen
            ? "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg"
            : "bg-white border-gray-200 hover:border-cyan-300 hover:shadow-md hover:bg-gradient-to-br hover:from-gray-50 hover:to-cyan-50/30"
        }`}
      >
        {/* Subtle decorative element */}
        <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-300 ${
          isOpen ? "bg-gradient-to-b from-cyan-500 to-blue-500" : "bg-transparent group-hover:bg-gradient-to-b group-hover:from-cyan-400 group-hover:to-blue-400"
        }`} />

        {/* Question Header */}
        <div className={`flex justify-between items-center w-full px-4 py-3 text-left transition-all duration-300 relative z-10 ${
          isOpen
            ? "bg-transparent"
            : "bg-transparent"
        }`}>
          <div className="flex-1">
            <span className={`text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 ${
              isOpen ? "text-cyan-600" : "text-gray-500 group-hover:text-cyan-600"
            }`}>
              {faq.category}
            </span>
            <h3 className={`text-base font-semibold transition-all duration-300 leading-snug mt-1 ${
              isOpen ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"
            }`}>
              {faq.question}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10 ${
              isOpen
                ? "bg-cyan-100 border border-cyan-300"
                : "bg-gray-100 border border-gray-300 group-hover:bg-cyan-50 group-hover:border-cyan-200"
            }`}
          >
            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-cyan-600" : "text-gray-600 group-hover:text-cyan-600"
            }`} />
          </motion.div>
        </div>

        {/* Answer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1">
                <div className="pl-0 pr-2">
                  <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 rounded-full" />
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export function PremiumFAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-cyan-50/50 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-56 h-56 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mb-3 border border-cyan-500/20">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wide">
              Got Questions?
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Questions
            </span>
          </h2>

          <p className="text-sm text-gray-600 mb-4 max-w-xl mx-auto">
            Everything you need to know about Track Nexus. Can't find the answer?
            <span className="text-cyan-600 font-semibold"> Contact our support team.</span>
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-2.5">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.3 }}
          className="relative mt-6"
        >
          <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-xl p-6 lg:p-8 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-white/90 text-sm mb-5 max-w-md mx-auto">
                Our team is here to help. Get in touch and we'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 bg-white text-cyan-600 font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl hover:bg-cyan-50 transition-all inline-block text-center"
                >
                  Contact Support
                </motion.a>
                <motion.a
                  href="/docs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-semibold text-sm rounded-lg hover:bg-white/30 transition-all inline-block text-center"
                >
                  View Documentation
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
