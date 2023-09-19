import { css, cx } from '@/styled-system/css'
import { aspectRatio, flex, grid, gridItem, scrollable } from '@/styled-system/patterns'

import { resolveHref } from '@/sanity/lib/sanity.links'
import type { ExhibitionProps, ExhibitionsPagePayload } from '@/types'
import Link from 'next/link'
import ExhibitionListItem from './ExhibitionListItem'

export default function ExhibitionsPage({ data }: ExhibitionsPagePayload) {
    const exhibitions = data || []
    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={grid({ columns: 12, gap: '0' })}>
                <div className={gridItem({ colStart: 1, colEnd: 5, rowStart: 1, rowEnd: 3, alignSelf: 'center' })}>
                    <h1 className={css({ fontFamily: 'azeretMono' })}>Exhibitions</h1>
                </div>
                <div className={gridItem({ colStart: 1, colEnd: 5, rowStart: 3, rowEnd: 13 })}>
                    <div className={scrollable({ direction: 'vertical', hideScrollbar: true })}>
                        <section>
                            <h1 className={css({ fontFamily: 'azeretMono' })}>Upcoming / Current</h1>
                            {exhibitions && exhibitions.length > 0 && (
                                <div>
                                    {exhibitions.map((exhibition: ExhibitionProps, key: number) => {
                                        const href = resolveHref(exhibition._type, exhibition.slug)
                                        if (!href) {
                                            return null
                                        }
                                        return (
                                            <Link key={key} href={href}>
                                                <ExhibitionListItem exhibition={exhibition} />
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </section>
                        <section>
                            <h1 className={css({ fontFamily: 'azeretMono' })}>Past</h1>
                        </section>
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
