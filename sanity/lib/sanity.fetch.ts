import 'server-only'

import { ContactPagePayload, CvPagePayload, ExhibitionProps, HomePagePayload, ThemeProps, UpcomingProps } from '@/types'
import type { QueryParams } from '@sanity/client'
import { client } from './sanity.client'
import {
    contactPageQuery,
    cvPageQuery,
    exhibitionBySlugQuery,
    exhibitionsPageQuery,
    exhibitionsPaths,
    homePageQuery,
    pagesPaths,
    themeQuery,
    upcomingQuery
} from './sanity.queries'

export const token = process.env.SANITY_API_READ_TOKEN
const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export async function sanityFetch<QueryResponse>({
    query,
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS,
    revalidate = 3600, // 1 hour default
    realtime = false
}: {
    query: string
    params?: QueryParams
    tags: string[]
    revalidate?: number | false
    realtime?: boolean
}): Promise<QueryResponse> {
    const start = Date.now()
    
    try {
        const result = await client.fetch<QueryResponse>(query, params, {
            // Use hybrid caching strategy
            cache: realtime || revalidateSecret ? 'no-store' : 'force-cache',
            next: {
                revalidate: realtime || revalidateSecret ? false : revalidate,
                tags
            }
        })
        
        // Log slow queries in development
        if (process.env.NODE_ENV === 'development') {
            const duration = Date.now() - start
            if (duration > 1000) {
                console.warn(`Slow Sanity query (${duration}ms):`, query.split('\n')[0].trim())
            }
        }
        
        return result
    } catch (error) {
        console.error('Sanity fetch error:', error)
        throw error
    }
}

export function getHomePage() {
    return sanityFetch<HomePagePayload | null>({
        query: homePageQuery,
        tags: ['home'],
        revalidate: 7200 // 2 hours - home page changes infrequently
    })
}

export function getCvPage() {
    return sanityFetch<CvPagePayload | null>({
        query: cvPageQuery,
        tags: ['bio']
    })
}

export function getContactPage() {
    return sanityFetch<ContactPagePayload | null>({
        query: contactPageQuery,
        tags: ['contact']
    })
}

export function getAllExhibitions() {
    return sanityFetch<ExhibitionProps[] | null>({
        query: exhibitionsPageQuery,
        tags: ['exhibition'],
        revalidate: 1800 // 30 minutes - exhibitions update more frequently
    })
}

export function getAllUpcoming() {
    return sanityFetch<UpcomingProps[] | null>({
        query: upcomingQuery,
        tags: ['upcoming']
    })
}

export function getTheme() {
    return sanityFetch<ThemeProps | null>({
        query: themeQuery,
        tags: ['theme']
    })
}

export function getPagesPaths() {
    return client.fetch<string[]>(pagesPaths, {}, { token, perspective: 'published' })
}

export function getExhibitionsPaths() {
    return client.fetch<string[]>(exhibitionsPaths, {}, { token, perspective: 'published' })
}

export function getExhibitionBySlug(slug: string) {
    return sanityFetch<ExhibitionProps | null>({
        query: exhibitionBySlugQuery,
        params: { slug },
        tags: [`exhibition:${slug}`]
    })
}
