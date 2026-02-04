import { Metadata } from "next";
import { HeroSectionClient } from "@/components/hero-section-client";
import { AIPoweredAnalyticsSection } from "@/components/premium-home-sections";
import { FeatureShowcaseSection } from "@/components/premium-home-sections";
import { MultiPlatformSection } from "@/components/premium-home-sections";
import { SecuritySection } from "@/components/premium-home-sections";
import { InteractiveStatsSection } from "@/components/premium-home-sections";
import { FinalCTASection } from "@/components/premium-home-sections";
import { PremiumFAQSection } from "@/components/premium-faq-section";
import { PremiumTestimonialsSection } from "@/components/premium-testimonials-section";

// Enhanced metadata for home page
export const metadata: Metadata = {
  title: "Track Nexus – AI-Powered Time Tracking Software for Modern Teams",
  description: "Track work hours effortlessly and boost team productivity with AI-powered insights. Perfect for remote, hybrid, and in-office teams.",
  alternates: {
    canonical: "https://tracknexus.com",
  },
};

// Generate structured data for the page
function generateStructuredData() {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Track Nexus - AI-Powered Time Tracking Platform",
    "description": "Discover how Track Nexus connects success through intelligent time tracking and productivity management",
    "thumbnailUrl": "https://tracknexus.com/images/hero-poster.jpg",
    "uploadDate": "2025-01-15T00:00:00Z",
    "contentUrl": "https://tracknexus.com/videos/14840858_3840_2160_30fps (1).mp4",
    "embedUrl": "https://tracknexus.com",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Track Nexus used for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track Nexus is a comprehensive time tracking and productivity management platform designed to help businesses monitor employee performance, manage work hours, and gain real-time insights into team activities. It helps improve efficiency, reduce time wastage, and boost overall productivity with AI-powered analytics."
        }
      },
      {
        "@type": "Question",
        "name": "How does Track Nexus track employee time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track Nexus automatically records employee work hours through its desktop, mobile, or web application. It tracks active and idle time, login and logout hours, and app/website usage. The platform provides managers with a clear, real-time view of how time is spent during the workday, with detailed breakdowns and visual reports."
        }
      },
      {
        "@type": "Question",
        "name": "Can Track Nexus be used for remote teams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Track Nexus is designed for remote, hybrid, and in-office teams. It provides real-time visibility into employee performance regardless of location, with features like GPS tracking, geofencing, and cloud sync that help organizations effectively manage distributed teams across multiple time zones."
        }
      },
      {
        "@type": "Question",
        "name": "Is employee data secure with Track Nexus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Security is our top priority. Track Nexus uses 256-bit AES encryption, SOC 2 Type II certification, and GDPR-compliant data handling. All data is stored on secure servers with multi-factor authentication, role-based access controls, and regular security audits to protect sensitive information."
        }
      }
    ]
  };

  return { videoSchema, faqSchema };
}

export default function HomePage() {
  const { videoSchema, faqSchema } = generateStructuredData();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section - Client Component for Interactivity */}
        <HeroSectionClient />

        {/* AI-Powered Analytics Section */}
        <AIPoweredAnalyticsSection />

        {/* Premium Feature Showcase */}
        <FeatureShowcaseSection />

        {/* Interactive Stats */}
        <InteractiveStatsSection />

        {/* Multi-Platform Section */}
        <MultiPlatformSection />

        {/* Security Section */}
        <SecuritySection />

        {/* Premium Testimonials & Trust Section */}
        <PremiumTestimonialsSection />

        {/* Premium Final CTA with Video Background */}
        <FinalCTASection />

        {/* Premium FAQ Section */}
        <PremiumFAQSection />
      </div>
    </>
  );
}
