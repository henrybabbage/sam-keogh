import 'server-only'

import { ExhibitionPagePayload, HomePagePayload } from '@/types'
import type { QueryParams } from '@sanity/client'
import { draftMode } from 'next/headers'
import { revalidateSecret } from './sanity.api'
import { client } from './sanity.client'
import { exhibitionBySlugQuery, exhibitionsPaths, homePageQuery, pagesPaths } from './sanity.queries'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export async function sanityFetch<QueryResponse>({
    query,
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS
}: {
    query: string
    params?: QueryParams
    tags: string[]
}): Promise<QueryResponse> {
    const isDraftMode = draftMode().isEnabled
    if (isDraftMode && !token) {
        throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.')
    }

    // @TODO this won't be necessary after https://github.com/sanity-io/client/pull/299 lands
    const sanityClient = client.config().useCdn && isDraftMode ? client.withConfig({ useCdn: false }) : client
    return sanityClient.fetch<QueryResponse>(query, params, {
        // We only cache if there's a revalidation webhook setup
        cache: revalidateSecret ? 'force-cache' : 'no-store',
        ...(isDraftMode && {
            cache: undefined,
            token: token,
            perspective: 'previewDrafts'
        }),
        next: {
            ...(isDraftMode && { revalidate: 30 }),
            tags
        }
    })
}

export function getHomePage() {
    return sanityFetch<HomePagePayload | null>({
        query: homePageQuery,
        tags: ['home', 'project']
    })
}

export function getPagesPaths() {
    return client.fetch<string[]>(pagesPaths, {}, { token, perspective: 'published' })
}

export function getExhibitionsPaths() {
    return client.fetch<string[]>(exhibitionsPaths, {}, { token, perspective: 'published' })
}

export function getExhibitionBySlug(slug: string) {
    return sanityFetch<ExhibitionPagePayload | null>({
        query: exhibitionBySlugQuery,
        params: { slug },
        tags: [`project:${slug}`]
    })
}