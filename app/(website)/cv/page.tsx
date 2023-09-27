import CvPage from '@/components/pages/cv/CvPage'
import { getCvPage } from '@/sanity/lib/sanity.fetch'
import { notFound } from 'next/navigation'

export const runtime = 'edge'

export const revalidate = 60

export default async function CV() {
    const data = await getCvPage()
    if (!data) {
        notFound()
    }
    return <CvPage data={data} />
}
