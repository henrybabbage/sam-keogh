import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import Link from 'next/link'

export default function Nav() {
    return (
        <nav className={css({ position: 'fixed', bottom: '0', width: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={flex({ justifyContent: 'space-between' })}>
                <Link href="/exhibitions">
                    <h2
                        className={css({
                            width: 'fit-content',
                            color: 'black',
                            fontFamily: 'simula',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                        })}
                    >
                        Exhibitions
                    </h2>
                </Link>
                <Link href="/cv">
                    <h2
                        className={css({
                            width: 'fit-content',
                            color: 'black',
                            fontFamily: 'simula',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
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
                            fontFamily: 'simula',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                        })}
                    >
                        Contact
                    </h2>
                </Link>
            </div>
        </nav>
    )
}
