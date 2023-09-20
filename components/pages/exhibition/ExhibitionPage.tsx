import { DynamicImage } from '@/components/common/DynamicImage'
import VimeoPlayer from '@/components/common/VimeoPlayer'
import { css, cx } from '@/styled-system/css'
import { flex, grid, gridItem, scrollable } from '@/styled-system/patterns'
import type { ExhibitionPagePayload } from '@/types'
import { format } from 'date-fns'
import Link from 'next/link'

export default function ExhibitionPage({ data }: ExhibitionPagePayload) {
    const { title, startDate, endDate, imageGallery, venue, vimeo } = data ?? {}
    return (
        <main className={css({ height: '100vh', maxHeight: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <header
                className={cx(
                    flex({
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }),
                    css({ height: 'fit-content', position: 'fixed', top: '12px', right: '12px', zIndex: 10 })
                )}
            >
                <Link
                    href="/exhibitions"
                    className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', _hover: { textDecoration: 'underline', color: '#0026F5' } })}
                >
                    Back to exhibitions
                </Link>
            </header>
            <div className={css({ position: 'fixed', top: '20vh', w: '3/12' })}>
                <div className={cx(flex({ flexDirection: 'column', h: '100%', gap: 6 }))}>
                    <div>
                        {title && <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic', fontSize: 'md' })}>{title}</h3>}
                        {venue && (
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md' })}>
                                <span>
                                    {venue?.name}
                                    {', '}
                                </span>
                                <span>
                                    {venue?.city}
                                    {', '}
                                </span>
                                <span>{venue?.country}</span>
                            </h3>
                        )}
                        {startDate && endDate && (
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic', fontSize: 'md' })}>
                                <span>{format(new Date(startDate), 'dd MMM')}</span>
                                <span>{' — '}</span>
                                <span>{format(new Date(endDate), 'dd MMM yyyy')}</span>
                            </h3>
                        )}
                    </div>
                    <button className={css({ textAlign: 'left', cursor: 'pointer', _hover: { textDecoration: 'underline', color: '#0026F5' } })}>
                        <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Text</h3>
                    </button>
                </div>
            </div>
            <div className={grid({ columns: 12, gap: '0', pt: '20vh' })}>
                <div
                    className={cx(
                        gridItem({ colStart: 4, colEnd: 13 }),
                        flex({ flexDirection: 'column' }),
                        scrollable({ direction: 'vertical', hideScrollbar: true })
                    )}
                >
                    {imageGallery && imageGallery.length > 0 && (
                        <>
                            {imageGallery.map((image, key) => (
                                <div
                                    key={key}
                                    className={css({
                                        position: 'relative'
                                    })}
                                >
                                    <DynamicImage
                                        asset={image}
                                        mode="cover"
                                        sizes="80vw"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                    <figcaption className={css({ my: 4 })}>
                                        <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal' })}>{image?.caption}</h3>
                                    </figcaption>
                                </div>
                            ))}
                        </>
                    )}
                    {vimeo && <VimeoPlayer videos={vimeo} provider="vimeo" />}
                </div>
            </div>
        </main>
    )
}
