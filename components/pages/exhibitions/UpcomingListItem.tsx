'use client'

import { css } from '@/styled-system/css'
import { UpcomingProps } from '@/types'
import { format } from 'date-fns'

export type UpcomingListItemProps = {
    upcoming: UpcomingProps
}

export default function UpcomingListItem(props: UpcomingListItemProps) {
    const { upcoming } = props
    return (
        <li>
            <h2
                className={css({
                    fontFamily: 'simula',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    fontSize: { base: 'sm', lg: 'lg' }
                })}
            >
                {upcoming?.title}
            </h2>
            <h2
                className={css({
                    fontFamily: 'simula',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    fontSize: { base: 'sm', lg: 'lg' }
                })}
            >
                {upcoming?.info && <span>{upcoming?.info} </span>}
                {upcoming?.venue && <span>at {upcoming?.venue?.name} </span>}
                {upcoming?.upcomingDate && <span>on {format(new Date(upcoming?.upcomingDate), 'dd MMM')}</span>}
            </h2>
        </li>
    )
}
