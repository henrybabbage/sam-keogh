/* eslint-disable jsx-a11y/alt-text */
'use client'

import { DynamicImage } from '@/components/common/DynamicImage'
import { css } from '@/styled-system/css'
import { HomePagePayload } from '@/types'

export interface HomePageProps {
    data: HomePagePayload | null
}

export default function HomePage({ data }: HomePageProps) {
    // Default to an empty object to allow previews on non-existent documents
    const { hero = {} } = data ?? {}
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', width: '100%', overflow: 'hidden' })}>
            <div className={css({ height: '60vh' })}>
                <DynamicImage asset={hero} mode="cover" sizes="100vw" />
            </div>
        </main>
    )
}
