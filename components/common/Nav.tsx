import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import Link from 'next/link'

export default function Nav() {
    return (
        <nav
            className={css({
                position: 'fixed',
                bottom: '0',
                width: '100vw',
                py: { base: '12px', lg: '16px' },
                px: '12px',
                bg: '#FFF1E5'
            })}
        >
            <div className={flex({ justifyContent: 'space-between' })}>
                <Link href="/work">
                    <h2
                        className={css({
                            width: 'fit-content',
                            color: 'black',
                            fontFamily: 'azeretMono',
                            fontWeight: '700',
                            fontSize: 'md',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                    >
                        Work
                    </h2>
                </Link>
                <Link href="/cv">
                    <h2
                        className={css({
                            width: 'fit-content',
                            color: 'black',
                            fontFamily: 'azeretMono',
                            fontWeight: '700',
                            fontSize: 'md',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                    >
                        CV
                    </h2>
                </Link>
                <Link href="/contact">
                    <h2
                        className={css({
                            width: 'fit-content',
                            color: 'black',
                            fontFamily: 'azeretMono',
                            fontWeight: '700',
                            fontSize: 'md',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                    >
                        Contact
                    </h2>
                </Link>
            </div>
        </nav>
    )
}
