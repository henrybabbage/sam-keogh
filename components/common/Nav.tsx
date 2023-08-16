import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

export default function Nav() {
    return (
        <div className={flex({ justify: 'space-between' })}>
            <h2 className={css({ width: 'fit-content', color: 'black' })}>Exhibitions</h2>
            <h2 className={css({ width: 'fit-content', color: 'black' })}>Biography</h2>
            <h2 className={css({ width: 'fit-content', color: 'black' })}>Contact</h2>
        </div>
    )
}
