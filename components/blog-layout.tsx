"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  Share2,
  CheckCircle,
} from "lucide-react";
import { BlogPost, getRelatedPosts } from "@/lib/blog-data";

interface BlogLayoutProps {
  post: BlogPost;
}

export function BlogLayout({ post }: BlogLayoutProps) {
  const relatedPosts = getRelatedPosts(post.slug);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog Link */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-deloitte-green transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-deloitte-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-deloitte-green transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </li>
              <li className="text-gray-700 font-medium truncate max-w-[200px]">
                {post.title.split(':')[0]}
              </li>
            </ol>
          </motion.nav>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-deloitte-green/10 text-deloitte-green text-xs font-semibold uppercase tracking-wider rounded-full border border-deloitte-green/20">
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mt-6 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {post.title}
          </motion.h1>

          {/* Author & Meta Info */}
          <motion.div
            className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-deloitte-green/10 flex items-center justify-center">
                <User className="w-5 h-5 text-deloitte-green" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Track Nexus Team</p>
                <p className="text-xs text-gray-500">Productivity Experts</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-deloitte-green" />
              <time dateTime={post.publishedDate}>
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-deloitte-green" />
              <span>{post.readTime} min read</span>
            </div>

            {/* Share Button */}
            <button className="ml-auto flex items-center gap-2 text-sm text-gray-600 hover:text-deloitte-green transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      {post.heroImage && (
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[300px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt}
                fill
                className="object-cover"
                priority
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.section>
      )}

      {/* Introduction */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light"
            {...fadeInUp}
          >
            {post.introduction}
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="mb-12 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>

              {section.image && (
                <motion.div
                  className="relative h-[280px] lg:h-[380px] rounded-xl overflow-hidden shadow-lg mt-8"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mid-Article CTA */}
      <section className="py-12 bg-gradient-to-r from-deloitte-green/5 to-cyan-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            {...fadeInUp}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Want to Learn More?
                </h3>
                <p className="text-gray-600">
                  See how Track Nexus can transform your team's productivity with a personalized demo.
                </p>
              </div>
              <Link
                href="/contact?type=demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-deloitte-green text-white font-semibold rounded-lg hover:bg-deloitte-green-dark transition-colors whitespace-nowrap"
              >
                Request Free Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      {post.useCases && post.useCases.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-center">
                Use Cases & Applications
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Discover how organizations use this solution to improve their operations
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {post.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-deloitte-green/50 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-deloitte-green/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-deloitte-green" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {useCase.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {post.faqItems && post.faqItems.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-center mb-12">
                Common questions about {post.title.split(':')[0].toLowerCase()}
              </p>

              <div className="space-y-4">
                {post.faqItems.map((item, index) => (
                  <motion.details
                    key={index}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-deloitte-green/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <summary className="cursor-pointer p-5 font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="pr-4">{item.question}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {item.answer}
                    </div>
                  </motion.details>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-center">
                Explore More Insights
              </h2>
              <p className="text-gray-600 text-center mb-12">
                Continue learning with these related articles
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.slug}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-deloitte-green/30 hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {relatedPost.heroImage && (
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative h-[180px] overflow-hidden">
                          <Image
                            src={relatedPost.heroImage}
                            alt={relatedPost.heroImageAlt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            quality={80}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 bg-deloitte-green text-white text-xs font-semibold rounded-full">
                              {relatedPost.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}

                    <div className="p-5">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-deloitte-green transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.introduction}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(relatedPost.publishedDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedPost.readTime} min
                          </span>
                        </div>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-deloitte-green hover:text-deloitte-green-dark font-semibold text-sm flex items-center gap-1 group/link"
                        >
                          Read
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-deloitte-green hover:text-deloitte-green transition-colors"
                >
                  Browse All Articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-deloitte-green-dark to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of teams using Track Nexus to optimize their workforce productivity. Start your 14-day free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?type=trial"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact?type=demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/20"
              >
                Schedule Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
