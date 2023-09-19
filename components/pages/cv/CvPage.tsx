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
            {cv && <CustomPortableText paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl" value={cv} />}
        </main>
    )
}
