'use client'

import { css } from '@/styled-system/css'
import { UpcomingProps } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'

export type UpcomingListItemProps = {
    upcoming: UpcomingProps
}

export default function UpcomingListItem(props: UpcomingListItemProps) {
    const { upcoming } = props

    const [isHovered, setIsHovered] = useState(false)

    const handleHover = () => {
        setIsHovered(true)
    }

    const handleUnhover = () => {
        setIsHovered(false)
    }

    return (
        <motion.li
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            key={upcoming._id}
            initial={{ x: 0 }}
            animate={{
                x: isHovered ? 20 : 0,
                transition: {
                    duration: 0.2,
                    ease: 'easeInOut'
                }
            }}
        >
            <h2
                className={css({
                    fontFamily: 'simula',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    fontSize: { base: 'sm', lg: 'lg' },
                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                    _active: { color: 'active' }
                })}
            >
                {upcoming?.title}
            </h2>
            <h2
                className={css({
                    fontFamily: 'simula',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    fontSize: { base: 'sm', lg: 'lg' },
                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' },
                    _active: { color: 'active' }
                })}
            >
                <span>{upcoming?.info} </span>
                <span>at {upcoming?.venue?.name}</span>
            </h2>
        </motion.li>
    )
}
