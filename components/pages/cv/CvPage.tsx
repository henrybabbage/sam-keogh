import { CustomPortableText } from "@/components/common/CustomPortableText"
import { CvPagePayload } from "@/types"

export type CvPageProps = {
    data: CvPagePayload | null
}

export default function CvPage({ data }: CvPageProps) {
    const { cv } = data ?? {}
    return <div>{cv && <CustomPortableText paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl" value={cv} />}</div>
}
