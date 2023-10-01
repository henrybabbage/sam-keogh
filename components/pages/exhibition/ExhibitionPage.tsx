'use client'

import { CustomPortableText } from '@/components/common/CustomPortableText'
import { DynamicImage } from '@/components/common/DynamicImage'
import VimeoPlayer from '@/components/common/VimeoPlayer'
import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import type { ExhibitionPagePayload } from '@/types'
import { useScrollIntoView } from '@mantine/hooks'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ExhibitionPage({ data }: ExhibitionPagePayload) {
    const { title, startDate, endDate, imageGallery, venue, vimeo, pressRelease } = data ?? {}

    const { scrollIntoView: scrollIntoViewImages, targetRef: images } = useScrollIntoView<HTMLDivElement>({
        duration: 800,
        offset: 12
    })

    const { scrollIntoView: scrollIntoViewVideos, targetRef: videos } = useScrollIntoView<HTMLDivElement>({
        duration: 800,
        offset: 12
    })

    const { scrollIntoView: scrollIntoViewText, targetRef: text } = useScrollIntoView<HTMLDivElement>({
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
                    css({ height: { base: 'auto', lg: '14vh' }, zIndex: 10 })
                )}
            >
                <Link
                    href="/work"
                    className={css({
                        zIndex: 10,
                        position: 'fixed',
                        top: '12px',
                        left: '12px',
                        fontFamily: 'azeretMono',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: 'lg',
                        textTransform: 'uppercase',
                        color: 'black',
                        _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                        _active: { color: 'active' }
                    })}
                >
                    Back
                </Link>
            </header>
            <div
                className={flex({
                    flexBasis: '300px',
                    flexGrow: '999',
                    position: 'sticky',
                    top: 'calc(14vh + 12px)',
                    h: 'fit-content',
                    order: { base: '2', lg: '1' },
                    mb: { base: '14vh', lg: '8' }
                })}
            >
                <div className={flex({ flexDirection: 'column', gap: 8 })}>
                    <div className={flex({ flexDirection: 'column', pr: 8 })}>
                        <div className={css({ pb: 8 })}>
                            {title && <h3 className={css({ fontFamily: 'simula', fontStyle: 'italic', fontSize: 'lg' })}>{title}</h3>}
                        </div>
                        {venue && (
                            <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: 'lg' })}>
                                {venue.name && <span>{venue.city ? venue.name + ', ' : venue.name}</span>}
                                {venue.city && <span>{venue.city}</span>}
                                {/* {venue.city && <span>{venue.country ? venue.city + ', ' : venue.city}</span>} */}
                                {/* {venue.country && <span>{venue.country}</span>} */}
                            </h3>
                        )}
                        {startDate && endDate && (
                            <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: 'lg' })}>
                                <span>{format(new Date(startDate), 'dd MMM')}</span>
                                <span>{' — '}</span>
                                <span>{format(new Date(endDate), 'dd MMM yyyy')}</span>
                            </h3>
                        )}
                    </div>
                    <div className={flex({ hideBelow: 'md', flexDirection: 'column', gap: 4, w: '100%' })}>
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
                                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                                    _active: { color: 'active' }
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
                                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                                    _active: { color: 'active' }
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
                                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                                    _active: { color: 'active' }
                                })}
                            >
                                <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>Text</h3>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={flex({
                    flexBasis: '1024px',
                    flexGrow: '1',
                    mt: '14vh',
                    h: 'fit-content',
                    mb: { base: '7vh', lg: '14vh' },
                    order: { base: '1', lg: '2' }
                })}
            >
                <div className={flex({ flexDirection: 'column', gap: '12' })}>
                    {imageGallery && imageGallery.length > 0 && (
                        <section ref={images}>
                            {imageGallery.map((image, key) => (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    variants={{
                                        visible: { opacity: 1 },
                                        hidden: { opacity: 0 }
                                    }}
                                    key={key}
                                    className={css({
                                        position: 'relative',
                                        mb: 4
                                    })}
                                >
                                    <DynamicImage
                                        asset={image}
                                        mode="cover"
                                        sizes="(min-width: 1360px) 1024px, calc(100vw - 24px)"
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
                                </motion.div>
                            ))}
                        </section>
                    )}
                    {vimeo && (
                        <section ref={videos}>
                            {vimeo &&
                                vimeo.map((video) => (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        variants={{
                                            visible: { opacity: 1 },
                                            hidden: { opacity: 0 }
                                        }}
                                        key={video._key}
                                    >
                                        <VimeoPlayer url={video.url} title={video.title} />
                                    </motion.div>
                                ))}
                        </section>
                    )}
                    {pressRelease && (
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            variants={{
                                visible: { opacity: 1 },
                                hidden: { opacity: 0 }
                            }}
                            ref={text}
                        >
                            <CustomPortableText
                                value={pressRelease}
                                paragraphClasses={css({
                                    fontFamily: 'simula',
                                    mb: 4,
                                    color: 'black',
                                    fontSize: 'lg',
                                    lineHeight: 'xl',
                                    textJustify: 'auto'
                                })}
                            />
                        </motion.section>
                    )}
                </div>
            </div>
        </main>
    )
}
