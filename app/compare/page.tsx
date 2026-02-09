import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getCompetitorSummaries } from '@/content/comparisons';
import { FreeTrialCTA } from '@/components/free-trial-cta';

export const metadata: Metadata = {
  title: 'Compare TrackNexus with Competitors | Time Tracking Software Comparison',
  description:
    'Compare TrackNexus with leading time tracking solutions like Hubstaff, Time Doctor, Clockify, and Toggl. Find the best workforce management tool for your team.',
  openGraph: {
    title: 'TrackNexus vs Competitors - Time Tracking Comparison',
    description:
      'See how TrackNexus compares to popular time tracking solutions. Feature comparisons, pricing, and detailed analysis.',
  },
};

export default function ComparePage() {
  const competitors = getCompetitorSummaries();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compare TrackNexus
            </h1>
            <p className="text-xl text-gray-300">
              See how TrackNexus stacks up against other time tracking and employee monitoring solutions
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
              Choose a Comparison
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {competitors.map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/compare/${competitor.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-highlight/20 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Image
                        src={competitor.logo}
                        alt={competitor.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-highlight transition-colors">
                        TrackNexus vs {competitor.name}
                      </h3>
                      <p className="text-sm text-gray-500">{competitor.tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {competitor.shortDescription}
                  </p>
                  <div className="flex items-center text-highlight font-medium text-sm group-hover:gap-3 transition-all gap-2">
                    View Comparison
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Compare Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Compare Before You Choose?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Feature Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Understand which features each solution offers and what matters for your team
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pricing Clarity</h3>
                <p className="text-gray-600 text-sm">
                  Compare pricing structures to find the best value for your budget
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Informed Decision</h3>
                <p className="text-gray-600 text-sm">
                  Make confident choices with objective comparisons and honest assessments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <FreeTrialCTA />
    </main>
  );
}
