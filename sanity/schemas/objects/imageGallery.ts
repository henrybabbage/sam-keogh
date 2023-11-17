import { getExtension } from '@sanity/asset-utils'
import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
    name: 'imageGallery',
    title: 'Image gallery',
    type: 'array',
    icon: ImagesIcon,
    of: [
        defineArrayMember({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                storeOriginalFilename: true,
                hotspot: true
            },
            preview: {
                select: {
                    imageUrl: 'asset.url',
                    title: 'caption'
                }
            },
            validation: (rule) =>
                rule.custom((value) => {
                    if (!value) {
                        return true
                    }
                    const filetype = getExtension(value?.asset?._ref || '')
                    if (filetype !== 'jpg' && filetype !== 'png') {
                        return 'Image must be a JPG or PNG'
                    }
                    return true
                }).warning(),
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string',
                    initialValue: 'Artwork by Sam Keogh',
                    description: 'For accessibility and search engine optimization'
                }),
                defineField({
                    title: 'Caption',
                    name: 'caption',
                    type: 'string'
                })
            ]
        })
    ],
    options: {
        layout: 'grid'
    }
})
