/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { urlImports: ['https://themer.sanity.build/'] },
    images: {
        domains: ['i.vimeocdn.com', 'player.vimeo.com', 'cdn.sanity.io'],
        remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }]
    },
    env: {
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION
    }
}

module.exports = nextConfig
