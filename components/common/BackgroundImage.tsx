'use client'

import { SanityImage } from 'sanity-image'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

export const DynamicImage = (props: Omit<React.ComponentProps<typeof SanityImage>, 'baseUrl' | 'dataset' | 'projectId'>) => {
    const { asset, mode, sizes, width, height, loading } = props

    const ratio = height / width
    const isLandscape = ratio < 1

    console.log({ isLandscape })
    return (
        <SanityImage
            baseUrl={baseUrl}
            id={asset?.id}
            alt={asset?.alt}
            // preview={asset?.preview}
            mode={mode}
            sizes={sizes}
            width={width}
            height={height}
            hotspot={asset?.hotspot}
            crop={asset?.crop}
            queryParams={{ q: 75 }}
            loading={loading || "eager"}
        />
    )
}
