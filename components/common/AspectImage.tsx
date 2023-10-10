/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { client } from '@/sanity/lib/sanity.client'
import { FigureProps } from '@/types'
import { useMediaQuery } from '@/utils/useMediaQuery'
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
    const desktopLandscapeWidth = '66vw'
    const desktopPortraitHeight = '90vh'
    const calcDesktopPortraitWidth = `calc((${desktopPortraitHeight})*(1/${image.aspectRatio}))`
    const calcDesktopLandscapeHeight = `calc((${desktopLandscapeWidth})*(${image.aspectRatio}))`

    const mobileLandscapeWidth = '100vw'
    const mobilePortraitHeight = '100vh'
    const calcMobilePortraitWidth = `calc((${mobilePortraitHeight})*(1/${image.aspectRatio}))`
    const calcMobileLandscapeHeight = `calc((${mobileLandscapeWidth})*(${image.aspectRatio}))`

    const aspectRatioValuesDesktop = {
        width: landscape ? desktopLandscapeWidth : calcDesktopPortraitWidth,
        height: landscape ? calcDesktopLandscapeHeight : desktopPortraitHeight,
        maxWidth: desktopLandscapeWidth,
        maxHeight: desktopPortraitHeight
    }

    const aspectRatioValuesMobile = {
        width: landscape ? mobileLandscapeWidth : calcMobilePortraitWidth,
        height: landscape ? calcMobileLandscapeHeight : mobilePortraitHeight,
        maxWidth: mobileLandscapeWidth,
        maxHeight: mobilePortraitHeight
    }

    const tabletAndBelow = useMediaQuery('(max-width: 1024px)')

    return (
        <div style={aspectRatioValuesDesktop}>
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
