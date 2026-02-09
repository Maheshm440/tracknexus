"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface FeaturedCard {
  title: string
  description: string
  image: string
  link: string
  category?: string
}

interface FeaturedCardsProps {
  cards: FeaturedCard[]
  title?: string
  subtitle?: string
}

export function FeaturedCards({ cards, title, subtitle }: FeaturedCardsProps) {
  return (
    <section className="bg-deloitte-white px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-12">
            {subtitle && (
              <p className="text-sm font-semibold text-deloitte-green uppercase tracking-wide mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-display font-light text-deloitte-gray-900">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden"
              style={{ boxSizing: 'border-box' }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-deloitte-gray-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
                {card.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-deloitte-black text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      {card.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-deloitte-gray-900 mb-3 group-hover:text-deloitte-green transition-colors">
                  {card.title}
                </h3>
                <p className="text-deloitte-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {card.description}
                </p>

                {/* Read More Link */}
                <div className="flex items-center text-deloitte-green font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
