// Modern Product Cards UI - v2.0
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Grid3x3, List } from "lucide-react";
import { productCategories } from "@/components/products/ProductsData";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductsClientPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = productCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-deloitte-gray-50 overflow-x-hidden">
      {/* Hero Section - Deloitte Style */}
      <section className="relative overflow-hidden bg-deloitte-black text-white px-4 py-4 lg:px-8 lg:py-6">
        <div className="relative mx-auto max-w-6xl text-center">
          <motion.h1
            className="text-2xl lg:text-3xl font-light mb-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Complete Workforce <span className="text-deloitte-green">Management Suite</span>
          </motion.h1>

          <motion.p
            className="text-sm lg:text-base mb-3 leading-relaxed max-w-2xl mx-auto text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover AI-powered tools to transform your team
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="sm"
              onClick={() => router.push("/pricing")}
              className="bg-deloitte-green hover:bg-deloitte-green-dark text-white px-4 py-1.5 text-xs font-bold shadow-md"
            >
              Get Started
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/contact")}
              className="bg-white/10 border border-white/40 text-white hover:bg-white/20 px-4 py-1.5 text-xs font-bold"
            >
              Book Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, features, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-deloitte-green focus:border-transparent transition-all duration-300 text-xs text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white shadow text-deloitte-green"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3x3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white shadow text-deloitte-green"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-1.5 text-xs text-gray-600">
            Showing <span className="font-bold text-deloitte-green">{filteredCategories.length}</span> of{" "}
            <span className="font-bold">{productCategories.length}</span> products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-3 lg:py-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <AnimatePresence mode="wait">
            {filteredCategories.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-4 lg:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
                style={{ gridAutoRows: '1fr' }}
              >
                {filteredCategories.map((category, index) => (
                  <ProductCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search query or browse all products
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="border-2 border-deloitte-green text-deloitte-green hover:bg-deloitte-gray-50"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section - Deloitte Style */}
      <section className="bg-deloitte-black text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-display font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your
            <br />
            <span className="text-deloitte-green">
              Workforce Management?
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of companies using Track Nexus to boost productivity,
            streamline operations, and make data-driven decisions.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => router.push("/pricing")}
                className="relative overflow-hidden bg-deloitte-green hover:bg-deloitte-green-dark text-white px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-deloitte-green/50 transition-all duration-300 border-0 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="ml-1 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => router.push("/contact")}
                className="relative overflow-hidden bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white px-10 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Sales
                  <ArrowRight className="ml-1 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 pt-10 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-gray-400 mb-6 font-semibold uppercase tracking-wider">
              Trusted by teams worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-12 text-gray-400">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-deloitte-green">
                  500+
                </span>
                <span className="text-sm mt-2">Companies</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-deloitte-green">
                  50K+
                </span>
                <span className="text-sm mt-2">Users</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-deloitte-green">
                  99.9%
                </span>
                <span className="text-sm mt-2">Uptime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
