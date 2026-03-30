import ContactPage from "@/components/pages/contact/ContactPage"
import { getContactPage } from "@/sanity/lib/sanity.fetch"
import { notFound } from "next/navigation"

export default async function Contact() {
    const data = await getContactPage()
    if (!data) {
        notFound()
    }
    return <ContactPage data={data} />
}
