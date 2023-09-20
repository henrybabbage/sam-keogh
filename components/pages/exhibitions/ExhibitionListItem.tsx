'use client'

import { css } from '@/styled-system/css'
import type { ExhibitionProps } from '@/types'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useExhibitionStore } from './store'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

export default function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props

    const [isHovered, setIsHovered] = useState(false)

    const setSelectedExhibition = useExhibitionStore(state => state.setSelectedExhibition)

    const handleHover = () => {
        setIsHovered(true)
    }

    const handleUnhover = () => {
        setIsHovered(false)
    }

    useEffect(() => {
        setSelectedExhibition(exhibition)
    }, [isHovered, exhibition, setSelectedExhibition])
    
    return (
        <motion.li
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            key={exhibition._id}
            whileHover={{
                translateX: '20px',
                transition: {
                    duration: 0.2
                }
            }}
        >
            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic' })}>{exhibition?.title}</h3>
            {exhibition.venue && (
                <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md' })}>
                    {exhibition.venue.name && <span>{exhibition.venue.city ? exhibition.venue.name + ', ' : exhibition.venue.name}</span>}
                    {exhibition.venue.city && <span>{exhibition.venue.country ? exhibition.venue.city + ', ' : exhibition.venue.city}</span>}
                    {exhibition.venue.country && <span>{exhibition.venue.country}</span>}
                </h3>
            )}
            {exhibition.startDate && exhibition.endDate && (
                <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic' })}>
                    <span>{format(new Date(exhibition?.startDate), 'dd MMM')}</span>
                    <span>{' — '}</span>
                    <span>{format(new Date(exhibition?.endDate), 'dd MMM yyyy')}</span>
                </h3>
            )}
        </motion.li>
    )
}
