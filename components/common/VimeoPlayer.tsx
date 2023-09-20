'use client'

import { css } from '@/styled-system/css'
import type { VideoProps } from '@/types'
import Plyr, { APITypes } from 'plyr-react'
import 'plyr-react/plyr.css'
import { useRef } from 'react'

export type VideoPlayerProps = {
    videos: VideoProps[]
    provider: 'vimeo'
    // videoOptions?: any
}

export default function VimeoPlayer(props: VideoPlayerProps) {
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

    const preparedVideos = getVideosWithVimeoIds(videos)

    return (
        <div>
            {preparedVideos &&
                provider &&
                preparedVideos.map((vimeo) => (
                    <>
                        <Plyr
                            key={vimeo.url}
                            ref={ref}
                            playsInline
                            source={{
                                type: 'video',
                                sources: [
                                    {
                                        src: vimeo.url,
                                        provider: provider
                                    }
                                ]
                            }}
                            // options={videoOptions}
                        />
                        <figcaption className={css({ my: 4 })}>{vimeo?.title}</figcaption>
                    </>
                ))}
        </div>
    )
}
