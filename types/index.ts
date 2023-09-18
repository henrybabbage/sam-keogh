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
    image: Image
}

export type ExhibitionProps = {
    title: string
    subtitle: string
    link?: 'internal' | 'external'
    slug?: string
    url?: string
    imageGallery: FigureProps[]
    pressRelease: PortableTextBlock[]
    type?: 'solo' | 'group'
    startDate: string
    endDate: string
    year: string
    venue: VenueProps
    photographerCredit: string
}

export type LinkProps = {
    title: string
    url: string
}

export type HomePagePayload = {
    hero?: Image
}

export type ExhibitionsPagePayload = {
    exhibitions: ExhibitionProps[]
}

export type ExhibitionPagePayload = {
    exhibition: ExhibitionProps
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
