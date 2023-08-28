import HomePage from '@/components/pages/home/HomePage'
import { client } from '@/sanity/lib/sanity.client'
import { homePageQuery } from '@/sanity/lib/sanity.queries'
import { HomePagePayload } from '@/types'
import { notFound } from 'next/navigation'

export default async function Home() {
    const data = await client.fetch<HomePagePayload | null>(homePageQuery)
    if (!data) {
        notFound()
    }
    return <HomePage data={data} />
}
