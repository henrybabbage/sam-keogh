'use client'

import AspectImage from '@/components/common/AspectImage'
import { CustomPortableText } from '@/components/common/CustomPortableText'
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
        <main className={flex({ flexWrap: 'wrap', width: '100%', p: { base: '16px', lg: '16px 40px' } })}>
            <header
                className={cx(
                    flex({
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }),
                    css({ height: { base: '7vh', lg: '14vh' } })
                )}
            >
                <Link
                    href="/work"
                    className={css({
                        position: 'fixed',
                        top: '16px',
                        left: { base: '16px', lg: '40px' },
                        zIndex: '100'
                    })}
                >
                    <h2
                        className={css({
                            fontFamily: 'neueMontreal',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: { base: 'md', lg: 'xl' },
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                    >
                        Back
                    </h2>
                </Link>
            </header>
            <div
                className={flex({
                    // gridTemplateColumns: 'repeat(auto-fit, minmax(12.5em, 25em))',
                    // flexGrow: '999',
                    flexBasis: { base: '100%', lg: '25em', xl: '12.5em' },
                    position: { base: 'relative', xl: 'sticky' },
                    top: { base: '7vh', lg: 'calc(14vh + 16px)' },
                    h: 'fit-content',
                    order: { base: '1', lg: '1' },
                    mb: { base: '14vh', lg: '8' }
                })}
            >
                <div className={flex({ flexDirection: 'column', gap: 8 })}>
                    <div className={flex({ flexDirection: 'column', pr: 8 })}>
                        <div className={css({ pb: 8 })}>
                            {title && <h3 className={css({ fontFamily: 'simula', fontStyle: 'italic', fontSize: { base: 'sm', lg: 'lg' } })}>{title}</h3>}
                        </div>
                        {venue && (
                            <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: { base: 'sm', lg: 'lg' } })}>
                                {venue.name && <span>{venue.city ? venue.name + ', ' : venue.name}</span>}
                                {venue.city && <span>{venue.city}</span>}
                            </h3>
                        )}
                        {startDate && endDate && (
                            <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: { base: 'sm', lg: 'lg' } })}>
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
                                <h3
                                    className={css({
                                        fontFamily: 'neueMontreal',
                                        fontStyle: 'normal',
                                        fontSize: { base: 'sm', lg: 'lg' },
                                        textTransform: 'uppercase'
                                    })}
                                >
                                    Images
                                </h3>
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
                                <h3
                                    className={css({
                                        fontFamily: 'neueMontreal',
                                        fontStyle: 'normal',
                                        fontSize: { base: 'sm', lg: 'lg' },
                                        textTransform: 'uppercase'
                                    })}
                                >
                                    {vimeo.length > 1 ? 'Videos' : 'Video'}
                                </h3>
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
                                <h3
                                    className={css({
                                        fontFamily: 'neueMontreal',
                                        fontStyle: 'normal',
                                        fontSize: { base: 'sm', lg: 'lg' },
                                        textTransform: 'uppercase'
                                    })}
                                >
                                    Text
                                </h3>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={flex({
                    justifyContent: 'end',
                    flexBasis: '1000px',
                    flexGrow: '1',
                    mt: { base: '0', lg: '14vh' },
                    h: 'fit-content',
                    mb: { base: '7vh', lg: '14vh' },
                    order: { base: '2', lg: '2' }
                })}
            >
                <div className={flex({ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12', w: '100%', h: '100%' })}>
                    {imageGallery && imageGallery.length > 0 && (
                        <section ref={images} className={css({ position: 'relative', w: '100%' })}>
                            {imageGallery.map((image, key) => (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: 'easeInOut' }}
                                    variants={{
                                        visible: { opacity: 1 },
                                        hidden: { opacity: 0 }
                                    }}
                                    key={key}
                                    className={css({
                                        position: 'relative',
                                        w: '100%',
                                        bg: 'background'
                                    })}
                                >
                                    <AspectImage image={image} alt={image.alt} priority={false} fill={true} mode="contain" sizes="100vw" />
                                    <figcaption className={css({ my: 4 })}>
                                        <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal' })}>{image?.caption}</h3>
                                    </figcaption>
                                </motion.div>
                            ))}
                        </section>
                    )}
                    {vimeo && (
                        <section
                            ref={videos}
                            className={css({
                                position: 'relative',
                                w: { base: '100%', lg: '66vw' },
                                bg: 'background'
                            })}
                        >
                            {vimeo &&
                                vimeo.map((video) => (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: 'easeInOut' }}
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
                            transition={{ duration: 1, ease: 'easeInOut' }}
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
                                    fontSize: { base: 'sm', lg: 'lg' },
                                    lineHeight: 'xl',
                                    maxWidth: '80ch',
                                    textAlign: 'justify'
                                })}
                            />
                        </motion.section>
                    )}
                </div>
            </div>
        </main>
    )
}
