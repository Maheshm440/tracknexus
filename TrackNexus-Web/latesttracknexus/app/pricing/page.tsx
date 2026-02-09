"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  Check,
  X,
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Shield,
  HelpCircle,
  Sparkles,
  BarChart3,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FormContext } from "@/components/contact-popup"

// Lazy load ContactPopup since it's only needed on interaction
const ContactPopup = dynamic(
  () => import("@/components/contact-popup").then((m) => m.ContactPopup),
  { ssr: false }
)

interface Plan {
  name: string
  subtitle: string
  actualPrice: number
  monthlyPrice: number
  yearlyPrice: number
  popular: boolean
  features: string[]
  description: string
  buttonText: string
  color: string
}

const plans: Plan[] = [
  {
    name: "Starter",
    subtitle: "Time Tracking Basics",
    actualPrice: 500,
    monthlyPrice: 250,
    yearlyPrice: 2500,
    popular: false,
    description: "Track time and boost productivity",
    color: "cyan",
    features: [
      "Basic time tracking",
      "Daily reports",
      "App tracking",
      "7-day data retention",
      "Email support",
      "Mobile app access",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Growth",
    subtitle: "Team Management",
    actualPrice: 700,
    monthlyPrice: 350,
    yearlyPrice: 3500,
    popular: false,
    description: "Advanced features for growing teams",
    color: "blue",
    features: [
      "Everything in Starter",
      "Screenshot monitoring",
      "Productivity insights",
      "30-day data retention",
      "Priority support",
      "Custom reports",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Premium with AI",
    subtitle: "Enterprise Solution",
    actualPrice: 1000,
    monthlyPrice: 500,
    yearlyPrice: 5000,
    popular: true,
    description: "Complete solution for large teams",
    color: "indigo",
    features: [
      "Everything in Growth",
      "AI-powered insights",
      "Advanced analytics",
      "Unlimited retention",
      "24/7 dedicated support",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
  },
]

const comparisonFeatures = [
  { name: "Number of Users", starter: "10", growth: "50", premium: "Unlimited" },
  { name: "Time Tracking", starter: true, growth: true, premium: true },
  { name: "App & Website Tracking", starter: true, growth: true, premium: true },
  { name: "Screenshot Monitoring", starter: false, growth: true, premium: true },
  { name: "Productivity Analytics", starter: false, growth: true, premium: true },
  { name: "AI-Powered Insights", starter: false, growth: false, premium: true },
  { name: "Custom Reports", starter: false, growth: true, premium: true },
  { name: "Team Management", starter: false, growth: true, premium: true },
  { name: "Data Export", starter: false, growth: true, premium: true },
  { name: "API Access", starter: false, growth: false, premium: true },
  { name: "Custom Integrations", starter: false, growth: false, premium: true },
  { name: "Dedicated Account Manager", starter: false, growth: false, premium: true },
  { name: "Data Retention", starter: "7 days", growth: "30 days", premium: "Unlimited" },
  { name: "Support", starter: "Email", growth: "Priority", premium: "24/7 Dedicated" },
]

const stats = [
  { value: "10,000+", label: "Active Users", icon: Users },
  { value: "500+", label: "Companies", icon: Globe },
  { value: "99.9%", label: "Uptime", icon: Shield },
  { value: "4.9/5", label: "Rating", icon: Star },
]

const faqs = [
  {
    question: "Can I try TrackNexus before purchasing?",
    answer: "Yes! You can request a demo and our team will walk you through all features. We also offer flexible plans that you can upgrade or downgrade anytime.",
  },
  {
    question: "How does billing work?",
    answer: "We offer monthly and yearly billing options. Yearly plans come with up to 25% discount. You can upgrade, downgrade, or cancel at any time.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, net banking, and wire transfers for enterprise customers.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with TrackNexus, contact us within 30 days for a full refund.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer: "Yes! We offer special pricing for nonprofits, educational institutions, and startups. Contact our sales team for more details.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function PricingPage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [formContext, setFormContext] = useState<FormContext>({ type: "pricing" })

  const handlePlanSelect = (planName: string) => {
    const selectedPlan = plans.find((p) => p.name === planName)
    const price = selectedPlan ? selectedPlan.monthlyPrice : 0

    setFormContext({
      type: "pricing",
      planName: planName,
      planPrice: `₹${price}`,
      planType: "monthly",
    })
    setIsContactPopupOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Deloitte Style */}
      <section className="relative overflow-hidden bg-deloitte-black text-white px-4 pt-10 pb-28 lg:px-8 lg:pt-14 lg:pb-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
            alt="Analytics dashboard"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-deloitte-black/90" />
        </div>

        {/* Floating Animated Elements - CSS animations for better performance */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute top-20 left-[10%] w-12 h-12 text-deloitte-green/20 animate-float-1">
            <TrendingUp className="w-full h-full" />
          </div>
          <div className="absolute top-40 right-[15%] w-10 h-10 text-deloitte-green/20 animate-float-2">
            <BarChart3 className="w-full h-full" />
          </div>
          <div className="absolute bottom-32 left-[20%] w-14 h-14 text-deloitte-green/20 animate-float-3">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute top-1/2 right-[25%] w-8 h-8 text-deloitte-green/20 animate-float-4">
            <Clock className="w-full h-full" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-4xl text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-hero font-light mb-6 leading-tight">
              Simple, Transparent{" "}
              <span className="text-deloitte-green">
                Pricing
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Choose the perfect plan for your team. Scale up or down anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 -mt-16 px-4 lg:px-8 pb-12">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            {...staggerContainer}
          >
            {plans.map((plan) => {
              const colorClasses = {
                cyan: { price: "text-cyan-600", check: "text-cyan-500", border: "border-cyan-200 hover:border-cyan-400", bg: "bg-cyan-600 hover:bg-cyan-700" },
                blue: { price: "text-blue-600", check: "text-blue-500", border: "border-blue-200 hover:border-blue-400", bg: "bg-blue-600 hover:bg-blue-700" },
                indigo: { price: "text-indigo-600", check: "text-indigo-500", border: "border-indigo-300 hover:border-indigo-500", bg: "bg-indigo-600 hover:bg-indigo-700" },
              }[plan.color] || { price: "text-cyan-600", check: "text-cyan-500", border: "border-gray-200", bg: "bg-cyan-600 hover:bg-cyan-700" };

              return (
                <motion.div
                  key={plan.name}
                  className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-150 hover:shadow-xl ${
                    plan.popular ? "border-indigo-400" : colorClasses.border
                  }`}
                  {...staggerItem}
                  whileHover={{ y: -5, transition: { duration: 0.15 } }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className={`p-4 ${plan.popular ? 'pt-8' : ''}`}>
                    {/* Plan Name & Subtitle */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {plan.subtitle}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base text-gray-400 line-through">
                          ₹{plan.actualPrice}
                        </span>
                        <span className={`text-3xl font-bold ${colorClasses.price}`}>
                          ₹{plan.monthlyPrice}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        per user/month, billed annually
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 mb-4 pb-3 border-b border-gray-100">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check
                            className={`w-4 h-4 mr-2 flex-shrink-0 ${colorClasses.check}`}
                            strokeWidth={2.5}
                          />
                          <span className="text-xs text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handlePlanSelect(plan.name)}
                      className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 text-white shadow-md ${colorClasses.bg}`}
                    >
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect plan with our detailed feature comparison
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            {...fadeInUp}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-slate-800">
                    <th className="text-left py-5 px-6 text-white font-semibold">Features</th>
                    <th className="text-center py-5 px-6 text-white font-semibold">Starter</th>
                    <th className="text-center py-5 px-6 text-white font-semibold">Growth</th>
                    <th className="text-center py-5 px-6 text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        Premium with AI
                        <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full">Popular</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">{feature.name}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.starter === "boolean" ? (
                          feature.starter ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700 font-medium">{feature.starter}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-blue-50/30">
                        {typeof feature.growth === "boolean" ? (
                          feature.growth ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700 font-medium">{feature.growth}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-indigo-50/30">
                        {typeof feature.premium === "boolean" ? (
                          feature.premium ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{feature.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="bg-white px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Trusted by Teams Worldwide
            </h2>
            <p className="text-gray-600">
              Join thousands of companies already using TrackNexus
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            {...staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                {...staggerItem}
                whileHover={{ y: -3 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Company Logos */}
          <motion.div
            className="mt-10 pt-8 border-t border-gray-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-center text-gray-500 text-sm mb-6">
              Powering productivity for innovative companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
              {['TechCorp', 'Infosys', 'Wipro', 'HCL Tech', 'TCS', 'Zoho'].map((company) => (
                <div
                  key={company}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                >
                  <span className="text-gray-500 font-semibold text-sm">{company}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-blue-50 border border-blue-100 rounded-full">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Pricing FAQ</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-gray-100 px-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-4 text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
              Ready to boost your team&apos;s productivity?
            </h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Get started with TrackNexus today and transform your team&apos;s productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handlePlanSelect("Starter Plan")}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handlePlanSelect("Premium Plan")}
                  className="bg-white/20 border-2 border-white text-white hover:bg-white/30 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  Talk to Sales
                </Button>
              </motion.div>
            </div>
            <p className="text-blue-200 mt-6 text-sm">
              Join 10,000+ users already tracking smarter
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        context={formContext}
      />
    </div>
  )
}
