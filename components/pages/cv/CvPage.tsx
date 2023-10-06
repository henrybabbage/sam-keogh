import { CustomPortableText } from '@/components/common/CustomPortableText'
import { css } from '@/styled-system/css'
import { CvPagePayload } from '@/types'

export type CvPageProps = {
    data: CvPagePayload | null
}

export default function CvPage({ data }: CvPageProps) {
    const { cv } = data ?? {}
    return (
        <main className={css({ height: '100%', width: '100vw', maxWidth: '100vw', p: { base: '12px', lg: '16px' } })}>
            {cv && (
                <CustomPortableText
                    paragraphClasses={css({
                        maxW: '98vw',
                        mb: '4'
                    })}
                    value={cv}
                />
            )}
        </main>
    )
}
