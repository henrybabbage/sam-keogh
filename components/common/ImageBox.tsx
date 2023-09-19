import { urlForImage } from '@/sanity/lib/sanity.image'
import { css, cx } from '@/styled-system/css'
import Image from 'next/image'

interface ImageBoxProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: { asset?: any }
    alt?: string
    width?: number
    height?: number
    size?: string
    classesWrapper?: string
}

export default function ImageBox({ image, alt = 'Cover image', width = 3500, height = 2000, size = '100vw', classesWrapper }: ImageBoxProps) {
    const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url()

    return (
        <div className={cx(css({ w: 'full', overflow: 'hidden', rounded: '3px', bgColor: 'gray.50' }), classesWrapper)}>
            {imageUrl && (
                <Image className={css({ pos: 'absolute', h: 'full', w: 'full' })} alt={alt} width={width} height={height} sizes={size} src={imageUrl} />
            )}
        </div>
    )
}
