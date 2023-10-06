'use client'

import { urlForImage } from '@/sanity/lib/sanity.image'
import Image from 'next/image'

export type ImageBoxProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: { asset?: any }
    alt?: string
    width?: number
    height?: number
    sizes?: string
    priority?: boolean
    fill?: boolean
    mode?: 'contain' | 'cover'
}

export default function NextImage({ image, alt = '', width, height, sizes = '100vw', priority = false, fill = false, mode = 'contain' }: ImageBoxProps) {
    const imageUrl = image && urlForImage(image)?.fit('crop').url()
    return (
        imageUrl && (
            <Image
                src={imageUrl}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                fill={fill}
                // Make the image display full width
                priority={priority}
                style={{
                    objectFit: `${mode}`
                }}
            />
        )
    )
}
