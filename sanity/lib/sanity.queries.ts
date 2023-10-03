import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
        _id,
        _ref,
        _type,
        link->{
            "slug": slug.current,
        },
        hero{
            asset->{
                ...
            },
            alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            "aspectRatio": asset->metadata.dimensions.aspectRatio,
            "id": asset._ref,
            "preview": asset->metadata.lqip,
            hotspot { x, y },
            crop {
                bottom,
                left,
                right,
                top,
            }
        }
    }
`

export const exhibitionsPageQuery = groq`
  *[_type == "exhibition"]| order(endDate desc) {
    _id,
    _type,
    "slug": slug.current,
    title,
    subtitle,
    link,
    url,
    imageGallery[]{
        ...,
        "id": asset._ref,
        "preview": asset->metadata.lqip,
        asset->{
          ...
        }
    },
    vimeo,
    pressRelease,
    type,
    startDate,
    endDate,
    year,
    venue->{
        ...
    },
    photographerCredit,
  }
`
export const cvPageQuery = groq`
  *[_type == "bio"][0] {
    _id,
    "slug": slug.current,
    cv
  }
`

export const contactPageQuery = groq`
  *[_type == "contact"][0] {
    _id,
    "slug": slug.current,
    email,
    gallery,
    instagram,
  }
`

export const themeQuery = groq`
    *[_type == "theme"][0]{
        typefaceSerif,
        typefaceSansSerif,
        backgroundColor,
    }
`

export const upcomingQuery = groq`
    *[_type == "upcoming"]| order(date desc) {
        _id,
        _type,
        title,
        info,
        date,
        url,
        venue->{
            ...
        },
    }
`

export const exhibitionsPaths = groq`
  *[_type == "exhibition" && slug.current != null].slug.current
`

export const pagesPaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const exhibitionBySlugQuery = groq`
  *[_type == "exhibition" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    link,
    url,
    imageGallery[]{
        ...,
        "id": asset._ref,
        "preview": asset->metadata.lqip,
        asset->{
          ...
        }
    },
    vimeo,
    pressRelease,
    type,
    startDate,
    endDate,
    year,
    venue->{
        ...
    },
    photographerCredit,
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
  }
`
