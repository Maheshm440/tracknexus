"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Calendar, Clock, Eye } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { categoryDetails, getArticlesByCategory } from "@/lib/help-center-data"

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const details = categoryDetails[categorySlug]
  const articles = getArticlesByCategory(categorySlug)

  if (!details) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Category not found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link
            href="/resources/help-center"
            className="inline-flex items-center gap-2 px-6 py-3 bg-deloitte-green text-white font-semibold rounded-lg hover:bg-deloitte-green-dark transition-colors"
          >
            Back to Help Center
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resources/help-center">Help Center</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{details.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deloitte-green/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {details.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              {details.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {articles.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Articles in this category
              </h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {articles.map((article) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <Link href={`/resources/help-center/article/${article.id}`}>
                      <div className="group h-full p-6 bg-white rounded-xl border border-gray-200 hover:border-deloitte-green hover:shadow-xl transition-all cursor-pointer">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider bg-deloitte-green/10 text-deloitte-green px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                          {article.featured && (
                            <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-deloitte-green transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {article.views.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-gray-600 mb-6">
                No articles found in this category yet.
              </p>
              <Link
                href="/resources/help-center"
                className="inline-flex items-center gap-2 px-6 py-3 bg-deloitte-green text-white font-semibold rounded-lg hover:bg-deloitte-green-dark transition-colors"
              >
                Back to Help Center
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Links */}
      {articles.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Need help with something else?
            </h3>
            <Link
              href="/resources/help-center"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-deloitte-green text-deloitte-green font-semibold rounded-lg hover:bg-deloitte-green hover:text-white transition-colors"
            >
              Back to Help Center
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
