// Modern Product Cards UI - v3.0 (Red Popup Fixed + Better Layout)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Grid3x3, List, Sparkles } from "lucide-react";
import { productCategories } from "@/components/products/ProductsData";
import { ProductCard } from "@/components/products/ProductCard";
import { ContactPopup } from "@/components/contact-popup";

export default function ProductsClientPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [freeTrialOpen, setFreeTrialOpen] = useState(false);

  const filteredCategories = productCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50">
      {/* Hero Section - Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-cyan-900 to-gray-900 text-white px-6 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-sm font-medium text-cyan-100">9 Product Categories • 40+ Features</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Complete Workforce Management Suite
          </h1>

          <p className="text-lg lg:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-gray-300">
            Discover AI-powered tools to transform your team productivity with advanced analytics, monitoring, and automation
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setFreeTrialOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-base font-bold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 border-0"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 px-8 py-6 text-base font-bold"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar - Floating Style */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-2xl w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, features, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300 text-base text-gray-900 placeholder:text-gray-400 shadow-sm hover:shadow-md"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-md transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white shadow-md text-cyan-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-md transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white shadow-md text-cyan-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <span>
              Showing <span className="font-bold text-cyan-600">{filteredCategories.length}</span> of{" "}
              <span className="font-bold text-gray-900">{productCategories.length}</span> products
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid - Modern Cards */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {filteredCategories.length > 0 ? (
            <div
              className={`grid gap-6 lg:gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredCategories.map((category, index) => (
                <ProductCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No products found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search query or browse all available products
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="relative bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Ready to Transform Your Workforce Management?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of companies using Track Nexus to boost productivity, streamline operations, and make data-driven decisions
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Button
              size="lg"
              onClick={() => setFreeTrialOpen(true)}
              className="relative overflow-hidden bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 border-0 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white px-10 py-7 text-lg font-bold shadow-xl transition-all duration-300"
            >
              Contact Sales
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-10 border-t border-white/20">
            <p className="text-sm text-gray-400 mb-8 font-semibold uppercase tracking-wider">
              Trusted by teams worldwide
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-sm text-gray-300">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">50K+</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Popup */}
      <ContactPopup
        isOpen={freeTrialOpen}
        onClose={() => setFreeTrialOpen(false)}
        context={{ type: "free-trial" }}
      />
    </div>
  );
}
