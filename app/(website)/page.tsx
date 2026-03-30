import HomePage from '@/components/pages/home/HomePage'
import { getHomePage } from '@/sanity/lib/sanity.fetch'
import { notFound } from 'next/navigation'

export default async function Home() {
    const data = await getHomePage()
    if (!data) {
        notFound()
    }
    return <HomePage data={data} />
}
