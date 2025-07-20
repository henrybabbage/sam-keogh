/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { urlImports: ['https://themer.sanity.build/'] },
    images: {
        domains: ['i.vimeocdn.com', 'player.vimeo.com', 'cdn.sanity.io'],
        remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 31536000, // 1 year cache for images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },
    env: {
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION
    },
    compress: true,
    poweredByHeader: false
}

module.exports = nextConfig
