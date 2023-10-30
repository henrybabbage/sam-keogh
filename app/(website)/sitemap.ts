import { getAllExhibitions } from '@/sanity/lib/sanity.fetch'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.SITE_URL || 'https://www.samkeogh.net'

type changeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const exhibitions = await getAllExhibitions()
    if (!exhibitions) {
        return []
    }
    const changeFrequency = 'daily' as changeFrequency

    const dynamicPages = exhibitions.map(({ slug, _updatedAt }) => ({
        url: `${BASE_URL}/${slug}`,
        lastModified: _updatedAt,
        changeFrequency
    }))

    const routes = ['', '/cv', '/contact', '/work'].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency
    }))

    return [...routes, ...dynamicPages]
}
