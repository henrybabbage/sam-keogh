'use client'

import OptimizedSanityImage from '@/components/common/OptimizedSanityImage'
import { css } from '@/styled-system/css'
import { FigureProps } from '@/types'
import { useState } from 'react'
import { useExhibitionStore } from '../../../app/(website)/store'

export type ExhibitionPreviewProps = {
    image: FigureProps | null
    id: string | null
    priority?: boolean
}

export default function ExhibitionPreview(props: ExhibitionPreviewProps) {
    const { image, id, priority = false } = props

    const selectedExhibition = useExhibitionStore((state) => state.selectedExhibition)
    const isVisible = selectedExhibition === id

    return (
        <div
            className={css({
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                pointerEvents: isVisible ? 'auto' : 'none'
            })}
        >
            <div className={css({ 
                w: '100%', 
                h: '35rem', 
                bg: 'background', 
                position: 'relative', 
                overflow: 'hidden'
            })}>
                {image && (
                    <OptimizedSanityImage 
                        image={image} 
                        priority={priority}
                        fill={true} 
                        mode="contain"
                        sizes="(max-width: 1024px) 0vw, 66vw"
                        quality={85}
                        loading="eager"
                        placeholder="blur"
                    />
                )}
            </div>
        </div>
    )
}
