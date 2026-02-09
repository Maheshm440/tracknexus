"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { generateFAQSchema } from "@/lib/seo/schemas"

interface FAQ {
  id: number
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  subtitle?: string
  showImage?: boolean
  imageUrl?: string
  imageAlt?: string
}

const defaultHomepageFaqs: FAQ[] = [
  {
    id: 1,
    question: "What is Track Nexus used for?",
    answer:
      "Track Nexus is a time tracking and productivity management software designed to help businesses monitor employee performance, manage work hours, and gain real-time insights into team activities. It helps improve efficiency, reduce time wastage, and boost overall productivity.",
  },
  {
    id: 2,
    question: "How does Track Nexus track employee time?",
    answer:
      "Track Nexus automatically records employee work hours through its desktop or mobile application. It tracks active and idle time, login and logout hours, and app and website usage to provide managers with a clear view of how time is spent during the workday.",
  },
  {
    id: 3,
    question: "Can Track Nexus be used for remote teams?",
    answer:
      "Yes, Track Nexus is ideal for remote, hybrid, and in-office teams. It provides real-time visibility into employee performance, regardless of where they work, helping organizations manage distributed teams effectively.",
  },
  {
    id: 4,
    question: "Is employee data secure with Track Nexus?",
    answer:
      "Absolutely. Track Nexus takes data security seriously and uses encryption and secure servers to protect sensitive information. Only authorized users can access the data, and companies can control permissions and visibility.",
  },
  {
    id: 5,
    question: "Can Track Nexus help with employee performance reviews?",
    answer:
      "Yes. Track Nexus provides detailed reports and analytics on each employee's productivity trends, attendance, and activity patterns. This data can be used to support fair and data-driven performance reviews.",
  },
  {
    id: 6,
    question: "Does Track Nexus integrate with other tools?",
    answer:
      "Track Nexus offers integrations with popular tools like project management platforms, communication apps, and more. This helps streamline workflows and keep all your productivity tools connected in one place.",
  },
  {
    id: 7,
    question: "Is Track Nexus easy to set up?",
    answer:
      "Yes, Track Nexus is user-friendly and easy to deploy. Whether you're managing a small team or a large workforce, the onboarding process is simple and the interface is intuitive.",
  },
]

export function FAQSection({ 
  faqs = defaultHomepageFaqs, 
  title = "FAQs", 
  subtitle = "Some frequently asked questions...",
  showImage = true,
  imageUrl = "/images/landingpage/faq.jpg?height=400&width=500",
  imageAlt = "FAQ illustration with question marks"
}: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  // Generate FAQ schema for SEO
  const faqSchema = useMemo(() => {
    return generateFAQSchema(faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    })))
  }, [faqs])

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-12 lg:px-8 lg:py-16">
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-highlight uppercase font-medium mb-3">
            {title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{subtitle}</h2>
        </div>

        <div className={`grid grid-cols-1 ${showImage ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
          {/* FAQ Illustration */}
          {showImage && (
          <div className="relative">
            <Image
                src={imageUrl}
                alt={imageAlt}
              width={500}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
          </div>
          )}

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                  openFAQ === faq.id ? 'border-highlight/30 shadow-md' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className={`w-full px-6 py-5 text-left font-semibold flex justify-between items-center transition-all duration-300 ${
                    openFAQ === faq.id
                      ? 'bg-gradient-to-r from-highlight/5 to-highlight/10 text-gray-900'
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                  aria-expanded={openFAQ === faq.id}
                >
                  <span className="text-sm lg:text-base pr-4 flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      openFAQ === faq.id
                        ? 'bg-highlight text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {faq.id}
                    </span>
                    <span className="flex-1">{faq.question}</span>
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors ${
                      openFAQ === faq.id ? 'text-highlight' : 'text-gray-400'
                    }`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-white text-gray-700 leading-relaxed border-t border-gray-100">
                        <p className="pl-9">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Export the default homepage FAQs for use in other components
export { defaultHomepageFaqs }
export type { FAQ }
