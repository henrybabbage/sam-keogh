/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { client } from '@/sanity/lib/sanity.client'
import { css } from '@/styled-system/css'
import { FigureProps } from '@/types'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'
import ZoomImage from './ZoomImage'

const LANDSCAPE_WIDTH_DESKTOP = '66vw'
const PORTRAIT_HEIGHT_DESKTOP = '90vh'
const LANDSCAPE_WIDTH_MOBILE = '90vw'
const PORTRAIT_HEIGHT_MOBILE = '90vh'

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
    const [open, setOpen] = useState(false)

    const imageProps = useNextSanityImage(client, image)

    const ratioMultiplier = 1 / image.aspectRatio
    const landscape = ratioMultiplier < 1

    const desktopLandscapeWidth = LANDSCAPE_WIDTH_DESKTOP
    const desktopPortraitHeight = PORTRAIT_HEIGHT_DESKTOP
    const calcDesktopPortraitWidth = `calc((${desktopPortraitHeight})*(${1 / ratioMultiplier}))`
    const calcDesktopLandscapeHeight = `calc((${desktopLandscapeWidth})*(${ratioMultiplier}))`

    const mobileLandscapeWidth = LANDSCAPE_WIDTH_MOBILE
    const mobilePortraitHeight = PORTRAIT_HEIGHT_MOBILE
    const calcMobilePortraitWidth = `calc((${mobilePortraitHeight})*(${1 / ratioMultiplier}))`
    const calcMobileLandscapeHeight = `calc((${mobileLandscapeWidth})*(${ratioMultiplier}))`

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

    return tabletAndBelow ? (
        <div style={aspectRatioValuesMobile}>
            <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={alt}
                sizes={sizes}
                fill={fill}
                priority={priority}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'top'
                }}
            />
        </div>
    ) : (
        <Modal open={open} onOpenChange={setOpen}>
            <Modal.Button className={css({ cursor: 'pointer' })}>
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
            </Modal.Button>
            <Modal.Content>
                <ZoomImage image={image} ratio={ratioMultiplier} open={open} setOpen={setOpen} />
            </Modal.Content>
        </Modal>
    )
}
