import { css } from '@/styled-system/css'
import type { ExhibitionProps } from '@/types'
import { format } from 'date-fns'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

export default function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props
    return (
        <div>
            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic' })}>{exhibition?.title}</h3>
            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal' })}>
                <span>{exhibition?.venue?.name}{', '}</span>
                <span>{exhibition?.venue?.city}{', '}</span>
                <span>{exhibition?.venue?.country}</span>
            </h3>
            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic' })}>
                <span>{format(new Date(exhibition?.startDate), 'dd MMM')}</span>
                <span>{' — '}</span>
                <span>{format(new Date(exhibition?.endDate), 'dd MMM yyyy')}</span>
            </h3>
        </div>
    )
}
