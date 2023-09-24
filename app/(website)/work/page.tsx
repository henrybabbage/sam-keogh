import ExhibitionsPage from '@/components/pages/exhibitions/ExhibitionsPage'
import { getAllExhibitions } from '@/sanity/lib/sanity.fetch'
import { notFound } from 'next/navigation'

export const runtime = 'edge'

export default async function Exhibitions() {
    const data = await getAllExhibitions()
    if (!data) {
        notFound()
    }
    return <ExhibitionsPage data={data} />
}
