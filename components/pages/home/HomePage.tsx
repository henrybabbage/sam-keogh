'use client'

import { DynamicImage } from '@/components/common/DynamicImage'
import { css } from '@/styled-system/css'
import { HomePagePayload } from '@/types'

export type HomePageProps = {
    data: HomePagePayload | null
}

export default function HomePage({ data }: HomePageProps) {
    // Default to an empty object to allow previews on non-existent documents
    const { hero = {} } = data ?? {}
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', p: '12px', bg: '#FFF1E5' })}>
            <section
                className={css({
                    position: 'relative',
                    maxWidth: '100vw',
                    maxHeight: '80vh',
                    overflow: 'hidden'
                })}
            >
                <DynamicImage
                    asset={hero}
                    mode="cover"
                    sizes="100vw"
                    loading="eager"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        userSelect: 'none',
                        zIndex: 1
                    }}
                />
            </section>
        </main>
    )
}
