"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { searchArticles } from "@/lib/help-center-data"

export default function HelpCenterSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    return searchArticles(searchQuery).slice(0, 8)
  }, [searchQuery])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles, FAQs, and tutorials..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => searchQuery && setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3.5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-base bg-white shadow-xl transition-all placeholder:text-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("")
              setIsOpen(false)
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 z-50 overflow-hidden"
          >
            {searchResults.length > 0 ? (
              <div className="max-h-[500px] overflow-y-auto">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">
                    Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
                  </p>
                </div>
                {searchResults.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/resources/help-center/article/${article.id}`}
                      onClick={() => {
                        setSearchQuery("")
                        setIsOpen(false)
                      }}
                      className="group block p-5 hover:bg-deloitte-green/5 border-b border-gray-100 last:border-b-0 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-deloitte-green transition-colors mb-2 line-clamp-1">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-xs font-bold uppercase tracking-wider text-deloitte-green bg-deloitte-green/10 px-2.5 py-1 rounded-full">
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Search className="w-3 h-3" />
                              {article.readTime} min read
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-deloitte-green group-hover:translate-x-1 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-700 font-semibold mb-1">No articles found</p>
                <p className="text-sm text-gray-500">
                  Try searching with different keywords or browse our categories
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
