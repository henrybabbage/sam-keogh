import { css } from '@/styled-system/css'

import type { ExhibitionsPagePayload } from '@/types'

export type ExhibitionsPageProps = {
    data: ExhibitionsPagePayload | null
}

export default function ExhibitionsPage({ data }: ExhibitionsPageProps) {
    const { exhibitions = [] } = data ?? {}
    console.log({ exhibitions })
    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div>Exhibitions</div>
        </main>
    )
}
