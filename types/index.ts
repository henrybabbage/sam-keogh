import type { Image } from 'sanity'

export interface HomePagePayload {
    hero?: Image
}

export interface SanityImageProps {
    _id: string
    _ref: string
    _type: string
    asset: {
        url: string
        metadata: {
            lqip: string
            dimensions: {
                aspectRatio: number
                height: number
                width: number
            }
        }
    }
    alt?: string
    mode?: 'cover' | 'contain'
}
