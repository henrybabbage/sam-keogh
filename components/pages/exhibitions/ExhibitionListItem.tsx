'use client'

import { css } from '@/styled-system/css'
import type { ExhibitionProps } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useExhibitionStore } from './store'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

export default function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props

    const setSelectedExhibition = useExhibitionStore((state) => state.setSelectedExhibition)

    const [isHovered, setIsHovered] = useState(false)

    const handleHover = () => {
        setIsHovered(true)
        setSelectedExhibition(exhibition._id)
    }

    const handleUnhover = () => {
        setIsHovered(false)
        setSelectedExhibition(null)
    }

    return (
        <motion.li
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            key={exhibition._id}
            initial={{ x: 0 }}
            animate={{
                x: isHovered ? 20 : 0,
                transition: {
                    duration: 0.2,
                    ease: 'easeInOut'
                }
            }}
        >
            <h3
                className={css({
                    fontFamily: 'azeretMono',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontVariantNumeric: 'slashed-zero',
                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: 'hover' }
                })}
            >
                {exhibition?.title}
            </h3>
        </motion.li>
    )
}
