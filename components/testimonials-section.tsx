"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    image: "/images/landingpage/test1.png?height=300&width=400",
  },
  {
    id: 2,
    image: "/images/landingpage/test2.png?height=300&width=400",
  },
  {
    id: 3,
    image: "/images/landingpage/test3.png?height=300&width=400",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="bg-gray-50 px-4 py-12 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Thousands streamline their workday with <span className="text-highlight">Track Nexus</span>—your{" "}
            <span className="text-highlight">Partner</span> in precise time tracking.
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* apply flex only in desktop, not mobile */}
          <div className="md:flex justify-center items-center min-h-[300px] md:min-h-[400px] [perspective:1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, rotateY: -60 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 60 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-4xl"
              >
                <Image
                  src={testimonials[currentIndex].image}
                  alt={`Testimonial ${testimonials[currentIndex].id}`}
                  width={1200}
                  height={675}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="hidden md:block absolute left-0 md:-left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="hidden md:block absolute right-0 md:-right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center mt-4 space-x-4">
          <button
            onClick={prevTestimonial}
            className="bg-white rounded-full p-2 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-highlight" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="bg-white rounded-full p-2 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-highlight" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
            &ldquo;Unlock peak performance with <span className="text-highlight">Track Nexus</span>, the all-in-one trusted
            time tracking platform!&rdquo;
          </h3>
        </motion.div>
      </div>
    </section>
  )
}
