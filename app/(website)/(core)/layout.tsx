import HomeButton from '@/components/common/HomeButton'
import { css } from '@/styled-system/css'
import { ReactNode } from 'react'

export default function StaticPagesLayout({ children }: { children: ReactNode }) {
    return (
        <div className={css({ w: '100%', h: '100%' })}>
            <HomeButton />
            {children}
        </div>
    )
}
