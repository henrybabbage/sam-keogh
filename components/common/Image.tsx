'use client'

import { SanityImage } from 'sanity-image'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

export const Image = (props: Omit<React.ComponentProps<typeof SanityImage>, 'baseUrl' | 'dataset' | 'projectId'>) => {
    console.log(props)
    return (
        <SanityImage baseUrl={baseUrl} {...props} />
    )
}
