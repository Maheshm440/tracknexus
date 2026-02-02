/** @type {import('next').NextConfig} */

// Use STATIC_EXPORT=true for marketing site only (no API/dashboard)
// Use STATIC_EXPORT=false or undefined for full server deployment with API routes
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  // Only use static export when explicitly enabled
  ...(isStaticExport && { output: 'export' }),
  images: {
    unoptimized: isStaticExport, // Required for static export
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
  },
}

export default nextConfig
