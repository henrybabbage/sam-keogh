import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

import { resolveHref } from '@/sanity/lib/sanity.links'
import type { ExhibitionProps, ExhibitionsPagePayload } from '@/types'
import Link from 'next/link'
import ExhibitionListItem from './ExhibitionListItem'
import ExhibitionPreview from './ExhibitionPreview'

export default function ExhibitionsPage({ data }: ExhibitionsPagePayload) {
    const exhibitions = data || []

    function sortExhibitions(exhibitions: ExhibitionProps[]) {
        const now = new Date()
        const upcomingExhibitions: ExhibitionProps[] = []
        const pastExhibitions: ExhibitionProps[] = []

        exhibitions.forEach((exhibition) => {
            const endDate = exhibition.endDate ? new Date(exhibition.endDate) : null
            if (endDate && endDate >= now) {
                upcomingExhibitions.push(exhibition)
            } else {
                pastExhibitions.push(exhibition)
            }
        })


        return { upcomingExhibitions, pastExhibitions }
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

    console.log(getExhibitionYears(exhibitions))

    const { upcomingExhibitions, pastExhibitions } = sortExhibitions(exhibitions)

    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100%', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={flex({ gap: '4', w: '100%' })}>
                <div className={flex({ flexDirection: 'column', w: '1/3' })}>
                    <div className={flex({ h: '14vh', alignItems: 'center' })}>
                        <h1 className={css({ fontFamily: 'azeretMono', position: 'fixed', opacity: 0 })}>Exhibitions</h1>
                    </div>
                    <div className={flex({ gap: '8', h: 'fit-content', mb: '8vh' })}>
                        <div className={flex({ flexDirection: 'column', gap: '8' })}>
                            <section className={flex({ flexDirection: 'column', gap: '4' })}>
                                <h1 className={css({ fontFamily: 'simula', fontSize: 'lg' })}>Upcoming / Current</h1>
                                {upcomingExhibitions && upcomingExhibitions.length > 0 && (
                                    <div className={flex({ flexDirection: 'column', gap: '4' })}>
                                        {upcomingExhibitions.map((exhibition: ExhibitionProps) => {
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
                                )}
                            </section>
                            <section className={flex({ flexDirection: 'column', gap: '4' })}>
                                <h1 className={css({ fontFamily: 'simula', fontSize: 'lg' })}>Past</h1>
                                {pastExhibitions && pastExhibitions.length > 0 && (
                                    <div className={flex({ flexDirection: 'column', gap: '4' })}>
                                        {pastExhibitions.map((exhibition: ExhibitionProps) => {
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
                                )}
                            </section>
                        </div>
                    </div>
                </div>
                <div className={flex({ flexDirection: 'column', gap: '4', w: '2/3', position: 'sticky', top: '14vh', h: '86vh' })}>
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
