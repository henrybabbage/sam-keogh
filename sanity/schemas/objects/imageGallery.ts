import {defineField, defineType} from 'sanity'
import { getExtension, getImageDimensions } from '@sanity/asset-utils'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
    name: 'imageGallery',
    title: 'Image gallery',
    type: 'array',
    icon: ImagesIcon,
    of: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
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
					const { width, height } = getImageDimensions(value?.asset?._ref || '')
					if (width < 1200 || height < 630) {
						return 'Image must be at least 1200x630 pixels'
					}
					return true
            }),
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                }
            ]
        })
    ],
    options: {
		layout: 'grid',
	},
})
