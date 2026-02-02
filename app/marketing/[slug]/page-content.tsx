'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Zap, Globe } from 'lucide-react';
import { ContactPopup } from '@/components/contact-popup';

interface MarketingPage {
  id: string;
  title: string;
  url: string;
  category: string;
  tags: string[];
  leads: number;
  conversions: number;
  conversionRate: number;
  status: 'active' | 'paused' | 'draft';
  description: string;
  createdDate: string;
  updatedDate: string;
  budget: number;
  roi: number;
  pageViews: number;
  engagementRate: number;
  clickThroughRate: number;
  costPerLead: number;
  costPerConversion: number;
  trafficSource: string;
  targetAudience: string;
  campaignDuration: string;
  performanceTrend: 'up' | 'down' | 'stable';
  notes: string;
  // Comprehensive marketing fields
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: string;
  keyFeatures?: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
  }>;
  valueProposition?: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  caseStudies?: Array<{
    id: string;
    company: string;
    location: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
  }>;
  testimonials?: Array<{
    id: string;
    author: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image: string;
  }>;
  faqs?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  industryStats?: Array<{
    label: string;
    value: string;
  }>;
  ctaText?: string;
  ctaButtonText?: string;
}

export default function MarketingPageContent({ page }: { page: MarketingPage }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Popup for Free Trial */}
      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        context={{ type: 'free-trial' }}
      />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 lg:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              {/* Industry Label */}
              {page.category && (
                <div>
                  <span className="inline-block bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold">
                    {page.category}
                  </span>
                </div>
              )}

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {page.heroHeadline || page.title}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                {page.heroSubheadline || page.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsContactOpen(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all shadow-lg text-sm cursor-pointer"
                >
                  Start Your Free Trial
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-50 text-sm cursor-pointer"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Trust Badges */}
              {page.industryStats && page.industryStats.length > 0 && (
                <div className="pt-5 mt-5 border-t border-gray-200">
                  <p className="text-xs text-gray-600 font-semibold mb-4 tracking-wide">TRUSTED BY</p>
                  <div className="grid grid-cols-3 gap-6">
                    {page.industryStats.slice(0, 3).map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-600 leading-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden shadow-xl aspect-[16/10] max-h-[400px]">
                <img
                  src={page.heroImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format&q=80'}
                  alt={page.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format&q=80';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      {page.keyFeatures && page.keyFeatures.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 sm:py-14 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Key Features</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to succeed</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.keyFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Value Proposition Section */}
      {page.valueProposition && page.valueProposition.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 sm:py-14 bg-gradient-to-b from-blue-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Why Choose Us</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Real results that drive business growth</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {page.valueProposition.map((prop, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center space-y-2"
                >
                  <p className="text-4xl sm:text-5xl font-bold text-blue-600">{prop.value}</p>
                  <p className="text-lg font-semibold text-gray-900">{prop.metric}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{prop.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Case Studies Section */}
      {page.caseStudies && page.caseStudies.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 sm:py-14 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Success Stories</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">See how companies achieve remarkable results</p>
            </div>
            <div className="space-y-6">
              {page.caseStudies.map((study) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Company</p>
                      <p className="text-lg font-bold text-gray-900">{study.company}</p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {study.location}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Challenge</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Solution</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{study.solution}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Result</p>
                      <p className="text-lg font-bold text-green-600">{study.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Testimonials Section */}
      {page.testimonials && page.testimonials.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 sm:py-14 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Trusted by industry leaders worldwide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  whileHover={{ y: -3 }}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-base text-gray-700 mb-5 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-xs text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* FAQ Section */}
      {page.faqs && page.faqs.length > 0 && (
        <motion.section
          id="faqs"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 sm:py-14 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Get answers to common questions</p>
            </div>
            <div className="space-y-3">
              {page.faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group bg-gray-50 border border-gray-200 rounded-lg p-5 hover:bg-gray-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-semibold text-base text-gray-900 select-none">
                    <span className="pr-6">{faq.question}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      {page.ctaText && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-12 sm:py-16 bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{page.ctaText}</h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-base hover:bg-gray-50 transition-all shadow-xl inline-flex items-center gap-2 cursor-pointer"
            >
              {page.ctaButtonText || 'Get Started Now'}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <p className="text-orange-100 text-sm">Get started with TrackNexus today</p>
          </div>
        </motion.section>
      )}
    </div>
  );
}
