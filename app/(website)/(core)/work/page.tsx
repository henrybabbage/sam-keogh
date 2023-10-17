import ExhibitionsPage from '@/components/pages/exhibitions/ExhibitionsPage'
import { getAllExhibitions, getAllUpcoming } from '@/sanity/lib/sanity.fetch'
import { notFound } from 'next/navigation'

export const runtime = 'edge'

export default async function Exhibitions() {
    const [exhibitions, upcoming] = await Promise.all([getAllExhibitions(), getAllUpcoming()])
    if (!exhibitions) {
        notFound()
    }
    return <ExhibitionsPage exhibitions={exhibitions} upcoming ={upcoming} />
}
