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

export type ExhibitionProps = {
    _id: string
    _type: string
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
