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
