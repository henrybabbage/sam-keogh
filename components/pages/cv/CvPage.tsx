import { CustomPortableText } from '@/components/common/CustomPortableText'
import { css } from '@/styled-system/css'
import { CvPagePayload } from '@/types'

export type CvPageProps = {
    data: CvPagePayload | null
}

export default function CvPage({ data }: CvPageProps) {
    const { cv } = data ?? {}
    return (
        <main className={css({ height: '100%', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            {cv && (
                <CustomPortableText
                    paragraphClasses={css({
                        fontFamily: 'azeretMono',
                        maxW: '3xl',
                        color: 'black',
                        fontSize: 'md',
                        lineHeight: 'xl'
                    })}
                    value={cv}
                />
            )}
        </main>
    )
}
