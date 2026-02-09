// Help Center Data - Mock data for FAQs, articles, videos, and more

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

export interface Article {
  id: number
  title: string
  category: string
  readTime: number
  date: string
  views: number
  excerpt: string
  featured: boolean
}

export interface TrendingTopic {
  id: number
  title: string
  views: number
  category: string
}

export interface VideoTutorial {
  id: number
  title: string
  duration: string
  category: string
  thumbnail: string
  youtubeId: string
  description: string
}

export interface QuickLink {
  id: number
  title: string
  description: string
  icon: string
  href: string
  category: string
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I get started with TrackNexus?",
    answer:
      "Getting started with TrackNexus is simple! Sign up for an account, create your first project, and invite your team members. We provide guided setup steps to help you configure time tracking preferences, set up automated rules, and customize your workspace to match your workflow.",
    category: "Getting Started",
  },
  {
    id: 2,
    question: "What is the difference between manual and automated time tracking?",
    answer:
      "Manual time tracking requires team members to explicitly start and stop timers for their tasks. Automated time tracking uses activity monitoring to detect when users are working and can start/stop tracking based on configured rules. Most teams use a combination of both for accurate billing and insights.",
    category: "Time Tracking",
  },
  {
    id: 3,
    question: "Can I integrate TrackNexus with my existing tools?",
    answer:
      "Yes! TrackNexus integrates with popular tools including Slack, Microsoft Teams, Jira, GitHub, Asana, Monday.com, and more. Visit our Integrations section to see all available integrations and set up the ones you need.",
    category: "Integrations",
  },
  {
    id: 4,
    question: "How is my data secured and backed up?",
    answer:
      "We take security seriously. All data is encrypted in transit using TLS/SSL and at rest using AES-256 encryption. We perform daily automated backups, conduct regular security audits, and comply with GDPR, CCPA, and ISO 27001 standards.",
    category: "Security & Privacy",
  },
  {
    id: 5,
    question: "What analytics and reports are available?",
    answer:
      "TrackNexus provides comprehensive analytics including time tracking reports, productivity metrics, billable hours analysis, team performance dashboards, and custom report builder. You can export reports in PDF, CSV, or Excel formats.",
    category: "Analytics & Reports",
  },
  {
    id: 6,
    question: "How do I manage team members and permissions?",
    answer:
      "You can invite team members via email and assign roles (Admin, Manager, Team Member). Each role has specific permissions for viewing reports, editing projects, managing users, and accessing billing information. You can also create custom permission sets.",
    category: "Getting Started",
  },
  {
    id: 7,
    question: "Can I track time on mobile devices?",
    answer:
      "Yes! TrackNexus has native iOS and Android apps that support full time tracking functionality. The mobile apps work offline and sync data when internet connection is available.",
    category: "Time Tracking",
  },
  {
    id: 8,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and wire transfers for annual plans. Billing is automated monthly or yearly based on your subscription plan.",
    category: "Billing & Plans",
  },
]

export const recentArticles: Article[] = [
  {
    id: 1,
    title: "Setting Up Automated Time Tracking for Your Team",
    category: "Time Tracking",
    readTime: 8,
    date: "2024-02-05",
    views: 2543,
    excerpt: "Learn how to configure automated time tracking rules to capture work time automatically without manual intervention.",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Productivity Metrics and What They Mean",
    category: "Analytics & Reports",
    readTime: 6,
    date: "2024-02-03",
    views: 1892,
    excerpt: "Deep dive into key productivity metrics and how to interpret them to improve team performance.",
    featured: true,
  },
  {
    id: 3,
    title: "Integrating Slack Notifications for Project Updates",
    category: "Integrations",
    readTime: 5,
    date: "2024-02-01",
    views: 1654,
    excerpt: "Set up real-time Slack notifications to keep your team informed about project progress and milestones.",
    featured: false,
  },
  {
    id: 4,
    title: "Best Practices for Data Security and Compliance",
    category: "Security & Privacy",
    readTime: 10,
    date: "2024-01-30",
    views: 1423,
    excerpt: "Essential security practices and compliance checklist to protect your team's data and meet regulatory requirements.",
    featured: false,
  },
  {
    id: 5,
    title: "Creating Custom Reports for Billing and Invoicing",
    category: "Analytics & Reports",
    readTime: 7,
    date: "2024-01-28",
    views: 1256,
    excerpt: "Build powerful custom reports to automate billing, invoicing, and financial tracking for your projects.",
    featured: false,
  },
  {
    id: 6,
    title: "Managing Multiple Projects and Teams",
    category: "Getting Started",
    readTime: 6,
    date: "2024-01-25",
    views: 987,
    excerpt: "Organize and manage multiple projects across different teams with workspace hierarchies and permission sets.",
    featured: false,
  },
  {
    id: 7,
    title: "Understanding TrackNexus Pricing Plans",
    category: "Billing & Plans",
    readTime: 5,
    date: "2024-02-07",
    views: 2134,
    excerpt: "Compare our pricing tiers and find the perfect plan for your team size and feature requirements.",
    featured: true,
  },
  {
    id: 8,
    title: "How to Upgrade or Downgrade Your Subscription",
    category: "Billing & Plans",
    readTime: 4,
    date: "2024-02-04",
    views: 1567,
    excerpt: "Step-by-step guide to changing your subscription plan, including prorated billing and feature changes.",
    featured: false,
  },
  {
    id: 9,
    title: "Managing Payment Methods and Invoices",
    category: "Billing & Plans",
    readTime: 6,
    date: "2024-01-29",
    views: 1345,
    excerpt: "Learn how to add payment methods, update billing information, and access your invoice history.",
    featured: false,
  },
  {
    id: 10,
    title: "Manual Time Tracking vs Automated: Which is Right for You?",
    category: "Time Tracking",
    readTime: 7,
    date: "2024-01-27",
    views: 1789,
    excerpt: "Compare manual and automated time tracking approaches to determine the best fit for your workflow.",
    featured: false,
  },
  {
    id: 11,
    title: "Setting Up Two-Factor Authentication",
    category: "Security & Privacy",
    readTime: 4,
    date: "2024-01-24",
    views: 1123,
    excerpt: "Enhance your account security with two-factor authentication using authenticator apps or SMS.",
    featured: false,
  },
  {
    id: 12,
    title: "Connecting Jira and GitHub to TrackNexus",
    category: "Integrations",
    readTime: 8,
    date: "2024-01-22",
    views: 1456,
    excerpt: "Sync your development workflow by integrating Jira issue tracking and GitHub repositories with TrackNexus.",
    featured: false,
  },
]

export const trendingTopics: TrendingTopic[] = [
  { id: 1, title: "Setting Up Automated Tracking", views: 3421, category: "Time Tracking" },
  { id: 2, title: "Generating Productivity Reports", views: 2893, category: "Analytics & Reports" },
  { id: 3, title: "Team Permission Management", views: 2156, category: "Getting Started" },
  { id: 4, title: "Data Encryption and Backup", views: 1842, category: "Security & Privacy" },
  { id: 5, title: "Slack Integration Guide", views: 1723, category: "Integrations" },
]

export const videoTutorials: VideoTutorial[] = [
  {
    id: 1,
    title: "Getting Started with TrackNexus - Complete Setup Guide",
    duration: "12:45",
    category: "Getting Started",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    youtubeId: "aqz-KE-bpKQ",
    description: "Learn how to set up TrackNexus from scratch, invite team members, and configure your first project.",
  },
  {
    id: 2,
    title: "Time Tracking Best Practices",
    duration: "8:30",
    category: "Time Tracking",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    youtubeId: "9bZkp7q19f0",
    description: "Discover best practices for accurate time tracking and how to get the most out of automated features.",
  },
  {
    id: 3,
    title: "Creating Powerful Analytics and Reports",
    duration: "15:20",
    category: "Analytics & Reports",
    thumbnail: "https://img.youtube.com/vi/6stlCkUDG_s/maxresdefault.jpg",
    youtubeId: "6stlCkUDG_s",
    description: "Master advanced reporting features to generate custom reports for billing, invoicing, and team analysis.",
  },
  {
    id: 4,
    title: "Slack and Microsoft Teams Integration",
    duration: "10:15",
    category: "Integrations",
    thumbnail: "https://img.youtube.com/vi/0fONene3OIA/maxresdefault.jpg",
    youtubeId: "0fONene3OIA",
    description: "Seamlessly integrate TrackNexus with your communication tools for real-time notifications and updates.",
  },
  {
    id: 5,
    title: "Security and Data Protection Overview",
    duration: "9:50",
    category: "Security & Privacy",
    thumbnail: "https://img.youtube.com/vi/hxGOiiR9ZKg/maxresdefault.jpg",
    youtubeId: "hxGOiiR9ZKg",
    description: "Understand our security measures, encryption, compliance standards, and how your data is protected.",
  },
  {
    id: 6,
    title: "Billing Plans and Subscription Management",
    duration: "7:40",
    category: "Billing & Plans",
    thumbnail: "https://img.youtube.com/vi/kCVpDhjgAAA/maxresdefault.jpg",
    youtubeId: "kCVpDhjgAAA",
    description: "Learn about our pricing plans, subscription management, invoicing, and how to scale your workspace.",
  },
]

export const quickLinks: QuickLink[] = [
  {
    id: 1,
    title: "Setup Your Account",
    description: "Complete your profile and configure workspace settings",
    icon: "Users",
    href: "/resources/help-center/category/getting-started",
    category: "Getting Started",
  },
  {
    id: 2,
    title: "Start Time Tracking",
    description: "Learn to track time for tasks and projects",
    icon: "Clock",
    href: "/resources/help-center/category/time-tracking",
    category: "Time Tracking",
  },
  {
    id: 3,
    title: "Generate Reports",
    description: "Create and customize analytics reports",
    icon: "BarChart3",
    href: "/resources/help-center/category/analytics-reports",
    category: "Analytics & Reports",
  },
  {
    id: 4,
    title: "Connect Tools",
    description: "Integrate with your favorite applications",
    icon: "Zap",
    href: "/resources/help-center/category/integrations",
    category: "Integrations",
  },
  {
    id: 5,
    title: "Secure Your Data",
    description: "Understand our security and compliance",
    icon: "Shield",
    href: "/resources/help-center/category/security-privacy",
    category: "Security & Privacy",
  },
  {
    id: 6,
    title: "Manage Billing",
    description: "View plans, invoices, and payment methods",
    icon: "CreditCard",
    href: "/resources/help-center/category/billing-plans",
    category: "Billing & Plans",
  },
]

export const categoryDetails: Record<
  string,
  { name: string; description: string; icon: string }
> = {
  "getting-started": {
    name: "Getting Started",
    description: "Quick start guides and setup tutorials to get you up and running",
    icon: "Book",
  },
  "time-tracking": {
    name: "Time Tracking",
    description: "Learn how to track time effectively across your team",
    icon: "Clock",
  },
  "analytics-reports": {
    name: "Analytics & Reports",
    description: "Generate insights and create custom reports",
    icon: "BarChart3",
  },
  integrations: {
    name: "Integrations",
    description: "Connect with your favorite tools and platforms",
    icon: "Zap",
  },
  "security-privacy": {
    name: "Security & Privacy",
    description: "Data protection, compliance, and security information",
    icon: "Shield",
  },
  "billing-plans": {
    name: "Billing & Plans",
    description: "Subscription management and payment information",
    icon: "CreditCard",
  },
}

// Get articles by category
export const getArticlesByCategory = (category: string): Article[] => {
  const categoryMap: Record<string, string> = {
    "getting-started": "Getting Started",
    "time-tracking": "Time Tracking",
    "analytics-reports": "Analytics & Reports",
    integrations: "Integrations",
    "security-privacy": "Security & Privacy",
    "billing-plans": "Billing & Plans",
  }
  return recentArticles.filter((article) => article.category === categoryMap[category])
}

// Search articles
export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase()
  return recentArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery)
  )
}

// Get all categories for sidebar
export const getAllCategories = () => {
  return Object.keys(categoryDetails).map((key) => ({
    slug: key,
    ...categoryDetails[key],
  }))
}
