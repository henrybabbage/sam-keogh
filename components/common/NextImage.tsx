'use client'

import { client } from '@/sanity/lib/sanity.client'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'

export type ImageBoxProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: { asset?: any }
    alt?: string
    width?: number
    height?: number
    sizes?: string
    priority?: boolean
    fill?: boolean
    mode?: 'contain' | 'cover'
    position?: 'top' | 'center' | 'bottom'
}

export default function NextImage({ image, alt = '', width = 0, height = 0, sizes = '100vw', priority = false, fill = false, mode = 'contain', position = 'center' }: ImageBoxProps) {
    const imageProps = useNextSanityImage(client, image)
    return (
        imageProps && (
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
                    objectPosition: `${position}`
                }}
            />
        )
    )
}
