"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, Eye, ChevronRight, ThumbsUp, Share2, BookOpen } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { recentArticles } from "@/lib/help-center-data"

export default function ArticlePage() {
  const params = useParams()
  const articleId = parseInt(params.id as string)
  const article = recentArticles.find((a) => a.id === articleId)

  // Get related articles (same category, different article)
  const relatedArticles = article
    ? recentArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)
    : []

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article not found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been removed.
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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resources/help-center">Help Center</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resources/help-center">{article.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-b from-deloitte-green/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()} views
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Article Introduction */}
            <div className="bg-gray-50 border-l-4 border-deloitte-green p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-700 mb-0">{article.excerpt}</p>
            </div>

            {/* Article Body - This is placeholder content */}
            <div className="text-gray-700 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Overview</h2>
              <p>
                In this comprehensive guide, we'll walk you through everything you need to know about{" "}
                {article.title.toLowerCase()}. Whether you're just getting started or looking to optimize
                your workflow, this article will provide you with the insights and best practices you need.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Getting Started</h2>
              <p>
                TrackNexus makes it easy to manage your team's productivity and time tracking. Follow these
                steps to get up and running quickly:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Set up your account:</strong> Create your workspace and configure your
                  preferences.
                </li>
                <li>
                  <strong>Invite team members:</strong> Add your team and assign appropriate roles and
                  permissions.
                </li>
                <li>
                  <strong>Create projects:</strong> Organize your work into projects and set up tracking
                  rules.
                </li>
                <li>
                  <strong>Configure integrations:</strong> Connect your favorite tools for seamless
                  workflow.
                </li>
              </ol>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Best Practices</h2>
              <p>To get the most out of TrackNexus, follow these recommended best practices:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Regular reviews:</strong> Schedule weekly reviews of your team's productivity
                  metrics.
                </li>
                <li>
                  <strong>Clear communication:</strong> Set clear expectations with your team about time
                  tracking policies.
                </li>
                <li>
                  <strong>Automated workflows:</strong> Leverage automation features to reduce manual data
                  entry.
                </li>
                <li>
                  <strong>Custom reports:</strong> Create custom reports tailored to your specific business
                  needs.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Features</h2>
              <p>
                Once you're comfortable with the basics, explore these advanced features to take your
                productivity to the next level:
              </p>
              <p>
                TrackNexus offers powerful analytics, automated time tracking, AI-powered insights, and
                seamless integrations with your existing tools. These features help you make data-driven
                decisions and optimize your team's performance.
              </p>

              <div className="bg-deloitte-green/10 border border-deloitte-green/20 rounded-lg p-6 my-8">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-deloitte-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Tip</h3>
                    <p className="text-gray-700 mb-0">
                      Take advantage of keyboard shortcuts and automation rules to save time and increase
                      efficiency. Check out our shortcuts guide for a complete list of available commands.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Next Steps</h2>
              <p>
                Now that you understand the fundamentals, you're ready to start implementing these strategies
                in your workflow. Remember, the key to success is consistent usage and regular optimization
                based on your team's needs.
              </p>
              <p>
                If you have questions or need additional support, don't hesitate to reach out to our support
                team or explore our video tutorials for step-by-step guidance.
              </p>
            </div>
          </motion.div>

          {/* Article Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-200"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">Helpful</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/resources/help-center/article/${relatedArticle.id}`}>
                    <div className="group h-full p-6 bg-white rounded-xl border border-gray-200 hover:border-deloitte-green hover:shadow-xl transition-all cursor-pointer">
                      <span className="text-xs font-bold uppercase tracking-wider bg-deloitte-green/10 text-deloitte-green px-3 py-1 rounded-full">
                        {relatedArticle.category}
                      </span>

                      <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-3 group-hover:text-deloitte-green transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {relatedArticle.readTime} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {relatedArticle.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Help Center */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <Link
            href="/resources/help-center"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-deloitte-green text-deloitte-green font-semibold rounded-lg hover:bg-deloitte-green hover:text-white transition-colors"
          >
            Back to Help Center
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
