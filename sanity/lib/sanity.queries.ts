import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
        _id,
        _ref,
        _type,
        hero{
            alt,
            asset->{
                _id,
                url,
                originalFilename,
                metadata{
                    lqip,
                    dimensions{
                        width,
                        height,
                    }
                }
            }
        }
    }
`
