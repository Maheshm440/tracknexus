"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategoryById, productCategories } from "@/components/products/ProductsData";
import { FAQSection } from "@/components/faq-section";

interface ProductPageClientProps {
  slug: string;
}

export default function ProductPageClient({ slug }: ProductPageClientProps) {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Look up category on client side to avoid serialization issues with icons
  const category = getCategoryById(slug);

  // Signup form state
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState<string>("");

  // Preserve sidebar scroll position
  useEffect(() => {
    // Restore scroll position when component mounts
    const savedScrollPos = sessionStorage.getItem('productSidebarScroll');
    if (savedScrollPos && sidebarRef.current) {
      sidebarRef.current.scrollTop = parseInt(savedScrollPos, 10);
    }

    // Save scroll position before unmounting
    return () => {
      if (sidebarRef.current) {
        sessionStorage.setItem('productSidebarScroll', sidebarRef.current.scrollTop.toString());
      }
    };
  }, []);

  // Save scroll position on scroll
  const handleSidebarScroll = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem('productSidebarScroll', sidebarRef.current.scrollTop.toString());
    }
  };

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  // Track active section using Intersection Observer (performance optimized)
  useEffect(() => {
    if (category.features.length > 0) {
      setActiveSection(category.features[0].id);
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.5, 1]
    });

    // Observe all feature sections
    category.features.forEach(feature => {
      const element = document.getElementById(feature.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [category.features]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Handle signup form submission (simulated for static export)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('sending');

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Free signup submitted:", {
        name: formData.name,
        email: formData.email,
        product: category.title,
        submittedAt: new Date().toISOString()
      });

      setStatus('success');
      setFormData({ name: "", email: "" });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Compact Deloitte Style */}
      <section className="relative overflow-hidden bg-deloitte-black text-white py-12 border-b border-white/10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-deloitte-green to-deloitte-green-dark">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-light text-white">{category.title}</h1>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar - Deloitte Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation - Fixed */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div
              ref={sidebarRef}
              onScroll={handleSidebarScroll}
              className="sticky top-24 space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              {/* Product Categories Navigation */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                  Products
                </h3>
                <nav className="space-y-1">
                  {productCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    const isActive = cat.id === slug;
                    return (
                      <Link
                        key={cat.id}
                        href={`/product/${cat.id}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-deloitte-green text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <CatIcon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-deloitte-green'}`} />
                        <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                          {cat.title}
                        </span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Current Product Features Navigation */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                  {category.title} Features
                </h3>
                <nav className="space-y-1">
                  {category.features.map((feature) => {
                    const isActive = activeSection === feature.id;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => scrollToSection(feature.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-deloitte-green/10 text-deloitte-green border-l-4 border-deloitte-green'
                            : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <span className="text-sm font-medium">{feature.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Hero Banner with Gradient */}
            <motion.div
              className="relative mb-8 bg-gradient-to-br from-deloitte-green/5 via-white to-deloitte-green/5 rounded-2xl p-8 border border-deloitte-green/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-deloitte-green/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-deloitte-green/5 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-deloitte-green to-deloitte-green-dark flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-light text-gray-900">
                      {category.title}
                    </h1>
                    <p className="text-sm text-deloitte-green font-medium">Complete Solution Suite</p>
                  </div>
                </div>
                <p className="text-base text-gray-600 leading-relaxed max-w-3xl">
                  {category.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-deloitte-green">{category.features.length}</div>
                    <div className="text-xs text-gray-600">Features</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-deloitte-green">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-deloitte-green">99.9%</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features Grid - Modern Deloitte Style */}
            <div className="space-y-4">
              {category.features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.section
                    key={feature.id}
                    id={feature.id}
                    className="scroll-mt-24"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Modern Feature Card with Gradient Accent */}
                    <div className="group relative bg-white border border-gray-200 rounded-xl hover:border-deloitte-green/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Gradient Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-deloitte-green via-deloitte-green-dark to-deloitte-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          {/* Icon with Gradient Background */}
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-deloitte-green/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-deloitte-green to-deloitte-green-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <FeatureIcon className="w-7 h-7 text-white" />
                            </div>
                          </div>

                          {/* Title and Description */}
                          <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-deloitte-green transition-colors duration-300">
                              {feature.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>

                        {/* Feature Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                          {/* Column 1 - Key Benefits */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-deloitte-green rounded-full"></div>
                              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                Benefits
                              </h3>
                            </div>
                            {[
                              "Boost productivity",
                              "Save time & costs",
                              "Real-time insights"
                            ].map((benefit, i) => (
                              <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                                <Check className="w-4 h-4 text-deloitte-green flex-shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>

                          {/* Column 2 - Capabilities */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-deloitte-green rounded-full"></div>
                              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                Capabilities
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {["Automated", "Real-time", "Scalable"].map((cap, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-deloitte-green/5 border border-deloitte-green/20 rounded-lg text-xs font-medium text-gray-700 hover:bg-deloitte-green/10 transition-colors duration-200"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-deloitte-green"></div>
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Column 3 - Integration */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-deloitte-green rounded-full"></div>
                              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                Integration
                              </h3>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Sparkles className="w-4 h-4 text-deloitte-green" />
                                <span>API Access</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Sparkles className="w-4 h-4 text-deloitte-green" />
                                <span>Third-party Tools</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Sparkles className="w-4 h-4 text-deloitte-green" />
                                <span>Custom Webhooks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                );
              })}
            </div>

            {/* CTA Card */}
            <motion.div
              className="mt-12 bg-gradient-to-br from-deloitte-black to-gray-900 rounded-2xl p-8 text-center text-white shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-3">
                Ready to Transform Your <span className="text-deloitte-green">{category.title}</span>?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of companies using Track Nexus to boost productivity and streamline operations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push("/pricing")}
                  className="bg-deloitte-green hover:bg-deloitte-green-dark text-white px-8 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => router.push("/contact")}
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection faqs={category.faqs} />
      </div>
    </div>
  );
}
