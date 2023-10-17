import { css } from '@/styled-system/css'
import Link from 'next/link'

export default function HomeButton() {
    return (
        <header
            className={css({
                position: 'fixed',
                top: '0',
                right: '0',
                pb: { base: '12px', lg: '16px' },
                pt: { base: '12px', lg: '24px' },
                px: { base: '16px', lg: '40px' },
                zIndex: 10
            })}
        >
            <Link
                href="/"
                className={css({
                    zIndex: 10,
                    position: 'fixed',
                    top: '16px',
                    right: { base: '16px', lg: '40px' }
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
                    Home
                </h2>
            </Link>
        </header>
    )
}
