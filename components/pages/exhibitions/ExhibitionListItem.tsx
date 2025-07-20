'use client'

import { css } from '@/styled-system/css'
import type { ExhibitionProps } from '@/types'
import { motion } from 'framer-motion'
import { memo, useCallback, useState } from 'react'
import { useExhibitionStore } from '../../../app/(website)/store'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props

    const setSelectedExhibition = useExhibitionStore((state) => state.setSelectedExhibition)

    const [isHovered, setIsHovered] = useState(false)

    // Memoize handlers to prevent unnecessary re-renders
    const handleHover = useCallback(() => {
        setIsHovered(true)
        setSelectedExhibition(exhibition._id)
    }, [exhibition._id, setSelectedExhibition])

    const handleUnhover = useCallback(() => {
        setIsHovered(false)
        setSelectedExhibition(null)
    }, [setSelectedExhibition])

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
        </motion.li>
    )
}

// Export memoized component to prevent unnecessary re-renders
export default memo(ExhibitionListItem)
