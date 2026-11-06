/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable images from domain
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
}

export default nextConfig
