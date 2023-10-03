import 'server-only'

import { ContactPagePayload, CvPagePayload, ExhibitionProps, HomePagePayload, UpcomingProps } from '@/types'
import type { QueryParams } from '@sanity/client'
// import { draftMode } from 'next/headers'
// import { revalidateSecret } from './sanity.api'
import { client } from './sanity.client'
import { contactPageQuery, cvPageQuery, exhibitionBySlugQuery, exhibitionsPageQuery, exhibitionsPaths, homePageQuery, pagesPaths, upcomingQuery } from './sanity.queries'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {} as QueryParams
// const DEFAULT_TAGS = [] as string[]

// export async function sanityFetch<QueryResponse>({
//     query,
//     params = DEFAULT_PARAMS,
//     tags = DEFAULT_TAGS
// }: {
//     query: string
//     params?: QueryParams
//     tags: string[]
// }): Promise<QueryResponse> {
//     const isDraftMode = draftMode().isEnabled
//     if (isDraftMode && !token) {
//         throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.')
//     }

//     // @TODO this won't be necessary after https://github.com/sanity-io/client/pull/299 lands
//     // @TODO Refer to new suggested implementation here: https://github.com/sanity-io/next-sanity/tree/main#using-draftmode-to-deactivate-previews
//     const sanityClient = client.config().useCdn && isDraftMode ? client.withConfig({ useCdn: false }) : client
//     return sanityClient.fetch<QueryResponse>(query, params, {
//         // We only cache if there's a revalidation webhook setup
//         cache: revalidateSecret ? 'force-cache' : 'no-store',
//         ...(isDraftMode && {
//             cache: undefined,
//             token: token,
//             perspective: 'previewDrafts'
//         }),
//         next: {
//             ...(isDraftMode && { revalidate: 30 }),
//             tags
//         }
//     })
// }

export async function sanityFetch<QueryResponse>({
    query,
    params = DEFAULT_PARAMS,
    // tags = DEFAULT_TAGS
}: {
    query: string
    params?: QueryParams
    // tags: string[]
}): Promise<QueryResponse> {
    return client.fetch<QueryResponse>(query, params, {
        cache: 'force-cache',
        next: {
            revalidate: 30, // for simple, time-based revalidation
            // tags // for tag-based revalidation
        }
    })
}

export function getHomePage() {
    return sanityFetch<HomePagePayload | null>({
        query: homePageQuery,
        // tags: ['home']
    })
}

export function getCvPage() {
    return sanityFetch<CvPagePayload | null>({
        query: cvPageQuery,
        // tags: ['bio']
    })
}

export function getContactPage() {
    return sanityFetch<ContactPagePayload | null>({
        query: contactPageQuery,
        // tags: ['contact']
    })
}

export function getAllExhibitions() {
    return sanityFetch<ExhibitionProps[] | null>({
        query: exhibitionsPageQuery,
        // tags: ['exhibition']
    })
}

export function getAllUpcoming() {
    return sanityFetch<UpcomingProps[] | null>({
        query: upcomingQuery
        // tags: ['upcoming']
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
        // tags: [`exhibition:${slug}`]
    })
}
