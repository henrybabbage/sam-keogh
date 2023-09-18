import { client } from "@/sanity/lib/sanity.client"
import { contactPageQuery } from "@/sanity/lib/sanity.queries"
import { ContactPagePayload } from "@/types"
import { notFound } from "next/navigation"

export default async function Contact() {
    const data = await client.fetch<ContactPagePayload | null>(contactPageQuery)
    console.log({ data })
    if (!data) {
        notFound()
    }
    return <div>Contact</div>
}
