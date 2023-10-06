'use client'

import NextImage from '@/components/common/NextImage'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { HomePagePayload } from '@/types'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export type HomePageProps = {
    data: HomePagePayload | null
}

export default function HomePage({ data }: HomePageProps) {
    // Default to an empty object to allow previews on non-existent documents
    const { desktopHero, mobileHero } = data ?? {}

    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <main
            ref={ref}
            className={flex({
                justifyContent: 'center',
                p: { base: '12px', lg: '16px' },
                height: '100vh',
                maxHeight: '100vh',
                width: '100vw',
                position: 'relative'
            })}
        >
            {desktopHero && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isInView ? 1 : 0,
                        transition: {
                            duration: 0.4,
                            ease: 'easeInOut'
                        }
                    }}
                    className={css({
                        hideBelow: 'md',
                        position: 'relative',
                        height: '80vh',
                        width: '100vw',
                        overflow: 'hidden'
                    })}
                >
                    <NextImage image={desktopHero} priority={true} fill={true} mode='cover' />
                </motion.section>
            )}
            {mobileHero && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isInView ? 1 : 0,
                        transition: {
                            duration: 0.4,
                            ease: 'easeInOut'
                        }
                    }}
                    className={css({
                        hideFrom: 'md',
                        position: 'relative',
                        height: '80vh',
                        width: '100vw',
                        overflow: 'hidden'
                    })}
                >
                    <NextImage image={mobileHero} priority={true} fill={true} mode='contain' />
                </motion.section>
            )}
        </main>
    )
}
