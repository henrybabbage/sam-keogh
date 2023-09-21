'use client'

import { css } from '@/styled-system/css'
import type { VideoProps } from '@/types'
import Plyr, { APITypes } from 'plyr-react'
import 'plyr-react/plyr.css'
import { useRef } from 'react'

export type VideosListProps = {
    videos: VideoProps[] | null
    provider: 'vimeo'
    // videoOptions?: any
}

export default function VideosList(props: VideosListProps) {
    const { videos, provider } = props

    const ref = useRef<APITypes>(null)

    function getVimeoIdFromUrl(url: string | null) {
        const vimeoRegex = /vimeo\.com\/(\d+)/
        const match = url?.match(vimeoRegex)

        if (match) {
            return match[1]
        } else {
            return null
        }
    }

    function getVideosWithVimeoIds(videos: VideoProps[]) {
        return videos.map((video) => {
            const vimeoId = getVimeoIdFromUrl(video.url)
            return {
                ...video,
                url: vimeoId ? vimeoId : video.url
            }
        })
    }

    const preparedVideos = videos ? getVideosWithVimeoIds(videos) : []

    console.log({preparedVideos})

    return (
        <>
            {preparedVideos &&
                provider &&
                preparedVideos.map((vimeo) => (
                    <div key={vimeo.url} className={css({ aspectRatio: 16/9, width: '100%', height: '100%', position: 'relative' })}>
                        <Plyr
                            ref={ref}
                            playsInline
                            id="player"
                            crossOrigin=""
                            source={{
                                type: 'video',
                                sources: [
                                    {
                                        src: vimeo.url,
                                        provider: provider
                                    }
                                ]
                            }}
                            className={css({ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 })}
                            // options={videoOptions}
                        />
                        <figcaption className={css({ my: 4 })}>
                            <h3 className={css({ fontFamily: 'simula', fontStyle: 'normal' })}>{vimeo?.title}</h3>
                        </figcaption>
                    </div>
                ))}
        </>
    )
}
