'use client';

import { Check, X, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerdictSectionProps {
  competitorName: string;
  verdict: string;
  verdictSummary: string;
  tracknexusPros: string[];
  competitorPros: string[];
  tracknexusCons: string[];
  competitorCons: string[];
}

export function VerdictSection({
  competitorName,
  verdict,
  verdictSummary,
  tracknexusPros,
  competitorPros,
  tracknexusCons,
  competitorCons,
}: VerdictSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Pros and Cons */}
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pros & Cons
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* TrackNexus */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-highlight text-center mb-4">
                TrackNexus
              </h3>

              {/* Pros */}
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Advantages
                </h4>
                <ul className="space-y-3">
                  {tracknexusPros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-900">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-red-50 rounded-xl p-6">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Considerations
                </h4>
                <ul className="space-y-3">
                  {tracknexusCons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-red-900">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Competitor */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-700 text-center mb-4">
                {competitorName}
              </h3>

              {/* Pros */}
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Advantages
                </h4>
                <ul className="space-y-3">
                  {competitorPros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-900">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-red-50 rounded-xl p-6">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Limitations
                </h4>
                <ul className="space-y-3">
                  {competitorCons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-red-900">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-highlight to-blue-700 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Our Verdict</h3>
              </div>
              <p className="text-lg text-white/90 mb-4">{verdict}</p>
              <p className="text-white/70 italic">TL;DR: {verdictSummary}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
