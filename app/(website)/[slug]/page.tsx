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

export default async function PageSlugRoute({ params }: Props) {
    const data = await getExhibitionBySlug(params.slug)
    console.log({ data })

    if (!data) {
        notFound()
    }

    return <div>SlugRoute</div>
}
