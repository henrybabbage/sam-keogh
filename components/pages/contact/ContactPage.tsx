import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { ContactPagePayload } from '@/types'

export type ContactPageProps = {
    data: ContactPagePayload | null
}

export default function ContactPage({ data }: ContactPageProps) {
    const { email, gallery, instagram } = data ?? {}
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: 'background' })}>
            <div className={flex({ direction: 'column', justifyContent: 'center', height: '100%' })}>
                <div className={flex({ direction: 'row', align: 'center', justifyContent: 'space-between', pb: '12px' })}>
                    <a
                        className={css({
                            fontFamily: 'azeretMono',
                            _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1.5px', color: 'hover' },
                            _active: { color: 'active' }
                        })}
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {email}
                    </a>
                    <a
                        className={css({
                            fontFamily: 'azeretMono',
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
                            fontFamily: 'azeretMono',
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
