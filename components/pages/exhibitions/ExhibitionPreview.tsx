'use client'

import { DynamicImage } from '@/components/common/DynamicImage'
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
                aspectRatio: '16/9',
                pl: '12px',
                opacity: selectedExhibition === id ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out'
            })}
        >
            <div className={css({ w: '100%', bg: 'gray.500' })}>
                {image && <DynamicImage asset={image} width={390} height={260} mode="cover" sizes="100vw" />}
            </div>
        </div>
    )
}
