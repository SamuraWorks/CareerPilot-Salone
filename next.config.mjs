/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
