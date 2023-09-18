import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
        _id,
        _ref,
        _type,
        hero{
            alt,
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
export const themeQuery = groq`
    *[_type == "theme"][0]{
        typefaceSerif,
        typefaceSansSerif,
        backgroundColor,
    }
`

export const exhibitionPaths = groq`
  *[_type == "exhibition" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const exhibitionBySlugQuery = groq`
  *[_type == "exhibition" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    link,
    slug,
    url,
    imageGallery[]{
        ...,
        asset->{
          ...
        }
    },
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

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
  }
`
