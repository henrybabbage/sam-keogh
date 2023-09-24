'use client'

import { css } from '@/styled-system/css'
import type { ExhibitionProps } from '@/types'
import { motion } from 'framer-motion'
import { useExhibitionStore } from './store'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

export default function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props

    const setSelectedExhibition = useExhibitionStore((state) => state.setSelectedExhibition)

    return (
        <motion.li
            onMouseEnter={() => {
                setSelectedExhibition(exhibition._id)
            }}
            onMouseLeave={() => {
                setSelectedExhibition(null)
            }}
            key={exhibition._id}
            whileHover={{
                translateX: '20px',
                transition: {
                    duration: 0.2
                }
            }}
        >
            <h3
                className={css({
                    fontFamily: 'azeretMono',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontVariantNumeric: 'slashed-zero',
                    _hover: { textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', color: '#0026F5' }
                })}
            >
                {exhibition?.title}
            </h3>
        </motion.li>
    )
}
