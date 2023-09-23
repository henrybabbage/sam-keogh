import { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export type ColorThemeProps = {
    label: string
    value: string
}

export type VenueProps = {
    name: string
    city: string
    country: string
}

export type FigureProps = {
    alt: string
    caption: string
    asset: Image
}

export type HeroProps = {
    alt: string
    asset: Image
    id: string
    preview?: string
    hotspot?: {
        x: number
        y: number
    }
    crop?: {
        bottom: number
        left: number
        right: number
        top: number
    }
}

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

export type HomePagePayload = {
    _id: string
    _type: string
    hero: HeroProps
    link?: ExhibitionProps
}

export type ExhibitionsPagePayload = {
    data: ExhibitionProps[] | null
}

export type ExhibitionPagePayload = {
    data: ExhibitionProps | null
}

export type CvPagePayload = {
    cv: PortableTextBlock[]
}

export type ContactPagePayload = {
    email: string
    instagram: LinkProps
    gallery: LinkProps
}

export type ThemeProps = {
    backgroundColor: ColorThemeProps
    typefaceSerif: string
    typefaceSansSerif: string
}
