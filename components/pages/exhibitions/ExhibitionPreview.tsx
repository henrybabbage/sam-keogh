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
                opacity: selectedExhibition === id ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out'
            })}
        >
            <div className={css({ w: '100%', h: '600px', bg: 'gray.500', position: 'relative', overflow: 'hidden' })}>
                {image && (
                    <DynamicImage
                        asset={image}
                        mode="contain"
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 70vw"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            userSelect: 'none',
                            zIndex: 1
                        }}
                    />
                )}
            </div>
        </div>
    )
}
