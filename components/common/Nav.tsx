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
    return (
        <nav
            style={{
                background: `linear-gradient(to top, ${background} 0%, ${background} 60%, transparent)`
            }}
            className={css({
                position: 'fixed',
                bottom: '0',
                width: '100vw',
                pb: { base: '12px', lg: '16px' },
                pt: { base: '12px', lg: '24px' },
                px: { base: '16px', lg: '40px' }
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
    )
}
