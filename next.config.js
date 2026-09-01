/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      '@/components',
      '@/lib',
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/admin',
      destination: '/admin/dashboard',
      permanent: false,
    },
    {
      source: '/seller',
      destination: '/seller/dashboard',
      permanent: false,
    },
  ],
}

module.exports = nextConfig
