// JSON-LD Schema Markup for SEO
// https://schema.org

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Track Nexus",
  "url": "https://tracknexus.com",
  "logo": "https://tracknexus.com/logo.png",
  "description": "AI-powered time tracking and employee productivity software for modern teams.",
  "sameAs": [
    "https://www.instagram.com/tracknexus.in/",
    "https://www.youtube.com/@TrackNexusOfficial",
    "https://www.linkedin.com/company/tracknexus",
    "https://www.facebook.com/tracknexus.in",
    "https://x.com/tracknexusappit"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@tracknexus.com",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  }
}

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Track Nexus",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Windows, macOS, Web, iOS, Android",
  "description": "AI-powered time tracking software with employee monitoring, productivity analytics, and workforce management features.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "15",
    "priceCurrency": "USD",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Automatic Time Tracking",
    "Employee Monitoring",
    "Productivity Analytics",
    "Screenshot Capture",
    "GPS Location Tracking",
    "Facial Recognition Attendance",
    "Keystroke Monitoring",
    "App & Website Tracking",
    "Project Management",
    "HR Management"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Track Nexus",
  "url": "https://tracknexus.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://tracknexus.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

// Helper function to generate FAQ schema
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Helper function to generate breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

// Helper function to generate product schema for pricing
export function generateProductSchema(product: {
  name: string
  description: string
  price: string
  priceCurrency?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Track Nexus"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.priceCurrency || "USD",
      "availability": "https://schema.org/InStock"
    }
  }
}

// Helper to render schema as script tag content
export function schemaToString(schema: object): string {
  return JSON.stringify(schema)
}
