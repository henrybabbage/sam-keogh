import { css } from '@/styled-system/css'
import { aspectRatio, flex, grid, gridItem } from '@/styled-system/patterns'

import type { ExhibitionPagePayload } from '@/types'

export type ExhibitionPageProps = {
    data: ExhibitionPagePayload | null
}

export default function ExhibitionPage({ data }: ExhibitionPageProps) {
    const { exhibition = {} } = data ?? {}
    console.log({ exhibition })
    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={grid({ columns: 12, gap: '0' })}>
                <div className={gridItem({ colSpan: 4 })}>
                    <div className={flex({ flexDirection: 'column', h: '100%' })}>Exhibition menu</div>
                </div>
                <div className={gridItem({ colSpan: 8 })}>
                    <div className={aspectRatio()}>Exhibition preview images</div>
                </div>
            </div>
        </main>
    )
}
