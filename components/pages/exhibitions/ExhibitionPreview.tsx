'use client'

import NextImage from '@/components/common/NextImage'
import { css } from '@/styled-system/css'
import { FigureProps } from '@/types'
import { useExhibitionStore } from '../../../app/(website)/store'

export type ExhibitionPreviewProps = {
    image: FigureProps | null
    id: string | null
}

export default function ExhibitionPreview(props: ExhibitionPreviewProps) {
    const { image, id } = props

    const selectedExhibition = useExhibitionStore((state) => state.selectedExhibition)

    const isSelected = selectedExhibition === id

    return (
        <div
            className={css({
                position: 'relative',
                opacity: isSelected ? 1 : 0,
                pointerEvents: isSelected ? 'auto' : 'none',
                transition: isSelected
                    ? 'opacity 0.1s cubic-bezier(0.33, 1, 0.68, 1)'
                    : 'opacity 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
                willChange: 'opacity'
            })}
        >
            <div className={css({ w: '100%', h: '35rem', bg: 'background', position: 'relative', overflow: 'hidden' })}>
                {image && <NextImage image={image} priority={true} fill={true} mode="contain" />}
            </div>
        </div>
    )
}
