'use client'

import 'vidstack/styles/community-skin/video.css'
import 'vidstack/styles/defaults.css'

import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react'
import { useEffect, useRef } from 'react'
import { type MediaPlayerElement } from 'vidstack'

export default function VideoPlayer() {
    const player = useRef<MediaPlayerElement>(null)

    useEffect(() => {
        player.current!.startLoading()
    }, [])

    return (
        <MediaPlayer
            ref={player}
            title="Sprite Fight"
            src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
            poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
            thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
            aspectRatio={16 / 9}
            crossorigin=""
            load="idle"
        >
            <MediaOutlet>
                <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
                <track src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt" label="English" srcLang="en-US" kind="subtitles" default />
                <track src="https://media-files.vidstack.io/sprite-fight/chapters.vtt" srcLang="en-US" kind="chapters" default />
            </MediaOutlet>
            <MediaCommunitySkin />
        </MediaPlayer>
    )
}
