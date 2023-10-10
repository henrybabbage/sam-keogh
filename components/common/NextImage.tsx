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
}

export default function NextImage({ image, alt = '', width = 0, height = 0, sizes = '100vw', priority = false, fill = false, mode = 'contain' }: ImageBoxProps) {
    const imageProps = useNextSanityImage(client, image)
    // const imageUrl = image && urlForImage(image)?.fit('crop').url()
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
                // Make the image display full width
                priority={priority}
                style={{
                    objectFit: `${mode}`,
                }}
            />
        )
    )
}
