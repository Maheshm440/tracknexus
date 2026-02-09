"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/help-center-data"

export default function FAQSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions about TrackNexus
          </p>
        </motion.div>

        {/* FAQs by Category */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Array.from(
            faqs.reduce((acc, faq) => {
              if (!acc.has(faq.category)) acc.set(faq.category, [])
              acc.get(faq.category)!.push(faq)
              return acc
            }, new Map<string, typeof faqs>())
          ).map(([category, categoryFaqs]) => (
            <motion.div key={category} variants={itemVariants} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-deloitte-green" />
                {category}
              </h3>

              <Accordion type="single" collapsible className="space-y-3">
                {categoryFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem
                      value={`faq-${faq.id}`}
                      className="border border-gray-200 rounded-lg px-5 py-3 data-[state=open]:border-deloitte-green data-[state=open]:bg-deloitte-green/5 transition-all"
                    >
                      <AccordionTrigger className="hover:text-deloitte-green transition-colors">
                        <span className="text-left text-gray-900 font-medium">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Need Help */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-deloitte-green/10 to-deloitte-green-dark/10 rounded-xl border border-deloitte-green/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-700 font-medium mb-2">
            Didn't find your answer?
          </p>
          <p className="text-sm text-gray-600">
            Check out our video tutorials or contact our support team for personalized help
          </p>
        </motion.div>
      </div>
    </section>
  )
}
