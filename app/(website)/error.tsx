'use client' // Error components must be Client Components

import { css } from '@/styled-system/css';
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

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
                    Something went wrong!
                </h2>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
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
                        Try again
                    </h3>
                </button>
            </div>
        </main>
    )
}
