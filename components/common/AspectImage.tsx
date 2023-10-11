'use client'

import { client } from '@/sanity/lib/sanity.client'
import { FigureProps } from '@/types'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'

export type ImageBoxProps = {
    image: FigureProps
    alt: string
    width?: number
    height?: number
    sizes: string
    priority: boolean
    fill: boolean
    mode: 'contain' | 'cover'
}

export default function AspectImage({
    image,
    alt = '',
    width = 0,
    height = 0,
    sizes = '100vw',
    priority = false,
    fill = false,
    mode = 'contain'
}: ImageBoxProps) {
    const imageProps = useNextSanityImage(client, image)

    const landscape = image.aspectRatio < 1
    const landscapeWidth = '66vw'
    const portraitHeight = '90vh'
    const calcPortraitWidth = `calc((90vh)*(1/${image.aspectRatio}))`
    const calcLandscapeHeight = `calc((66vw)*(${image.aspectRatio}))`

    const aspectRatioValues = {
        width: landscape ? landscapeWidth : calcPortraitWidth,
        height: landscape ? calcLandscapeHeight : portraitHeight,
        maxWidth: landscapeWidth,
        maxHeight: portraitHeight
    }

    return (
        <div
            // className={css({
            //     width: landscape ? landscapeWidth : calcPortraitWidth,
            //     height: landscape ? calcLandscapeHeight : portraitHeight,
            //     maxWidth: landscapeWidth,
            //     maxHeight: portraitHeight
            // })}
            style={aspectRatioValues}
        >
            <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                fill={fill}
                priority={priority}
                style={{
                    objectFit: `${mode}`,
                    objectPosition: 'top'
                }}
            />
        </div>
    )
}

// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client'

// import { client } from '@/sanity/lib/sanity.client'
// import { css } from '@/styled-system/css'
// import { FigureProps } from '@/types'
// import { useNextSanityImage } from 'next-sanity-image'
// import Image from 'next/image'

// export type ImageBoxProps = {
//     image: FigureProps
//     alt: string
//     width?: number
//     height?: number
//     sizes: string
//     priority: boolean
//     fill: boolean
//     mode: 'contain' | 'cover'
// }

// export default function AspectImage({
//     image,
//     alt = '',
//     width,
//     height,
//     sizes = '100vw',
//     priority = false,
//     fill = false,
//     mode = 'contain'
// }: ImageBoxProps) {
//     const imageProps = useNextSanityImage(client, image)

//     const landscape = image.aspectRatio < 1

//     const desktopLandscapeWidth = '66vw'
//     const desktopPortraitHeight = '90vh'
//     const calcDesktopPortraitWidth = `calc((${desktopPortraitHeight})*(1/${image.aspectRatio}))`
//     const calcDesktopLandscapeHeight = `calc((${desktopLandscapeWidth})*(${image.aspectRatio}))`

//     const mobileLandscapeWidth = '100vw'
//     const mobilePortraitHeight = '100vh'
//     const calcMobilePortraitWidth = `calc((${mobilePortraitHeight})*(1/${image.aspectRatio}))`
//     const calcMobileLandscapeHeight = `calc((${mobileLandscapeWidth})*(${image.aspectRatio}))`

//     const aspectRatioValuesDesktop = {
//         width: landscape ? desktopLandscapeWidth : calcDesktopPortraitWidth,
//         height: landscape ? calcDesktopLandscapeHeight : desktopPortraitHeight,
//         maxWidth: desktopLandscapeWidth,
//         maxHeight: desktopPortraitHeight
//     }

//     const aspectRatioValuesMobile = {
//         width: landscape ? mobileLandscapeWidth : calcMobilePortraitWidth,
//         height: landscape ? calcMobileLandscapeHeight : mobilePortraitHeight,
//         maxWidth: mobileLandscapeWidth,
//         maxHeight: mobilePortraitHeight
//     }

//     // from Alex Chalmers

//     const landscapeWidth = '46vw' // 100vw/12 * 6
//     const portraitWidth = '30vw' // 100vw/12 * 4
//     const calcPortraitHeight = `calc((${landscapeWidth})*(1/${image.aspectRatio}))`
//     const calcLandscapeHeight = `calc((${portraitWidth})*(1/${image.aspectRatio}))`

//     const aspectRatioValues = {
//         width: landscape ? landscapeWidth : portraitWidth,
//         height: landscape ? calcDesktopLandscapeHeight : desktopPortraitHeight,
//         // maxWidth: desktopLandscapeWidth,
//         // maxHeight: desktopPortraitHeight
//     }

//     return (
//         <div className={css({ position: 'relative' })} style={aspectRatioValuesDesktop}>
//             <Image
//                 src={imageProps.src}
//                 loader={imageProps.loader}
//                 alt={alt}
//                 width={width}
//                 height={height}
//                 sizes={sizes}
//                 fill={fill}
//                 priority={priority}
//                 style={{
//                     objectFit: `${mode}`,
//                     objectPosition: 'center'
//                 }}
//             />
//         </div>
//     )
// }
