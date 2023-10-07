import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { ContactPagePayload } from '@/types'

export type ContactPageProps = {
    data: ContactPagePayload | null
}

export default function ContactPage({ data }: ContactPageProps) {
    const { email, gallery, instagram } = data ?? {}
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: { base: '12px', lg: '16px' } })}>
            <div className={flex({ direction: 'column', justifyContent: { base: 'center', lg: 'center' }, height: '100%' })}>
                <div className={flex({ direction: { base: 'column', lg: 'column' }, align: 'center', gap: '2' })}>
                    <a
                        className={cx(
                            css({
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                fontSize: 'lg',
                                textTransform: 'uppercase'
                            }),
                            'group'
                        )}
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span
                            className={css({
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: 'hover' },
                                _active: { color: 'active' }
                            })}
                        >
                            {email}
                        </span>
                        <span
                            className={css({
                                opacity: '0',
                                _groupHover: { opacity: '1' },
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: 'hover',
                                _hover: { color: 'hover' },
                                _active: { color: 'active' }
                            })}
                        >
                            ↗
                        </span>
                    </a>
                    <a
                        className={cx(
                            css({
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                fontSize: 'lg',
                                textTransform: 'uppercase'
                            }),
                            'group'
                        )}
                        href={instagram?.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span
                            className={css({
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: 'hover' },
                                _active: { color: 'active' }
                            })}
                        >
                            {instagram?.title}
                        </span>
                        <span
                            className={css({
                                opacity: '0',
                                _groupHover: { opacity: '1' },
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: 'hover',
                                _hover: { color: 'hover' },
                                _active: { color: 'active' }
                            })}
                        >
                            ↗
                        </span>
                    </a>
                    <a
                        className={cx(
                            css({
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                fontSize: 'lg',
                                textTransform: 'uppercase'
                            }),
                            'group'
                        )}
                        href={gallery?.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span
                            className={css({
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: 'hover' },
                                _active: { color: 'active' }
                            })}
                        >
                            {gallery?.title}
                        </span>
                        <span
                            className={css({
                                opacity: '0',
                                _groupHover: { opacity: '1' },
                                fontFamily: 'neueMontreal',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: 'hover',
                                _hover: { color: 'hover' },
                                _active: { color: 'active' }
                            })}
                        >
                            ↗
                        </span>
                    </a>
                </div>
            </div>
        </main>
    )
}
