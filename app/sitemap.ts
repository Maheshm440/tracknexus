import { MetadataRoute } from 'next'
import { productCategories } from '@/components/products/ProductsData'
import { getPostSlugs } from '@/lib/blog/utils'
import { getCompetitorSlugs } from '@/content/comparisons'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tracknexus.com'

  // Generate product category routes dynamically
  const productRoutes = productCategories.map(category => ({
    route: `/product/${category.id}`,
    priority: 0.8 as const,
    changeFreq: 'weekly' as const,
  }))

  // Generate blog post routes dynamically
  const blogSlugs = getPostSlugs()
  const blogRoutes = blogSlugs.map(slug => ({
    route: `/blog/${slug.replace('.mdx', '')}`,
    priority: 0.7 as const,
    changeFreq: 'monthly' as const,
  }))

  // Generate comparison page routes dynamically
  const competitorSlugs = getCompetitorSlugs()
  const comparisonRoutes = competitorSlugs.map(slug => ({
    route: `/compare/${slug}`,
    priority: 0.8 as const,
    changeFreq: 'monthly' as const,
  }))

  const routes = [
    // Core Pages
    { route: '', priority: 1.0, changeFreq: 'daily' as const },
    { route: '/pricing', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/product', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/services', priority: 0.8, changeFreq: 'monthly' as const },

    // Product Category Pages (SEO-optimized individual pages)
    ...productRoutes,

    // Time Tracking & Billing Features
    { route: '/time-tracking', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/time-billing', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/task-tracking', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/activity-logs', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/timeline-routes', priority: 0.7, changeFreq: 'weekly' as const },

    // Productivity & Analytics Features
    { route: '/employee-productivity', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/productivity-reports', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/insight-dashboards', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/usage-analytics', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/keystroke', priority: 0.7, changeFreq: 'weekly' as const },

    // Monitoring & Oversight Features
    { route: '/monitoring', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/audio-tracking', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/facial-recognition', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/moonlight-detection', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/apps-website', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/office-tv', priority: 0.7, changeFreq: 'weekly' as const },

    // HR & Administration Features
    { route: '/hr-management', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/leave-balance-reports', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/location-activity', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/project-management', priority: 0.8, changeFreq: 'weekly' as const },

    // Legal Pages
    { route: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terms-conditions', priority: 0.3, changeFreq: 'yearly' as const },

    // Blog Pages
    { route: '/blog', priority: 0.8, changeFreq: 'weekly' as const },
    ...blogRoutes,

    // Comparison Pages
    { route: '/compare', priority: 0.8, changeFreq: 'monthly' as const },
    ...comparisonRoutes,
  ]

  return routes.map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))
}
