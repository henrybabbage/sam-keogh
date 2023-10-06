import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { token } from '@/styled-system/tokens'
import Link from 'next/link'

type Props = {
    color: string
}

export default function Nav(props: Props) {
    const { color } = props ?? 'theme'
    console.log(color)
    return (
        <nav
            style={{
                // background: token(`colors.${color}`)
                background: token('colors.theme')
            }}
            className={css({
                position: 'fixed',
                bottom: '0',
                width: '100vw',
                py: { base: '12px', lg: '16px' },
                px: '16px'
                // bg: '#FFF1E5'
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
