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
