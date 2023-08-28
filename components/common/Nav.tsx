import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import Link from 'next/link'

export default function Nav() {
    return (
        <aside className={css({ position: 'fixed', bottom: '0', width: '100vw', p: '12px' })}>
            <nav className={flex({ justifyContent: 'space-between' })}>
                <Link href="/exhibitions">
                    <h2 className={css({ width: 'fit-content', color: 'black' })}>Exhibitions</h2>
                </Link>
                <Link href="/cv">
                    <h2 className={css({ width: 'fit-content', color: 'black' })}>CV</h2>
                </Link>
                <Link href="/contact">
                    <h2 className={css({ width: 'fit-content', color: 'black' })}>Contact</h2>
                </Link>
            </nav>
        </aside>
    )
}
