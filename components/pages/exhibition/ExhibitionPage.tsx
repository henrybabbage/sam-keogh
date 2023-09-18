import { css } from '@/styled-system/css'

import type { ExhibitionPagePayload } from '@/types'

export type ExhibitionPageProps = {
    data: ExhibitionPagePayload | null
}

export default function ExhibitionPage({ data }: ExhibitionPageProps) {
    const { exhibition = {} } = data ?? {}
    console.log({ exhibition })
    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div>Exhibition Slug Page</div>
        </main>
    )
}
