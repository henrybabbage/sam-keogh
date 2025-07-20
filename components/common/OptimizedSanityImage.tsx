'use client'

import { client } from '@/sanity/lib/sanity.client'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import type { Image as SanityImage } from 'sanity'
import { useState } from 'react'

export type OptimizedSanityImageProps = {
    image: SanityImage & {
        alt?: string
        metadata?: {
            dimensions?: { width: number; height: number }
            lqip?: string
        }
    }
    alt?: string
    width?: number
    height?: number
    sizes?: string
    priority?: boolean
    fill?: boolean
    mode?: 'contain' | 'cover'
    position?: 'top' | 'center' | 'bottom'
    quality?: number
    loading?: 'eager' | 'lazy'
    placeholder?: 'blur' | 'empty'
}

export default function OptimizedSanityImage({ 
    image, 
    alt = '', 
    width = 0, 
    height = 0, 
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw', 
    priority = false, 
    fill = false, 
    mode = 'contain', 
    position = 'center',
    quality = 85,
    loading = 'lazy',
    placeholder = 'blur'
}: OptimizedSanityImageProps) {
    // Get optimized image props from next-sanity-image
    const imageProps = useNextSanityImage(client, image, {
        imageBuilder: (imageUrlBuilder) => 
            imageUrlBuilder
                .auto('format')
                .quality(quality)
                .fit(mode === 'cover' ? 'crop' : 'max')
    })

    // Extract LQIP from Sanity metadata
    const blurDataURL = image?.metadata?.lqip

    if (!imageProps) return null

    return (
        <Image
            {...imageProps}
            alt={alt || image?.alt || ''}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            sizes={sizes}
            fill={fill}
            priority={priority}
            loading={priority ? 'eager' : loading}
            placeholder={blurDataURL && placeholder === 'blur' ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            quality={quality}
            style={{
                objectFit: mode,
                objectPosition: position
            }}
        />
    )
}