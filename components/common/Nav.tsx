'use client'

import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type NavProps = {
    background: string
}

export default function Nav(props: NavProps) {
    const { background } = props
    const pathname = usePathname()
    // background: `linear-gradient(to top, ${background} 0%, ${background} 70%, transparent)`
    return (
        <>
            <nav
                className={css({
                    position: 'fixed',
                    bottom: '0',
                    width: '100vw',
                    pb: { base: '12px', lg: '16px' },
                    pt: { base: '12px', lg: '16px' },
                    px: { base: '16px', lg: '40px' },
                    zIndex: '100'
                })}
            >
                <div className={flex({ justifyContent: 'space-between' })}>
                    <Link href="/work">
                        <h2
                            className={css({
                                width: 'fit-content',
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                fontSize: { base: 'md', lg: 'xl' },
                                textTransform: 'uppercase',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                                _active: { color: 'active' },
                                color: pathname === '/work' ? 'hover' : 'foreground'
                            })}
                        >
                            Work
                        </h2>
                    </Link>
                    <Link href="/cv">
                        <h2
                            className={css({
                                width: 'fit-content',
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                fontSize: { base: 'md', lg: 'xl' },
                                textTransform: 'uppercase',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                                _active: { color: 'active' },
                                color: pathname === '/cv' ? 'hover' : 'foreground'
                            })}
                        >
                            CV
                        </h2>
                    </Link>
                    <Link href="/contact">
                        <h2
                            className={css({
                                width: 'fit-content',
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                fontSize: { base: 'md', lg: 'xl' },
                                textTransform: 'uppercase',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                                _active: { color: 'active' },
                                color: pathname === '/contact' ? 'hover' : 'foreground'
                            })}
                        >
                            Contact
                        </h2>
                    </Link>
                </div>
            </nav>
            <div
                className={css({
                    maskImage: 'linear-gradient(to bottom, transparent 10%, black)',
                    w: '100%',
                    h: '100px',
                    position: 'fixed',
                    bottom: '0',
                    zIndex: '0'
                })}
                style={{
                    background: background
                }}
            ></div>
        </>
    )
}
