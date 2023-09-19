import ExhibitionPage from '@/components/pages/exhibition/ExhibitionPage'
import { getExhibitionBySlug, getExhibitionsPaths } from '@/sanity/lib/sanity.fetch'
import { notFound } from 'next/navigation'

// export const runtime = 'edge'

type Props = {
    params: { slug: string }
}

export async function generateStaticParams() {
    const slugs = await getExhibitionsPaths()
    return slugs.map((slug) => ({ slug }))
}

export default async function ExhibitionSlugRoute({ params }: Props) {
    const data = await getExhibitionBySlug(params.slug)

    if (!data) {
        notFound()
    }

    return <ExhibitionPage data={data} />
}
