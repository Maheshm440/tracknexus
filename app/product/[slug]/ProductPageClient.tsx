"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Star,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Clock,
  Users,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryById, productCategories } from "@/components/products/ProductsData";
import { FAQSection } from "@/components/faq-section";
import { ContactPopup } from "@/components/contact-popup";

interface ProductPageClientProps {
  slug: string;
}

// Unique benefits per feature to avoid repetitive content
const featureBenefitsMap: Record<string, string[]> = {
  "attendance-tracking": ["GPS-verified punch-ins", "Late arrival alerts", "Payroll-ready reports"],
  "time-tracking": ["Second-level precision", "Multi-project tracking", "Billable hours capture"],
  "productivity-tracking": ["Daily productivity scores", "Peak hour analysis", "Goal-based tracking"],
  "break-management": ["Configurable break rules", "Wellness reminders", "Compliance monitoring"],
  "employee-monitoring": ["Live status dashboards", "Multi-location support", "Instant idle alerts"],
  "activity-insights": ["App usage analytics", "Workflow optimization", "Cross-team comparison"],
  "screenshot-monitoring": ["Custom capture intervals", "Privacy-aware blur", "Secure storage"],
  "idle-time-detection": ["Smart threshold config", "Idle time claiming", "Offline work support"],
  "app-website-usage": ["Usage categorization", "Distraction blocking", "Role-based rules"],
  "ai-productivity-reports": ["ML trend analysis", "Scheduled automation", "Custom KPI tracking"],
  "smart-activity-classification": ["Auto-categorization", "Learning algorithms", "Zero manual setup"],
  "role-based-analysis": ["20+ role presets", "Custom role builder", "Department benchmarks"],
  "personalized-recommendations": ["AI-driven tips", "Impact measurement", "Individual coaching"],
  "fake-activity-detection": ["Jiggler detection", "Pattern analysis", "Smart alerting"],
  "work-session-tracking": ["Session timeline view", "Duration analytics", "Historical patterns"],
  "idle-time-claims": ["One-click submissions", "Manager notifications", "Fair time records"],
  "approval-workflows": ["Auto-approval rules", "One-click actions", "Response time tracking"],
  "activity-logs": ["Complete audit trails", "Configurable retention", "Export for compliance"],
  "user-management": ["Bulk user import", "Guided onboarding", "Profile management"],
  "role-based-access": ["4-tier access model", "Granular permissions", "Custom hierarchies"],
  "team-assignment": ["Drag-and-drop teams", "Manager assignment", "Historical data preservation"],
  "multi-company-support": ["Data isolation", "Centralized dashboard", "Seamless switching"],
  "dashboard-overview": ["Real-time metrics", "Interactive charts", "Custom layouts"],
  "attendance-reports": ["Flexible date ranges", "Dept-level filtering", "Absence pattern analysis"],
  "ai-summary-reports": ["Narrative insights", "Trend highlights", "One-click generation"],
  "email-reports": ["Scheduled delivery", "Custom recipients", "Delivery tracking"],
  "export-options": ["PDF & Excel export", "Branded templates", "Cloud sync support"],
  "system-tray-integration": ["Silent background ops", "Quick-access controls", "Minimal footprint"],
  "global-keyboard-shortcuts": ["Custom key bindings", "Cross-app control", "Instant toggling"],
  "break-reminders": ["Wellness notifications", "Custom intervals", "Team-wide wellness"],
  "offline-support": ["Local data storage", "Auto cloud sync", "Zero data loss"],
  "auto-start": ["Boot-time launch", "Org-level config", "Consistent tracking"],
  "otp-authentication": ["10-min expiry codes", "Single-use tokens", "Email-based delivery"],
  "session-management": ["Single session enforcement", "Remote force logout", "Login audit trail"],
  "data-encryption": ["TLS 1.3 in transit", "AES-256 at rest", "Multi-layer protection"],
  "rate-limiting": ["Brute force defense", "Smart lockouts", "Suspicious activity alerts"],
  "screenshot-intervals": ["1-60 min frequency", "Quality optimization", "Sensitive content blur"],
  "idle-timeout-settings": ["1-30 min thresholds", "Auto-pause options", "Per-team configs"],
  "working-hours": ["Multi-timezone support", "Flexible schedules", "Overtime flagging"],
  "feature-toggles": ["Granular on/off control", "Per-team configs", "Gradual rollouts"],
};

const featureCapabilities: Record<string, string[]> = {
  "attendance-tracking": ["Location-verified", "Automated", "Real-time"],
  "time-tracking": ["Precise", "Multi-project", "Billable"],
  "productivity-tracking": ["Data-driven", "Goal-oriented", "Visual"],
  "break-management": ["Policy-based", "Wellness-first", "Automated"],
  "employee-monitoring": ["Live tracking", "Multi-site", "Cloud-based"],
  "activity-insights": ["Analytical", "Comparative", "Actionable"],
  "screenshot-monitoring": ["Configurable", "Secure", "Privacy-first"],
  "idle-time-detection": ["Intelligent", "Fair", "Adjustable"],
  "app-website-usage": ["Categorized", "Role-aware", "Detailed"],
  "ai-productivity-reports": ["AI-powered", "Scheduled", "Insightful"],
  "smart-activity-classification": ["Self-learning", "Automatic", "Accurate"],
  "role-based-analysis": ["Customizable", "Multi-role", "Scalable"],
  "personalized-recommendations": ["Personalized", "Measurable", "Adaptive"],
  "fake-activity-detection": ["Anomaly-aware", "Non-invasive", "Reliable"],
  "work-session-tracking": ["Timestamped", "Historical", "Transparent"],
  "idle-time-claims": ["Employee-driven", "Auditable", "Streamlined"],
  "approval-workflows": ["Configurable", "Efficient", "Trackable"],
  "activity-logs": ["Comprehensive", "Exportable", "Compliant"],
  "user-management": ["Centralized", "Automated", "Scalable"],
  "role-based-access": ["Granular", "Hierarchical", "Secure"],
  "team-assignment": ["Flexible", "Visual", "Persistent"],
  "multi-company-support": ["Isolated", "Unified", "Enterprise"],
  "dashboard-overview": ["Real-time", "Interactive", "Customizable"],
  "attendance-reports": ["Filterable", "Exportable", "Comprehensive"],
  "ai-summary-reports": ["Intelligent", "Automated", "Actionable"],
  "email-reports": ["Scheduled", "Targeted", "Reliable"],
  "export-options": ["Multi-format", "Branded", "Automated"],
  "system-tray-integration": ["Lightweight", "Accessible", "Background"],
  "global-keyboard-shortcuts": ["Customizable", "Global", "Instant"],
  "break-reminders": ["Configurable", "Wellness", "Non-intrusive"],
  "offline-support": ["Resilient", "Syncing", "Seamless"],
  "auto-start": ["Automated", "Consistent", "Configurable"],
  "otp-authentication": ["Secure", "Time-limited", "Verified"],
  "session-management": ["Controlled", "Audited", "Enforceable"],
  "data-encryption": ["Enterprise-grade", "Multi-layer", "Compliant"],
  "rate-limiting": ["Protective", "Intelligent", "Adaptive"],
  "screenshot-intervals": ["Adjustable", "Optimized", "Privacy-safe"],
  "idle-timeout-settings": ["Flexible", "Team-specific", "Smart"],
  "working-hours": ["Multi-zone", "Flexible", "Policy-driven"],
  "feature-toggles": ["Granular", "Instant", "Per-team"],
};

export default function ProductPageClient({ slug }: ProductPageClientProps) {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [freeTrialOpen, setFreeTrialOpen] = useState(false);

  const category = getCategoryById(slug);
  const [activeSection, setActiveSection] = useState<string>("");

  // Preserve sidebar scroll position
  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem("productSidebarScroll");
    if (savedScrollPos && sidebarRef.current) {
      sidebarRef.current.scrollTop = parseInt(savedScrollPos, 10);
    }
    return () => {
      if (sidebarRef.current) {
        sessionStorage.setItem(
          "productSidebarScroll",
          sidebarRef.current.scrollTop.toString()
        );
      }
    };
  }, []);

  const handleSidebarScroll = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem(
        "productSidebarScroll",
        sidebarRef.current.scrollTop.toString()
      );
    }
  };

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  // Find current category index for prev/next navigation
  const currentIndex = productCategories.findIndex((c) => c.id === slug);
  const prevCategory = currentIndex > 0 ? productCategories[currentIndex - 1] : null;
  const nextCategory =
    currentIndex < productCategories.length - 1
      ? productCategories[currentIndex + 1]
      : null;

  // Track active section using Intersection Observer
  useEffect(() => {
    if (category.features.length > 0) {
      setActiveSection(category.features[0].id);
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: [0, 0.5, 1],
    });

    category.features.forEach((feature) => {
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
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
    setMobileNavOpen(false);
  };

  // Close mobile nav on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-950 to-gray-900 text-white">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-400/5 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 no-underline text-gray-400">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link href="/product" className="hover:text-white transition-colors no-underline text-gray-400">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-cyan-400 font-medium">{category.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 backdrop-blur-sm border border-cyan-400/20 mb-6">
                <Icon className="w-4 h-4 text-cyan-300" />
                <span className="text-sm font-medium text-cyan-200">
                  {category.features.length} Powerful Features
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                  {category.title}
                </span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => setFreeTrialOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border-0"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => router.push("/contact")}
                  variant="outline"
                  className="bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-6 text-base font-semibold transition-all duration-300"
                >
                  Book a Demo
                </Button>
              </div>
            </div>

            {/* Right: Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {category.features.length}
                </div>
                <div className="text-sm text-gray-400">Core Features</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile Navigation Toggle ─── */}
      <div className="lg:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-cyan-600" />
            <span className="font-semibold text-gray-900 text-sm">
              {category.title}
            </span>
          </div>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
            <span>{mobileNavOpen ? "Close" : "Navigate"}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                mobileNavOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <div className="bg-white border-t border-gray-100 shadow-xl max-h-[60vh] overflow-y-auto">
            <div className="px-4 py-3">
              {/* Product categories */}
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Products
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {productCategories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = cat.id === slug;
                  return (
                    <Link
                      key={cat.id}
                      href={`/product/${cat.id}`}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm no-underline transition-all ${
                        isActive
                          ? "bg-cyan-500 text-white font-medium"
                          : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <CatIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                      <span className="truncate">{cat.title}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Feature sections */}
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Jump to Feature
              </h4>
              <div className="space-y-1">
                {category.features.map((feature) => {
                  const isActive = activeSection === feature.id;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => scrollToSection(feature.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-cyan-50 text-cyan-700 font-medium border-l-3 border-cyan-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {feature.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8 lg:gap-10">
          {/* ─── Left Sidebar ─── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div
              ref={sidebarRef}
              onScroll={handleSidebarScroll}
              className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin pr-2"
            >
              {/* Product Categories */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group no-underline ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <CatIcon
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-cyan-500"
                          }`}
                        />
                        <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>
                          {cat.title}
                        </span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto text-white/70" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Feature Navigation */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
                  {category.title} Features
                </h3>
                <nav className="space-y-0.5">
                  {category.features.map((feature, index) => {
                    const isActive = activeSection === feature.id;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => scrollToSection(feature.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                          isActive
                            ? "bg-cyan-50 text-cyan-700 font-medium"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                            isActive
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-sm">{feature.title}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Actions in Sidebar */}
              <div className="mt-8 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Need help choosing?
                </p>
                <p className="text-xs text-gray-600 mb-3">
                  Talk to our product experts for guidance.
                </p>
                <Button
                  size="sm"
                  onClick={() => router.push("/contact")}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <main className="flex-1 min-w-0">
            {/* Features List */}
            <div className="space-y-6">
              {category.features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                const benefits = featureBenefitsMap[feature.id] || [
                  "Boost productivity",
                  "Save time & costs",
                  "Real-time insights",
                ];
                const capabilities = featureCapabilities[feature.id] || [
                  "Automated",
                  "Real-time",
                  "Scalable",
                ];

                return (
                  <section
                    key={feature.id}
                    id={feature.id}
                    className="scroll-mt-28"
                  >
                    <div className="group relative bg-white border border-gray-200/80 rounded-2xl hover:border-cyan-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Top accent gradient */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Card Content */}
                      <div className="p-6 sm:p-8">
                        {/* Header */}
                        <div className="flex items-start gap-4 sm:gap-5 mb-6">
                          {/* Feature number badge */}
                          <div className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-cyan-50 group-hover:text-cyan-500 transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 group-hover:scale-105 transition-all duration-300">
                              <FeatureIcon className="w-7 h-7 text-white" />
                            </div>
                          </div>

                          {/* Title and Description */}
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors duration-300">
                              {feature.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                              {feature.description}
                            </p>
                          </div>
                        </div>

                        {/* Feature Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                          {/* Benefits */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                                Key Benefits
                              </h3>
                            </div>
                            {benefits.map((benefit, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2.5 text-sm text-gray-600"
                              >
                                <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>

                          {/* Capabilities */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                                Capabilities
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {capabilities.map((cap, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 border border-cyan-100 rounded-lg text-xs font-medium text-cyan-700 hover:bg-cyan-100 transition-colors duration-200"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Integration */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                                Integration
                              </h3>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Globe className="w-4 h-4 text-cyan-500" />
                                <span>REST API Access</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Sparkles className="w-4 h-4 text-cyan-500" />
                                <span>Third-party Tools</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <BarChart3 className="w-4 h-4 text-cyan-500" />
                                <span>Custom Webhooks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            {/* ─── Prev/Next Navigation ─── */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevCategory ? (
                <Link
                  href={`/product/${prevCategory.id}`}
                  className="group flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-cyan-300 hover:shadow-lg transition-all duration-300 no-underline"
                >
                  <ArrowRight className="w-5 h-5 text-gray-400 rotate-180 group-hover:text-cyan-500 group-hover:-translate-x-1 transition-all" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Previous
                    </p>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                      {prevCategory.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextCategory && (
                <Link
                  href={`/product/${nextCategory.id}`}
                  className="group flex items-center justify-end gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-cyan-300 hover:shadow-lg transition-all duration-300 no-underline text-right"
                >
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Next
                    </p>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                      {nextCategory.title}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                </Link>
              )}
            </div>

            {/* ─── CTA Section ─── */}
            <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-950 to-gray-900 rounded-2xl p-8 sm:p-10 text-white shadow-2xl">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl" />

              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-400/20 mb-6">
                  <Users className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-medium text-cyan-200">
                    Join 500+ Companies
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Ready to Transform Your{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {category.title}
                  </span>
                  ?
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of companies using Track Nexus to boost
                  productivity and streamline operations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setFreeTrialOpen(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border-0"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => router.push("/contact")}
                    variant="outline"
                    className="border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ─── FAQ Section ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection
          faqs={category.faqs}
          title={`${category.title} FAQ`}
          subtitle={`Common questions about ${category.title}`}
          showImage={false}
        />
      </div>

      {/* Free Trial Popup */}
      <ContactPopup
        isOpen={freeTrialOpen}
        onClose={() => setFreeTrialOpen(false)}
        context={{ type: "free-trial" }}
      />
    </div>
  );
}
