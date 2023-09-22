'use client'

import { css } from '@/styled-system/css'
import type { VideoProps } from '@/types'
import dynamic from 'next/dynamic'
import type { APITypes } from 'plyr-react'
import 'plyr-react/plyr.css'
import { useRef } from 'react'

const Plyr = dynamic(() => import('plyr-react'), { ssr: false })

export type PlayerProps = {
    provider: 'vimeo'
    // videoOptions?: any
} & VideoProps

export default function VideoPlayer(props: PlayerProps) {
    const { url, provider, _key, title } = props

    console.log('url', url)
    console.log('provider', provider)
    console.log('_key', _key)
    console.log('title', title)

    const ref = useRef<APITypes>(null)

    return (
        <div key={_key} className={css({ width: '100%', height: '100%', position: 'relative' })}>
            <Plyr
                ref={ref}
                key={_key}
                id="plyr-player"
                playsInline
                source={{
                    type: 'video',
                    sources: [
                        {
                            src: url,
                            provider: provider
                        }
                    ]
                }}
                // options={videoOptions}
            />
            <figcaption className={css({ my: 4 })}>
                <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal' })}>{title}</h3>
            </figcaption>
        </div>
    )
}
