import { css } from '@/styled-system/css'

export default function Nav() {
    return (
        <div className={css({ display: 'flex', justifyContent: 'space-between', width: '100vw' })}>
            <h2 className={css({ width: 'fit-content' })}>Exhibitions</h2>
            <h2 className={css({ width: 'fit-content' })}>Biography</h2>
            <h2 className={css({ width: 'fit-content' })}>Contact</h2>
        </div>
    )
}
