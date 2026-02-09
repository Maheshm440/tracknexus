"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, ArrowRight, HelpCircle, Sparkles } from "lucide-react"
import { ReactNode } from "react"

// Animation variants
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

// Types
interface Feature {
  title: string
  description: string
  image: string
}

interface Benefit {
  icon: React.ElementType
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

interface FAQ {
  question: string
  answer: string
}

interface ProductPageLayoutProps {
  // Hero
  badge?: string
  title: string
  titleHighlight?: string
  subtitle: string
  heroImage: string
  floatingIcons?: React.ElementType[]

  // Features
  features: Feature[]

  // Benefits
  benefitsTitle?: string
  benefitsSubtitle?: string
  benefits: Benefit[]

  // Stats (optional)
  stats?: Stat[]

  // FAQs (optional)
  faqs?: FAQ[]

  // CTA
  ctaTitle?: string
  ctaSubtitle?: string

  children?: ReactNode
}

// Hero Section Component
function ProductHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  heroImage,
  floatingIcons = [],
}: {
  badge?: string
  title: string
  titleHighlight?: string
  subtitle: string
  heroImage: string
  floatingIcons?: React.ElementType[]
}) {
  return (
    <section className="relative overflow-hidden bg-deloitte-black text-white px-4 py-20 lg:px-8 lg:py-28">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-deloitte-black/90" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className={`absolute text-deloitte-green/20 ${
              index === 0 ? "top-20 left-[10%] w-12 h-12" :
              index === 1 ? "top-40 right-[15%] w-10 h-10" :
              index === 2 ? "bottom-32 left-[20%] w-14 h-14" :
              "top-1/2 right-[25%] w-8 h-8"
            }`}
            animate={{
              y: [0, -20 - index * 5, 0],
              rotate: index % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {badge && (
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-deloitte-green/20 border border-deloitte-green/30 rounded-full text-deloitte-green">
              {badge}
            </span>
          )}
          <h1 className="text-hero font-light mb-6 leading-tight">
            {title}{" "}
            {titleHighlight && (
              <span className="text-deloitte-green">
                {titleHighlight}
              </span>
            )}
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Feature Section Component
function FeatureSection({
  features,
}: {
  features: Feature[]
}) {
  return (
    <section className="bg-white px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-12 lg:gap-16 ${index > 0 ? "mt-20 lg:mt-28" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deloitte-black/20 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {feature.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Benefits Grid Component
function BenefitsGrid({
  title,
  subtitle,
  benefits,
}: {
  title?: string
  subtitle?: string
  benefits: Benefit[]
}) {
  return (
    <section className="bg-gray-50 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <motion.div className="text-center mb-14" {...fadeInUp}>
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          {...staggerContainer}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                {...staggerItem}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-deloitte-green flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Stats Section Component
function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-deloitte-black px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          {...staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              {...staggerItem}
            >
              <div className="text-4xl lg:text-5xl font-bold text-deloitte-green mb-2">
                {stat.value}
              </div>
              <div className="text-deloitte-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// FAQ Section Component
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="bg-gray-50 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div className="text-center mb-14" {...fadeInUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-deloitte-gray-50 border border-deloitte-gray-200 rounded-full">
            <HelpCircle className="w-4 h-4 text-deloitte-green" />
            <span className="text-sm font-medium text-deloitte-green">FAQ</span>
          </div>
          <h2 className="text-display font-light text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-deloitte-green py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section Component
function CTASection({
  title = "Ready to get started?",
  subtitle = "Start your 14-day free trial today. No credit card required.",
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="bg-deloitte-black px-4 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-light text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-deloitte-gray-300 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-deloitte-green hover:bg-deloitte-green-dark text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-2 border-white bg-white text-gray-900 hover:text-cyan-500 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Book a Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Layout Component
export default function ProductPageLayout({
  badge,
  title,
  titleHighlight,
  subtitle,
  heroImage,
  floatingIcons = [],
  features,
  benefitsTitle,
  benefitsSubtitle,
  benefits,
  stats,
  faqs,
  ctaTitle,
  ctaSubtitle,
  children,
}: ProductPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge={badge}
        title={title}
        titleHighlight={titleHighlight}
        subtitle={subtitle}
        heroImage={heroImage}
        floatingIcons={floatingIcons}
      />

      <FeatureSection features={features} />

      <BenefitsGrid
        title={benefitsTitle}
        subtitle={benefitsSubtitle}
        benefits={benefits}
      />

      {stats && stats.length > 0 && <StatsSection stats={stats} />}

      {children}

      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

      <CTASection title={ctaTitle} subtitle={ctaSubtitle} />
    </div>
  )
}

// Export individual components for flexibility
export {
  ProductHero,
  FeatureSection,
  BenefitsGrid,
  StatsSection,
  FAQSection,
  CTASection,
}
