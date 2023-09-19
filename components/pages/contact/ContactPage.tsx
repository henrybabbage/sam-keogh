import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { ContactPagePayload } from '@/types'

export type ContactPageProps = {
    data: ContactPagePayload | null
}

export default function ContactPage({ data }: ContactPageProps) {
    const { email, gallery, instagram } = data ?? {}
    console.log({ email, gallery, instagram })
    return (
        <main className={css({ maxHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={flex({ direction: 'column', justifyContent: 'center', height: '100%' })}>
                <div className={flex({ direction: 'row', align: 'center', justifyContent: 'space-between', pb: '12px' })}>
                    <a href={`mailto:${email}`}>{email}</a>
                    <a href={instagram?.url}>{instagram?.title}</a>
                    <a href={gallery?.url}>{gallery?.title}</a>
                </div>
            </div>
        </main>
    )
}
