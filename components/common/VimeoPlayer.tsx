'use client'

import { css } from '@/styled-system/css'
import { VideoProps } from '@/types'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/vimeo'), { ssr: false })

export default function VimeoPlayer(props: VideoProps) {
    const { url, title } = props
    return (
        <div className={css({ position: 'relative', aspectRatio: 16 / 9 })}>
            <ReactPlayer
                id="react-player"
                className={css({ position: 'absolute', top: 0, left: 0 })}
                width="100%"
                height="100%"
                controls
                playing
                muted
                url={url}
                config={{
                    title: title,
                }}
                playsinline
            />
        </div>
    )
}
