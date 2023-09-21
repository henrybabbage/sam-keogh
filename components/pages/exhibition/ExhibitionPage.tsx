import { DynamicImage } from '@/components/common/DynamicImage'
import VideosList from '@/components/common/VideosList'
import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import type { ExhibitionPagePayload } from '@/types'
import { format } from 'date-fns'
import Link from 'next/link'

export default function ExhibitionPage({ data }: ExhibitionPagePayload) {
    const { title, startDate, endDate, imageGallery, venue, vimeo, pressRelease } = data ?? {}
    return (
        <main className={css({ height: '100vh', maxHeight: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <header
                className={cx(
                    flex({
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }),
                    css({ height: '14vh', zIndex: 10 })
                )}
            >
                <Link
                    href="/exhibitions"
                    className={css({
                        position: 'fixed',
                        top: '12px',
                        right: '12px',
                        fontFamily: 'simula',
                        fontStyle: 'normal',
                        fontSize: 'lg',
                        textTransform: 'uppercase',
                        _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: '#0026F5' }
                    })}
                >
                    Back
                </Link>
            </header>
            <div className={flex({ gap: '4', w: '100%', h: '100%' })}>
                <div className={flex({ flexDirection: 'column', h: '100%', gap: 12, w: '1/3' })}>
                    <div>
                        {title && <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic', fontSize: 'md' })}>{title}</h3>}
                        {venue && (
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md' })}>
                                {venue.name && <span>{venue.city ? venue.name + ', ' : venue.name}</span>}
                                {venue.city && <span>{venue.country ? venue.city + ', ' : venue.city}</span>}
                                {venue.country && <span>{venue.country}</span>}
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
                    <div className={flex({ flexDirection: 'column', gap: 6 })}>
                        {pressRelease && (
                            <button
                                className={css({
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: '#0026F5' }
                                })}
                            >
                                <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Text</h3>
                            </button>
                        )}
                        {imageGallery && (
                            <button
                                className={css({
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: '#0026F5' }
                                })}
                            >
                                <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Image</h3>
                            </button>
                        )}
                        {vimeo && (
                            <button
                                className={css({
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: '#0026F5' }
                                })}
                            >
                                <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Video</h3>
                            </button>
                        )}
                    </div>
                </div>
                <div className={flex({ flexDirection: 'column', gap: '0', h: '100%', w: '2/3' })}>
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
                    {vimeo && <VideosList videos={vimeo} provider="vimeo" />}
                </div>
            </div>
        </main>
    )
}
