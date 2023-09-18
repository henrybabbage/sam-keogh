import ExhibitionsPage from '@/components/pages/exhibitions/ExhibitionsPage'
import { client } from '@/sanity/lib/sanity.client'
import { exhibitionsPageQuery } from '@/sanity/lib/sanity.queries'
import { ExhibitionsPagePayload } from '@/types'
import { notFound } from 'next/navigation'

export default async function Exhibitions() {
    const data = await client.fetch<ExhibitionsPagePayload | null>(exhibitionsPageQuery)
    if (!data) {
        notFound()
    }
    return (
        <div>
            <ExhibitionsPage data={data} />
        </div>
    )
}
