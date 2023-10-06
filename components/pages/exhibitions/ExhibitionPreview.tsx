'use client'

import NextImage from '@/components/common/NextImage'
import { css } from '@/styled-system/css'
import { FigureProps } from '@/types'
import { useExhibitionStore } from './store'

export type ExhibitionPreviewProps = {
    image: FigureProps | null
    id: string | null
}

export default function ExhibitionPreview(props: ExhibitionPreviewProps) {
    const { image, id } = props

    const selectedExhibition = useExhibitionStore((state) => state.selectedExhibition)

    return (
        <div
            className={css({
                position: 'relative',
                opacity: selectedExhibition === id ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out'
            })}
        >
            <div className={css({ w: '100%', h: '35rem', bg: 'background', position: 'relative', overflow: 'hidden' })}>
                {image && <NextImage image={image} priority={true} fill={true} mode='contain' />}
            </div>
        </div>
    )
}
