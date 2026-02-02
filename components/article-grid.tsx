"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

interface Article {
  title: string
  excerpt: string
  image: string
  link: string
  date?: string
  readTime?: string
  author?: string
  category?: string
}

interface ArticleGridProps {
  articles: Article[]
  title?: string
  subtitle?: string
  columns?: 2 | 3
}

export function ArticleGrid({ articles, title, subtitle, columns = 3 }: ArticleGridProps) {
  const gridCols = columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"

  return (
    <section className="bg-deloitte-gray-50 px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
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

        {/* Articles Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}>
          {articles.map((article, index) => (
            <article
              key={index}
              className="group bg-white hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <Link href={article.link} className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {article.category && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-cyan-600 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Meta Info */}
                {(article.date || article.readTime) && (
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    {article.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                    )}
                    {article.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Title */}
                <Link href={article.link}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Author */}
                {article.author && (
                  <p className="text-xs text-gray-500 mt-auto">
                    By <span className="font-semibold text-gray-700">{article.author}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all group"
          >
            <span>View all articles</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
