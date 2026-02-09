'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { PricingPlan } from '@/content/comparisons/types';

interface PricingComparisonProps {
  competitorName: string;
  competitorPricing: PricingPlan[];
}

// TrackNexus pricing plans
const tracknexusPricing: PricingPlan[] = [
  {
    plan: 'Starter',
    price: '$5',
    billingCycle: 'per user/month',
    features: [
      'Time tracking',
      'Screenshot capture',
      'Basic reports',
      'Mobile app',
    ],
  },
  {
    plan: 'Professional',
    price: '$10',
    billingCycle: 'per user/month',
    features: [
      'All Starter features',
      'AI analytics',
      'GPS tracking',
      'Facial recognition',
      'App & website tracking',
    ],
  },
  {
    plan: 'Enterprise',
    price: '$15',
    billingCycle: 'per user/month',
    features: [
      'All Professional features',
      'Office TV display',
      'Advanced HR features',
      'Priority support',
      'Custom integrations',
    ],
  },
];

export function PricingComparison({
  competitorName,
  competitorPricing,
}: PricingComparisonProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Pricing Comparison
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Compare pricing plans between TrackNexus and {competitorName}
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* TrackNexus Pricing */}
            <div>
              <h3 className="text-xl font-bold text-highlight mb-6 text-center">
                TrackNexus Pricing
              </h3>
              <div className="space-y-4">
                {tracknexusPricing.map((plan) => (
                  <div
                    key={plan.plan}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{plan.plan}</h4>
                        <p className="text-sm text-gray-500">{plan.billingCycle}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-highlight">
                          {plan.price}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Pricing */}
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">
                {competitorName} Pricing
              </h3>
              <div className="space-y-4">
                {competitorPricing.map((plan) => (
                  <div
                    key={plan.plan}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{plan.plan}</h4>
                        <p className="text-sm text-gray-500">{plan.billingCycle}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-700">
                          {plan.price}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
