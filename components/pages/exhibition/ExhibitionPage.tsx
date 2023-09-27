'use client'

import { CustomPortableText } from '@/components/common/CustomPortableText'
import { DynamicImage } from '@/components/common/DynamicImage'
import VimeoPlayer from '@/components/common/VimeoPlayer'
import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import type { ExhibitionPagePayload } from '@/types'
import { useScrollIntoView } from '@mantine/hooks'
import { format } from 'date-fns'
import Link from 'next/link'

export default function ExhibitionPage({ data }: ExhibitionPagePayload) {
    const { title, startDate, endDate, imageGallery, venue, vimeo, pressRelease } = data ?? {}

    const { scrollIntoView: scrollIntoViewImages, targetRef: imagesRef } = useScrollIntoView<HTMLDivElement>({
        duration: 800,
        offset: 12
    })

    const { scrollIntoView: scrollIntoViewVideos, targetRef: videosRef } = useScrollIntoView<HTMLDivElement>({
        duration: 800,
        offset: 12
    })

    const { scrollIntoView: scrollIntoViewText, targetRef: textRef } = useScrollIntoView<HTMLDivElement>({
        duration: 800,
        offset: 12
    })

    return (
        <main className={flex({ flexWrap: 'wrap', width: '100%', maxWidth: '1440px', p: '12px', bg: 'var(--background-primary)' })}>
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
                    href="/work"
                    className={css({
                        zIndex: 10,
                        position: 'fixed',
                        top: '12px',
                        left: '12px',
                        fontFamily: 'simula',
                        fontStyle: 'normal',
                        fontSize: 'md',
                        textTransform: 'uppercase',
                        _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                    })}
                >
                    Back
                </Link>
            </header>

            <div
                className={flex({
                    flexBasis: '1/5',
                    flexGrow: 1,
                    flexDirection: 'column',
                    gap: 8,
                    position: 'sticky',
                    top: 'calc(14vh + 12px)',
                    w: '1/5',
                    h: 'fit-content'
                })}
            >
                <div className={flex({ flexDirection: 'column', gap: 0, pr: '8' })}>
                    {title && <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic', fontSize: 'md' })}>{title}</h3>}
                    {venue && (
                        <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md' })}>
                            {venue.name && <span>{venue.city ? venue.name + ', ' : venue.name}</span>}
                            {venue.city && <span>{venue.city}</span>}
                            {/* {venue.city && <span>{venue.country ? venue.city + ', ' : venue.city}</span>} */}
                            {/* {venue.country && <span>{venue.country}</span>} */}
                        </h3>
                    )}
                    {startDate && endDate && (
                        <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic', fontSize: 'md', fontVariantNumeric: 'slashed-zero' })}>
                            <span>{format(new Date(startDate), 'dd MMM')}</span>
                            <span>{' — '}</span>
                            <span>{format(new Date(endDate), 'dd MMM yyyy')}</span>
                        </h3>
                    )}
                </div>
                <div className={flex({ flexDirection: 'column', gap: 4, w: '100%' })}>
                    {imageGallery && (
                        <button
                            onClick={() =>
                                scrollIntoViewImages({
                                    alignment: 'start'
                                })
                            }
                            className={css({
                                textAlign: 'left',
                                cursor: 'pointer',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                            })}
                        >
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Images</h3>
                        </button>
                    )}
                    {vimeo && (
                        <button
                            onClick={() =>
                                scrollIntoViewVideos({
                                    alignment: 'start'
                                })
                            }
                            className={css({
                                textAlign: 'left',
                                cursor: 'pointer',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                            })}
                        >
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Videos</h3>
                        </button>
                    )}
                    {pressRelease && (
                        <button
                            onClick={() =>
                                scrollIntoViewText({
                                    alignment: 'start'
                                })
                            }
                            className={css({
                                textAlign: 'left',
                                cursor: 'pointer',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                            })}
                        >
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Text</h3>
                        </button>
                    )}
                </div>
            </div>

            <div
                className={flex({
                    // minInlineSize: '30%',
                    flexBasis: '4/5',
                    flexGrow: '999',
                    // w: '4/5',
                    mt: '14vh',
                    h: 'fit-content',
                    mb: '14vh'
                })}
            >
                <div className={flex({ flexDirection: 'column', gap: '12' })}>
                    {imageGallery && imageGallery.length > 0 && (
                        <section ref={imagesRef}>
                            {imageGallery.map((image, key) => (
                                <div
                                    key={key}
                                    className={css({
                                        position: 'relative',
                                        mb: 4
                                    })}
                                >
                                    <DynamicImage
                                        asset={image}
                                        mode="cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 70vw"
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
                        </section>
                    )}
                    {vimeo && (
                        <section ref={videosRef}>
                            {vimeo &&
                                vimeo.map((video) => (
                                    <div key={video._key}>
                                        <VimeoPlayer url={video.url} title={video.title} />
                                    </div>
                                ))}
                        </section>
                    )}
                    {pressRelease && (
                        <section ref={textRef}>
                            <CustomPortableText
                                value={pressRelease}
                                paragraphClasses={css({
                                    fontFamily: 'simula',
                                    mb: 4,
                                    color: 'black',
                                    fontSize: 'lg',
                                    lineHeight: 'xl'
                                })}
                            />
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}
