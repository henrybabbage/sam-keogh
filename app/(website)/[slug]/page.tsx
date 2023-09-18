// import { notFound } from 'next/navigation'
// import { getPageBySlug, getPagesPaths } from '@/sanity/lib/sanity.fetch'

// export const runtime = 'edge'

// type Props = {
//     params: { slug: string }
// }

// export async function generateStaticParams() {
//     const slugs = await getPagesPaths()
//     return slugs.map((slug) => ({ slug }))
// }

// export default async function PageSlugRoute({ params }: Props) {
//     const data = await getPageBySlug(params.slug)

//     if (!data) {
//         notFound()
//     }

//     return <div>SlugRoute</div>
// }
