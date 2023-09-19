import ExhibitionsPage from '@/components/pages/exhibitions/ExhibitionsPage'
import { getAllExhibitions } from '@/sanity/lib/sanity.fetch'
import { notFound } from 'next/navigation'

export default async function Exhibitions() {
    const data = await getAllExhibitions()
    console.log('initial_data', data)
    if (!data) {
        notFound()
    }
    return <ExhibitionsPage data={data} />
}
