'use client'

import NextImage from '@/components/common/NextImage'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { HomePagePayload } from '@/types'

export type HomePageProps = {
    data: HomePagePayload | null
}

export default function HomePage({ data }: HomePageProps) {
    // Default to an empty object to allow previews on non-existent documents
    const { hero } = data ?? {}

    const width: number = typeof hero?.width === 'number' ? hero.width : 0
    const height: number = typeof hero?.height === 'number' ? hero.height : 0

    const isLandscape: boolean = width > height

    console.log({ isLandscape })

    return (
        <main
            className={flex({
                justifyContent: 'center',
                p: '12px',
                height: '100vh',
                maxHeight: '100vh',
                width: '100vw',
                position: 'relative'
            })}
        >
            <section
                className={css({
                    position: 'relative',
                    height: '80vh',
                    width: '100vw',
                    overflow: 'hidden'
                })}
            >
                <NextImage image={hero} priority={true} fill={true} />
            </section>
        </main>
    )
}
