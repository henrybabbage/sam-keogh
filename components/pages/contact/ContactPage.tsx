import { css, cx } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { ContactPagePayload } from '@/types'

export type ContactPageProps = {
    data: ContactPagePayload | null
}

export default function ContactPage({ data }: ContactPageProps) {
    const { email, gallery, instagram } = data ?? {}
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: 'background' })}>
            <div className={flex({ direction: 'column', justifyContent: { base: 'start', lg: 'center' }, height: '100%' })}>
                <div className={flex({ direction: { base: 'column', lg: 'column' }, align: 'center', justifyContent: 'space-between', pb: '12px' })}>
                    <a
                        className={cx(
                            css({
                                fontFamily: 'simula',
                                textTransform: 'uppercase',
                            }),
                            'group'
                        )}
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span
                            className={css({
                                fontFamily: 'simula',
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
                                fontFamily: 'simula',
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
                        className={flex({
                            align: 'center',
                            justifyContent: 'center',
                            gap: '2',
                            fontFamily: 'simula',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                        href={instagram?.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {instagram?.title}
                    </a>
                    <a
                        className={css({
                            fontFamily: 'simula',
                            textTransform: 'uppercase',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                        href={gallery?.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {gallery?.title}
                    </a>
                </div>
            </div>
        </main>
    )
}
