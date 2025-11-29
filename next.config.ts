import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/**`),
      new URL(`${process.env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_URL}/**`),
      new URL(`https://minio.cosmetychka.com.ua/**`),
      new URL(`http://minio.cosmetychka.com.ua:9000/**`),
      new URL(`http://localhost:7777/**`),
    ],
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/media/:path*`,
      },
    ]
  },
}

export default nextConfig
