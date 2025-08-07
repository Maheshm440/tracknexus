"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

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

  return (
    <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ color: '#096EB6' }}>{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </motion.div>

        <div className={`grid grid-cols-1 ${showImage ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
          {/* FAQ Illustration */}
          {showImage && (
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
                src={imageUrl}
                alt={imageAlt}
              width={500}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
          )}

          {/* FAQ Items */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left text-white font-medium flex justify-between items-center transition-colors"
                  style={{ backgroundColor: '#096EB6' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#085a94'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#096EB6'}
                  aria-expanded={openFAQ === faq.id}
                >
                  <span className="text-sm lg:text-base">
                    {faq.id}. {faq.question}
                  </span>
                  <motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 flex-shrink-0 ml-2" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Export the default homepage FAQs for use in other components
export { defaultHomepageFaqs }
export type { FAQ }
