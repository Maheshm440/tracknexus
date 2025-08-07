"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Check, Star, Zap, Crown, Rocket, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsSection } from "@/components/stats-section"
import { FreeTrialCTA } from "@/components/free-trial-cta"
import { ContactPopup, FormContext } from "@/components/contact-popup"

interface Plan {
  name: string;
  subtitle: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: any;
  popular: boolean;
  features: string[];
  featuresTitle: string;
  buttonText: string;
}

interface PricingCardProps {
  plan: Plan;
  index: number;
  isYearly: boolean;
  onPlanSelect: (planName: string) => void;
}

const plans: Plan[] = [
  {
    name: "Free Plan",
    subtitle: "Perfect for professionals seeking an advanced desktop monitoring system with AI-powered insights to enhance productivity, security, and performance tracking",
    monthlyPrice: 499,
    yearlyPrice: 4490, // ~10% discount
    icon: Zap,
    popular: false,
    featuresTitle: "Features",
    features: [
      "Interactive Mode", "Automatic Attendance", "Single Shift Management", "App Productivity Classifications", "Category Classifications", "Team View Support", "Teams-2 Configuration", "Monthly Attendance Report", "Daily Timesheet Report", "Monthly Timesheet Report", "Time Claim Management", "Offline Tracking", "Auto Login / Logout", "Application Tracking", "Website Tracking", "Productivity Calculator", "Company-Level Time Zone Support", "Summarized Activity Overview",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Starter Plan",
    subtitle: "Designed for small teams that require enhanced collaboration tools and in-depth analytics for productivity optimization and project management",
    monthlyPrice: 999,
    yearlyPrice: 8991, // ~25% discount
    icon: Crown,
    popular: true,
    featuresTitle: "Advanced Features",
    features: [
      "Collaborative Workspace", "Team Attendance Tracking", "Multi-Shift Management", "In-Depth App Usage Stats", "Department Classifications", "Real-Time Team Monitoring", "Teams-5 Configuration", "Weekly Attendance Reports", "Enhanced Daily Timesheet", "Weekly Timesheet Summary", "Expense Management Module", "Cloud-Based Offline Access", "Seamless Login / Logout", "Advanced Application Insights", "Comprehensive Website Analytics", "Productivity Benchmarking", "Global Time Zone Support", "Detailed Activity Insights",
    ],
    buttonText: "Start Free Trial",
  },
  {
    name: "Premium Plan",
    subtitle: "Designed for large organizations requiring extensive monitoring, advanced security features, and dedicated support to enhance team productivity.",
    monthlyPrice: 1999,
    yearlyPrice: 17991, // ~25% discount
    icon: Rocket,
    popular: false,
    featuresTitle: "Custom Solutions",
    features: [
      "Premium Collaboration Hub", "Centralized Attendance Systems", "Unlimited Shift Management", "Corporate App Usage Analytics", "Custom Role Classifications", "Integrated Team Performance Metrics", "Unlimited Teams Configuration", "Real-Time Analytics Dashboard", "Automated Daily Timesheet", "Customizable Timesheet Reports", "Comprehensive Time Management Tools", "Premium-Grade Offline Capabilities", "Custom Login Solutions", "Advanced Application Monitoring", "Complete Web Activity Tracking", "Productivity Optimization Tools", "Multi-Region Time Zone Management", "Holistic Activity Reporting",
    ],
    buttonText: "Contact Sales",
  },
]

const PricingCard = ({ plan, index, isYearly, onPlanSelect }: PricingCardProps) => {
  return (
    <motion.div
      className={`relative rounded-2xl p-8 transition-all duration-300 group ${
        plan.popular 
          ? 'bg-slate-900 shadow-2xl shadow-blue-500/20' 
          : 'bg-white shadow-lg'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
    >
      {/* Glow effect for popular plan */}
      {plan.popular && (
        <>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="absolute inset-0 rounded-2xl bg-slate-900"></div>
        </>
      )}

      <div className="relative z-10">
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute -top-4 -right-4 z-10">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-md">
              <Star className="w-3 h-3 mr-1.5 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div
            className={`w-14 h-14 mb-4 rounded-full flex items-center justify-center ${
              plan.popular ? "bg-white/10" : "bg-gray-100"
            }`}
          >
            <plan.icon className={`w-7 h-7 ${plan.popular ? "text-white" : "text-highlight"}`} />
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
          <p className={`${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>{plan.subtitle}</p>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          <div className="flex items-baseline mb-2">
            <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
              ₹{isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
            </span>
            <span className={`ml-2 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
              / per month{isYearly && ' (billed annually)'}
            </span>
          </div>
          {isYearly && (
            <div className="flex items-center space-x-2">
              <span className={`text-sm line-through ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                ₹{plan.monthlyPrice * 12}/year
              </span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Save ₹{(plan.monthlyPrice * 12) - plan.yearlyPrice}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px my-8 ${plan.popular ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        
        {/* Features */}
        <h4 className={`text-lg font-semibold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.featuresTitle}</h4>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature: string, featureIndex: number) => (
            <motion.li 
              key={featureIndex} 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + featureIndex * 0.05 }}
            >
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <span className={`${plan.popular ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          onClick={() => onPlanSelect(plan.name)}
          className={`w-full py-3 text-lg font-semibold transition-all duration-300 group/button ${
            plan.popular
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/40 text-white"
              : "bg-highlight hover:bg-highlight/90 text-white"
          }`}
        >
          {plan.buttonText}
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  )
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [formContext, setFormContext] = useState<FormContext>({ type: 'pricing' })

  const handlePlanSelect = (planName: string) => {
    const selectedPlan = plans.find(p => p.name === planName)
    const price = selectedPlan ? (isYearly ? Math.floor(selectedPlan.yearlyPrice / 12) : selectedPlan.monthlyPrice) : 0
    
    setFormContext({ 
      type: 'pricing', 
      planName: planName,
      planPrice: `₹${price}`,
      planType: isYearly ? 'yearly' : 'monthly'
    })
    setIsContactPopupOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white px-4 py-20 lg:px-8 lg:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900"></div>
          <Image
            src="/images/pricing/pricing.jpg"
            alt="Pricing background"
            fill
            className="object-cover opacity-30"
          />
          {/* Overlay to maintain text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="relative mx-auto max-w-6xl text-center z-20">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-wider">Track Nexus Pricing</h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Flexible Plans for Every Team Size
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-16 lg:px-8 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Plans That Scale With Your <span className="text-highlight">Success</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">Choose the perfect plan for your team&apos;s needs</p>
            
            {/* Billing Toggle */}
            <motion.div 
              className="flex items-center justify-center space-x-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className={`font-medium ${!isYearly ? 'text-highlight' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 ${
                  isYearly ? 'bg-highlight' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${isYearly ? 'text-highlight' : 'text-gray-500'}`}>
                Yearly
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save up to 25%
                </span>
              </span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <PricingCard 
                key={plan.name} 
                plan={plan} 
                index={index} 
                isYearly={isYearly} 
                onPlanSelect={handlePlanSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />
      {/* Free Trial CTA */}
      <FreeTrialCTA />

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
        context={formContext}
      />
    </div>
  )
}
