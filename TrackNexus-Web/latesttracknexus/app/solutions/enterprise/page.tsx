"use client"

import ProductPageLayout from "@/components/product-page-layout"
import { Building2, Shield, Users, Database, Lock, TrendingUp } from "lucide-react"

const features = [
  {
    title: "Enterprise-Grade Security",
    description: "Track Nexus provides bank-level security with end-to-end encryption, SOC 2 compliance, and advanced access controls. Protect sensitive workforce data with enterprise SSO, role-based permissions, and comprehensive audit logs that meet the strictest security requirements.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Scalable Architecture",
    description: "Built to handle thousands of employees across multiple departments and locations. Track Nexus scales effortlessly with your organization, maintaining performance and reliability even as your workforce grows. Support unlimited users, teams, and projects without compromise.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Advanced Analytics & Reporting",
    description: "Enterprise-level business intelligence with customizable dashboards, automated reports, and predictive analytics. Gain deep insights into workforce productivity, resource allocation, and operational efficiency. Export data to your existing BI tools for comprehensive analysis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Dedicated Support & Training",
    description: "24/7 priority support with dedicated account managers and technical specialists. Comprehensive onboarding, training programs, and ongoing consultation ensure successful deployment and adoption across your entire organization.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
  },
]

const benefits = [
  {
    icon: Building2,
    title: "Multi-Department Support",
    description: "Manage complex organizational structures with ease.",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Enterprise-grade encryption and compliance standards.",
  },
  {
    icon: Database,
    title: "Unlimited Scalability",
    description: "Support for thousands of users and unlimited data.",
  },
  {
    icon: Users,
    title: "Team Hierarchies",
    description: "Complex reporting structures and role-based access.",
  },
  {
    icon: Lock,
    title: "SSO Integration",
    description: "Single sign-on with your existing identity provider.",
  },
  {
    icon: TrendingUp,
    title: "Custom Analytics",
    description: "Tailored dashboards and reports for your needs.",
  },
]

const stats = [
  { value: "10,000+", label: "Users Supported" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "SOC 2", label: "Certified" },
  { value: "24/7", label: "Priority Support" },
]

const faqs = [
  {
    question: "What makes Track Nexus suitable for enterprises?",
    answer: "Track Nexus offers enterprise-grade security, unlimited scalability, advanced analytics, SSO integration, and dedicated support. It's designed to handle complex organizational structures with thousands of users while maintaining performance and reliability.",
  },
  {
    question: "What security certifications do you have?",
    answer: "Track Nexus is SOC 2 Type II certified, GDPR compliant, and follows industry-standard security practices including end-to-end encryption, regular security audits, and penetration testing. We provide detailed security documentation for your review.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Yes, Track Nexus offers comprehensive API access, pre-built integrations with major enterprise tools (Slack, Microsoft Teams, JIRA, etc.), and SSO support for identity providers like Okta, Azure AD, and OneLogin.",
  },
  {
    question: "What kind of support do enterprise clients receive?",
    answer: "Enterprise clients receive 24/7 priority support, dedicated account managers, technical specialists, comprehensive onboarding, custom training programs, and regular business reviews to ensure optimal performance and ROI.",
  },
]

export default function EnterprisePage() {
  return (
    <ProductPageLayout
      badge="Enterprise"
      title="Scale with"
      titleHighlight="Enterprise Solutions"
      subtitle="Comprehensive workforce management for large organizations. Enterprise-grade security, unlimited scalability, and dedicated support for teams of any size."
      heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      floatingIcons={[Building2, Shield, Database, Users]}
      features={features}
      benefitsTitle="Built for Enterprises"
      benefitsSubtitle="Everything large organizations need to succeed"
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      ctaTitle="Ready for enterprise-grade workforce management?"
      ctaSubtitle="Contact our enterprise team for a custom demo and pricing."
    />
  )
}
