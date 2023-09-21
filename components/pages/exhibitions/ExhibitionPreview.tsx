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

    console.log(selectedExhibition, id)

    return (
        <div className={css({ position: 'relative', mt: '14vh', aspectRatio: '16/9' })}>
            <div className={css({ w: '100%', bg: 'gray.500' })}>
                {image && (
                    <DynamicImage
                        asset={image}
                        mode="cover"
                        sizes="80vw"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                )}
            </div>
        </div>
    )
}
