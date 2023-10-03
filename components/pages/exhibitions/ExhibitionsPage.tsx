import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

import { resolveHref } from '@/sanity/lib/sanity.links'
import type { ExhibitionProps, ExhibitionsPagePayload, UpcomingProps } from '@/types'
import Link from 'next/link'
import ExhibitionListItem from './ExhibitionListItem'
import ExhibitionPreview from './ExhibitionPreview'
import UpcomingListItem from './UpcomingListItem'

export default function ExhibitionsPage(props: ExhibitionsPagePayload) {
    const { exhibitions = [], upcoming = [] } = props || {}

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
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100%', maxWidth: '100vw', p: '12px', bg: 'background' })}>
            <div className={flex({ w: '100%' })}>
                <div className={flex({ flexDirection: 'column', w: { base: '100%', md: '2/3', lg: '1/3' } })}>
                    <div className={flex({ h: { base: '14vh', lg: '14vh' }, w: '100%', alignItems: 'center' })}>
                        <h1
                            className={css({
                                fontFamily: 'azeretMono',
                                textTransform: 'uppercase',
                                fontSize: { base: 'sm', lg: 'md' },
                                fontWeight: '700',
                                color: 'foreground',
                                position: 'fixed',
                                opacity: 0
                            })}
                        >
                            Exhibitions
                        </h1>
                    </div>
                    <div className={flex({ gap: '8', h: 'fit-content', mb: '8vh', pr: '8' })}>
                        <div className={flex({ flexDirection: 'column', gap: '8' })}>
                            <section className={flex({ flexDirection: 'column', gap: '4' })}>
                                <h1
                                    className={css({
                                        fontFamily: 'azeretMono',
                                        textTransform: 'uppercase',
                                        fontSize: { base: 'sm', lg: 'md' },
                                        fontWeight: '700',
                                        color: 'foreground',
                                        visibility: 'hidden'
                                    })}
                                >
                                    Upcoming / Current
                                </h1>
                                <div className={flex({ flexDirection: 'column', gap: { base: '2', lg: '4' } })}>
                                    {upcoming &&
                                        upcoming.map((item: UpcomingProps) => {
                                            return (
                                                <a key={item._id} href={item.url} target="_blank" rel="noreferrer">
                                                    <UpcomingListItem upcoming={item} />
                                                </a>
                                            )
                                        })}
                                </div>
                            </section>
                            <section className={flex({ flexDirection: 'column', gap: { base: '2', lg: '4' } })}>
                                <h1
                                    className={css({
                                        fontFamily: 'azeretMono',
                                        textTransform: 'uppercase',
                                        fontSize: { base: 'sm', lg: 'md' },
                                        fontWeight: '700',
                                        color: 'foreground',
                                        visibility: 'hidden'
                                    })}
                                >
                                    Past
                                </h1>
                                {Object.entries(sortedExhibitions)
                                    .reverse()
                                    .map(([year, exhibitions]) => (
                                        <div key={year} className={flex({ flexDirection: 'column', gap: { base: '2', lg: '4' } })}>
                                            <h3 className={css({ fontFamily: 'azeretMono', fontSize: { base: 'sm', lg: 'md' }, fontWeight: '700' })}>{year}</h3>
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
                <div className={flex({ hideBelow: 'lg', flexDirection: 'column', w: '2/3', position: 'sticky', top: 'calc(14vh + 12px)', h: '86vh' })}>
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
