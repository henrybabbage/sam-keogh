/* eslint-disable jsx-a11y/alt-text */
'use client'

import { Image } from '@/components/common/Image'
import Nav from '@/components/common/Nav'
import { css } from '@/styled-system/css'
import { HomePagePayload } from '@/types'

export interface HomePageProps {
    data: HomePagePayload | null
}

export default function HomePage({ data }: HomePageProps) {
    // Default to an empty object to allow previews on non-existent documents
    const { hero = {} } = data ?? {}
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', width: '100vw', overflow: 'hidden' })}>
            <section className={css({ height: '80vh' })}>
                <Image asset={hero?.asset} mode="contain" sizes="100vw" />
            </section>
            <section className={css({ height: '20vh' })}>
                <Nav />
            </section>
        </main>
    )
}
