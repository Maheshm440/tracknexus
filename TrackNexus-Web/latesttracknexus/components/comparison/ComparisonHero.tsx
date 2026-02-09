'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { CompetitorData } from '@/content/comparisons/types';

interface ComparisonHeroProps {
  competitor: CompetitorData;
}

export function ComparisonHero({ competitor }: ComparisonHeroProps) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Link */}
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Comparisons
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TrackNexus vs {competitor.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            {competitor.seoDescription}
          </p>

          {/* Logo Comparison */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-white/5 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                <Image
                  src="/logo.png"
                  alt="TrackNexus"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-white">TrackNexus</h3>
              <p className="text-sm text-gray-400">AI-Powered Time Tracking</p>
            </div>

            <div className="text-4xl font-bold text-highlight">VS</div>

            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                <Image
                  src={competitor.logo}
                  alt={competitor.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-white">{competitor.name}</h3>
              <p className="text-sm text-gray-400">{competitor.tagline}</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
            <span>Founded: {competitor.foundedYear}</span>
            <span>|</span>
            <span>HQ: {competitor.headquarters}</span>
            <span>|</span>
            <a
              href={competitor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Website <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
