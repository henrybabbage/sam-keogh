'use client'

import { css } from '@/styled-system/css'
import type { ExhibitionProps } from '@/types'
import { useCallback, useRef } from 'react'
import { useExhibitionStore } from '../../../app/(website)/store'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

const HOVER_DELAY_MS = 75

export default function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props

    const setSelectedExhibition = useExhibitionStore((state) => state.setSelectedExhibition)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleHover = useCallback(() => {
        hoverTimeoutRef.current = setTimeout(() => {
            setSelectedExhibition(exhibition._id)
        }, HOVER_DELAY_MS)
    }, [setSelectedExhibition, exhibition._id])

    const handleUnhover = useCallback(() => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
        }
        setSelectedExhibition(null)
    }, [setSelectedExhibition])

    return (
        <li
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            className={css({
                transform: 'translateX(0)',
                transition: 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)',
                willChange: 'transform',
                _hover: {
                    transform: 'translateX(20px)'
                }
            })}
        >
            <h2
                className={css({
                    fontFamily: 'simula',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    fontSize: { base: 'sm', lg: 'lg' },
                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                    _active: { color: 'active' }
                })}
            >
                {exhibition?.title}
            </h2>
        </li>
    )
}
