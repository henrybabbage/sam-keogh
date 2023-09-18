import { client } from "@/sanity/lib/sanity.client"
import { cvPageQuery } from "@/sanity/lib/sanity.queries"
import { CvPagePayload } from "@/types"
import { notFound } from "next/navigation"

export default async function CV() {
    const data = await client.fetch<CvPagePayload | null>(cvPageQuery)
    console.log({ data })
    if (!data) {
        notFound()
    }
    return <div>CV page</div>
}
