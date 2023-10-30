import { css } from '@/styled-system/css'
import Link from 'next/link'

export default function NotFound() {
    return (
        <main className={css({ maxHeight: '100vh', height: '100dvh', width: '100vw', maxWidth: '100vw', p: { base: '16px', lg: '16px 40px' } })}>
            <div className={css({ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: '16px' })}>
                <h2
                    className={css({
                        fontFamily: 'neueMontreal',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: { base: 'md', lg: 'xl' },
                        textTransform: 'uppercase'
                    })}
                >
                    Not found
                </h2>
                <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: { base: 'sm', lg: 'lg' } })}>Could not find requested resource</h3>
                <Link href="/">
                    <h3
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
                        Return to homepage
                    </h3>
                </Link>
            </div>
        </main>
    )
}
