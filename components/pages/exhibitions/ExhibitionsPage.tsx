import { css, cx } from '@/styled-system/css'
import { aspectRatio, flex, grid, gridItem, scrollable } from '@/styled-system/patterns'

import type { ExhibitionsPagePayload } from '@/types'

export type ExhibitionsPageProps = {
    data: ExhibitionsPagePayload | null
}

export default function ExhibitionsPage({ data }: ExhibitionsPageProps) {
    const { exhibitions = [] } = data ?? {}
    console.log({ exhibitions })
    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={grid({ columns: 12, gap: '0' })}>
                <div className={gridItem({ colStart: 1, colEnd: 5, rowStart: 1, rowEnd: 3, alignSelf: 'center' })}>
                    <h1 className={css({ fontFamily: 'azeretMono' })}>Exhibitions</h1>
                </div>
                <div className={gridItem({ colStart: 1, colEnd: 5, rowStart: 3, rowEnd: 13 })}>
                    <div className={scrollable({ direction: 'vertical', hideScrollbar: true })}>
                        <h1 className={css({ fontFamily: 'azeretMono' })}>Upcoming / Current</h1>
                        <h1 className={css({ fontFamily: 'azeretMono' })}>Past</h1>
                    </div>
                </div>
                <div className={gridItem({ colStart: 5, colEnd: 13, rowStart: 1, rowEnd: 13 })}>
                    <div className={cx(flex({ flexDirection: 'column' }), scrollable({ direction: 'vertical', hideScrollbar: true }))}>
                        <div className={aspectRatio()}>Exhibition preview images</div>
                    </div>
                </div>
            </div>
        </main>
    )
}
