"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function FreeTrialCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/pricing/pricing.jpg"
          alt="Free trial background"
          fill
          className="object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80"></div>
      </div>

      <div className="relative z-10 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready for your free trial ?
            </h2>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Trusted by 1,000+ companies and 100,000+ users to boost productivity with seamless time tracking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="bg-highlight hover:bg-highlight/90 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book a Demo
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Free Signup
                </Button>
              </motion.div>
            </div>

            {/* Bottom Text */}
            <motion.p 
              className="text-white/80 text-lg font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Start your trial today - no credit card required!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 