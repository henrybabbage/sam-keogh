import { ExhibitionsPagePayload } from '@/types'

export type ExhibitionsPageProps = {
    data: ExhibitionsPagePayload | null
}

export default function ExhibitionsPage({ data }: ExhibitionsPageProps) {
    const { exhibitions = [] } = data ?? {}
    console.log({ exhibitions })
    return (
        <div>
            <div>Exhibitions</div>
        </div>
    )
}
