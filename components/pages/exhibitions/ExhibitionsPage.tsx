import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

import { resolveHref } from '@/sanity/lib/sanity.links'
import type { ExhibitionProps, ExhibitionsPagePayload } from '@/types'
import Link from 'next/link'
import ExhibitionListItem from './ExhibitionListItem'
import ExhibitionPreview from './ExhibitionPreview'

export default function ExhibitionsPage(props: ExhibitionsPagePayload) {
    const { exhibitions = [] } = props || {}

    const sortExhibitionsByYear = (exhibitions: ExhibitionProps[]) => {
        const years = getExhibitionYears(exhibitions)
        const exhibitionsByYear: { [key: string]: ExhibitionProps[] } = {}
        years.forEach((year) => {
            exhibitionsByYear[year] = exhibitions.filter((exhibition) => exhibition.year === year)
        })
        return exhibitionsByYear
    }

    function getExhibitionYears(exhibitions: ExhibitionProps[]) {
        const years = exhibitions.reduce((acc: string[], exhibition) => {
            const year = exhibition.year
            if (!acc.includes(year)) {
                acc.push(year)
            }
            return acc
        }, [])
        return years.sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
    }

    const sortedExhibitions = sortExhibitionsByYear(exhibitions)

    return (
        <main
            className={css({
                minHeight: '100vh',
                height: '100vh',
                width: '100%',
                maxWidth: '100vw',
                p: { base: '16px 16px 14vh 16px', lg: '16px 40px 14vh 40px' }
            })}
        >
            <div className={flex({ w: '100%' })}>
                <div className={flex({ flexDirection: 'column', w: { base: '100%', md: '2/3', lg: '1/3' } })}>
                    <header
                        className={cx(
                            flex({
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }),
                            css({ height: { base: '7vh', lg: '14vh' }, zIndex: 10 })
                        )}
                    ></header>
                    <div className={flex({ gap: '8', h: 'fit-content', mb: '7vh', pr: '8', pb: '14vh' })}>
                        <div className={flex({ flexDirection: 'column', gap: '4' })}>
                            <section className={flex({ flexDirection: 'column', gap: { base: '2', lg: '4' } })}>
                                {Object.entries(sortedExhibitions)
                                    .reverse()
                                    .map(([year, exhibitions]) => (
                                        <div key={year} className={flex({ flexDirection: 'column', gap: { base: '2', lg: '4' } })}>
                                            <h3 className={css({ fontFamily: 'neueMontreal', fontSize: { base: 'sm', lg: 'lg' }, fontWeight: '700' })}>
                                                {year}
                                            </h3>
                                            {exhibitions.map((exhibition: ExhibitionProps) => {
                                                const href = resolveHref(exhibition._type, exhibition.slug)
                                                if (!href) {
                                                    return null
                                                }
                                                return (
                                                    <Link key={exhibition._id} href={href}>
                                                        <ExhibitionListItem exhibition={exhibition} />
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    ))}
                            </section>
                        </div>
                    </div>
                </div>
                <div className={flex({ hideBelow: 'lg', flexDirection: 'column', w: '2/3', position: 'sticky', top: '14vh', h: '86vh' })}>
                    {exhibitions &&
                        exhibitions.length > 0 &&
                        exhibitions.map((exhibition: ExhibitionProps) => (
                            <div key={exhibition._id} className={css({ position: 'absolute', inset: 0 })}>
                                {exhibition.imageGallery && exhibition.imageGallery.length > 0 && (
                                    <ExhibitionPreview image={exhibition.imageGallery[0]} id={exhibition._id} />
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </main>
    )
}
