/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import AspectImage from '@/components/common/AspectImage'
import { CustomPortableText } from '@/components/common/CustomPortableText'
import VimeoPlayer from '@/components/common/VimeoPlayer'
import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import type { ExhibitionPagePayload } from '@/types'
import { useScrollIntoView } from '@mantine/hooks'
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

    // const tabletAndBelow = useMediaQuery('(max-width: 1024px)')

    return (
        <main className={flex({ flexWrap: 'wrap', width: '100vw', p: { base: '16px', lg: '16px 40px' } })}>
                <div
                    className={flex({
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12',
                        w: '100%',
                        h: '100%'
                    })}
                >
                    {imageGallery && imageGallery.length > 0 && (
                        <section ref={images} className={css({ position: 'relative', w: '100%', h: '100%' })}>
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
                                    className={cx(
                                        css({
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            w: '100%',
                                            mb: 4,
                                            bg: 'background'
                                        })
                                    )}
                                >
                                    <AspectImage
                                        image={image}
                                        alt={image.alt}
                                        priority={false}
                                        fill={true}
                                        height={image.height}
                                        width={image.width}
                                        mode="contain"
                                        sizes="100vw"
                                    />
                                    <figcaption className={css({ my: 4, h: '8vh' })}>
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
                                    fontSize: { base: 'sm', lg: 'lg' },
                                    lineHeight: 'xl'
                                })}
                            />
                        </motion.section>
                    )}
                </div>
        </main>
    )
}
