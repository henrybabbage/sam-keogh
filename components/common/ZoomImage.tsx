/* eslint-disable @typescript-eslint/no-unused-vars */
import { client } from '@/sanity/lib/sanity.client'
import { css } from '@/styled-system/css'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { ImageBoxProps } from './NextImage'

export type ZoomModalProps = {
    ratio: number
    open: boolean
    setOpen: (open: boolean) => void
}

export default function ZoomImage({
    image,
    alt = '',
    sizes = '100vw',
    priority = true,
    fill = true,
    mode = 'contain',
    open,
    setOpen,
    ratio
}: ImageBoxProps & ZoomModalProps) {
    const imageProps = useNextSanityImage(client, image)
    return (
        <div
            onClick={() => setOpen(false)}
            style={{ width: '100vw', height: `calc(100vw * ${ratio})` }}
            className={css({
                position: 'relative',
                overflowY: 'auto'
            })}
        >
            <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={alt}
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
