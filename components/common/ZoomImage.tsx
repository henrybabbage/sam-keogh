import { client } from '@/sanity/lib/sanity.client'
import { css } from '@/styled-system/css'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { ImageBoxProps } from './NextImage'

export default function ZoomImage({ image, alt = '', sizes = '100vw', priority = true, fill = true, mode = 'cover' }: ImageBoxProps) {
    const imageProps = useNextSanityImage(client, image)
    return (
        <div className={css({ minH: '100vh', w: '100vw', maxW: '100vw', bg: 'background', overflowY: 'auto' })}>
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
