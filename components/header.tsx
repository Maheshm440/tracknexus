"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, User, ChevronDown, X, Clock, Settings, LogOut, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { LogoWithoutDropdown } from "@/components/logo";
import { useState, useEffect, useMemo } from "react";
import { productCategories } from "@/components/products/ProductsData";

export function Header() {
  const currentPathname = usePathname();
  const pathname = currentPathname || "";
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check authentication status on mount and when pathname changes
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userDataStr = localStorage.getItem('tracknexus_user');
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          setIsSignedIn(true);
          setSignInEmail(userData.email || "");
          setUserName(userData.name || "");
          setUserRole(userData.role || "");
        } else {
          setIsSignedIn(false);
          setSignInEmail("");
          setUserName("");
          setUserRole("");
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsSignedIn(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener('storage', checkAuthStatus);
    // Listen for custom auth-change event (login/logout from same tab)
    window.addEventListener('auth-change', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('auth-change', checkAuthStatus);
    };
  }, [pathname]);

  const notifications = [
    {
      id: 1,
      title: "New Feature Released",
      message: "Check out our new AI-powered analytics dashboard",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Team Invited You",
      message: "You've been invited to join the Sales team",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Report Ready",
      message: "Your weekly productivity report is ready to view",
      time: "1 day ago",
      unread: false,
    },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");
    setSignInSuccess("");
    setIsSignInLoading(true);

    // Validation
    if (!signInEmail.trim()) {
      setSignInError("Email is required");
      setIsSignInLoading(false);
      return;
    }

    try {
      // First, logout any existing session
      await fetch('/api/auth/logout', { method: 'POST' });

      // Call actual login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signInEmail.toLowerCase(),
          password: signInPassword || undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store dashboard data in localStorage
        // Only update if API returns actual data, don't overwrite with empty arrays
        if (data.dashboardData) {
          if (data.dashboardData.users && data.dashboardData.users.length > 0) {
            localStorage.setItem('tracknexus_users', JSON.stringify(data.dashboardData.users));
          }
          if (data.dashboardData.leads && data.dashboardData.leads.length > 0) {
            localStorage.setItem('tracknexus_leads', JSON.stringify(data.dashboardData.leads));
          }
          if (data.dashboardData.visitors && data.dashboardData.visitors.length > 0) {
            localStorage.setItem('visitor_tracking', JSON.stringify(data.dashboardData.visitors));
          }
          if (data.dashboardData.activities && data.dashboardData.activities.length > 0) {
            localStorage.setItem('tracknexus_activities', JSON.stringify(data.dashboardData.activities));
          }
        }
        localStorage.setItem('tracknexus_user', JSON.stringify(data.user));

        // Dispatch custom event to notify about auth change
        window.dispatchEvent(new Event('auth-change'));

        // Redirect based on role - admin to dashboard, users to homepage
        const isAdmin = data.user?.role === 'admin';
        const targetUrl = isAdmin ? '/dashboard' : '/';
        const message = isAdmin ? 'Admin login successful!' : 'Sign in successful!';

        setSignInSuccess(message);
        setIsSignedIn(true);
        setUserName(data.user?.name || "");
        setSignInPassword("");

        setTimeout(() => {
          setIsSignInOpen(false);
          setIsUserMenuOpen(false);
          router.push(targetUrl);
        }, 500);
      } else {
        const data = await response.json();
        setSignInError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setSignInError("An error occurred. Please try again.");
    } finally {
      setIsSignInLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Call actual logout API
      await fetch('/api/auth/logout', { method: 'POST' });

      // Clear localStorage
      localStorage.removeItem('tracknexus_user');
      localStorage.removeItem('tracknexus_users');
      localStorage.removeItem('tracknexus_leads');
      localStorage.removeItem('visitor_tracking');
      localStorage.removeItem('tracknexus_activities');

      // Dispatch custom event to notify about auth change
      window.dispatchEvent(new Event('auth-change'));

      setIsSignedIn(false);
      setSignInEmail("");
      setUserName("");
      setIsUserMenuOpen(false);

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // All searchable pages/sections
  const allPages = useMemo(() => [
    // Main pages
    { type: 'page' as const, title: 'Pricing', description: 'View our flexible pricing plans and find the perfect fit for your team', link: '/pricing', keywords: ['pricing', 'plans', 'cost', 'subscription', 'payment'] },
    { type: 'page' as const, title: 'Contact Us', description: 'Get in touch with our team for support or inquiries', link: '/contact', keywords: ['contact', 'support', 'help', 'email', 'reach'] },

    // About Us sections
    { type: 'page' as const, title: 'About Us', description: 'Learn about our company, mission, and vision', link: '/about', keywords: ['about', 'company', 'mission', 'vision', 'who we are'] },
    { type: 'page' as const, title: 'Our Team', description: 'Meet the experts behind Track Nexus', link: '/about/team', keywords: ['team', 'people', 'staff', 'employees', 'leadership'] },
    { type: 'page' as const, title: 'Our Values', description: 'The principles that guide everything we do', link: '/about/values', keywords: ['values', 'culture', 'principles', 'ethics', 'integrity'] },
    { type: 'page' as const, title: 'Careers', description: 'Join our team and make an impact', link: '/about/careers', keywords: ['careers', 'jobs', 'hiring', 'opportunities', 'work with us'] },

    // Solutions
    { type: 'page' as const, title: 'Remote Teams', description: 'Solutions for distributed workforce management', link: '/solutions/remote-teams', keywords: ['remote', 'distributed', 'work from home', 'virtual teams'] },
    { type: 'page' as const, title: 'Hybrid Workforce', description: 'Flexible work models for modern teams', link: '/solutions/hybrid-workforce', keywords: ['hybrid', 'flexible', 'office', 'remote mix'] },
    { type: 'page' as const, title: 'Enterprise Solutions', description: 'Scalable solutions for large organizations', link: '/solutions/enterprise', keywords: ['enterprise', 'large', 'organization', 'corporation'] },
    { type: 'page' as const, title: 'Startups & SMBs', description: 'Perfect solutions for growing businesses', link: '/solutions/startups', keywords: ['startup', 'smb', 'small business', 'growing'] },

    // Resources
    { type: 'page' as const, title: 'Blog', description: 'Latest insights and industry trends', link: '/resources/blog', keywords: ['blog', 'articles', 'insights', 'news'] },
    { type: 'page' as const, title: 'Case Studies', description: 'Real success stories from our customers', link: '/resources/case-studies', keywords: ['case studies', 'success', 'stories', 'testimonials'] },
    { type: 'page' as const, title: 'Whitepapers', description: 'In-depth research and analysis', link: '/resources/whitepapers', keywords: ['whitepaper', 'research', 'analysis', 'report'] },
    { type: 'page' as const, title: 'Webinars', description: 'Live sessions and recorded presentations', link: '/resources/webinars', keywords: ['webinar', 'training', 'sessions', 'presentations'] },
    { type: 'page' as const, title: 'Help Center', description: 'Find answers and get support', link: '/resources/help-center', keywords: ['help', 'support', 'faq', 'documentation', 'guide'] },
  ], []);

  // Dynamic search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: Array<{
      type: 'product' | 'feature' | 'page';
      title: string;
      description: string;
      link: string;
      productTitle?: string;
    }> = [];

    // Search in all pages
    allPages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query) ||
        page.keywords.some(keyword => keyword.includes(query))
      ) {
        results.push({
          type: page.type,
          title: page.title,
          description: page.description,
          link: page.link,
        });
      }
    });

    // Search in product categories
    productCategories.forEach((product) => {
      // Search in product titles and descriptions
      if (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'product',
          title: product.title,
          description: product.description,
          link: `/product/${product.id}`,
        });
      }

      // Search in product features
      product.features.forEach((feature) => {
        if (
          feature.title.toLowerCase().includes(query) ||
          feature.description.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'feature',
            title: feature.title,
            description: feature.description,
            link: `/product/${product.id}#${feature.id}`,
            productTitle: product.title,
          });
        }
      });
    });

    return results.slice(0, 8); // Limit to 8 results
  }, [searchQuery, allPages]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deloitte-black px-6 py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={(e) => {
              if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // Force full page refresh when navigating to home from other pages
                e.preventDefault();
                window.location.href = '/';
              }
            }}
          >
            <LogoWithoutDropdown />
          </Link>
        </div>

        <MobileNav />

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {/* Products with dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center space-x-1 font-medium text-sm transition-colors py-2 ${
                isMounted && (pathname === "/product" || pathname.startsWith("/product"))
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>Product</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {/* Invisible bridge to prevent flickering */}
            <div className="absolute top-full left-0 h-2 w-full" />
            {/* Dropdown Menu - Deloitte Style with Left Panel */}
            <div className="absolute top-full left-0 pt-2 w-[480px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="flex">
                {/* Left Panel - Dark with menu items */}
                <div className="w-56 bg-gradient-to-br from-gray-900 to-gray-800 py-6">
                  <Link href="/product/productivity-monitoring" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all group/item opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '50ms' }}>
                    <span className="font-medium text-sm">Productivity Monitoring</span>
                    <span className="text-xs text-gray-400 mt-0.5">Track team performance</span>
                  </Link>
                  <Link href="/product/ai-powered-intelligence" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all group/item opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '100ms' }}>
                    <span className="font-medium text-sm">AI-Powered Intelligence</span>
                    <span className="text-xs text-gray-400 mt-0.5">Smart insights & analytics</span>
                  </Link>
                  <Link href="/product/workforce-analytics" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all group/item opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '150ms' }}>
                    <span className="font-medium text-sm">Workforce Analytics</span>
                    <span className="text-xs text-gray-400 mt-0.5">Data-driven decisions</span>
                  </Link>
                  <div className="border-t border-gray-700 my-3 mx-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ transitionDelay: '200ms' }}></div>
                  <Link href="/product" className="flex items-center px-6 py-3 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '250ms' }}>
                    View All Products →
                  </Link>
                </div>

                {/* Right Panel - Features highlight */}
                <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-gray-900 font-semibold text-base mb-3">Why Track Nexus?</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>Real-time productivity insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>AI-powered recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>Easy integration with tools</span>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* About Us with dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center space-x-1 font-medium text-sm transition-colors py-2 ${
                isMounted && (pathname === "/about" || pathname.startsWith("/about"))
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>About Us</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {/* Invisible bridge to prevent flickering */}
            <div className="absolute top-full left-0 h-2 w-full" />
            {/* Dropdown Menu - Deloitte Style */}
            <div className="absolute top-full left-0 pt-2 w-[440px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="flex">
                {/* Left Panel - Dark with menu items */}
                <div className="w-52 bg-gradient-to-br from-gray-900 to-gray-800 py-6">
                  <Link href="/about" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '50ms' }}>
                    <span className="font-medium text-sm">Overview</span>
                    <span className="text-xs text-gray-400 mt-0.5">Who we are</span>
                  </Link>
                  <Link href="/about/team" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '100ms' }}>
                    <span className="font-medium text-sm">Our Team</span>
                    <span className="text-xs text-gray-400 mt-0.5">Meet the experts</span>
                  </Link>
                  <Link href="/about/values" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '150ms' }}>
                    <span className="font-medium text-sm">Our Values</span>
                    <span className="text-xs text-gray-400 mt-0.5">What drives us</span>
                  </Link>
                  <Link href="/about/careers" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '200ms' }}>
                    <span className="font-medium text-sm">Careers</span>
                    <span className="text-xs text-gray-400 mt-0.5">Join our team</span>
                  </Link>
                  <div className="border-t border-gray-700 my-3 mx-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ transitionDelay: '250ms' }}></div>
                  <Link href="/contact" className="flex items-center px-6 py-3 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '300ms' }}>
                    Contact Us →
                  </Link>
                </div>

                {/* Right Panel - Info highlight */}
                <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-gray-900 font-semibold text-base mb-3">Our Mission</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Empowering teams with intelligent time tracking and productivity insights to drive real results.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Solutions with dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center space-x-1 font-medium text-sm transition-colors py-2 ${
                isMounted && (pathname === "/solutions" || pathname.startsWith("/solutions"))
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {/* Invisible bridge to prevent flickering */}
            <div className="absolute top-full left-0 h-2 w-full" />
            {/* Dropdown Menu - Deloitte Style */}
            <div className="absolute top-full left-0 pt-2 w-[460px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="flex">
                {/* Left Panel - Dark with menu items */}
                <div className="w-56 bg-gradient-to-br from-gray-900 to-gray-800 py-6">
                  <Link href="/solutions/remote-teams" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '50ms' }}>
                    <span className="font-medium text-sm">Remote Teams</span>
                    <span className="text-xs text-gray-400 mt-0.5">Distributed workforce</span>
                  </Link>
                  <Link href="/solutions/hybrid-workforce" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '100ms' }}>
                    <span className="font-medium text-sm">Hybrid Workforce</span>
                    <span className="text-xs text-gray-400 mt-0.5">Flexible work models</span>
                  </Link>
                  <Link href="/solutions/enterprise" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '150ms' }}>
                    <span className="font-medium text-sm">Enterprise</span>
                    <span className="text-xs text-gray-400 mt-0.5">Large organizations</span>
                  </Link>
                  <Link href="/solutions/startups" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '200ms' }}>
                    <span className="font-medium text-sm">Startups & SMBs</span>
                    <span className="text-xs text-gray-400 mt-0.5">Growing businesses</span>
                  </Link>
                </div>

                {/* Right Panel - Info highlight */}
                <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-gray-900 font-semibold text-base mb-3">Tailored Solutions</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Solutions designed for your specific business needs and team size.
                  </p>
                  <Link href="/solutions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Explore all solutions →
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Resources with dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center space-x-1 font-medium text-sm transition-colors py-2 ${
                isMounted && (pathname === "/resources" || pathname.startsWith("/resources"))
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>Resources</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {/* Invisible bridge to prevent flickering */}
            <div className="absolute top-full left-0 h-2 w-full" />
            {/* Dropdown Menu - Deloitte Style */}
            <div className="absolute top-full left-0 pt-2 w-[460px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="flex">
                {/* Left Panel - Dark with menu items */}
                <div className="w-52 bg-gradient-to-br from-gray-900 to-gray-800 py-6">
                  <Link href="/resources/blog" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '50ms' }}>
                    <span className="font-medium text-sm">Blog</span>
                    <span className="text-xs text-gray-400 mt-0.5">Latest insights</span>
                  </Link>
                  <Link href="/resources/case-studies" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '100ms' }}>
                    <span className="font-medium text-sm">Case Studies</span>
                    <span className="text-xs text-gray-400 mt-0.5">Success stories</span>
                  </Link>
                  <Link href="/resources/whitepapers" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '150ms' }}>
                    <span className="font-medium text-sm">Whitepapers</span>
                    <span className="text-xs text-gray-400 mt-0.5">In-depth research</span>
                  </Link>
                  <Link href="/resources/webinars" className="flex flex-col px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '200ms' }}>
                    <span className="font-medium text-sm">Webinars</span>
                    <span className="text-xs text-gray-400 mt-0.5">Live sessions</span>
                  </Link>
                  <div className="border-t border-gray-700 my-3 mx-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ transitionDelay: '250ms' }}></div>
                  <Link href="/resources/help-center" className="flex items-center px-6 py-3 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" style={{ transitionDelay: '300ms' }}>
                    Help Center →
                  </Link>
                </div>

                {/* Right Panel - Info highlight */}
                <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-gray-900 font-semibold text-base mb-3">Learning Hub</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Access expert insights, guides, and resources to maximize your productivity.
                  </p>
                  <Link href="/resources" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Browse all resources →
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <Link
            href="/pricing"
            className={`font-medium text-sm transition-colors ${
              isMounted && pathname === "/pricing"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Pricing
          </Link>

          {/* Support */}
          <Link
            href="/support"
            className={`font-medium text-sm transition-colors ${
              isMounted && pathname === "/support"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Support
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Search Modal */}
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-2xl rounded-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search features, docs, articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 outline-none text-gray-900 text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 max-h-96 overflow-y-auto">
                  {searchQuery ? (
                    searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((result, index) => (
                          <div
                            key={index}
                            className="p-3 hover:bg-gray-50 rounded cursor-pointer transition-colors border border-transparent hover:border-deloitte-green/20"
                            onClick={() => {
                              router.push(result.link);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">{result.title}</div>
                                {result.productTitle && (
                                  <div className="text-xs text-deloitte-green mt-0.5">
                                    in {result.productTitle}
                                  </div>
                                )}
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {result.description}
                                </div>
                              </div>
                              <div className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                                result.type === 'product'
                                  ? 'bg-blue-100 text-blue-700'
                                  : result.type === 'feature'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {result.type === 'product' ? 'Product' : result.type === 'feature' ? 'Feature' : 'Page'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                        <p className="text-xs text-gray-400 mt-1">Try searching for products, features, or capabilities</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8">
                      <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Type to search for features and articles</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isSearchOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSearchOpen(false)}
              ></div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Panel */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-2xl rounded-lg z-50 max-h-[500px] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-lg">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer last:border-b-0 ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${notification.unread ? "bg-deloitte-green" : "bg-gray-300"}`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900">
                              {notification.title}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </div>
                            <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No notifications yet</p>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200 text-center sticky bottom-0 bg-white rounded-b-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsNotificationOpen(false);
                      }}
                      className="text-sm text-deloitte-green font-medium hover:text-deloitte-green-dark transition-colors"
                    >
                      View all notifications →
                    </button>
                  </div>
                )}
              </div>
            )}

            {isNotificationOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsNotificationOpen(false)}
              ></div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`transition-colors ${isMounted && isSignedIn ? "text-deloitte-green hover:text-deloitte-green-dark" : "text-gray-300 hover:text-white"}`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* User Dropdown - appears on click */}
            {isUserMenuOpen && isMounted && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl rounded-xl z-50 overflow-hidden border border-gray-100">
                {!isSignedIn ? (
                  <>
                    {/* Not Signed In State */}
                    <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Welcome!</span>
                      </div>
                      <Link
                        href="/login"
                        className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Sign In
                      </Link>
                    </div>

                    <div className="p-1.5">
                      <Link href="/pricing">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                          Pricing
                        </button>
                      </Link>
                      <Link href="/resources/help-center">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                          Help Center
                        </button>
                      </Link>
                      <Link href="/dashboard/settings">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-gray-400" />
                          Settings
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Signed In State */}
                    <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900">{userName || "Signed In"}</div>
                          <div className="text-[10px] text-gray-500 truncate max-w-[140px]">{signInEmail}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-1.5">
                      {/* Only show Dashboard link for admin users */}
                      {userRole === 'admin' && (
                        <Link href="/dashboard">
                          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                            Dashboard
                          </button>
                        </Link>
                      )}
                      <Link href="/dashboard/settings">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-gray-400" />
                          Settings
                        </button>
                      </Link>
                      <Link href="/resources/help-center">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                          Help Center
                        </button>
                      </Link>
                    </div>

                    <div className="p-1.5 border-t border-gray-100">
                      <button
                        onClick={() => {
                          handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm text-red-600 font-medium flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

{/* Sign In Modal - Redirect to MFA Login */}
            {isSignInOpen && (
              <>
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsSignInOpen(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[340px] mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2">Secure MFA Login</h2>
                      <p className="text-sm text-gray-500 mb-4">
                        Sign in using your authenticator app for secure access.
                      </p>
                      <Link
                        href="/login"
                        className="w-full h-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        onClick={() => setIsSignInOpen(false)}
                      >
                        Continue to Login
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isUserMenuOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsUserMenuOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
