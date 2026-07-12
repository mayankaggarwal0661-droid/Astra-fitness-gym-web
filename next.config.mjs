/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow serving local files via API routes
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path'],
  },
}

export default nextConfig
