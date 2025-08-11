import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/**`),
      new URL(`https://gtmcosmetics.com.ua/**`),
      new URL(`https://google.com/**`),
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
