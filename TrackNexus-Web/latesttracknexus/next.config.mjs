/** @type {import('next').NextConfig} */

// Use STATIC_EXPORT=true for marketing site only (no API/dashboard)
// Use STATIC_EXPORT=false or undefined for full server deployment with API routes
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  // SECURITY FIX #10: Enable TypeScript checking
  typescript: {
    ignoreBuildErrors: false, // TypeScript errors will fail builds
  },
  // PERFORMANCE: Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // PERFORMANCE: Enable React strict mode for better optimization
  reactStrictMode: true,
  // PERFORMANCE: Enable production source maps only when needed
  productionBrowserSourceMaps: false,
  // Only use static export when explicitly enabled
  ...(isStaticExport && { output: 'export' }),
  images: {
    unoptimized: false, // Enable optimization for better performance
    formats: ['image/avif', 'image/webp'], // Modern formats first
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon and small image sizes
    minimumCacheTTL: 31536000, // Cache optimized images for 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/**',
      },
    ],
  },
  // Optimize package imports to reduce bundle size
  experimental: {
    // Enable environment validation at startup
    instrumentationHook: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns',
      'recharts',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
    ],
    // PERFORMANCE: Enable optimistic client cache
    optimisticClientCache: true,
    // PERFORMANCE: CSS optimization disabled (causes build issues)
    // optimizeCss: true,
  },
  // Security headers for better SEO and security
  async headers() {
    // SECURITY FIX #19: Add Content Security Policy (CSP)
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://images.unsplash.com https://www.google-analytics.com;
      media-src 'self' blob: data:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
}

export default nextConfig
