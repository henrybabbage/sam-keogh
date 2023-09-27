import { CustomPortableText } from '@/components/common/CustomPortableText'
import { css } from '@/styled-system/css'
import { CvPagePayload } from '@/types'

export type CvPageProps = {
    data: CvPagePayload | null
}

export default function CvPage({ data }: CvPageProps) {
    const { cv } = data ?? {}
    console.log({ cv })
    return (
        <main className={css({ height: '100%', width: '100vw', maxWidth: '100vw', p: '12px', bg: 'background' })}>
            Text
            {cv && (
                <CustomPortableText
                    paragraphClasses={css({
                        maxW: '90vw',
                        mb: '4'
                    })}
                    value={cv}
                />
            )}
        </main>
    )
}
