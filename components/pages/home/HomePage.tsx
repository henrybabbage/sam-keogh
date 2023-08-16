'use client'

import { Image } from '@/components/common/Image'
import Nav from '@/components/common/Nav'
import { HomePagePayload } from '@/types'

export interface HomePageProps {
    data: HomePagePayload | null
}

export default function HomePage({ data }: HomePageProps) {
    // Default to an empty object to allow previews on non-existent documents
    const { hero = {} } = data ?? {}
    return (
        <main>
            <section>
                <Image id={hero?.asset?._ref} alt={hero?.alt} mode="cover" />
            </section>
            <footer>
                <Nav />
            </footer>
        </main>
    )
}
