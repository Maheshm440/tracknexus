'use client';

import { Check, X, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureComparison } from '@/content/comparisons/types';

interface ComparisonTableProps {
  features: FeatureComparison[];
  competitorName: string;
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
        <Check className="w-4 h-4 text-green-600" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
        <X className="w-4 h-4 text-red-600" />
      </span>
    );
  }
  return (
    <span className="text-sm text-gray-600 bg-yellow-50 px-2 py-1 rounded">
      {value}
    </span>
  );
}

export function ComparisonTable({ features, competitorName }: ComparisonTableProps) {
  // Group features by category
  const categories = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, FeatureComparison[]>);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Feature Comparison
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            See how TrackNexus stacks up against {competitorName} across key features
          </p>

          <div className="max-w-4xl mx-auto">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 bg-gray-900 text-white rounded-t-xl p-4 sticky top-0 z-10">
              <div className="font-semibold">Feature</div>
              <div className="text-center font-semibold">TrackNexus</div>
              <div className="text-center font-semibold">{competitorName}</div>
            </div>

            {/* Categories and Features */}
            <div className="border border-gray-200 rounded-b-xl overflow-hidden">
              {Object.entries(categories).map(([category, categoryFeatures], categoryIndex) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">{category}</h3>
                  </div>

                  {/* Features */}
                  {categoryFeatures.map((feature, featureIndex) => (
                    <div
                      key={feature.name}
                      className={`grid grid-cols-3 gap-4 px-4 py-3 items-center ${
                        featureIndex < categoryFeatures.length - 1
                          ? 'border-b border-gray-100'
                          : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div className="text-gray-700">{feature.name}</div>
                      <div className="text-center">
                        <FeatureValue value={feature.tracknexus} />
                      </div>
                      <div className="text-center">
                        <FeatureValue value={feature.competitor} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
