import { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export type Prettify<T> = {
    [K in keyof T]: T[K]
} & unknown

export type Base = {
    _createdAt: string
    _id: string
    _rev: string
    _type: string
    _updatedAt: string
}

export type Reference = {
    _ref: string
    _type: 'reference'
}

export type ColorThemeProps = {
    label: string
    value: string
}

export type VenueProps = {
    name: string
    city: string
    country: string
}

export type ImageMetadata = {
    aspectRatio: number
    height: number
    width: number
    id: string
    preview: string
}

export type FigureProps = {
    alt: string
    caption: string
} & Image &
    ImageMetadata

export type HeroProps = {
    alt: string
} & Image &
    ImageMetadata

export type VideoProps = {
    _key?: string
    title?: string
    url: string
}

export type LinkProps = {
    title: string
    url: string
}

export type ExhibitionProps = {
    _id: string
    _type: string
    title: string
    subtitle?: string
    link?: 'internal' | 'external'
    slug?: string
    url?: string
    imageGallery?: FigureProps[]
    vimeo?: VideoProps[]
    pressRelease?: PortableTextBlock[]
    type?: 'solo' | 'group'
    startDate?: string
    endDate?: string
    year: string
    venue?: VenueProps
    photographerCredit?: string
}

export type UpcomingProps = {
    _id: string
    _type: string
    title: string
    info?: string
    date?: string
    url?: string
    venue?: VenueProps
}

export type HomePagePayload = {
    _id: string
    _type: string
    hero: Image
    link?: ExhibitionProps
}

export type ExhibitionsPagePayload = {
    exhibitions: ExhibitionProps[]
    upcoming?: UpcomingProps[] | null
}

export type ExhibitionPagePayload = {
    data: ExhibitionProps | null
}

export type CvPagePayload = {
    slug: string
    cv?: PortableTextBlock[]
}

export type ContactPagePayload = {
    slug: string
    email: string
    instagram: LinkProps
    gallery: LinkProps
}

export type ThemeProps = {
    backgroundColor: ColorThemeProps
    typefaceSerif: string
    typefaceSansSerif: string
}
